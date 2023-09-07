'use client'

import axios from 'axios'
import { useRouter } from 'next/navigation'
import { createContext, useState }  from 'react'
import { toast } from 'react-toastify'

const ProductContext = createContext()

export const ProductProvider = ({ children }) => {

    const router = useRouter()

    const [state, setState] = useState({
        error: null,
        updated: false,
        loading: null,
    });

    const clearError = () => setState((prev) => ({ ...prev, error: null }));

    const newProduct = async (product) => {

        try {
    
            setState((prevProduct) => ({ ...prevProduct, loading: true }))

            const { data } = await axios.post(`${process.env.API_URL}/api/admin/products`, product);
  
            if(data) {
                router.replace('/admin/products')
            }

        } catch (error) {
            const message = (error && error?.response && error?.response?.data && error?.response?.data?.message) ||
                            error?.message || error.toString()

            setState((prev) => ({ ...prev, error: message, loading: false }) )
            toast.error(message)

        }
    }

    const updateProduct = async (product, productId) => {

        try {
    
            setState((prevProduct) => ({ ...prevProduct, loading: true, }))

            const { data } = await axios.put(`${process.env.API_URL}/api/admin/products/${productId}`, product);
  
            if(data) {
                setState((prevProduct) => ({ ...prevProduct, loading: false, updated: true }))
                router.replace('/admin/products');
            }

        } catch (error) {
            const message = (error && error?.response && error?.response?.data && error?.response?.data?.message) ||
                            error?.message || error.toString();

            setState((prevProduct) => ({ ...prevProduct, error: message,  loading: false, updated: true }))
            toast.error(message)

        }
    }

    const uploadProductImages = async (formData, productId) => {
   
        try {

            setState((prevState) => ({ ...prevState, loading: true }))

            const { data } = await axios.put(`${process.env.API_URL}/api/admin/products/upload_images/${productId}`, 
            formData,
            {
                headers: {
                    'Content-Type': "multipart/form-data"
                }
            });
  
            if(data?.data) {
                setState((prevState) => ({...prevState, loading: false}))
                router.replace('/admin/products')
            }

        } catch (error) {
            const message = (error && error?.response && error?.response?.data && error?.response?.data?.message) ||
                            error?.message || error.toString();
        
            setState((prev) => ({ ...prev, error: message, loading: false }))
            toast.error(message)

        }
    }

    const deleteProduct = async (productId) => {

        try {
    
            setState((prevProduct) => ({ ...prevProduct, loading: true, }))

            const { data } = await axios.delete(`${process.env.API_URL}/api/admin/products/${productId}`);
  
            if(data?.success) {
                setState((prevProduct) => ({ ...prevProduct, loading: false, updated: true }))
                router.replace('/admin/products');
            }

        } catch (error) {
            const message = (error && error?.response && error?.response?.data && error?.response?.data?.message) ||
                            error?.message || error.toString();

            setState((prevProduct) => ({ ...prevProduct, error: message,  loading: false, updated: true }))
            toast.error(message)

        }
    }

    const postReview = async (reviewData) => {

        try {
    
            setState((prevProduct) => ({ ...prevProduct, loading: true, }))

            const { data } = await axios.put(`${process.env.API_URL}/api/products/review`, reviewData);
  
            if(data?.success) {
                setState((prevProduct) => ({ ...prevProduct, loading: false, }));
                router.replace(`/product/${reviewData?.productId}`);
            }

        } catch (error) {
            const message = (error && error?.response && error?.response?.data && error?.response?.data?.message) ||
                            error?.message || error.toString();

            setState((prevProduct) => ({ ...prevProduct, error: message,  loading: false }))
            toast.error(message);

        }
    }
    
    return <ProductContext.Provider value={{
        error: state.error,
        loading: state.loading,
        state: state,
        updated: state.updated,
        setState: setState,
        clearError: clearError,
        newProduct,
        updateProduct,
        deleteProduct,
        uploadProductImages,
        postReview
     }} >
        { children }
    </ProductContext.Provider>
}

export default ProductContext