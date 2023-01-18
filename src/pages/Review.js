import axios from 'axios';
import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import ReactStars from 'react-rating-stars-component';
import { Layout } from '../components';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const Review = () => {
    const [rating, setRating] = useState(0)
    const [cookies] = useCookies(['token'])
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const { id } = useParams()
   
    useEffect(() => {
        if (success) {
           
            toast.success(success, {
                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    }, [success]);


    const handleStar = rating => {
        setRating(rating)
      
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (e.target.review.value === '' || e.target.review.length < 20) {
            setError('Letter must be greater than 20')
        }

        setError('')
        const formData = {
            review: e.target.review.value,
            star: rating,
            productId: id
        }
       
        fetch(`https://api.showcaseurbusiness.com/review/add-review`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': cookies?.token,
            },
            body: JSON.stringify(formData)
        }).then(res => res.json())
            .then(data => {
                console.log(data)
                if(data?.message === 'Success'){
                    setSuccess('Thank you for your review')
                }
            })
            e.target.reset()
            
    }

    return (
        <Layout>
            <div className='my-32'>
                <h1 className='text-[18px] sm:text-xl md:text-2xl lg:text-3xl text-center font font-bold my-9 text-[#545454]'>Please rate your experience!</h1>
                <div className='w-[70%] mx-auto '>
                    <div className='flex justify-center mb-9'>
                        <ReactStars
                            count={5}
                            onChange={handleStar}
                            size={34}
                            activeColor="#ffd700"
                        />
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className='w-[70%] mt-5 mx-auto'>
                            <textarea class="textarea textarea-bordered w-full min-h-[160px]" name='review' placeholder="Please describe your experience...."></textarea>
                        </div>
                        <div className='text-center mt-3' >
                            <input className='btn btn-primary bg-[#3371F2] rounded-full border-0 px-10 text-white mt-10' type="submit" value='Submit' />
                        </div>
                    </form>
                    {
                        error && <p className='text-red-500 my-10 text-center '>{error}</p>
                    }
                </div>
                <ToastContainer />
            </div>
        </Layout>
    );
};

export default Review;






