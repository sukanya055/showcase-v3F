import React, { useEffect, useState } from "react";
import { BsChevronLeft } from "react-icons/bs";
import { useLocation, useNavigate } from "react-router-dom";
import profileImg from "../assets/images/profile.png";
import { Layout } from "../components";
import styles from "../components/Profile/NormalProfile.module.css";
import { uploadFile } from 'react-s3';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../firebase.init";
import { useCookies } from 'react-cookie';

const ChangePassword = () => {
    const [cookies, setCookie, removeCookie] = useCookies(['token']);


    const [user] = useAuthState(auth)
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        oldPassword: '',
        newPassword: '',
        confirmPass: ''
    })
    const [ErrorMessage, setErrorMessage] = useState('')
    const [successMessage, setSuccessMessage] = useState('')




    useEffect(() => {
        if (ErrorMessage) {

            toast.error(ErrorMessage, {
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
    }, [ErrorMessage])

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



    const handleRoute = (path) => {
        navigate(`/dashboard/${path}`)
    }

    const handleForm = async (e) => {
        e.preventDefault()
        const { oldPassword, newPassword, confirmPass } = formData || {}
        console.log(formData)
        let token = cookies?.cookie;
        if (token !== undefined && token !== null) {
            token = token.replace(/['"]+/g, "");
        }
        else {
       
            navigate("/")
            removeCookie('token', {
                path: '/',
                maxAge: 7 * 24 * 60 * 60 * 1000,// 7d,
            })
        }

        try {
            if (user) {
                setErrorMessage(`You can't change the password. Because you are login in with google`)
            } else {
                if (newPassword === confirmPass) {
                
                    const response = await axios.patch('https://api.showcaseurbusiness.com/user/changePass', {
                        oldPassword,
                        newPassword,
                        google: user && 'google'
                    }, {
                        headers: {
                            'Authorization': cookies?.token
                        }
                    })
                    await response;
                 
                    if (response?.status === 200) {
                        setSuccessMessage('Password update successful')
                    }

                }
                else {
                    alert("Password does not match ");
                }
            }
        } catch (error) {
           
            setErrorMessage(error.response.data.message)
        }
        setFormData({
            oldPassword: '',
            newPassword: '',
            confirmPass: ''
        })
    }




    return (
        <Layout>
            <div className="my-20">
                <div
                    className={`w-full lg:w-[830px]  mx-auto bg-[#FAFAFA] px-4 md:px-16 lg:px-20 py-20 rounded-lg`}
                >
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
                                onClick={() => handleRoute('updateProfile')}
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
                                onClick={() => handleRoute('updatePasswordNormalProfile')}
                            />
                            <label
                                className="text-[#1B1C21] text-[14px] md:text-[16px] font-bold"
                                htmlFor="password"
                            >
                                Change Password
                            </label>
                        </div>
                    </div>

                    <div className="mt-20">
                        <form onSubmit={handleForm} className="w-full lg:w-[80%] mx-auto">
                            <div className="w-full">
                                <label
                                    className="block text-[#858A89] font-bold mb-4 text-[14px] md:text-[16px]"
                                    htmlFor=""

                                >
                                    Old Password
                                </label>
                                <input
                                    type="text"
                                    className="input input-bordered w-full"
                                    name="oldPassword"
                                    value={formData.oldPassword}
                                    onChange={e => setFormData({ ...formData, oldPassword: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="w-full my-9">
                                <label
                                    className="block text-[#858A89] font-bold mb-4 text-[14px] md:text-[16px]"
                                    htmlFor=""

                                >
                                    New Password
                                </label>
                                <input
                                    type="text"
                                    className="input input-bordered w-full"
                                    name="newPassword"
                                    value={formData.newPassword}
                                    onChange={e => setFormData({ ...formData, newPassword: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="w-full">
                                <label
                                    className="block text-[#858A89] font-bold mb-4 text-[14px] md:text-[16px]"
                                    htmlFor=""

                                >
                                    Confirm Password
                                </label>
                                <input
                                    type="text"
                                    className="input input-bordered w-full"
                                    name="confirmPassword"
                                    value={formData.confirmPass}
                                    onChange={e => setFormData({ ...formData, confirmPass: e.target.value })}
                                    required
                                />
                            </div>

                            <div className="flex justify-center mt-10">
                                <button
                                    className="bg-[#3371F2] text-white px-8  md:px-10 py-3 rounded-xl text-[14px] md:text-[16px]"
                                    type="submit"
                                >
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
                <ToastContainer />
            </div>
        </Layout>
    );
};

export default ChangePassword;