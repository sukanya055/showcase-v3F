import axios from 'axios';
import React, { useRef, useState } from 'react';
import { useEffect } from 'react';
import { useCookies } from "react-cookie";
import { useLocation, useParams } from 'react-router-dom';
import Layout from '../Layout';




const MobileRightBar = ({ currentUserId, socket }) => {

    const [messages, setMessages] = useState([])
    const [cookies, removeCookie] = useCookies(["token"]);
    const [chats, setChats] = useState([])
    const { id } = useParams()
    const location = useLocation()

    const [arrivalMessage, setArrivalMessage] = useState(null)
    const scrollRef = useRef();

    useEffect(() => {

        fetch(`https://api.showcaseurbusiness.com/api/message/get-message/${id}`, {
            headers: {
                "Authorization": cookies?.token,
            },
        })
            .then(res => res.json())
            .then(data => setChats(data?.data))

    }, [cookies, id, location])


    useEffect(() => {
        if (socket.current) {
            socket.current.on("msg-recieve", (msg) => {
                setArrivalMessage({ fromSelf: false, message: msg });
            });
        }
    }, [socket, currentUserId]);

    useEffect(() => {
        arrivalMessage && setChats((prev) => [...prev, arrivalMessage]);
    }, [arrivalMessage]);

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [chats]);





    const handleForm = async (e) => {

        e.preventDefault()


        socket.current.emit("send-msg", {
            to: id,
            from: currentUserId,
            msg: e.target.input.value,
        });
        setChats([...chats, { fromSelf: true, message: e.target.input.value }])
       
        try {

            const { data } = await axios.post(`https://api.showcaseurbusiness.com/api/message/add-message-support`,
                {
                    text: e.target.input.value,
                    to: id
                },
                {
                    headers: {
                        "Authorization": cookies?.token,
                    },

                })
          

        } catch (error) {
            console.log(error)
        }

     
        e.target.reset()
    }

    return (

        <Layout>
            <div className='h-[80vh] block md:hidden'>
                {
                    chats?.length > 0 ? <div>
                        <div className=''>
                            <div className='p-2 h-[70vh]  overflow-y-auto my-4'>

                                <div
                                    className=''
                                >
                                    {
                                        chats?.map((chat, i) => <div
                                            key={i}
                                            className={`flex ${chat?.fromSelf ? 'justify-end' : 'justify-start'}   my-3  `}
                                        >
                                            <span className='bg-blue-500 p-3 rounded-full text-white'> {chat?.message}</span>
                                        </div>)
                                    }
                                </div>

                            </div>
                            <div className='w-full my-4 px-5'>
                                <form
                                    onSubmit={handleForm}
                                    className='flex gap-7' action="">
                                    <input name='input' type="text" placeholder="Type here" className="input input-bordered w-full rounded-full" />
                                    <button type='submit' className="py-2 lg:flex px-6 text-lg text-white bg-blue-500 hover:bg-blue-400 transition-colors delay-100 ease-out rounded-full">Send</button>
                                </form>
                            </div>
                        </div>
                    </div>
                        : <div className='flex justify-center items-center '>
                            <div
                                style={{
                                    height: "80vh"
                                }}
                                className='flex justify-center items-center '>
                                <h3 className='py-30 text-3xl'>For Start chatting click on the left side</h3>
                            </div>
                        </div>
                }
            </div>


        </Layout>
    );
};

export default MobileRightBar;

