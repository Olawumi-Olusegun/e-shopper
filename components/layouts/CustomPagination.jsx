'use client'
import React from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Pagination from 'react-js-pagination'

const CustomPagination = ({ itemsPerPage, productsCount }) => {

    const router = useRouter()
    const searchParams = useSearchParams()

    let page = searchParams.get('page') ?? 1

    page = Number(page)

    

    let queryParams;

    const handlePaginationChange = (currentPage) => {
        
        if(typeof window !== 'undefined') {
            queryParams = new URLSearchParams(window.location.search)

            if(queryParams.has('page')) {
                queryParams.set('page', currentPage)
            } else {
                queryParams.append('page', currentPage)
            }

            const path = window.location.pathname + '?' + queryParams.toString()

            if(path.includes('NaN')) return;

            router.push(path)
        }

    }

  return (
    <div className='flex mt-20 justify-center'>
        <Pagination 
            activePage={page}
            itemsCountPerPage={itemsPerPage}
            totalItemsCount={Number(productsCount)}
            onChange={handlePaginationChange}
            nextPageText={'Next'}
            prevPageText={'Prev'}
            firstPageText={'First'}
            lastPageText={'Last'}
            itemClass='relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 hover-gray-50 focus:z-20'
            activeClass='z-10 inline-flex items-center border border-gray-500 border-indigo-500 bg-indigo-50 text-sm font-medium text-indigo-600 focud:z-20'
            activeLinkClass='z-10 inline-flex items-center border border-gray-500 border-indigo-500 bg-indigo-50 text-sm font-medium text-indigo-600 focud:z-20'
        />
    </div>
  )
}

export default CustomPagination