import React from "react";
import { useNavigate } from "react-router-dom";
import productVideo from "../assets/video/product.mp4";
const Card = ({ product }) => {
  const { link, price, category, discount, brand, _id, userId, productId } =
    product || {};
  const navigate = useNavigate();

  return (
    <div className=" pb-6 rounded-lg border-[1px] border-b-4  shadow-sm  border-gray-300">
      <video className="rounded-t-lg h-full w-full md:w-[322px]" controls>
        <source src={link} type="video/mp4" />
      </video>
      <div className="mt-3 px-4 py-3">
        <h4 className="text-md font-normal text-gray-400">{category}</h4>
        <h4 className="text-md font-normal text-gray-400 capitalize">
          Brand: <span className="capitalize">{brand}</span>
        </h4>
        <div className="flex gap-3 items-center">
          {discount && (
            <h1 className="text-gray-700 text-lg font-semibold">
              ₹{(price - (price * discount) / 100).toFixed(0)}
            </h1>
          )}
          <h1
            className={`text-gray-600 text-lg font-semibold ${
              discount ? "line-through" : ""
            }`}
          >
            ₹{price}
          </h1>
          {discount && (
            <h1 className="text-green-700 text-lg font-normal">
              {discount}% off
            </h1>
          )}
        </div>
        <button
          onClick={() => navigate(`/product/${_id}`)}
          className=" mt-3 px-3 py-1 rounded-full bg-gray-200 capitalize text-gray-700"
        >
          more details
        </button>
      </div>
    </div>
  );
};

export default Card;
