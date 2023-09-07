'use client'

import React, { useContext, useEffect } from "react";
import Link  from 'next/link';
import Image from 'next/image'
import Search from './Search';
import CartContext from "@/context/CartContext";
import { useSession } from "next-auth/react";
import AuthContext from "@/context/AuthContext";

const Header = () => {
  const { cart, totalCartItems } = useContext(CartContext)

  const { user, setState } = useContext(AuthContext)

  const { data } = useSession()



  useEffect(() => {
    if(data) {
      setState((prevState) => ({...prevState, user: data?.user}))
    }
    // eslint-disable-next-line
  }, [data]);
  
  const cartTotal = totalCartItems();


  return (
    <header className="bg-white py-2 border-b">
      <div className="container max-w-screen-xl mx-auto px-4">
        <div className="flex flex-wrap items-center">
          <div className="flex-shrink-0 mr-5">
            <Link href="/">
              <Image src="/images/logo.png" height='40' width="120" alt="BuyItNow" />
            </Link>
          </div>
          <Search />

          <div className="flex items-center space-x-2 ml-auto">
            <Link href="/cart"
              className="px-3 py-2 inline-block text-center text-gray-700 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 hover:border-gray-300"
            >
              <i className="text-gray-400 w-5 fa fa-shopping-cart"></i>
              {/* "hidden lg:inline ml-1" */}
              <span className=" ml-1">
                Cart (<b>{ cartTotal }</b>)
              </span>
            </Link>

            { !user ? (
            <Link href="/login"
              className="px-3 py-2 inline-block text-center text-gray-700 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 hover:border-gray-300"
            >
              <i className="text-gray-400 w-5 fa fa-user"></i>
              <span className="ml-1">Sign in</span>
            </Link>
            ) : (
                <Link href="/me">
                <div className="flex items-center mb-4 space-x-3 mt-4 cursor-pointer">
                  <Image
                    alt='user'
                    height='40'
                    width='40'
                    src={ user?.avatar?.url ?? "/images/default.png"} 
                    className="w-[40px] h-[40px] rounded-full"
                    onError={(event) => {
                      event.target.src = "/images/default.png";
                      event.onerror = null;
                    }}
                    />
                  <div className="space-y-1 font-medium">
                    <p> { user?.name } </p>
                    <span className="block text-sm text-gray-500 dark:text-gray-400">
                      { user?.email }
                    </span>
                  </div>
                </div>
              </Link>
            )
            
            }

          </div>

          <div className="lg:hidden ml-2">
            <button
              type="button"
              className="bg-white p-3 inline-flex items-center rounded-md text-black hover:bg-gray-200 hover:text-gray-800 border border-transparent"
            >
              <span className="sr-only">Open menu</span>
              <i className="fa fa-bars fa-lg"></i>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header