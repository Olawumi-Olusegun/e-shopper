'use client'
import { CartProvider } from './../context/CartContext';
import { AuthProvider } from './../context/AuthContext';
import { ToastContainer } from 'react-toastify'
import { SessionProvider } from 'next-auth/react'

import 'react-toastify/dist/ReactToastify.css'
import { ProductProvider } from '@/context/ProductContext';
import { OrderProvider } from '@/context/OrderContext';

export const GlobalProvider = ({ children }) => {
    return <>
        <ToastContainer position="top-center" />
        <AuthProvider>
            <CartProvider>
                <OrderProvider>
                    <ProductProvider>
                        <SessionProvider>
                            { children }
                        </SessionProvider>
                    </ProductProvider>
                </OrderProvider>
            </CartProvider>
        </AuthProvider>
    </>
}