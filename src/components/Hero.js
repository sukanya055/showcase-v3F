import React from "react";

import elipse1 from "../assets/Ellipse1.png";
import elipse2 from "../assets/Ellipse 2.png";
import Slider from "react-slick";
import heroImg1 from '../assets/heroImg/Ellipse 622 (1).png'
import heroImg12 from '../assets/heroImg/Ellipse 622.png'
import img1 from '../assets/heroImg/Capture.PNG';
// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from "react-router-dom";

const Hero = () => {

  const navigate = useNavigate()

  const images = [
    {
      img: heroImg1
    },
    {
      img: heroImg12
    },

  ]
  const settings = {
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    fade: true,
    autoplay: true,
    arrows: false,
  };

  return (
    <div>
      <div className="">
        <div className="hero-content justify-between flex-col lg:flex-row-reverse items-center max-w-[2100px] pb-5">

          <div className="w-full flex justify-center">
              {/* slider  */}
              <img src={img1} alt='img' />
              {/* <div className="w-[305px] [h-305px] sm:w-[445px] sm:h-[445px] rounded-full absolute top-[17%] lg:top-[13%]  left-[15%] p-3">
                <Slider {...settings}>
                  {
                    images?.map((img, index) => <img
                      key={index}
                      className="w-full h-full object-contain" src={img1} alt="" />)
                  }
                </Slider>

              </div> */}
          </div>
          <div className='w-full'>
            <div className='pl-5 md:pl-14'>
              <h1 className="text-[27px] md:text-[34px] lg:text-[44px] xl:text-[53px] 2xl:text-[64px] text-[#112D57] font-bold">Let’s Showcase</h1>
              <p className="py-6 text-[#5C5C5C] lg:text-[23px] xl:[26px] 2xl:text-[30px] leading-[34px] md:leading-[48px] lg:pr-40 xl:pr-40 sm:pr-0">Bringing your product online is now easy and brezzy.You have
                something to sell , show is online.</p>

            </div>
            <div className='pl:5 md:pl-14 flex justify-center lg:justify-start gap-9'>
              <button
                onClick={() => navigate(`/products/${"product-allVideo"}`)}
                className="btn btn-primary bg-[#FFC040] bg-[#FFC040] rounded-full border-0 outline-none text-white px-5 sm:px-7">Shop more</button>
              <button

                className="btn border-[#FFC040] rounded-full bg-white text-[#FFC040] hover:bg-white hover:border-[#FFC040] px-5 sm:px-7">Read more</button>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
};

export default Hero;
