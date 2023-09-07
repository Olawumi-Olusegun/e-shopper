'use client'
import React, { useState, useEffect, useContext } from "react"
import Link from 'next/link'
import AuthContext from '@/context/AuthContext'
import { toast } from 'react-toastify'

const Register = () => {

  const { error, registerUser, clearError } = useContext(AuthContext)

  const [regState, setRegState] = useState({
        name: '',
        email: '',
        password: ''
  })


  useEffect(() => {
      if(error) {
        toast.error(error)
        clearError()
      }
      // eslint-disable-next-line
  }, [error])


    const handleChange = (event) => {
      const { name, value } = event.target
      setRegState((prev) => ({ ...prev, [name]: value }) )
    }

    const { name, email, password } = regState

    // const registerdeata = { name, email, password }

    const handleSubmit = (event) => {
        event.preventDefault()
        registerUser(regState)
    }



  return (
    <div
      style={{ maxWidth: "480px" }}
      className="mt-10 mb-20 p-4 md:p-7 mx-auto rounded bg-white shadow-lg"
    >
      <form onSubmit={handleSubmit}>
        <h2 className="mb-5 text-2xl font-semibold">Register Account</h2>

        <div className="mb-4">
          <label htmlFor="name" className="block mb-1"> Full Name </label>
          <input id="name" name="name" onChange={handleChange} value={name}
            className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
            type="text" autoComplete="false"
            placeholder="Type your name"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block mb-1"> Email </label>
          <input name="email"  onChange={handleChange} value={email}
            className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
            type="email" autoComplete="false" id="email"
            placeholder="Type your email"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block mb-1"> Password </label>
          <input name="password" onChange={handleChange} value={password}
            className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
            type="password" autoComplete="false"
            id="password"
            placeholder="Type your password"
            minLength={6}
            required
          />
        </div>

        <button
          type="submit"
          className="my-2 px-4 py-2 text-center w-full inline-block text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
        >
          Register
        </button>

        <hr className="mt-4" />

        <p className="text-center mt-5">
          Already have an account? {" "}
          <Link href="/login" className="text-blue-500">
            Sign in
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;