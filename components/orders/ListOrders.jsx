"use client";

import React, { useContext, useEffect } from 'react';
import CustomPagination from '../layouts/CustomPagination';
import CartContext from '@/context/CartContext';
import { useRouter, useSearchParams } from 'next/navigation';
import OrderItem from './OrderItem';


const ListOrders  = ({ orders }) => {
    const { clearCart } = useContext(CartContext);
    const params = useSearchParams();
    const router = useRouter();

    const orderSuccess = params.get('order_success');

    useEffect(() => {
        if(orderSuccess) {
            clearCart();
            router.replace('/me/orders')
        }
        // eslint-disable-next-line
    }, [orderSuccess, router])

    return <>
            <h3 className='text-xl font-semibold mb-5'>Your Orders</h3>
            {
                orders?.orders?.map((order, index) => <OrderItem key={index} order={order} />)
            }
            <CustomPagination resPerPage={orders?.resPerPage} productsCount={orders.productsCount} />
    </>
}

export default ListOrders;