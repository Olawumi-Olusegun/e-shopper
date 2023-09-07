// "use client"
import React from 'react'
import Profile from '@/components/auth/Profile';
import { cookies } from 'next/headers';
import ListOrders from '@/components/orders/listOrders';
import queryString from 'query-string';

const getOrders = async (searchParams) => {

    const nextCookies = cookies();

    const nextAuthSessionToken = nextCookies.get('next-auth.session-token');

    const urlParams = {
        page: searchParams.page || 1,
    }

    const searchQuery = queryString.stringify(urlParams);

    try {
        const { data } = await axios.get(`${process.env.API_URL}/api/orders/me?${searchQuery}`, {
            headers: {
                Cookie: `next-auth.session-token=${nextAuthSessionToken?.value}`
            }
        });
        return data;
    } catch (error) {
        
    }
}

const  MyOrdersPage = async ({ searchParams }) => {
    const orders = await getOrders(searchParams);
    return <ListOrders orders={orders} />
}

export default MyOrdersPage