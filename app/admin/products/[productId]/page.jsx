import React, { use } from 'react'
import axios from 'axios'
import UpdateProduct from '@/components/admin/UpdateProduct'

const getProduct = async (params) => {
    const productId = params;
    try {

        const { data } = await axios.get(`${process.env.API_URL}/api/products/${productId}`)
        return data

    } catch(error) {
        if(Number(error.response.status) === 500 && error.response.statusText === 'Internal Server Error' ) {
            // console.log(error)

        }

    }
}

const HomePage =  ({ params }) => {
    // const products = await getProducts()
    const data = use(getProduct(params.productId))

    return <UpdateProduct data={data?.product} />
}

export default HomePage