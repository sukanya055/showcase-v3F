import axios from 'axios';
import React from 'react';

import { useCookies } from 'react-cookie';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import userImg from '../../assets/user.png'

const LeftBar = () => {


    const [cookies] = useCookies(["token"]);

    const navigate = useNavigate()

    const { isLoading, data, refetch } = useQuery(

        [
            "get-all-video",

        ],

        () =>
            axios.get(
                `https://api.showcaseurbusiness.com/api/message/get-latest-message`, {
                headers: {
                    "Authorization": cookies?.token,
                },
            })

    );


    return (
        <div className='h-full overflow-y-auto w-full md:max-w-[390px] bg-base-200 overflow-x-hidden' >

            <div className=' py-6 hidden md:block'>
                {
                    data?.data?.data?.map(chat => <div
                        onClick={() => navigate(`/supportChat/${chat.sender._id}`)}
                        className='flex gap-5 items-center border-b-gray-400 border-2 py-2 cursor-pointer'

                    >
                        <img
                            className='w-[50px] h-[50px] rounded-[50%]'
                            src={chat?.sender?.profile ? chat?.sender?.profile : userImg} alt="" />
                        <div>
                            <p className='bold text-[12px]'>{chat?.sender?.email}</p>
                            <p className='text-[12px]'> {chat?.latestMessage}</p>
                        </div>
                    </div>)
                }
            </div>
            <div className=' py-6 block md:hidden'>
                {
                    data?.data?.data?.map(chat => <div
                        onClick={() => navigate(`/supportChat/${chat.sender._id}`)}
                        className='flex gap-5 items-center border-b-gray-400 border-2 py-2 cursor-pointer'

                    >
                        <img
                            className='w-[50px] h-[50px] rounded-[50%]'
                            src={chat?.sender?.profile ? chat?.sender?.profile : userImg} alt="" />
                        <div>
                            <p className='bold text-[12px]'>{chat?.sender?.email}</p>
                            <p className='text-[12px]'> {chat?.latestMessage}</p>
                        </div>
                    </div>)
                }
            </div>
        </div>
    );
};

export default LeftBar;