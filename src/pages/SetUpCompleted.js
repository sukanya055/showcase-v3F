import React from "react";
import { Layout } from "../components";
import { MdVerifiedUser } from "react-icons/md";
import bikeBoy from "../assets/bikeBoy.png";
import { motion } from "framer-motion";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const loaderVariants = {

  animationOne: {
    y: [0, 50],
    scale: [0.2, 0.8],
    transition: {
      scale: {
        yoyo: 2,
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





const SetUpCompleted = () => {

  const [cookies] = useCookies(["token"]);
  const navigate = useNavigate()
  const handleProfile = async () => {
    if (cookies?.token) {
      try {
        const { data } = await axios.get("https://api.showcaseurbusiness.com/user/infor", {
          headers: {
            Authorization: cookies?.token,
          },
        });
        console.log(data);
        if (data?.role === 1) {
          navigate("/businessProfile/businessDashboard");
        }
        if (data?.role === 0) {
          navigate("/dashboard/normalDashboard");
        }
      } catch (err) {
        console.log(err);
      }
    }
  }

  return (
    <Layout>
      <div className=" py-11  flex flex-row h-full">
        <div className=" hidden md:block basis-1/4"></div>
        <div className="md:basis-2/4 w-full md:py-6  md:px-8 px-3">
          <div className="flex flex-col gap-2 justify-center items-center">
            <div className="rounded-full bg-gray-200 p-3">
              <MdVerifiedUser className="text-3xl text-sky-600" />
            </div>
            <h1 className="font-bold text-2xl capitalize font-sans ">
              Account setup Completed
            </h1>
            <div className="mt-4 text-gray-400 text-center">
              <p>You can always change the type account you have created</p>
              <p>
                Bussiness account to normal account,normal account to bussiness{" "}
              </p>
            </div>
            <button
              onClick={handleProfile}
              className="btn capitalize bg-sky-600 text-white mt-5">
              Take me to profile
            </button>
          </div>
        </div>
        <motion.div
          variants={loaderVariants}
          animate="animationOne"
          className=" hidden md:block basis-1/4"
        >
          <img src={bikeBoy} alt="bikeboy" className="mt-5" />
        </motion.div>
      </div>
    </Layout>
  );
};

export default SetUpCompleted;
