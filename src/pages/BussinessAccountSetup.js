import React, { useEffect, useState } from "react";
import { Layout } from "../components";
import circle from "../assets/blue_circle.png";
import girl from "../assets/girl.png";
import phone from "../assets/phone.png";
import { FaAngleLeft } from "react-icons/fa";
import { BiShow, BiHide } from "react-icons/bi";
import { FcGoogle } from "react-icons/fc";
import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import RegisterUser from "../utils/registerUser";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuthState, useSignInWithGoogle } from "react-firebase-hooks/auth";
import auth from "../firebase.init";
import useGoogleRegister from "../utils/googleRegister";
import { signOut } from "firebase/auth";
import { useCookies } from 'react-cookie';
const initialState = {
  name: "",
  email: "",
  password: "",
  terms: false,
};

const BussinessAccountSetup = () => {

  const [cookies, setCookie, removeCookie] = useCookies(['token']);
  const location = useLocation();
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState("");
  const [user] = useAuthState(auth);
  let role = location.pathname.includes("/businessAccountSetup") ? 1:0;
  role = location.pathname.includes("/normalAccountSetup") ? 0:1;

  // for google register 
  useGoogleRegister(user, setErrorMessage, setSuccess, role);
 
  const [status, setStatus] = useState(null);

  const [signInWithGoogle, googleUser, loading, error] =
    useSignInWithGoogle(auth);

  const navigate = useNavigate();

  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage, {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      signOut(auth);
    }
    if (success) {
      navigate(success);
    }
  }, [errorMessage, navigate, success]);

  const toggle = () => {
    setShow((prev) => !prev);
  };



  const getLocation = () => {
    if (!navigator.geolocation) {
      setErrorMessage('Geolocation is not supported by your browser');
    } else {
      setStatus('Locating...');
      navigator.geolocation.getCurrentPosition((position) => {
        setStatus(null);
        setCookie('lat',position?.coords?.latitude)
        setCookie('lng',position?.coords?.longitude)
      }, () => {
        setErrorMessage('Unable to retrieve your location');
      });
    }
  }

  const handleOnSubmit = (e) => {
    e.preventDefault();
  
    if (location?.pathname?.includes("/businessAccountSetup")) {
      getLocation()
      RegisterUser(formData, setErrorMessage, setSuccess, 1,setCookie);
     
    }
    if (location?.pathname?.includes("/normalAccountSetup")) {
      getLocation()
      RegisterUser(formData, setErrorMessage, setSuccess, 0,setCookie);
    
    }
    setFormData(initialState);
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



  // google login
  const handleGoogleRegister = () => {
    signInWithGoogle();
  };

  return (
    <Layout>
      <div className="py-11 overflow-hidden flex flex-row h-full">
        <div className=" hidden md:block basis-1/4">
          <img src={circle} alt="circle" />
        </div>
        <div className="md:basis-2/4 w-full md:py-6  md:px-8 px-3 ">
          <div className="flex justify-between items-center">
            <h1 
            onClick={()=>navigate(-1)}
            className="text-gray-400 font-bold flex text-lg items-center cursor-pointer">
              <FaAngleLeft />
              Back
            </h1>
            <div className="flex justify-end items-end flex-col">
              <p className="text-gray-400 test-md">STEP 01/03</p>
              <h1 className="text-gray-400 text-lg font-bold">Personal info</h1>
            </div>
          </div>
          <div className=" flex flex-col items-center  justify-center">
            <div className="px-9 py-10 md:w-2/3 w-full flex items-center justify-center flex-col">
              <h1 className="capitalize text-center text-2xl font-semibold text-gray-900">
                Register individual account!
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
                      Your full name *
                    </span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => {
                      setFormData({ ...formData, name: e.target.value });
                    }}
                    placeholder="Name"
                    className="input input-bordered w-full max-w-xs"
                  />
                </div>
                <div>
                  <label className="label">
                    <span className="label-text font-semibold">
                      Email address *
                    </span>
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => {
                      setFormData({ ...formData, email: e.target.value });
                    }}
                    placeholder="xyz@gmail.com"
                    className="input input-bordered w-full max-w-xs"
                  />
                </div>
                <div>
                  <label className="label">
                    <span className="label-text font-semibold">
                      Create Password *
                    </span>
                  </label>
                  <div className="flex gap-2 justify-center items-center input  input-bordered">
                    <input
                      required
                      type={show ? "text" : "password"}
                      placeholder="Enter Password"
                      value={formData.password}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          password: e.target.value,
                        });
                      }}
                      className=" w-full outline-none max-w-xs"
                    />
                    {show ? (
                      <BiShow
                        className="text-2xl  text-gray-400"
                        onClick={toggle}
                      />
                    ) : (
                      <BiHide
                        className="text-2xl text-gray-400"
                        onClick={toggle}
                      />
                    )}
                  </div>
                </div>
                <label className="cursor-pointer mt-2 label">
                  <input
                    type="checkbox"
                    required
                    value={formData.terms}
                    onChange={(e) =>
                      setFormData({ ...formData, terms: !formData.terms })
                    }
                    className="checkbox  checkbox-sm checkbox-secondary"
                  />
                  <span className="label-text text-md text-gray-500 font-semibold">
                    I agree to terms & conditions
                  </span>
                </label>
                <button
                  type="submit"
                  className="text-lg text-white bg-blue-500 px-4 py-2 rounded-md  hover:bg-blue-400 transition-colors delay-100 ease-out"
                >
                  Register account
                </button>
              </form>
              <button
                onClick={handleGoogleRegister}
                className="btn w-full bg-white mt-4 text-black capitalize"
              >
                <FcGoogle className="text-xl mr-2 " /> Register with Google
              </button>
            </div>
          </div>
        </div>
        <motion.div
          className="basis-1/4 relative hidden items-center overflow-hidden md:flex justify-center "
          variants={loaderVariants}
          animate="animationOne"
        >
          <img
            src={phone}
            alt="phone"
            className="absolute   w-[205px] h-[456px]"
          />
          <img src={girl} alt="girl" className="absolute  left-24" />
        </motion.div>
      </div>
      <ToastContainer />
    </Layout>
  );
}

export default BussinessAccountSetup
