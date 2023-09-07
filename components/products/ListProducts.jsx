'use client'

import React from 'react'
import ProductItem from './ProductItem'
import Filters from '@/components/layouts/Filters'
import CustomPagination from '@/components/layouts/CustomPagination'

const NUMBER_OF_ITEMS_PER_PAGE = 1

const ListProducts = ({ data }) => {

  return (
    <>
      <section className="py-12">
        <div className="container max-w-screen-xl mx-auto px-4">
          <div className="flex flex-col md:flex-row -mx-4">
            <Filters />

            <main className="md:w-2/3 lg:w-3/4 px-3">
                 { data?.products.length >= 1
                 ? data?.products.map((product) => <ProductItem key={product._id} product={ product } />  ) 
                 : (<h2 className='text-center p-4'>Product(s) not found </h2>)
                 } 

            {
              data?.products?.length >= NUMBER_OF_ITEMS_PER_PAGE
              ?  <CustomPagination itemsPerPage={data?.itemsPerPage} productsCount={data?.productsCount} />
              : null
            }
           
            </main>

          </div>
        </div>
      </section>    
    </>
  )
}

export default ListProducts 