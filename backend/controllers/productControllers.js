import fs from 'fs';
import Product from './../models/productModel'
import APIFilters from '@/backend/utils/APIFilters'
import { cloudinary, uploads } from '../utils/cloudinary';


export const newProduct = async (req, res, next) => {

    req.body.user = req?.user?._id;
    
    const { name, user, description, price, images, category, seller, stock, ratings, reviews } = req.body
    
    try {

        const productExist = await Product.findOne({ name }).exec()

        if(productExist) return res.status(400).json({ message: "Product already exist"})

        const productData = new Product({ name, user, description, price, images, category, seller, stock, ratings, reviews })
        
        const product = await productData.save()

        return res.status(201).json({ product })

    } catch (error) {
        return res.status(500).json({ message: error?.message })
    }
}


export const listProducts = async (req, res, next) => {

    const itemsPerPage = 3

    try {

        const productCount = await Product.countDocuments()
        
        let apiFilters = new APIFilters(Product.find(), req.query).search().filter();

        let products = await apiFilters.query
        
        if(!products) return res.status(404).json({ message: 'Products not found' })
        
        const filteredProductsCount = products?.length;

        apiFilters.pagination(itemsPerPage);
      
        products = await apiFilters.query.clone();

        return res.status(200).json({ productCount, itemsPerPage, filteredProductsCount, products })
        
    } catch(error) {
        // console.log({ error: error.message})
        return res.status(500).json({ message: error?.message })
    }
}

export const findProductById = async (req, res, next) => {

    const { productId } = req.query
    
    try {
        
        const product = await Product.findById(productId).exec()

        if(!product) return res.status(404).json({ message: 'Product not found' })

        return res.status(200).json({ product })
        
    } catch(error) {
        return res.status(500).json({ message: error?.message })
    }
}

export const uploadProductImages = async (req, res) => {
    const { productId } = req.query;
    const urls = [];
    const files = req.files;

    try {

        const productExist = await Product.findById(productId);

        if(!productExist) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const uploader = async (path) => await uploads(path, "buyitnow/products");

        for(const file of files) {
            const { path } = file;
            const imageUrl = await uploader(path);
            urls.push(imageUrl);

            fs.unlinkSync(path);
        }

        const product = await Product.findByIdAndUpdate(productId, {$set: {
            images: urls
        }}, { new: true });

        return res.status(201).json({ data: urls, product });

    } catch (error) {
        return res.status(500).json({ message: error?.message })
    }
}

export const updateProduct = async (req, res) => {
    const { productId } = req.query;
    
    try {
        const productExist = await Product.findById(productId);

        if(!productExist) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const updatedProduct = await Product.findByIdAndUpdate(productId, {$set: req.body }, { new: true });
        return res.status(201).json({ product: updatedProduct });

    } catch (error) {
        return res.status(500).json({ message: error?.message })
    }
}

export const deleteProduct = async (req, res) => {
    const { productId } = req.query;
    
    try {
        const productExist = await Product.findById(productId);

        if(!productExist) {
            return res.status(404).json({ message: 'Product not found' });
        }

        for(let i = 0; i < productExist?.images?.length; i++) {
            const res = await cloudinary.uploader.destroy(productExist[i].public_id);
        }

        const deletedProduct = await Product.findByIdAndDelete(productId);
        return res.status(200).json({ success: true, message: "Product deleted" });
        
    } catch (error) {
        return res.status(500).json({ message: error?.message })
    }
}

export const createProductReview = async (req, res) => {
    const { rating, comment, productId } = req.body;

    const userId = req.user?._id?.toString();

    const review = {
        user: userId,
        rating: Number(rating),
        comment
    }
    
    try {
        const productExist = await Product.findById(productId);

        if(!productExist) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const isReviewed = productExist?.reviews?.find((review) => review.user.toString() === userId)

        if(isReviewed) {
            productExist.reviews.forEach((review) => {
                if(review.user.toString() === userId) {
                    review.comment = comment;
                    review.ratings = rating;
                }
            })
        } else {
            productExist.reviews.push(review)
        }

        productExist.ratings = productExist?.ratings?.reduce((acc, item) => item.ratings + acc, 0) / productExist?.reviews?.length;

        const reviewedProduct = await productExist.save();

        return res.status(200).json({ success: true });

    } catch (error) {
        return res.status(500).json({ message: error?.message })
    }
}