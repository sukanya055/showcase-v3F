import React, { useState } from "react";
import { Layout } from "../components";
import circle from "../assets/boy_circle.png";
import Halfcircle from "../assets/boy_half_circle.png";
import boy from "../assets/boy.png";
import polygon1 from "../assets/Polygon1.png";
import polygon2 from "../assets/Polygon2.png";
import { FiArrowRight, FiUser } from "react-icons/fi";
import { IoBagHandleSharp } from "react-icons/io5";

import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";

const JoinUs = () => {

  const navigate=useNavigate()

  return (
    <Layout>
      <div className=" py-1 pb-26 mb-14  flex flex-row h-full">
        <div className=" hidden md:block basis-1/4 ">
          <img
            src={Halfcircle}
            alt="half"
            className="absolute bottom-0 -left-4  "
          />
        </div>
        <div className="md:basis-2/4 w-full md:py-2   md:px-8 px-3">
          <img src={circle} alt="circle" className="h-[254px] w-[150px] " />
          <div className="w-full flex flex-col items-center justify-center   gap-2">
            <h1 className="text-3xl font-bold">Join Us!</h1>
            <p className="text-md text-gray-400 font-semibold">
              To begin this journey, tell us what type of account you would be
              opening.
            </p>
            <div className=" mt-5 flex gap-5 px-3 py-4   transition-all delay-75 duration-70 cursor-pointer ease-in rounded-lg  hover:bg-gray-100 items-center justify-center">
              <div className="relative">
                <img src={polygon1} alt="polygon" />
                <FiUser className="text-xl absolute top-4 text-[#3371F2] left-4 " />
              </div>
              <div
               onClick={()=>navigate('/normalAccountSetup')}
              >
                <h1 className="tex-lg font-bold">Individual</h1>
                <p className="text-gray-400 text-sm font-semibold">
                  Personal account to manage all you activities
                </p>
              </div>
              <FiArrowRight className="text-xl font-bold text-sky-400" />
            </div>
            <div className=" mt-5 flex gap-5 px-3 bg-sky-100 py-4 border-[2px] transition-all delay-75 duration-70 cursor-pointer ease-in rounded-lg  border-sky-400 items-center justify-center">
              <div className="relative">
                <img src={polygon2} alt="polygon" />
                <IoBagHandleSharp className="text-xl text-white absolute top-4 left-4 " />
              </div>
              <div 
              onClick={()=>navigate('/businessAccountSetup')}
              >
                <h1 className="tex-lg font-bold">Business</h1>
                <p className="text-gray-400 text-sm font-semibold">
                  Own or belong company this is for you
                </p>
              </div>
              <FiArrowRight className="text-xl font-bold text-sky-400 hidden" />
            </div>
            <p className="mt-8 text-gray-400 font-semibold text-md">
              Already have an account ?{" "}
              <span className="text-sky-600 cursor-pointer">
                <Link to="/auth">Sign In</Link>
              </span>
            </p>
          </div>
        </div>

        <div className="basis-1/4  md:flex items-center relative hidden bottom-0   ">
          <img
            src={boy}
            alt="phone"
            className="absolute  h-[620px] w-[440px] "
          />
        </div>
      </div>
    </Layout>
  );
};

export default JoinUs;
