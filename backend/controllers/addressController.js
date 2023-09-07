import Address from "../models/address"
import ErrorHandler from "../utils/errorHandler";


export const newAddress = async (req, res) => {

    req.body.user = req?.user?._id;

    try {
        const address = await Address.create(req.body);
        return res.status(201).json({ address });

    } catch (error) {
        return res.status(500).json({ error: error?.message })
    }
}

export const getAddresses = async (req, res) => {
    try {
        const addresses = await Address.find({ user: req?.user?._id });
        return res.status(200).json({ addresses });

    } catch (error) {
        return res.status(500).json({ error: error?.message })
    }
}

export const getAddress = async (req, res, next) => {
    const {addresId} = req.query;
    try {
        const address = await Address.findById(addresId);
        if(!address) {
            return next(new ErrorHandler("Address not found", 404));
        }

        return res.status(200).json({ address });

    } catch (error) {
        return res.status(500).json({ error: error?.message })
    }
}

export const updateAddress = async (req, res, next) => {
    
    const {addresId} = req.query;

    try {
        const address = await Address.findById(addresId);
        
        if(!address) {
            return next(new ErrorHandler("Address not found", 404));
        }

        if(addresId.toString() !== address.user.toString()) {
            return next(new ErrorHandler("Unauthorized route handler", 404));
        }

        const updatedAddress = await Address.findByIdAndUpdate(addresId, {$set: req.body}, { new: true});

        return res.status(200).json({ address: updatedAddress });

    } catch (error) {
        return res.status(500).json({ error: error?.message })
    }
}

export const deleteAddress = async (req, res, next) => {
    
    const {addresId} = req.query;

    try {
        const address = await Address.findById(addresId);

        if(!address) {
            return next(new ErrorHandler("Address not found", 404));
        }

        if(addresId.toString() !== address.user.toString()) {
            return next(new ErrorHandler("Unauthorized route handler", 404));
        }

        const deletedAddress = await address.remove();

        return res.status(200).json({ success: true, message: "Address deleted"});

    } catch (error) {
        return res.status(500).json({ error: error?.message })
    }
}