import React, { useEffect, useState } from 'react';
import { BsGearWide, BsPlayCircle } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { Layout } from '../components';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import PostVideo from './modal/PostVideo';
import userImg from '../assets/user.png'
import MapModal from './modal/googleMapModal/MapModal';

const BusinessDashboard = React.memo(({ setUserId }) => {
    const [cookies] = useCookies(['token']);
    const [openModal, setOpenModal] = useState(null)
    const [userDetails, setUserDetails] = useState({})
    const [googleMapModal, setGoogleMapModal] = useState(false)
    const [payment, setPayment] = useState({})

    const { about, country, name, phone, whats, profile, _id, email } = userDetails || {}
    const [videos, setVideos] = useState()
    // setUserId(_id)
    const getAdminProductVideo = async () => {
        try {
            const { data } = await axios.get(`https://api.showcaseurbusiness.com/admin/adminProductVideo`, {
                headers: {
                    'Authorization': cookies?.token,
                },
                _id
            })

            setVideos(data?.data)
        } catch (error) {
            console.log(error)
        }

    }

    useEffect(() => {
        (async () => {

            if (cookies?.token) {
                // information 
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
                alert("Login please");
            }

        })();
        getAdminProductVideo()
    }, [cookies, openModal])

    useEffect(() => {
        (async () => {

            if (cookies?.token) {
                // information 
                try {
                    const { data } = await axios.get(`https://api.showcaseurbusiness.com/api/payment/get-payment-details?email=${userDetails?.email}`, {
                        headers: {
                            'Authorization': cookies?.token,
                        }
                    });
                    setPayment(data.data)
               
                }
                catch (err) {
                    console.log(err)
                }
            }
            else {
                alert("Login please");
            }

        })();

    }, [cookies, userDetails])




    return (
        <Layout>
            <section className='overflow-x-hidden'>
                <div className='flex  flex-col md:flex-row w-full px-10 justify-center md:w-[90%] lg:w-[70%] mx-auto my-32 gap-[18px]'>
                    <div className='text-center flex justify-center w-full'>
                        <img className='w-[205px] sm:w-[305px] mx-auto lg:w-[205px] md:h-[205px] object-cover rounded-[50%] ' src={profile ? profile : userImg} alt="" />
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
                                        <li><Link to='/businessProfile/updateBusinessProfile'>Update Profile</Link></li>
                                        {
                                            email === 'showcaseofficial1@gmail.com' && <li><Link to='/supportChat/admin'>User Chat</Link></li>
                                        }
                                        {
                                            email !== 'showcaseofficial1@gmail.com' && <li><Link to='/payment'>Subscription</Link></li>
                                        }

                                    </ul>
                                </div>
                            </div>

                            <div className='flex gap-16 items-center text-[12px] font-bold'>
                                <div className='flex gap-2 items-center'>
                                    <p><BsPlayCircle /></p>
                                    <p>Videos</p>

                                </div>
                                <p>{videos?.length}</p>


                            </div>
                            {
                                payment?.plan && <div className='mt-4'>
                                    <p className='pt-3 bg-[#C9BBFF] px-3 py-2 rounded-lg text-center font-bold'>Your Plan is {payment?.plan}</p>
                                </div>
                            }
                            <div className=' leading-7 mt-6 pr-7'>
                                <p>{about} .</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='flex justify-center gap-10 mb-20 flex-col md:flex-row px-4'>
                    <div
                        onClick={() => {
                            if (whats !== undefined) {
                                window.open(`https://wa.me/${country}${phone}`)
                            }
                            else {
                                alert("Please login to see your profile");
                            }
                        }}
                        className='flex justify-center items-center border-solid border-gray-400 border-2 px-10 py-5 cursor-pointer rounded-lg'>
                        <p>WhatsApp</p>
                    </div>
                    <div className=' flex justify-center items-center border-solid border-gray-400 border-2 px-10 py-5 cursor-pointer rounded-lg'>
                        <p>  <label className='cursor-pointer' htmlFor="my-modal-6">GPS</label></p>
                    </div>

                    <div className='flex justify-center items-center border-solid border-gray-400 border-2 px-10 py-5 cursor-pointer rounded-lg'>

                        <label onClick={() => setOpenModal(true)} htmlFor="my-modal-6" className="btn modal-button">Post Video</label>
                    </div>
                </div>

                <div className='text-center overflow-x-hidden'>
                    <h3 className='font-bold text-xl mb-10'>Your Videos</h3>
                    <section class="text-gray-600 body-font">
                        <div class="container px-5 py-24 mx-auto overflow-x-hidden">
                            <div class="flex flex-wrap w-full justify-center items-center">

                                {
                                    videos?.map((video, index) => <div
                                        key={index}
                                        class="p-4 w-[310px] md:w-1/3">
                                        <div class="border-2 border-gray-200 border-opacity-60 rounded-lg ">

                                            <video

                                                src={video?.link}
                                                width={"100%"}
                                                height='400'
                                                autoPlay={true}
                                                loop={true}
                                                muted={true}

                                            ></video>
                                            <div className='py-7 text-left px-4'>
                                                <h4>Category: {video?.category}</h4>
                                                <p>Brand: {video?.brand}</p>
                                                <p>Type: {video?.type}</p>
                                            </div>
                                        </div>
                                    </div>)
                                }

                            </div>
                        </div>
                    </section>
                </div>

            </section >
            {
                openModal && <PostVideo
                    openModal={openModal}
                    setOpenModal={setOpenModal}
                    userId={_id}
                />
            }
            {
                userDetails?.name && <MapModal
                    origin={userDetails?.address}
                    destination={userDetails?.address}
                    userDetails={userDetails}
                />
            }

        </Layout >
    );
}
)

export default BusinessDashboard;




