// "use client"
import React from 'react'
import Profile from '@/components/auth/Profile';
import { cookies } from 'next/headers';
import { getCookieName } from '@/components/helpers/helpers';

const getAddresses = async () => {

    const nextCookies = cookies();

    const cookieName = getCookieName();

    const nextAuthSessionToken = nextCookies.get(cookieName);
    try {
        const { data } = await axios.get(`${process.env.API_URL}/api/address`, {
            headers: {
                Cookie: `${nextAuthSessionToken.name}=${nextAuthSessionToken?.value}`
            }
        });
        return data?.addresses;
    } catch (error) {
        
    }
}

const  ProfilePage = async () => {
    const addresses = await getAddresses();
    return <Profile addresses={addresses} />
}

export default ProfilePage