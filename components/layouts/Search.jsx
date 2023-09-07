'use client'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

const Search = () => {

  const router = useRouter()

    let queryParams
    const [keyword, setKeyword] = useState('')

    if(typeof window !== 'undefined') {
      queryParams = new URLSearchParams(window.location.search)
    }
    
    const handleSubmit = (e) => {
      e.preventDefault()

      if(keyword) {
        router.push(`/?keyword=${keyword}`)
      } else {
        router.push('/')
      }
    }

    useEffect(() => {

      if(keyword === '' && queryParams.has('keyword')) {
        queryParams.delete('keyword')
        router.push('/')
      }

    }, [keyword, router, queryParams])

    const handleChange = (e) => setKeyword(e.target.value)



  return (
    <form onSubmit={handleSubmit} className="flex flex-nowrap items-center w-full order-last md:order-none mt-5 md:mt-0 md:w-2/4 lg:w-2/4">
      <input
        className="flex-grow appearance-none border border-gray-200 bg-gray-100 rounded-md mr-2 py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400"
        type="text"
        placeholder="Enter your keyword"
        required
        onChange={handleChange}
      />
      <button
        type="submit"
        className="px-4 py-2 inline-block text-white border border-transparent bg-blue-600 rounded-md hover:bg-blue-700"
      >
        Search
      </button>
    </form>
  )
}

export default Search