import React, { useEffect, useState } from 'react';
import { BsGearWide, BsPlayCircle } from 'react-icons/bs';
import { Link, useNavigate } from 'react-router-dom';
import { Layout } from '../components';
import { useCookies } from 'react-cookie';
import userImg from '../assets/user.png'
import axios from 'axios';
const NormalDashboard = () => {
    const [cookies, setCookie, removeCookie] = useCookies(['token']);

    const [details, setDetails] = useState()
    const { email, about, address, name, profile, _id } = details || {}
    const navigate = useNavigate()
    useEffect(() => {
        (async () => {

            if (cookies?.token) {

                fetch('https://api.showcaseurbusiness.com/user/infor', {
                    headers: {
                        'Authorization': cookies?.token,
                    }
                }).then(res => res.json())
                    .then(data => {
                        setDetails(data)

                    })
            }
            else {
                removeCookie("token");
                navigate("/auth");
            }
        })();
    }, [cookies, navigate, removeCookie])


    return (
        <Layout>
            <section>
                <div className='flex  flex-col md:flex-row w-full px-10 justify-center md:w-[90%] lg:w-[70%] mx-auto my-32 gap-[18px]'>
                    <div className='text-center flex justify-center w-full'>
                        <img className='w-[205px] sm:w-[305px] mx-auto lg:w-[245px] md:h-[245px] object-cover rounded-[50%] bg-gray-400 ' src={profile ? profile : userImg} alt="" />
                    </div>
                    <div className='flex mt-10 md:mt-0 w-full'>

                        <div className=' '>
                            <div className='flex gap-10 sm:gap-16 md:gap-10 w-full items-center'>
                                <h3 className='text-[17px] sm:text-[20px] md:text-[28px] font-bold '>{name}</h3>
                                <div className="dropdown dropdown-end md:dropdown-start ml-10">
                                    <label tabIndex={0} className="btn btn-ghost rounded-btn">
                                        <p>
                                            <BsGearWide
                                                className='text-[23px] cursor-pointer'
                                            />
                                        </p>
                                    </label>
                                    <ul tabIndex={0} className="menu dropdown-content p-2 shadow bg-base-100 rounded-box w-52 mt-4">
                                        <li><Link to='/dashboard/updateProfile'>Update Profile</Link></li>
                                    </ul>
                                </div>
                            </div>
                            <div className='flex gap-16 items-center text-[12px] font-bold'>
                                <div className='flex gap-2 items-center'>
                                    <p><BsPlayCircle /></p>
                                    <p>Saved Videos</p>
                                </div>
                                <p>{details?.saveVideo?.length}</p>

                            </div>
                            <div className=' leading-7 mt-6 w-full pr-3'>
                                <p>{about}</p>
                            </div>
                        </div>

                    </div>
                </div>
                {
                    details?.saveVideo?.length > 0 && <div className='text-center '>
                        <h3 className='font-bold text-xl mb-10'>Your Saved Videos</h3>
                        <div>
                            <div class="container px-5 py-24 mx-auto overflow-x-hidden">
                                <div class="flex flex-wrap w-full justify-center items-center">

                                    {
                                        details?.saveVideo?.map((video, index) => <div
                                            key={index}
                                            class="p-4 w-[310px] md:w-1/3">
                                            <div class="border-2 border-gray-200 border-opacity-60 rounded-lg ">

                                                <video
                                                    // className='w-full h-full' 
                                                    src={video?.link}
                                                    width={"100%"}
                                                    height='400'
                                                    autoPlay={true}
                                                    loop={true}
                                                    muted={true}
                                                    controls
                                                ></video>
                                                <div className='py-7 text-left px-4'>
                                                    <h4>Category: {video?.category}</h4>
                                                    <p>Brand: {video?.brand}</p>
                                                    <p>Type: {video?.type}</p>
                                                    <div className="flex gap-3 items-center">
                                                        {video?.discount && (
                                                            <h1 className="text-gray-700 text-lg font-semibold">
                                                                ₹{(video?.price - (video?.price * video?.discount) / 100).toFixed(0)}
                                                            </h1>
                                                        )}
                                                        <h1
                                                            className={`text-gray-600 text-lg font-semibold ${video?.discount ? "line-through" : ""
                                                                }`}
                                                        >
                                                            ₹{video?.price}
                                                        </h1>
                                                        {video?.discount && (
                                                            <h1 className="text-green-700 text-lg font-normal">
                                                                {video?.discount}% off
                                                            </h1>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>)
                                    }

                                </div>
                            </div>
                        </div>
                    </div>
                }
            </section>
        </Layout>
    );
};

export default NormalDashboard;




