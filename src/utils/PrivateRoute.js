import axios from 'axios';
import { signOut } from 'firebase/auth';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import auth from '../firebase.init';
import { useCookies } from 'react-cookie';
import { Layout } from '../components';

const PrivateRoute = ({ children }) => {
    const [cookies, setCookie, removeCookie] = useCookies(['token']);
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)
    const [userToken, setUserToken] = useState()
    let token = localStorage.getItem("token");
    token && token.replace(/['"]+/g, "");

    useEffect(() => {
        (async () => {

            try {
                setLoading(true)

                const { data } = await axios.get('https://api.showcaseurbusiness.com/user/validation', {
                    headers: {
                        'Authorization': cookies?.token,
                    }
                })

                if (data?.message === "Success" && data?.data?.role === 0) {
                    setLoading(false)
                    setUserToken(data)
                }
                setLoading(false)
            } catch (error) {

                if (error?.response.status === 400) {
                    removeCookie('token')
                    signOut(auth)
                    navigate('/auth')
                }
                setLoading(false)
            }
        })()

    }, [token, cookies, removeCookie, navigate])



    if (loading)return  <Layout><div className='text-center my-40'>Loading...</div></Layout>

    return userToken ? children : <Navigate to={'/auth'} />

};

export default PrivateRoute;

