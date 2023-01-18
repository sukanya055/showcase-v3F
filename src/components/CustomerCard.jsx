import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import userImg from "../assets/user.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AiFillStar } from "react-icons/ai";

const images = [
  {
    img: "https://img.freepik.com/free-photo/close-up-young-successful-man-smiling-camera-standing-casual-outfit-against-blue-background_1258-66609.jpg?w=2000",
    name: "Jens Bracker",
    desc: "eact Hook useEffect has a missing dependency: 'setLoginError'. Either include it or remove the dependency array. If 'setLoginError' changes too often, find the parent component that defines it and wrap that definition in useCallback",
  },
  {
    img: "https://thumbs.dreamstime.com/b/nice-to-talk-smart-person-indoor-shot-attractive-interesting-caucasian-guy-smiling-broadly-nice-to-112345489.jpg",
    name: "Rahul Pradhan",
    desc: "eact Hook useEffect has a missing dependency: 'setLoginError'. Either include it or remove the dependency array. If 'setLoginError' changes too often, find the parent component that defines it and wrap that definition in useCallback",
  },
  {
    img: "https://media.istockphoto.com/photos/closeup-portrait-of-her-she-nice-attractive-puzzled-ignorant-girl-picture-id1132758418?k=20&m=1132758418&s=612x612&w=0&h=ca6WVDDblf3um3mdfCSGVpLGfwuyjj5UTLD9rMMHfH4=",
    name: "Binita Swain",
    desc: "eact Hook useEffect   Either include it or remove the dependency array. If 'setLoginError' changes too often, find the parent component that defines it and wrap that definition in useCallback",
  },
  {
    img: "https://st3.depositphotos.com/1037987/15097/i/600/depositphotos_150975580-stock-photo-portrait-of-businesswoman-in-office.jpg",
    name: "Binita Swain",
    desc: "eact Hook useEffect has  include it or remove the dependency array. If 'setLoginError' changes too often, find the parent component that defines it and wrap that definition in useCallback",
  },
];

const CustomerCard = ({ data, refetch }) => {
  const handleDragStart = (e) => e.preventDefault();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (error) {
      toast.error(error, {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }, [error]);

  useEffect(() => {
    if (success) {
      toast.success(success, {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }, [success]);

  const handleReviewAccept = async (id) => {
    try {
      const { data } = await axios.put(
        `https://api.showcaseurbusiness.com/review/update-review/${id}`
      );
    
      setError("");
      if (data?.message) {
       
        setSuccess("Review successfully accepted");
      }
    } catch (error) {
      setSuccess("");
      setError(error?.message);
    
    }
  };

  const handleReviewDelete = async (id) => {
    try {
      const { data } = await axios.delete(
        `https://api.showcaseurbusiness.com/review/delete-review/${id}`
      );
     
      refetch();
    } catch (error) {
      setError(error?.message);
     
    }
  };

  return (
    <div className="flex w-full items-center flex-col justify-center">
      <div className="w-[900px]">
        <AliceCarousel
          mouseTracking
          autoPlay
          className="  "
          autoPlayInterval="3000"
        >
          {data?.map((item, i) => (
            <div className="flex flex-col items-center justify-center">
              <div className="w-full py-9 items-center  flex justify-center">
                <img
                  key={item?._id}
                  className="w-[200px] rounded-full h-[200px] object-cover"
                  src={item?.userId?.profile ? item?.userId?.profile: userImg}
                  alt="profileImg"
                  onDragStart={handleDragStart}
                />
              </div>
              <div className="flex w-[600px] flex-col justify-center gap-2 items-center">
                <h1 className="text-lg font-semibold text-center text-gray-500">
                  " {item.review} "
                </h1>
                <p className="text-lg font-semibold text-gray-900 text-[18px]">
                  {item?.userId?.name}
                </p>
                <div className="rating rating-sm">
                  {[...Array(Number(item?.star))].map((item) => (
                    <input
                      key={item}
                      type="radio"
                      name="rating-2"
                      class="mask mask-star-2 bg-orange-400"
                      checked={item === Number(item?.star) ? true : false}
                      readOnly
                    />
                  ))}
                </div>
                <div className="flex justify-center items-center gap-7 mt-5">
                  <button
                    onClick={() => handleReviewAccept(item?._id)}
                    className={`${
                      item?.accepted ? "bg-green-500" : "bg-green-300"
                    } bg-green-300 text-white rounded-full py-2 px-7 cursor-pointer flex justify-center items-center`}
                  >
                    {item?.accepted ? "Accepted" : "Accept"}
                  </button>
                  <button
                    onClick={() => handleReviewDelete(item?._id)}
                    className="bg-red-400 text-white rounded-full py-2 px-7 cursor-pointer flex justify-center items-center"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </AliceCarousel>
        <ToastContainer />
      </div>
    </div>
  );
};

export default CustomerCard;
