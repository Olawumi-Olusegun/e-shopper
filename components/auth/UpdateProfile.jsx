'use client'

import React, { useContext, useEffect, useState } from "react";
import AuthContext from "@/context/AuthContext";
import { toast } from "react-toastify";
import Image from "next/image";

const UpdateProfile = () => {

    const { user, state, updateProfile, error, clearError} = useContext(AuthContext);
    
    const [userProfile, setUserProfile] = useState({ 
        name: '',
        email: '',
        avatar: '',
        avatarPreview: '',
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.set("name", userProfile.name);
        formData.set("email", userProfile.email);
        formData.set("image", userProfile.avatar);
        updateProfile(formData);
    }

    const handleChange = (event) => {
        event.preventDefault();

        const {name, value, files, type} = event.target;
        
        if(type == 'file') {
            const reader = new FileReader();
            reader.onload = () => {
                if(reader.readyState === 2) {
                    setUserProfile((prevUserProfile) => ({...prevUserProfile, avatarPreview: reader.result}));
                }
            }

            setUserProfile((prevUserProfile) => ({...prevUserProfile, avatar: files[0]}));
            reader.readAsDataURL(files[0]);
            return;
        }

        setUserProfile((prevUserProfile) => ({...prevUserProfile, [name]:value}));
    }

    useEffect(() => {
        if(user) {
          console.log(user)
            setUserProfile((prevUserProfile) => ({...prevUserProfile, name: user?.name, email: user?.email}));
        }
        if(error) {
            toast.error(error);
            clearError();
        }
        // eslint-disable-next-line
    }, [error, user]);


  return (
    <>
      <div
        style={{ maxWidth: "480px" }}
        className="mt-1 mb-20 p-4 md:p-7 mx-auto rounded bg-white"
      >
        <form onSubmit={handleSubmit}>
          <h2 className="mb-5 text-2xl font-semibold">
            Update Profile
          </h2>

          <div className="mb-4">
            <label htmlFor="name" className="block mb-1"> Full Name </label>
            <input
              className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
              type="text"
              name="name"
              id="name"
              placeholder="Type your name"
              required
              value={userProfile.name}
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block mb-1"> Email </label>
            <input
              className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
              type="text"
              name="email"
              id="email"
              placeholder="Type your email"
              required
              value={userProfile.email}
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="formFile" className="block mb-1"> Avatar </label>
            <div className="mb-4 flex flex-col md:flex-row">
              <div className="flex items-center mb-4 space-x-3 mt-4 cursor-pointer md:w-1/5 lg:w-1/4">
                <Image
                  className="w-14 h-14 object-cover rounded-full"
                  src={userProfile?.avatarPreview ? userProfile?.avatarPreview : "/images/default_avatar.png"}
                  alt={userProfile.name}
                />
              </div>
              <div className="md:w-2/3 lg:w-80">
                <input
                  className="form-control block w-full px-2 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none mt-6"
                  type="file"
                  id="formFile"
                  name="formFile"
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="my-2 px-4 py-2 text-center w-full inline-block text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
            disabled={state.loading}
          >
            {state.loading  ? "Updating..." : 'Update'}
          </button>
        </form>
      </div>
    </>
  );
};

export default UpdateProfile;