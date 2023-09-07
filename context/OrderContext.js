'use client'

import axios from 'axios'
import { useRouter } from 'next/navigation'
import { createContext, useState }  from 'react'
import { toast } from 'react-toastify'

const OrderContext = createContext()

export const OrderProvider = ({ children }) => {

    const router = useRouter()

    const [state, setState] = useState({
        error: null,
        updated: false,
        loading: null,
        canReview: false,
    });

    const clearError = () => setState((prev) => ({ ...prev, error: null }));



    const updateOrder = async (order, orderId) => {

        try {
    
            setState((prevProduct) => ({ ...prevProduct, loading: true, }));

            const { data } = await axios.put(`${process.env.API_URL}/api/admin/products/${orderId}`, order);
  
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


    const deleteOrder = async (orderId) => {

        try {
    
            setState((prevProduct) => ({ ...prevProduct, loading: true, }))

            const { data } = await axios.delete(`${process.env.API_URL}/api/admin/products/${orderId}`);
  
            if(data?.success) {
                setState((prevProduct) => ({ ...prevProduct, loading: false, updated: true }))
                router.replace('/admin/orders');
            }

        } catch (error) {
            const message = (error && error?.response && error?.response?.data && error?.response?.data?.message) ||
                            error?.message || error.toString();

            setState((prevProduct) => ({ ...prevProduct, error: message,  loading: false, updated: true }))
            toast.error(message)

        }
    }

    const canUserReview = async (productId) => {

        try {
    
            setState((prevProduct) => ({ ...prevProduct, loading: true, }))

            const { data } = await axios.get(`${process.env.API_URL}/api/orders/can_review?productId=${productId}`);
  
            if(data?.canReview) {
                setState((prevProduct) => ({ 
                    ...prevProduct, 
                    loading: false, 
                    updated: true,
                    canReview: data?.canReview,
                }))
                router.replace(`/admin/orders/${productId}`);
            }

        } catch (error) {
            const message = (error && error?.response && error?.response?.data && error?.response?.data?.message) ||
                            error?.message || error.toString();

            setState((prevProduct) => ({ ...prevProduct, error: message,  loading: false, updated: true }))
            toast.error(message)

        }
    }
    
    return <OrderContext.Provider value={{
        error: state.error,
        loading: state.loading,
        state: state,
        updated: state.updated,
        setState: setState,
        clearError: clearError,
        updateOrder,
        deleteOrder,
        canUserReview,
     }} >
        { children }
    </OrderContext.Provider>
}

export default OrderContext