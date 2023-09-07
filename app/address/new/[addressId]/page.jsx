import React from 'react'
import { cookies } from 'next/headers';
import UpdateAddress from '@/components/user/UpdateAddress';

const getAddress = async (addressId) => {

    const nextCookies = cookies();

    const nextAuthSessionToken = nextCookies.get('next-auth.session-token');
    try {
        const { data } = await axios.get(`${process.env.API_URL}/api/address/${addressId}`, {
            headers: {
                Cookie: `next-auth.session-token=${nextAuthSessionToken?.value}`
            }
        });
        return data?.address;
    } catch (error) {
        
    }
}

const  UpdateAddressPage = async ({ params }) => {
    const address = await getAddress(params?.addressId);
    return <UpdateAddress addressId={params?.addressId} address={address} />
}

export default UpdateAddressPage