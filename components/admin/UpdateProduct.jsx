'use client';

import React, { useContext, useEffect, useState } from "react";
import ProductContext from "@/context/ProductContext";
import { toast } from "react-toastify";

const UpdateProduct = ({ data }) => {
    
    const { updateProduct, error, clearError, updated, setState } = useContext(ProductContext)

    const [product, setProduct] = useState({
        name: data?.name ?? "",
        description: data?.description ?? "",
        seller: data?.seller ?? "",
        price: data?.price ?? "",
        stock: data?.stock ?? "",
        category: data?.category ?? "",
    });

    const handleChange = (event) => {
        event.preventDefault();

        const { name, value } = event.target;

        setProduct((prevProduct) => ({ ...prevProduct, [name]: value }))
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        updateProduct(product, data?._id);
    }
    
    useEffect(() => {

        if(updated) {
            setState((prevState) => ({...prevState, updated: false}))
            toast.success("Product updated")
        }

        if(error) {
            toast.error(error)
            clearError()
        }
        // eslint-disable-next-line
    }, [error, updated])

  const categories = [
    "Electronics",
    "Cameras",
    "Laptops",
    "Accessories",
    "Headphones",
    "Sports",
  ];

  return (
        <section className="container max-w-3xl p-6 mx-auto">
            <h1 className="mb-3 text-xl md:text-3xl font-semibold text-black md:mb-8">
                Update Product
            </h1>

            <form onSubmit={handleSubmit}>
            <div className="mb-4">
                <label className="block mb-1"> Name </label>
                <input
                type="text"
                className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
                placeholder="Product name"
                name="name"
                required
                value={product.name}
                onChange={handleChange}
                />
            </div>

            <div className="mb-4 mt-5">
                <label className="block mb-1"> Description </label>
                <textarea
                rows="4"
                className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
                placeholder="Product description"
                name="description"
                required
                value={product.description}
                onChange={handleChange}
                ></textarea>
            </div>

            <div className="grid md:grid-cols-2 gap-x-2 mt-5">
                <div className="mb-4">
                <label className="block mb-1"> Price </label>
                <div className="relative">
                    <div className="col-span-2">
                    <input
                        type="text"
                        className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
                        placeholder="0.00"
                        name="price"
                        required
                        value={product.price}
                        onChange={handleChange}
                    />
                    </div>
                </div>
                </div>
                <div className="mb-4">
                <label className="block mb-1"> Category </label>
                <div className="relative">
                    <select
                    className="block appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
                    name="category"
                    required
                    value={product.category}
                    onChange={handleChange}
                    >
                    {categories.map((category) => (
                        <option key={category} value={category}>
                        {category}
                        </option>
                    ))}
                    </select>
                    <i className="absolute inset-y-0 right-0 p-2 text-gray-400">
                    <svg
                        width="22"
                        height="22"
                        className="fill-current"
                        viewBox="0 0 20 20"
                    >
                        <path d="M7 10l5 5 5-5H7z"></path>
                    </svg>
                    </i>
                </div>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-x-2 mt-5">
                <div className="mb-4">
                <label className="block mb-1"> Seller / Brand </label>
                <input
                    type="text"
                    className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
                    placeholder="Seller or brand"
                    name="seller"
                    required
                    value={product.seller}
                    onChange={handleChange}
                />
                </div>

                <div className="mb-4">
                <label className="block mb-1"> Stock </label>
                <div className="relative">
                    <div className="col-span-2">
                    <input
                        type="text"
                        className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
                        placeholder="0"
                        name="stock"
                        required
                        value={product.stock}
                        onChange={handleChange}
                    />
                    </div>
                </div>
                </div>
            </div>

            <button
                type="submit"
                className="my-2 px-4 py-2 text-center inline-block text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 w-full"
            >
                Update Product
            </button>
            </form>
        </section>
  );
};

export default UpdateProduct;