"use client"

import React, { useContext, useEffect, useState } from "react";
import { countries } from "countries-list";
import Sidebar from "../layouts/Sidebar";
import AuthContext from "@/context/AuthContext";
import { toast } from "react-toastify";

const NewAddress = () => {
const { error, addNewAddress, clearError, } = useContext(AuthContext);

  const countriesList = Object.values(countries);
  const [formInput, setFormInput] = useState({
    street: "",
    city: "",
    state: "",
    zipCode: "",
    phoneNumber: "",
    country: ""
  });

  const handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setFormInput((prevFormData) => ({ ...prevFormData, [name]: value }));
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    
    const newAddress = {
        street: formInput.street,
        city: formInput.city,
        state: formInput.state,
        zipCode: formInput.zipCode,
        phoneNumber: formInput.phoneNumber,
        country: formInput.country
    }

    addNewAddress(newAddress);
  }

  useEffect(() => {
    if(error) {
      toast.error(error)
      clearError();
    }
    // eslint-disable-next-line
  }, [error]);

  

  return (
    <>
   
      <section className="py-10">
        <div className="container max-w-screen-xl mx-auto px-4">
          <div className="flex flex-col md:flex-row -mx-4">
            <Sidebar />
            <main className="md:w-2/3 lg:w-3/4 px-4">
              
              <div
                style={{ maxWidth: "480px" }}
                className="mt-1 mb-20 p-4 md:p-7 mx-auto rounded bg-white shadow-lg"
              >
                <form onSubmit={handleSubmit}>
                  <h2 className="mb-5 text-2xl font-semibold">
                    Add new Address
                  </h2>

                  <div className="mb-4 md:col-span-2">
                    <label className="block mb-1"> Street* </label>
                    <input
                      className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
                      type="text"
                      placeholder="Type your address"
                      value={formInput.street}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-x-3">
                    <div className="mb-4 md:col-span-1">
                      <label className="block mb-1"> City </label>
                      <input
                        className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
                        type="text"
                        placeholder="Type your city"
                        value={formInput.city}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="mb-4 md:col-span-1">
                      <label className="block mb-1"> State </label>
                      <input
                        className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
                        type="text"
                        placeholder="Type state here"
                        value={formInput.state}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-x-2">
                    <div className="mb-4 md:col-span-1">
                      <label className="block mb-1"> ZIP code </label>
                      <input
                        className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
                        type="number"
                        placeholder="Type zip code here"
                        value={formInput.zipCode}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="mb-4 md:col-span-1">
                      <label className="block mb-1"> Phone No </label>
                      <input
                        className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
                        type="number"
                        placeholder="Type phone no here"
                        value={formInput.phoneNumber}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="mb-4 md:col-span-2">
                    <label className="block mb-1"> Country </label>
                    <select 
                        value={formInput.country}
                        onChange={handleChange}
                        className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full">
                      {countriesList.map((country) => (
                        <option key={country.name} value={country.name}>
                          {country.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="my-2 px-4 py-2 text-center w-full inline-block text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
                  >
                    Add
                  </button>
                </form>
              </div>

              
            </main>
          </div>
        </div>
      </section>
    </>
  );
};

export default NewAddress;