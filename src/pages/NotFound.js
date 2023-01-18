import React from 'react';
import { Layout } from '../components';
const NotFound = () => {
    return (
        <Layout>
            <div className='h-screen flex justify-center items-center'>
                <div className='text-center'>
                    <h3 className='font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl'> 404 | Not Found</h3>
                    <p className='pt-3'>Sorry we can't found this route</p>
                </div>
            </div>
        </Layout>
    );
};

export default NotFound;