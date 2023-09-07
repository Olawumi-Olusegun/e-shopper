"use client";

import React, { useRef, useContext, useEffect } from "react";
import StarRatings from "react-star-ratings";
import BreadCrumbs from "../layouts/BreadCrumbs";
import CartContext from "@/context/CartContext";
import NewReview from "../review/NewReview";
import OrderContext from "@/context/OrderContext";
import Reviews from "../review/Review";
import Image from "next/image";

const ProductDetails = ({ product }) => {

  const imgRef = useRef(null);

  const { addItemToCart } = useContext(CartContext);
  const { canUserReview, state } = useContext(OrderContext);

  const setImgPreview = (url) => {
    imgRef.current.src = url;
  };

  const inStock = product?.stock >= 1;

  const addToCartHandler = () => {
    addItemToCart({
      name: product?.name, 
      product: product?._id, 
      quantity: product?.quantity, 
      price: product?.price, 
      image: product?.images[0]?.url, 
      stock: product?.stock, 
      seller: product?.seller,
    })
  }
  useEffect(() => {
    canUserReview(product?._id);
// eslint-disable-next-line
  }, [product?._id]);

  const breadCrumbs = [
    { 
      name: "Home", 
      url: "/" },
    {
      name: `${product?.name?.substring(0, 100)}...`,
      url: `/product/${product?._id}`,
    },
  ];


  return (
    <>
      <BreadCrumbs breadCrumbs={breadCrumbs} />
      <section className="bg-white py-10">
        <div className="container max-w-screen-xl mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-5">
            <aside>
              <div className="border border-gray-200 shadow-sm p-3 text-center rounded mb-5">
                <Image ref={imgRef} className="object-cover inline-block"
                  src={ product?.images[0]?.url ?? "/images/default_product.png"}
                  alt={product?.name}
                  width="340" 
                  height="340"
                  fill
                />
              </div>
              <div className="space-x-2 overflow-auto text-center whitespace-nowrap">
                {product?.images?.map((img, index) => (
                  <a key={index} className="inline-block border border-gray-200 p-1 rounded-md hover:border-blue-500 cursor-pointer"
                    onClick={() => setImgPreview(img?.url)}>
                    <Image className="w-14 h-14" src={img?.url}
                    alt="Product title"
                    width="500"
                    height="500"
                    fill
                    />
                  </a>
                ))}
              </div>
            </aside>
            <main>
              <h2 className="font-semibold text-2xl mb-4">{product?.name}</h2>

              <div className="flex flex-wrap items-center space-x-2 mb-2">
                <div className="ratings">
                  <StarRatings
                    rating={Number(product?.ratings)}
                    fillId={`starGrad${Math.random().toFixed(15)?.slice(2)}`}
                    starRatedColor="#ffb829"
                    numberOfStars={5}
                    starDimension="20px"
                    starSpacing="2px"
                    name="rating"
                  />
                </div>
                <span className="text-yellow-500">{Number(product?.ratings)}</span>

                <svg
                  width="6px"
                  height="6px"
                  viewBox="0 0 6 6"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="3" cy="3" r="3" fill="#DBDBDB" />
                </svg>

                <span className="text-green-500">Verified</span>
              </div>

              <h2 className="mb-4 font-semibold text-xl">${product?.price}</h2>

              <p className="mb-4 text-gray-500">{product?.description}</p>

              <div className="flex flex-wrap gap-2 mb-5">
                <button onClick={addToCartHandler} disabled={!inStock}
                className="px-4 py-2 inline-block text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700">
                  <i className="fa fa-shopping-cart mr-2"></i>
                  Add to cart
                </button>
              </div>

              <ul className="mb-5">
                <li className="mb-1">
                  {" "}
                  <b className="font-medium w-36 inline-block">Stock</b>
                  {inStock
                  ? ( <span className="text-green-500">In Stock</span> ) 
                  : ( <span className="text-red-500">Out of Stock</span> )}
                </li>
                <li className="mb-1">
                  {" "}
                  <b className="font-medium w-36 inline-block">Category:</b>
                  <span className="text-gray-500">{product?.category}</span>
                </li>
                <li className="mb-1">
                  {" "}
                  <b className="font-medium w-36 inline-block">
                    Seller / Brand:
                  </b>
                  <span className="text-gray-500">{product?.seller}</span>
                </li>
              </ul>
            </main>
          </div>

          { state?.canReview ? <NewReview product={product} /> : null }

          <hr />

          <div className="font-semibold">
            <h1 className="text-gray-500 review-title mb-6 mt-10 text-2xl">
              Other Customers Reviews
            </h1>
            {product?.reviews?.length >= 1 ? <Reviews reviews={product?.reviews} /> : null }
          </div>
        </div>
      </section>
    </>
  )
}

export default ProductDetails