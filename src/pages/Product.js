import React, { useEffect, useState } from "react";
import { Layout } from "../components";
import whatsApp from "../assets/whatsapp.png";
import gps from "../assets/location.png";
import save from "../assets/save.png";
import feedback from "../assets/feedback.png";


import { Navigate, useNavigate, useParams } from "react-router-dom";
import "./Map";
import Map from "./Map";
import axios from "axios";
import { useQuery } from "react-query";
import { useCookies } from 'react-cookie';
import Loader from "../utils/Loader";
import MapModal from "./modal/googleMapModal/MapModal";


const Product = () => {
  const [cookies,removeCookie] = useCookies(['token']);
  const { id } = useParams();
  const [productData, setProductData] = useState({});
  const [userDetails, setUserDetails] = useState(null)
  const [saveSuccess, setSaveSuccess] = useState('')
  const navigate = useNavigate()
  const { isLoading, data, refetch } = useQuery(
    [
      "get-single-product",
      id
    ],
    () =>
      axios.get(`https://api.showcaseurbusiness.com/admin/get-single-product/${id}`, {
        headers: {
          'Authorization': cookies?.token,
        }
      })
  );

  useEffect(() => {
    (async () => {

      if (cookies?.token) {

        try {
          const { data } = await axios.get('https://api.showcaseurbusiness.com/user/infor', {
            headers: {
              'Authorization': cookies?.token,
            }
          });


          setUserDetails(data)
        }
        catch (err) {
          console.log(err)
        }
      }
      else {
        removeCookie('token')
        navigate('/auth')
      }
    })();
  }, [cookies,navigate,removeCookie])


  const savedVideo = async () => {

    try {
      if (userDetails?.role === 0) {
        
        fetch(`https://api.showcaseurbusiness.com/admin/save?userId=${userDetails?._id}&productId=${id}`,{
          method:"POST",
          headers: {
                'Authorization': cookies?.token,
            }
        }).then(res=>res.json())
        .then(data=> setSaveSuccess(data?.message))
        
      }
      
    } catch (error) {
      console.log(error)
      if(error?.response?.status === 403 || error?.response?.status === 400){
        removeCookie('token')
        navigate('/auth')
      }
      
    }
  }

  if (isLoading) return <Loader />
  const { link, price, discount, category, brand, type, companyName, email, saved, Description } = data?.data?.result[0] || {}

  const { phone, country } = data?.data?.result[0].videoOwner || {}

  return (
    <div>
      <Layout>
        <div className="lg:px-18 py-40 sm:px-8">
          <div className="flex relative items-center justify-center">

            <div className="w-[300px] h-[300px] sm:w-[450px] sm:h-[450px] lg:w-[404px] lg:h-[400px]  xl:w-[604px] xl:h-[600px] rounded-[50%] bg-green-300 relative overflow-hidden">

              <video
                src={link}
                width={"100%"}
                height={"100%"}
                autoPlay
                loop={true}
                muted={true}
                controls={true}
              // className='absolute top-0 left-0 w-full h-full opacity-100'
              >
                <p>Your browser doesn't support this video</p>
              </video>
            </div>

          </div>
          <div className="flex flex-col lg:flex-row gap-10 justify-center items-center my-20 ">
            <div className="shadow-xl p-4 rounded-xl w-[310px] md:min-w-[500px] min-h-[308px]">
              <h5 className="text-center my-6 font-bold text-[#090000]">Product Information</h5>
              {
                Description
              }
            </div>
            <div className="shadow-xl rounded-lg p-3 w-[310px] md:min-w-[400px] min-h-[308px]">
              <h5 className="text-center my-6 font-bold text-[#090000]">Product Details</h5>
              <div className="mt-3 px-4 py-3 flex flex-col gap-5 text-[#000000]">
                <h4 className="text-md font-normal ">Category : {category}</h4>
                <h4 className="text-md font-normal ">Type : {type}</h4>
                <h4 className="text-md font-normal capitalize">
                  Brand : <span className="capitalize">{brand}</span>
                </h4>
                <h4 className="text-md font-normal capitalize">
                  Company : <span className="capitalize">{companyName}</span>
                </h4>
                <h4 className="text-md font-normal capitalize">
                  Email : <span className="capitalize">{email}</span>
                </h4>

              </div>
            </div>
          </div>
          <div className="shadow-md rounded-lg p-5 px-20 my-8  ">
            {/* top part */}
            <div className="flex flex-row items-center justify-between">

              <div className="flex justify-end w-full">
                <button className="basis-1/1 md:basis-1/9 shadow-xl hover:shadow-lg font-bold p-2 rounded-md text-[14px] md:text-[18px] ">
                  Rs. {(price - (price * discount) / 100).toFixed(0)}  <span className="text-green-700 text-lg font-normal">
                    {discount}% off
                  </span>
                </button>
              </div>
            </div>
            <div className="flex flex-col lg:flex-row place-items-stretch  justify-between gap-8 mt-12 w-full pb-20">
              <div className="basis-1/3 px-8 py-3 shadow-md rounded-xl cursor-pointer hover:scale-105 transition-transform ease-out delay-100 ">
                <div
                  onClick={() => {
                    if ((phone && country) !== undefined) {
                      window.open(`https://wa.me/${country}${phone}`)
                    }
                    else {
                      alert("Sorry we don't found any number!");
                    }
                  }}
                  className="flex items-center justify-center gap-1 flex-col">
                  <img
                    src={whatsApp}
                    alt="whatsapp"
                    className="w-[72px] h-[61px]"

                  />
                  <h1 className="text-lg font-semibold">WHATSAPP</h1>
                  <p className="text-md font-light">contact on WhatsApp</p>
                </div>
              </div>
              <label
                htmlFor="my-modal-4"
                className="basis-1/3 px-8 py-3 shadow-md rounded-xl cursor-pointer  hover:scale-105 transition-transform ease-out delay-100 "
              >
                <div className="  flex items-center justify-center gap-1 flex-col">
                  <img
                    src={gps}
                    alt="whatsapp"
                    className="w-[60px] h-[60px]"
                    onClick={gps}
                  />

                  <div className=' flex justify-center items-center border-solid border-gray-400 border-2 px-10 py-5 cursor-pointer rounded-lg'>
                    <p className="cursor-pointer"> <label className="cursor-pointer" htmlFor="my-modal-6">GPS</label></p>
                  </div>
                  <p className="text-md font-light">look for directions</p>
                </div>
              </label>
              <div className="basis-1/3 px-8 py-3 shadow-md rounded-xl cursor-pointer  hover:scale-105 transition-transform ease-out delay-100">
                <div
                  onClick={() => savedVideo()}
                  className="flex items-center justify-center gap-1 flex-col">
                  <img
                    src={save}
                    alt="whatsapp"
                    className="w-[50px] h-[75px]"
                  />
                  <h1 className="text-lg font-semibold">SAVE</h1>
                  <p className="text-md font-light text-center">
                    {
                      (saved?.includes(userDetails?._id) || saveSuccess) ? 'You have already save ' : ' Save the video for later use'
                    }
                  </p>
                </div>
              </div>

              <div className="basis-1/3 px-8 py-3 shadow-md rounded-xl cursor-pointer  hover:scale-105 transition-transform ease-out delay-100">
                <div
                  onClick={() => navigate(`/product/review/${id}`)}
                  className="flex items-center justify-center gap-1 flex-col">
                  <img
                    src={feedback}
                    alt="whatsapp"
                    className="w-[50px] h-[75px]"
                  />
                  <h1 className="text-lg font-semibold">FEEDBACK</h1>
                  <p className="text-md font-light text-center">
                    Click to give feedback of the product
                  </p>
                </div>
              </div>

            </div>

          </div>

        </div>
        {
          userDetails?.name && <MapModal
            origin={userDetails?.address}
            destination={data?.data?.result[0]?.videoOwner?.address}
            userDetails={data?.data?.result[0]?.videoOwner}
          />
        }
      </Layout>
    </div>
  );
};

export default Product;
