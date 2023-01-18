import React from "react";
import { useNavigate } from "react-router-dom";
import chevron from "../assets/leftChevron.gif";

const GetStarted = () => {
  const navigate = useNavigate()
  return (
    <div className="min-h-[80vh] flex items-center">
      <div className="flex justify-between items-center w-full px-5">
        <div>
          <img
            className="w-[130px] md:w-[300px]"
            src={chevron}
            alt="chevronImg"
          />
        </div>
        <div className="text-center">
          <p className="text-[20px] md:text-[35px] lg:text-[45px] text-[#112D57] font-bold text-center px-5 md:px-24 lg:px-32 xl:px-52 ">
            Sign up today to get going!
          </p>
          <button
            onClick={() => navigate(`/joinUs`)}
            className="bg-gradient-to-r from-[#43CBFF] px-10 md:px-16 py-3 text-[20px] md:text-[28px] lg:text-[30px] text-white rounded-lg border-0 outline-none to-[#9708CC] inline-block mt-20">
            Sign Up
          </button>
        </div>
        <div>
          <img
            className="rotate-180 w-[130px] md:w-[300px]"
            src={chevron}
            alt="chevronImg"
          />
        </div>
      </div>
    </div>
  );
};

export default GetStarted;
