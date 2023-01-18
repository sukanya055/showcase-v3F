import React from "react";
import video from "../video/30-second-explainer-videos-ytshorts.savetube.me.mp4";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import img2 from '../assets/heroImg/Untitled design (11).png'

const Amazing = () => {
  return (
    <>
        <div className="flex max-w-[2100px] justify-between flex-col lg:flex-row-reverse p-2 md:p-4">
         
          <div className="w-full lg:mt-0">
            <div className=" pl-4 md:pl-12 mt-10 ">
              <h1 className="text-[27px] sm:text-[30px] lg:text-[44px] xl:text-[53px] 2xl:text-[64px] text-[#112D57] font-bold">
                Amazing Journey
              </h1>
              <p className="py-6 text-[#5C5C5C] lg:text-[23px] xl:[26px] 2xl:text-[30px] leading-[34px] md:leading-[48px] lg:pr-28 xl:pr-28 sm:pr-0">
                We design and develop world-class websites and applications, design better and spend less time without restricting creative freedom They give us all we need for internet purchasing, at the most basic level..
              </p>
            </div>
          </div>
          <div className="w-full overflow-hidden">
            <img src={img2} alt='img' />
          </div>
        </div>
    </>
  );
};

export default Amazing;
