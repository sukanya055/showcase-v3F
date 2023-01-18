
import axios from "axios";
import { signOut } from "firebase/auth";
import { useEffect } from "react";
import auth from "../firebase.init";
import { useCookies } from 'react-cookie';
const useGoogleRegister = (user, setErrorMessage, setSuccess, role) => {
    const { displayName, email } = user || {}
    const [cookies, setCookie, removeCookie] = useCookies(['token']);
    let expiryDate = new Date();
    useEffect(() => {
        (async () => {
            if (user) {
                let regex = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");
                let regxpass = new RegExp("(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})");
                const userexist = await fetch("https://api.showcaseurbusiness.com/exist", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        email: email
                    })
                })
                const userExistData = await userexist.json()
                
                if (userExistData.message === 'Email already exist') return setErrorMessage('Email already exist')


                if (!regex.test(email)) {
                    //setErrorMessage("Invalid Email");

                    setErrorMessage("Invalid Email Address");
                }
                else if (userExistData.exist === 0 && regex.test(email)) {

                 
                    try {

                        const response = await axios.post(
                            "https://api.showcaseurbusiness.com/user/register",
                            {
                                name: displayName,
                                email: email,
                                role,
                                google: 'Google',
                            }
                        );
                       
                        localStorage.setItem(
                            "token",
                            JSON.stringify(response.data.accesstoken)
                        );
                        setCookie("token", response?.data?.accesstoken,{
                            path: '/',
                            maxAge: expiryDate.setMonth(expiryDate.getMonth() + 1),
                    
                          });
                    
                        // navigate("/completeProfile");
                        setSuccess("/completeProfile")
                    } catch (error) {
                        if (error.response) {
                            setErrorMessage(error.response.data.msg);
                        }
                    }
                } else if (userExistData.exist === 1) {
                    signOut(auth)
                    setErrorMessage("User already exist")
                }
            }
        })()
    }, [user,email,role,setErrorMessage,setSuccess,displayName,expiryDate,setCookie])
}

export default useGoogleRegister