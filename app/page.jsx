import React, { use } from 'react'
import axios from 'axios'
import ListProducts from '@/components/products/ListProducts'
import queryString from 'query-string'

const getProducts = async (searchParams) => {

    const { keyword, page, category, ratings, min, max } = searchParams

    const urlParams = { keyword, page, category, 'price[gte]': min, 'price[lte]': max, 'ratings[gte]': ratings }

    const searchQuery = queryString.stringify(urlParams)

    try {

        const { data } = await axios.get(`${process.env.API_URL}/api/products/${searchQuery}`)
        
        return data

    } catch(error) {
        if(Number(error.response.status) === 500 && error.response.statusText === 'Internal Server Error' ) {
            // console.log(error.response.statusText)
        }

        // console.log(error)
    }
}

const HomePage =  ({ searchParams }) => {
    // const products = await getProducts()
    const productsData = use(getProducts(searchParams))

    return <ListProducts data={productsData} />
}

export default HomePage