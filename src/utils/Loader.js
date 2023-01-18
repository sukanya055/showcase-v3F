import React from 'react';
import loader from '../assets/loader.gif'
const Loader = () => {
    return (
        <div className='h-screen flex justify-center items-center'>
                <img className='object-cover' src={loader} alt="" />
        </div>
    );
};

export default Loader;