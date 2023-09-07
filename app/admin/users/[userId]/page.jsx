// "use client"
import React from 'react'
import { cookies } from 'next/headers';
import UpdateUser from '@/components/admin/UpdateUser';

const getUser = async (userId) => {

    const nextCookies = cookies();

    const nextAuthSessionToken = nextCookies.get('next-auth.session-token');


    try {
        const { data } = await axios.get(`${process.env.API_URL}/api/users/${userId}`, {
            headers: {
                Cookie: `next-auth.session-token=${nextAuthSessionToken?.value}`
            }
        });
        return data;
    } catch (error) {
        
    }
}

const  AdminUserDetailPage = async ({ params }) => {
    const data = await getUser(params?.userId);
    return <UpdateUser user={data?.user} />
}

export default AdminUserDetailPage