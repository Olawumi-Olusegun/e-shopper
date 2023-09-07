"use client";

import React, { useContext, useEffect, useState } from "react";
import AuthContext from "@/context/AuthContext";
import { toast } from "react-toastify";

const UpdatePassword = () => {

    const { error, updatePassword, clearErrors} = useContext(AuthContext);
   
    const [input, setInput] = useState({
        currentPassword: "",
        newPassword: "",
    });

    const handleChange = (event) => {
        event.preventDefault();
        const {name, value} = event.target;
        setInput((prevInput) => ({ ...prevInput, [name]: value}));
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        updatePassword({
            currentPassword: input.currentPassword, 
            newPassword: input.newPassword, 
        })
    }

    useEffect(() => {
        if(error) {
            toast.error(error);
            clearErrors();
        }
        // eslint-disable-next-line
    }, [error])


  return (
    <>
        <div
        style={{ maxWidth: "480px" }}
        className="mt-5 mb-20 p-4 md:p-7 mx-auto rounded bg-white"
        >
        <form onSubmit={handleSubmit}>
            <h2 className="mb-5 text-2xl font-semibold">
            Update Password
            </h2>

            <div className="mb-4">
            <label className="block mb-1"> Current Password </label>
            <input
                className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
                type="password"
                placeholder="Type your password"
                minLength={6}
                required
                value={input.currentPassword}
                onChange={handleChange}
            />
            </div>

            <div className="mb-4">
            <label className="block mb-1"> New Password </label>
            <input
                className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
                type="password"
                placeholder="Type your password"
                minLength={6}
                required
                value={input.newPassword}
                onChange={handleChange}
            />
            </div>

            <button
            type="submit"
            className="my-2 px-4 py-2 text-center w-full inline-block text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
            >
            Update
            </button>
        </form>
        </div>
    </>
  );
};

export default UpdatePassword;