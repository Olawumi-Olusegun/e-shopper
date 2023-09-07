// "use client"
import React from 'react'
import { cookies } from 'next/headers';
import Shipping from '@/components/cart/Shipping';

const getAddresses = async () => {

    const nextCookies = cookies();

    const nextAuthSessionToken = nextCookies.get('next-auth.session-token');
    try {
        const { data } = await axios.get(`${process.env.API_URL}/api/address`, {
            headers: {
                Cookie: `next-auth.session-token=${nextAuthSessionToken?.value}`
            }
        });
        return data?.addresses;
    } catch (error) {
        
    }
}

const  ShippingPage = async () => {
    const addresses = await getAddresses();
    return <Shipping addresses={addresses} />
}

export default ShippingPage