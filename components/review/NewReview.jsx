import AuthContext from "@/context/AuthContext";
import ProductContext from "@/context/ProductContext";
import React, { useContext, useEffect, useState } from "react";
import StarRatings from "react-star-ratings";
import { toast } from "react-toastify";
import { getUserReview } from "../helpers/helpers";

const NewReview = ({ product }) => {

    const { user } = useContext(AuthContext);
    const { postReview, error, clearError } = useContext(ProductContext);


    const [reviewState, setReviewState] = useState({
        rating: 0,
        comment: "",
    });

    const handleChange = (event) => {
        event.preventDefault();
        const { name, value } = event.target;
        setReviewState((prevReviewState) => ({...prevReviewState, [name]: value}));
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const reviewData = {
            rating: reviewState.rating,
            comment: reviewState.comment,
            productId: product?._id,
         }
         postReview(reviewData)
    }

    useEffect(() => {
        const userReview  = getUserReview(product?.reviews, user?._id);
        if(userReview) {
            setReviewState((prevReviewState) => ({
                ...prevReviewState, 
                rating: userReview?.rating, 
                comment: userReview?.comment,
            }));
        }
        if(error) {
            toast.error(error);
            clearError();
        }
        // eslint-disable-next-line
    }, [error, user, product?.reviews])

  return (
    <div>
      <hr className="my-4" />
      <h1 className="text-gray-500 review-title my-5 text-2xl">Your Review</h1>

      <h3>Rating</h3>
      <div className="mb-4 mt-3">
        <div className="ratings">
          <StarRatings
            rating={reviewState.rating}
            starRatedColor="#ffb829"
            numberOfStars={5}
            name="rating"
            changeRating={handleChange}
          />
        </div>
      </div>
      <div className="mb-4 mt-5">
        <label className="block mb-1"> Comments </label>
        <textarea
          rows="4"
          className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-1/3"
          placeholder="Your review"
          name="description"
          required
          value={reviewState.comment}
          onChange={handleChange}
        ></textarea>
      </div>

      <button onClick={handleSubmit} className="mt-3 mb-5 px-4 py-2 text-center inline-block text-white bg-yellow-500 border border-transparent rounded-md hover:bg-yellow-600 w-1/3">
        Post Review
      </button>
    </div>
  );
};

export default NewReview;