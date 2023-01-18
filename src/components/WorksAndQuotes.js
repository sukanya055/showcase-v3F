import React from "react";
import circleGif2 from "../assets/circle2.gif";
import img1 from "../assets/heroImg/Untitled design (5).png";
const WorksAndQuotes = () => {
  const quotes = [

    {
      number: 1,
      title: "Business Building",
      desc: "A company creates the website and advertises the goods or services it offers, along with their costs.",
    },
    {
      number: 2,
      title: "Customer’s POV",
      desc: "After discovering the website, a client purchases products and services. They go to the checkout stage after deciding they are finished purchasing online.",
    },
    {
      number: 3,
      title: "Payment",
      desc: "The e-commerce website transmits the payment data via a payment processor, which authorises the transaction and gathers the associated money.",
    },
    
  ];

  return (
    <>
      <div className="">
        <div className="flex flex-col lg:flex-row justify-between">
          <div className="w-full justify-center mt-4">
            <img src={img1} alt="" />
          </div>
          <div className="w-full gap-[44px] mt-5">
              {quotes.map(({ number, title, desc }) => (
                <div key={number} className="mb-[40px] text-center">
                  <div className="flex items-center lg:gap-60 xl:gap-60 md:gap-10 sm:gap-20 min-sm:gap-30 ">
                    <div className="relative">
                      <img
                        className="w-[75px] sm:w-[85px] md:w-[108px] lg:w-[72px] "
                        src={circleGif2}
                        alt=""
                      />
                      <span
                        style={{
                          top: "50%",
                          left: "50%",
                          transform: "translate(-50%,-50%)",
                        }}
                        className="absolute text-[#686868] text-[39px]"
                      >
                        {number}
                      </span>
                    </div>
                    <div>
                      <h4 className="text-[22px] md:text-[24px] lg:text-[28px] text-[#182F43] font-bold">
                        {title}
                      </h4>
                    </div>
                  </div>
                  <div>
                    <p className="lg:pl-36 xl:pl-36 md:pl-36 sm:pl-28 text-[13px] md:text-[16px] lg:text-[18px] text-[#182F43] mr-14">
                      {desc}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default WorksAndQuotes;
