import moment from "moment/moment";
import React from "react";
import { useState } from "react";
import { BiShare } from "react-icons/bi";
const comments = [
  {
    user: "Rahul Pradhan",
    title: "Fot pepelo bars",
    desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
    ratings: 1,
  },
  {
    user: "Binita Swain",
    title: "For bow ties",
    desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
    ratings: 4,
  },
];
const Reviews = ({data}) => {

  const [reviews, setReviews] = useState(data?.slice(0,2))
  
  const handleSort=(value)=>{
  
    if(Number(value) === 1){
      setReviews(data.slice(data?.length-2,data?.length))
    }else{
      setReviews(data?.slice(0,2))
    }

  }
 
  return (
    <div className="flex flex-col gap-8 px-5 py-2  shadow-md  rounded-lg ">
      <div className="flex justify-between border-b-[1px] pb-2 border-gray-400 items-center">
        <h1 className="text-lg font-semibold text-gray-600 capitalize">
          Recent Reviews
        </h1>
        <select 
          onChange={(e)=>handleSort(e.target.value)}
        className="select bg-transparent  max-w-xs">
          <option disabled selected>
            Sort By
          </option>

          <option value='1'>Oldest one</option>
          <option value='-1'>News First</option>
        </select>
      </div>

      <div className="flex gap-5 flex-col">
        {reviews?.map((comment) => (
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <div className="flex gap-1 items-center">
                <div className="rating rating-sm">
                  {[...Array(Number(comment?.star))].map((item) => (
                    <input
                      key={item}
                      type="radio"
                      name="rating-2"
                      class="mask mask-star-2 bg-orange-400"
                      checked={item === Number(comment?.star) ? true : false}
                      readOnly
                    />
                  ))}
                </div>

                <h1 className="text-lg font-semibold">{comment.title}</h1>
              </div>
              <BiShare className="text-lg font-medium cursor-pointer text-gray-900" />
            </div>
            <h2 className="text-sm font-normal text-gray-700">
              By <span className="font-bold ">{comment?.userId?.name}</span> 
            </h2>
            <p className="text-md text-gray-600">{comment.review}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reviews;
