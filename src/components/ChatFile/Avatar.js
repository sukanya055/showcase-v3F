import React, { useState } from 'react';
import { SiGooglemessages } from 'react-icons/si';
const Avatar = ({setFormOpen,formOpen}) => {

    const [show, setShow] = useState(false)

    return (
        <div className='fixed bottom-[40px] right-5 flex items-center gap-5'>
            {
                show && <div 
                style={{
                    transition:'2s ease-in-out'
                }}
                className='text-white bg-[#3371F2] opacity-80 p-3 rounded-xl'>
                    <p>Hi ! How can I help you</p>
                </div>
            }
            <div
                onMouseEnter={() => setShow(true)}
                onMouseLeave={() => setShow(false)}
                onClick={()=>setFormOpen(!formOpen)}
                className='bg-[#3371F2] w-[60px] h-[60px] flex justify-center items-center p-4 text-white rounded-full cursor-pointer'>
                <SiGooglemessages
                    className='text-3xl font-bold'
                />
            </div>
        </div>
    );
};

export default Avatar;