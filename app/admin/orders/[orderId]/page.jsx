// "use client"
import React from 'react'
import { cookies } from 'next/headers';
import UpdateOrder from '@/components/admin/UpdateOrder';

const getOrder = async (orderId) => {

    const nextCookies = cookies();

    const nextAuthSessionToken = nextCookies.get('next-auth.session-token');


    try {
        const { data } = await axios.get(`${process.env.API_URL}/api/orders/${orderId}`, {
            headers: {
                Cookie: `next-auth.session-token=${nextAuthSessionToken?.value}`
            }
        });
        return data;
    } catch (error) {
        
    }
}

const  AdminOrderDetailPage = async ({ params }) => {
    const data = await getOrder(params?.orderId);
    return <UpdateOrder order={data?.order} />
}

export default AdminOrderDetailPage