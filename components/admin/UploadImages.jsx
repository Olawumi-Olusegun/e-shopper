'use client'

import ProductContext from "@/context/ProductContext";
import Image from "next/image";
import React, { useContext, useState } from "react";

const UploadImages = ({ productId }) => {
    const [images, setImages] = useState([]);
    const [imagePreview, setImagePreview] = useState([]);

    console.log(productId)

    const { uploadProductImages, error, loading, clearError } = useContext(ProductContext);

    const handleChange = (event) => {
        event.preventDefault();

        const {files, type} = event.target;
        

        if(type !== 'file') return;

        const allImageFiles = Array.from(files);        

        setImages([]);
        setImagePreview([]);

        allImageFiles.forEach((file) => {
            const reader = new FileReader();
            reader.onload = () => {
                if(reader.readyState === 2) {
                    setImagePreview((prevImagePreview) => ([...prevImagePreview, reader.result]));
                }
            }

            setImages((prevImages) => ([...prevImages, file]));
            reader.readAsDataURL(file);
        })
        
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        images.forEach((image) => {
            formData.append('image', image);
        });

        uploadProductImages(formData, productId)
    }

  return (
    <div
        style={{ maxWidth: "480px" }}
        className="mt-1 mb-20 p-4 md:p-7 mx-auto rounded bg-white shadow-lg"
    >
        <form onSubmit={handleSubmit}>
        <h2 className="mb-3 text-2xl font-semibold">
            Upload Product Images
        </h2>

        <div className="mb-4 flex flex-col md:flex-row">
            <div className="w-full">
            <input
                className="form-control block w-full px-2 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none mt-8"
                type="file"
                id="formFile"
                multiple
                onChange={handleChange}
            />
            </div>
        </div>

        <div className="grid grid-cols-6 gap-2 my-5">
            {
                imagePreview?.map((image) => (
                    <Image
                    key={image}
                    src={image}
                    alt="Preview"
                    className="col-span-1 object-contain shadow rounded border-2 border-gray p-2 h-full w-full"
                    width="50"
                    height="50"
                    /> 
                ))
            }
        </div>

        <button
            type="submit"
            className="my-2 px-4 py-2 text-center w-full inline-block text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
            disabled={loading ? true : false}
        >
            { loading ? "Uploading..." : "Upload"}
        </button>
        </form>
    </div>
  );
};

export default UploadImages;