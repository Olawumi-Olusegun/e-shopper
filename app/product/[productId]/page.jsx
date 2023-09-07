import React from 'react'
import ProductDetails from '@/components/products/ProductDetails'
import axios from 'axios';
import mongoose from 'mongoose';
import { redirect } from 'next/navigation';

const getProductDetail = async (productId) => {
    try {
        const { data } = await axios.get(`${process.env.API_URL}/api/products/${productId}`)
        return data?.product
    } catch (error) {
        // console.log(error)
    }
}

const ProductDetailsPage = async ({ params }) => {

    const isValidId =  mongoose.isValidObjectId(params?.productId);

    if(!isValidId) {
        return redirect('/');
    }
 
    const product = await getProductDetail(params?.productId)

    return <ProductDetails product={product} />
}

export default ProductDetailsPage