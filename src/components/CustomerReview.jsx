import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import Customer from "./Customer";

const data = [
  {
    id: 1,
    comment:
      "Cras ultricies ligula sed magna dictum porta. Donec rutrum congue leo eget malesuada.",
    user: "https://wallpapercave.com/wp/wp5741281.jpg",
  },
  {
    id: 2,
    comment:
      "Cras ultricies ligula sed magna dictum porta. Donec rutrum congue leo eget malesuada.",
    user: "https://wallpapercave.com/wp/wp5741281.jpg",
  },
  {
    id: 3,
    comment:
      "Cras ultricies ligula sed magna dictum porta. Donec rutrum congue leo eget malesuada.",
    user: "https://wallpapercave.com/wp/wp5741281.jpg",
  },
  {
    id: 4,
    comment:
      "Cras ultricies ligula sed magna dictum porta. Donec rutrum congue leo eget malesuada.",
    user: "https://wallpapercave.com/wp/wp5741281.jpg",
  },
  {
    id: 5,
    comment:
      "Cras ultricies ligula sed magna dictum porta. Donec rutrum congue leo eget malesuada.",
    user: "https://wallpapercave.com/wp/wp5741281.jpg",
  },
];

const CustomerReview = () => {
  const [review, setReview] = useState([]);

  useEffect(() => { 
    (async()=>{
      try {
          const {data}=await axios.get('https://api.showcaseurbusiness.com/review/getAccepted-review')
        
          setReview(data?.data)
      } catch (error) {
        console.log(error)
      }
    })()
  }, []);

  return (
    <div className="px-8 mt-5 my-20">
      <div className="flex justify-center">
      <h1 className="md:text-4xl text-xl font-bold  text-[#112D57] mb-14 font-[poppins] ">
          Customer Reviews
      </h1>
      {/* <h5 className='float-right'>see more</h5> */}
      </div>
      <div className="grid gap-10 row-gap-8 mx-auto sm:row-gap-10 lg:max-w-screen-lg sm:grid-cols-2 lg:grid-cols-2">
        {review.map((item) => (
          <Customer key={item._id} {...item} />
        ))}
      </div>
    </div>
  );
};

export default CustomerReview;
