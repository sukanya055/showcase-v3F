import React, { useEffect, useState } from "react";
import { Layout } from "../components";
import { FcGoogle } from "react-icons/fc";
import { motion } from "framer-motion";
import img1 from "../assets/img1.png";
import img2 from "../assets/img2.png";
import img6 from "../assets/img6.png";
import img4 from "../assets/img4.png";
import img5 from "../assets/img5.png";
import loginImg from '../assets/images/login/collage DD.png'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuthState, useSignInWithGoogle } from "react-firebase-hooks/auth";
import auth from "../firebase.init";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useToken from "../utils/useToken";
import { signOut } from "firebase/auth";
import { useCookies } from 'react-cookie';
const initialState = {
  email: "",
  password: "",
};

const Login = () => {

  const [cookies, setCookie] = useCookies(['token']);

  const [signInWithGoogle, googleUser, loading, error] = useSignInWithGoogle(auth)
  const navigate = useNavigate()
  const [loginError, setLoginError] = useState('')
  // signOut(auth)
  const [user] = useAuthState(auth)
  useToken(user, signOut, setLoginError)
  const [ErrorMessage, setErrorMessage] = useState("");
  const [open, setOpen] = useState(false);
 
  useEffect(() => {
    if (loginError) {
     
      toast.error(loginError, {
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
  }, [loginError]);

  useEffect(() => {
    if (ErrorMessage) {
      toast.error(ErrorMessage, {
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
  }, [ErrorMessage]);

  const loaderVariants = {
    animationOne: {
      y: [0, 20],
      scale: [0.9, 0.8],
      transition: {
        scale: {
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

  const loaderVariantsRev = {
    animationOne: {
      y: [0, -20],
      scale: [0.9, 0.8],
      transition: {
        scale: {
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
  let expiryDate = new Date();

  const [formData, setFormData] = useState(initialState);
  const [isLogin, setIsLogin] = useState(true);

  const { email, password } = formData || {};

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    let response;
    let regex = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");
    let regxpass = new RegExp(
      "(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})"
    );

    const userexist = await fetch("https://api.showcaseurbusiness.com/exist", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
      }),
    });
    const userExistData = await userexist.json();

    if (
      userExistData.exist == 1 &&
      regex.test(email) &&
      regxpass.test(password)
    ) {
  
      try {
        const data = await axios.post(
          "https://api.showcaseurbusiness.com/user/login",
          {
            email: email,
            password: password,
          }
        );
        response = data;
     

        localStorage.setItem(
          "token",
          JSON.stringify(response.data.accesstoken)
        );

        setCookie('token', response.data.accesstoken, {
          path: '/',
          maxAge: expiryDate.setMonth(expiryDate.getMonth() + 1),

        })
        localStorage.setItem("val", JSON.stringify(response.data.val));
        let token = localStorage.getItem("token");

        token = token.replace(/['"]+/g, "");

        const roles = await fetch(
          "https://api.showcaseurbusiness.com/user/infor",
          {
            method: "GET",
            headers: {
              Authorization: response.data.accesstoken,
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        );
        const roleData = await roles.json();

        if (roleData.role == 0) {
          navigate("/dashboard/normalDashboard");
        } else {
          navigate("/businessProfile/businessDashboard");
        }
      } catch (error) {
        if (error?.response) {
          setErrorMessage(error?.response?.data.msg);
        }
      }
    } else if (!regex.test(email)) {
      setOpen(true);
      setErrorMessage("Invalid Email Address is Entered!");
    } else if (!regxpass.test(password)) {
      setOpen(true);
      setErrorMessage(
        "Password entered should have atleast 8 characters, one uppercase, one lowercase, one number and one special character!"
      );
    } else if (userExistData.exist == 0) {
      setOpen(true);
      setErrorMessage("User does not exist");
    }
  };

  // console.log(user)
  const handleGoogleBtn = async () => {
    await signInWithGoogle();
  };

  return (
    <Layout>
      <div className="bg-gradient-to-tl h-full flex items-center justify-center md:px-14 px-4 py-8">
        <div className="lg:flex flex-row my-8 h-auto lg:w-2/3 w-full shadow-white shadow ">
          <div className="basis-1/2 bg-gradient-to-tl md:px-14 px-5 my-4 from-[#5151E5] text-white to-[#72EDF2] py-5 md:w-[60%] lg:w-full mx-auto ">
            <h1 className="text-center md:text-xl text-2xl font-bold my-2 font-sans mt-8">
              {isLogin ? "Login" : "Create Account"}
            </h1>
            <h3 className="text-center font-roboto text-lg md:text-md">
              Please Login using account details bellow
            </h3>
            <form
              onSubmit={handleOnSubmit}
              className="flex gap-2 mt-12 flex-col"
            >
              <input
                type="email"
                placeholder="Enter Email"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className=" border-[1px] rounded-lg p-2 placeholder-white outline-none text-white bg-transparent w-full  md:text-lg border-white "
              />

              <input
                type="password"
                placeholder="Enter Password"
                required
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className=" border-[1px] rounded-lg p-2 placeholder-white outline-none text-white bg-transparent w-full  md:text-lg border-white"
              />
              <p className="text-white cursor-pointer text-sm mt-5">
                Forgot your password ?
              </p>
              <div className="w-full flex justify-between items-center ">
                <button className="font-meduim rounded-full mt-5 py-2 justify-self-end  w-[120px]  bg-gradient-to-r from-[#72EDF2] to-[#5151E5 ] text-white">
                  SignIn
                </button>
                <button
                  onClick={() => navigate("/joinUs")}
                  className="font-meduim rounded-full mt-5 py-2 justify-self-end  w-[120px] bg-white text-black"
                >
                  SignUp
                </button>
              </div>
            </form>
            <div className="divider devide-bg-white divide-white mt-5">OR</div>
            <div>
              <button
                onClick={() => handleGoogleBtn()}
                className="btn w-full bg-white mt-4 text-black capitalize"
              >
                <FcGoogle className="text-xl mr-2 " /> SignIn With Google
              </button>
            </div>
            <p
              className="text-white cursor-pointer text-md my-5 text-center "
              onClick={() => navigate("/joinUs")}
            >
              Don't have an account yet?
              <span className="font-bold"> Create Account</span>
            </p>
          </div>

          <div className="basis-1/2 hidden  lg:block  relative bg-white">
            {/* <div className="relative h-full">
              <div className="relative  ">
                <motion.img
                  src={img2}
                  alt="image1"
                  variants={loaderVariantsRev}
                  animate="animationOne"
                  className="h-[270px] w-[280px]  object-contain absolute top-0 right-0 overflow-hidden"
                />
                <motion.img
                  src={img1}
                  alt="image1"
                  variants={loaderVariants}
                  animate="animationOne"
                  className="h-[340px] w-[360px] object-contain overflow-hidden absolute top-0 left-0"
                />
              </div>
              <motion.img
                src={img5}
                alt="image1"
                variants={loaderVariants}
                animate="animationOne"
                className="h-[204px] w-[204px] object-contain  overflow-hidden absolute top-1/3 left-2/4"
              />
              <motion.img
                src={img4}
                alt="image1"
                variants={loaderVariantsRev}
                animate="animationOne"
                className="h-[304px] w-[304px] object-contain overflow-hidden absolute top-2/4 left-0"
              />
              <motion.img
                src={img6}
                alt="image1"
                variants={loaderVariantsRev}
                animate="animationOne"
                className="h-[224px] w-[224px] object-contain overflow-hidden absolute top-2/3 left-2/4"
              />
            </div> */}
            <div className="!h-full">
              <img className="w-full !h-full" src={loginImg} alt="loginImg" />
            </div>
            <ToastContainer />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
