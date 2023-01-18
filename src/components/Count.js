import React from "react";
import circleGif from "../assets/circle.gif";

const Count = () => {
  return (
    <>
      <div className=" gap-32 md:gap-9 flex flex-col md:flex-row justify-between  items-center px-10 mt-40 md:mt-60">
        <div className="w-[168px] relative">
          <img className="w-full" src={circleGif} alt="" />
          <div
            style={{
              top: "50%",
              left: "50%",
              transform: "translate(-50%,-50%)",
            }}
            className="absolute text-center"
          >
            <span className=" text-[40px] lg:text-[50px] font-bold text-[#182F43]">
              5K
            </span>
            <p className=" text-[19px] lg:text-[22px] text-[#182F43] leading-[1px]">
              Accounts
            </p>
          </div>
        </div>
        <div className="w-[168px] relative mb-0 md:mb-[351px]">
          <div>
            <img className="w-full" src={circleGif} alt="" />
            <div
              style={{
                top: "50%",
                left: "50%",
                transform: "translate(-50%,-50%)",
              }}
              className="absolute text-center"
            >
              <span className=" text-[40px] lg:text-[50px] font-bold text-[#182F43]">
                270
              </span>
              <p className="text-[19px] lg:text-[22px] text-[#182F43] leading-[1px]">
                Clients
              </p>
            </div>
          </div>
        </div>
        <div className="w-[168px] relative">
          <div>
            <img className="w-full" src={circleGif} alt="" />
            <div
              style={{
                top: "50%",
                left: "50%",
                transform: "translate(-50%,-50%)",
              }}
              className="absolute text-center"
            >
              <span className=" text-[40px] lg:text-[50px] font-bold text-[#182F43] leading-[1px]">
                100
              </span>
              <p className="text-[22px] text-[#182F43] ">Timely</p>
              <p className="text-[19px] lg:text-[22px] text-[#182F43] leading-[7px] mb-[-7px]">
                Delivery
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Count;
