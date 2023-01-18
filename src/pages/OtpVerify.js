import React, { useEffect, useState } from "react";
import { Layout } from "../components";
import circle from "../assets/profileCircle.png";
import women from "../assets/women.png";

import { FaAngleLeft } from "react-icons/fa";
import { AiOutlineLock } from "react-icons/ai";

import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BussinessAccountSetup from "./BussinessAccountSetup";



const initialState = {
  otp: "",
};

const CompleteProfile = () => {

  const [formData, setFormData] = useState(initialState);
  const [errorMessage, setErrorMessage] = useState('')
  const navigate = useNavigate()
  const [success, setSuccess] = useState(true)

  useEffect(() => {
    if (errorMessage) {
      toast.success(errorMessage, {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      })
    }

  }, [errorMessage])

  useEffect(() => {
    if (success) {
      toast.success("OTP will be expired within 10min", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        toastId: 'jkdjfk*4884'
      })
    }
    setSuccess(false)
  }, [success])


  useEffect(() => {
    setTimeout(() => {
      setErrorMessage("OTP expired! Please try again");
    }, 1000 * 60 * 10);

    setTimeout(() => {
     
        navigate("/completeProfile");
       
    }, 1000 * 60 * 10 + 5000);

  }, [navigate]);

  const handleOnSubmit = async (e) => {
    e.preventDefault();
   
    setFormData(initialState);

    let details = localStorage.getItem("details");
    if (details == null) {
      details = localStorage.getItem("changePasss");
    }

    details = JSON.parse(details);
    let otp = formData?.otp;

    const res = await fetch("https://api.showcaseurbusiness.com/otpcheck", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        otp,
        country: details.country,
        phone: details.phone,
      }),
    });
    const msg = await res.json();
    if (msg.data === "approved") {
        navigate("/setupCompleted");
    } else {
      setErrorMessage("OTP is invalid! Try again");
    }

  };

  const loaderVariants = {
    animationOne: {
      y: [0, 20],
      x: [10, 30],
      transition: {
        x: {
          yoyo: Infinity,
          duration: 2.95,
          delay: 1,
        },
        y: {
          yoyo: Infinity,
          duration: 2.25,
          ease: "easeOut",
        },
      },
    },
  };



  return (
    <Layout>
      <div className=" py-11 my-20 flex flex-row h-full">
        <div className=" hidden md:block basis-1/4">
          <img src={circle} alt="circle" />
        </div>
        <div className="md:basis-2/4 w-full md:py-6  md:px-8 px-3">
          <div className="flex justify-between items-center">
            <h1 className="text-gray-400 font-bold flex text-lg items-center cursor-pointer">
              <FaAngleLeft />
              <Link to="/completeProfile">Back</Link>
            </h1>
            <div className="flex justify-end items-end flex-col">
              <p className="text-gray-400 test-md">STEP 03/03</p>
              <h1 className="text-gray-400 text-lg font-bold">Phone Number</h1>
            </div>
          </div>
          <div className=" flex flex-col items-center  justify-center">
            <div className="px-9 py-10 md:w-2/3 w-full flex items-center justify-center flex-col">
              <h1 className="capitalize text-center text-2xl font-semibold text-gray-900">
                Complete your profile page!
              </h1>
              <p className="font-normal text-md text-gray-400 capitalize">
                For purpose of industry regulation,yours details are required
              </p>

              <form
                onSubmit={handleOnSubmit}
                className="form-control flex justify-center  flex-col gap-3 mt-9  w-full max-w-xs"
              >
                <div className="w-full">
                  <label className="label">
                    <span className="label-text font-semibold">
                      Enter Otp *
                    </span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.otp}
                    onChange={(e) => {
                      setFormData({ ...formData, otp: e.target.value });
                    }}
                    placeholder="451125"
                    className="input input-bordered w-full max-w-xs"
                  />
                </div>

                <button
                  type="submit"
                  className="text-lg text-white bg-blue-500 px-4 py-2 rounded-md  hover:bg-blue-400 transition-colors delay-100 ease-out"
                >
                  Save & continue
                </button>
                <p className="test-sm flex items-center justify-center text-gray-500 gap-1 text-center">
                  <AiOutlineLock /> your account is safely secured
                </p>
              </form>
            </div>
          </div>
        </div>
        <div className="basis-1/4 md:flex items-center relative hidden   ">
          <img
            src={women}
            alt="phone"
            className="absolute  h-[730px] w-[330px] "
          />
        </div>
        <ToastContainer />
      </div>
    </Layout>
  );
};

export default CompleteProfile;
