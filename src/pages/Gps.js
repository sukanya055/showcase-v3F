import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BsChevronLeft } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';
import gpsImg from '../assets/gps.jpg'
import { Layout } from '../components';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useCookies } from 'react-cookie';
const Gps = () => {
    const [cookies, setCookie] = useCookies(['token']);

  
    const navigate = useNavigate()
    const [address, setAddress] = useState('')
    const handleRoute = (path) => {
        navigate(`/businessProfile/${path}`)
    }
    const [successMessage, setSuccessMessage] = useState('')
    const [errorMessage, setErrorMessage] = useState('')

    useEffect(() => {
        if (successMessage) {

            toast.success(successMessage, {
                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            })
        }
    }, [successMessage])
    useEffect(() => {
        if (errorMessage) {

            toast.error(errorMessage, {
                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            })
        }
    }, [errorMessage])


    const handleForm = async (e) => {

        try {
            e.preventDefault()
            const res = await axios.patch('https://api.showcaseurbusiness.com/user/address', {
                address: address,
            }, {
                headers: {
                    'Authorization': cookies?.token,
                }
            });

           
            if (res.status === 200) {
                setSuccessMessage('Your address is updated')
            }
        }
        catch (error) {
           
            setErrorMessage(error?.response?.data?.message)
        }

    }

    return (
        <Layout>
            <div>
                <div className='mt-20 px-10'>
                    <button
                        onClick={() => navigate(-1)}
                        className="flex gap-2 items-center text-[#858A89] text-[15px] md:text-[20px] "
                    >
                        <BsChevronLeft /> Back
                    </button>
                    <div className="flex items-center gap-2 mt-12">
                        <div className="flex items-center gap-2">
                            <input
                                type="radio"
                                name="radio-2"
                                className="radio radio-primary"
                                id="profile"
                                onClick={() => handleRoute('updateBusinessProfile')}
                            /* checked={() => location.pathname.includes('/normalDashboard/updateProfile') ? false : true} */
                            />
                            <label
                                className="text-[#1B1C21] text-[14px] md:text-[16px] font-bold"
                                htmlFor="profile"
                            >
                                Profile
                            </label>
                        </div>
                        <div className="flex items-center gap-2">
                            <input
                                type="radio"
                                name="radio-2"
                                className="radio radio-primary"
                                id="password"
                                onClick={() => handleRoute('updateBusinessPassword')}
                            />
                            <label
                                className="text-[#1B1C21] text-[14px] md:text-[16px] font-bold"
                                htmlFor="password"
                            >
                                Change Password
                            </label>
                        </div>
                        <div className="flex items-center gap-2">
                            <input
                                type="radio"
                                name="radio-2"
                                className="radio radio-primary"
                                onClick={() => handleRoute('updateGps')}
                            />
                            <label
                                className="text-[#1B1C21] text-[14px] md:text-[16px] font-bold"
                                htmlFor=""

                            >
                                GPS
                            </label>
                        </div>
                    </div>

                </div>
                <div className='flex min-h-screen justify-evenly items-center'>


                    <div>
                        <div>
                            <h3 className='leading-9 font-bold text-[19px]'>Add the following information,</h3>
                            <p>We will set it up for you</p>
                        </div>
                        <form
                            onSubmit={handleForm}
                            className='mt-20'>
                            <div className="w-full">
                                <label
                                    className="block  font-bold mb-4 text-[14px] md:text-[16px]"
                                    htmlFor=""

                                >
                                    Your Shop Address
                                </label>
                                <input
                                    type="text"
                                    className="input input-bordered w-full"
                                    name="confirmPassword"
                                    placeholder='Please enter complete address'
                                    value={address}
                                    onChange={e => setAddress(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="flex justify-center mt-10">
                                <button
                                    className="bg-[#3371F2] text-white px-8 w-full  md:px-10 py-2 rounded-xl text-[14px] md:text-[19px]"
                                    type="submit"
                                >
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                    <div className='w-[50%]'>
                        <img src={gpsImg} alt="" />
                    </div>
                </div>
                <ToastContainer/>
            </div>
        </Layout>
    );
};

export default Gps;