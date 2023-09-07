
import User from '@/backend/models/userModel'
import { uploads } from '../utils/cloudinary'
import fs from 'fs'
import APIFilters from '../utils/APIFilters'

export const registerUser = async (req, res) => {
    const { name, email, password: userPassword } = req.body

    try {

        let user = await User.findOne({ email })
    
        if(user) {
            return res.status(400).json({ message: 'User already exist'})
        }
    
        const newUser = await User.create({ name, email, password: userPassword })
    
        const savedUser = await newUser.save()

        const { password, ...others } = savedUser._doc
    
        return res.status(201).json({ user: others })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ error:  error?.message })
    }

}

export const updateProfile = async (req, res) => {

    const userId = req.user._id;
    
    const { name, email, } = req.body

    const updateUserData = { name, email };

    if(!name || !email) {
        return res.status(402).json({ message: 'Request body cannot be empty'})
    }

    
    try {

        let user = await User.findOne({ email })
    
        if(!user) {
            return res.status(401).json({ message: 'User not found'})
        }

        if(req.files.length > 0) {
            const uploader = async (path) => await uploads(path, "buyitnow/avatar");
            const file = req.files[0];
            const { path } = file;
            const avartarResponse = await uploader(path);
            fs.unlinkSync(path)
            updateUserData.avatar = avartarResponse;
        }
    
        const updatedProfile = await User.findByIdAndUpdate(userId, { $set: updateUserData}, { new: true});

        const { password, ...others } = updatedProfile._doc;
    
        return res.status(200).json({ user: others })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message:  error?.message })
    }

}

export const updatePassword = async (req, res) => {

    const userId = req.user._id;
    
    const { newPassword } = req.body;

    try {

        let user = await User.findById(userId)
    
        if(!user) {
            return res.status(400).json({ message: 'User not found'})
        }
        
        user.password = newPassword;

        const updatedPassword = await user.save();
    
        return res.status(200).json({ success: true })

    } catch (error) {
        return res.status(500).json({ message:  error?.message })
    }

}


export const getUsers = async (req, res) => {
    const userId = req.user?._id;
    const resPerPage = 2;

    try {

        const usersCount = await User.countDocuments();
        const apiFilters = new APIFilters(User.find(), req.query).pagination(resPerPage);

        const users = await apiFilters.query.find({ user: userId });

        return res.status(200).json({ usersCount, resPerPage, users });

    } catch (error) {
        return res.status(500).json({ error: error?.message })
    }
}

export const getUser = async (req, res) => {
    const { userId } = req.query;

    try {

        const user = await User.findById(userId).populate("shippingInfo user");

        if(!user) {
            return res.status(404).json({ message: "No user found with this ID" })
        }

        return res.status(200).json({ success: true, user });

    } catch (error) {
        return res.status(500).json({ error: error?.message });
    }
}


export const updateUser = async (req, res) => {
    const { userId } = req.query;

    const { userData } = req.body;

    try {

        const user = await User.findById(productId);

        if(!user) {
            return res.status(404).json({ message: "No user found wit this ID" })
        }

        const updatedUser = await User.findByIdAndUpdate(userId, {
            $set: userData
        });

        return res.status(200).json({ success: true, user: updatedUser });

    } catch (error) {
        return res.status(500).json({ error: error?.message });
    }
}

export const deleteUser = async (req, res) => {
    const { userId } = req.query;

    try {

        const user = await User.findById(userId);

        if(!user) {
            return res.status(404).json({ message: "No user found wit this ID" })
        }

        const deletedUser = await User.findByIdAndDelete(userId);

        return res.status(200).json({ success: true });

    } catch (error) {
        return res.status(500).json({ error: error?.message });
    }
}