import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { uploadFile } from 'react-s3';
import { useCookies } from 'react-cookie';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { allMenu } from '../../utils/data';
const S3_BUCKET = 'showcase28';
const REGION = 'us-east-1';
const ACCESS_KEY = 'AKIAQFXX4ZU3AHYZQUFH';
const SECRET_ACCESS_KEY = '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';


const config = {
    bucketName: S3_BUCKET,
    region: REGION,
    accessKeyId: ACCESS_KEY,
    secretAccessKey: SECRET_ACCESS_KEY,
}

const PostVideo = ({ openModal, setOpenModal, userId }) => {
    const [cookies, setCookie, removeCookie] = useCookies(['token']);
    const [video, setVideo] = useState('')
    const [load, setLoad] = useState(false)
    const [successMessage, setSuccessMessage] = useState('')
    const [errorMessage, setErrorMessage] = useState('')

    const [formData, setFormData] = useState({
        email: '',
        description: '',
        price: '',
        category: '',
        productType: '',
        productBrand: '',
        companyName: '',
        link: '',
        userId,
        discount: '',
        videoOwner: userId
    })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState({
        videError: ''
    })
    console.log(userId)

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

            toast.success(errorMessage, {
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



    const videoHandler = (event) => {
        setLoading(true)


        window.Buffer = window.Buffer || require("buffer").Buffer;
        uploadFile(event.target.files[0], config)
            .then(data => {
                setLoading(false)
                // setFormData({...formData,link:data?.location,userId})
                return setVideo(data?.location)

            })
            .catch(error => {
                setLoading(false)
                console.log(error)
            }
            )
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(formData)
        setErrorMessage('')
        setSuccessMessage('')
        try {
            if (cookies?.token) {

                if (!video) {
                    return setError({ ...error, videError: 'Please select a video' })
                }
                if (formData?.description.length < 25) {
                    return setError({ ...error, videError: 'Description length must be greater that 27' })
                }

                setError({ ...formData, videError: '' })
                setLoad(true)
                fetch(`https://api.showcaseurbusiness.com/admin/products`, {
                    method: "POST",
                    headers: {
                        'Authorization': cookies?.token,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        data: formData,
                        video,
                        userId,
                        videoOwner: userId
                    })
                })
                    .then(res => {

                        return res.json()
                    })
                    .then(data => {
                        setLoad(false)
                        setSuccessMessage('Product upload success')
                        setOpenModal(null)
                        console.log(data)
                    }
                    )
            }
        } catch (error) {
            setErrorMessage('There was an server error!')
        }
    }
    console.log(formData)
    return (
        <div>

            <input type="checkbox" id="my-modal-6" className="modal-toggle" />
            <div className="modal modal-bottom sm:modal-middle">
                <div className="modal-box max-w-[900px] scrollbar-hide">
                    <label htmlFor="my-modal-6" className="btn btn-sm btn-circle ">✕</label>
                    <h5 className='text-center my-10 text-2xl font-bold'>Post Your Video</h5>
                    <div className="card-body">
                        <form onSubmit={handleSubmit}>
                            <div className='text-center mb-8 '>
                                <input
                                    onChange={videoHandler}
                                    className='hidden'
                                    type="file"
                                    id="video"
                                    disabled={loading ? true : false}

                                />
                                <label
                                    className='btn bg-[#858A89] rounded-full px-9 py-2 capitalize text-white' htmlFor="video">
                                    {loading ? 'Uploading Video' : 'Choose Video'}
                                </label>
                            </div >
                            {
                                video && <div className='flex justify-center mb-7'>
                                    <video
                                        className=''
                                        src={video}
                                        autoPlay={true}
                                        muted={true}
                                        width='220px'
                                        height={'140px'}
                                        loop={true}
                                    ></video>
                                </div>
                            }
                            <div className="form-control my-4">
                                <label className="label">
                                    <span className="label-text">Company Name</span>
                                </label>
                                <input
                                    value={formData.companyName}
                                    onChange={e => setFormData({ ...formData, companyName: e.target.value })}
                                    type="text"
                                    className="input input-bordered"
                                    required
                                    autoComplete='off'
                                />
                            </div>
                            <div className="form-control my-4">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input
                                    value={formData.email}
                                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                                    type="email"
                                    className="input input-bordered"
                                    required
                                    autoComplete='off'
                                />

                            </div>
                            <div className="form-control my-4">
                                <label className="label">
                                    <span className="label-text">Product Brand(with Model)</span>
                                </label>
                                <input
                                    value={formData.productBrand}
                                    onChange={e => setFormData({ ...formData, productBrand: e.target.value })}
                                    type="text"
                                    className="input input-bordered"
                                    autoComplete='off'
                                    required />
                            </div>
                            <div className="form-control my-4">
                                <label className="label">
                                    <span className="label-text">Product Type</span>
                                </label>
                                <select
                                    required
                                    value={formData.productType}
                                    onChange={e => setFormData({ ...formData, productType: e.target.value })}
                                    className="select select-bordered w-full " >
                                    <option value="">Select a product type</option>
                                    <option value="Men">Men</option>
                                    <option value="Women">Women</option>
                                    <option value="Kids">Kids</option>
                                    <option value="Home&Kitchen">Home&Kitchen</option>
                                </select>

                            </div>
                            <div className="form-control my-4">
                                <label className="label">
                                    <span className="label-text">Category</span>
                                </label>
                                <select
                                    required
                                    value={formData.category}
                                    onChange={e => setFormData({ ...formData, category: e.target.value || null })}
                                    className="select select-bordered w-full " >
                                    
                                      <option disabled value="Select a product category">Select a product category</option>
                                    {
                                        allMenu.map((menu, i) => <option
                                            key={i}
                                            value={menu?.name}>{menu?.name}</option>)
                                    }
                                </select>

                            </div>

                            <div className="form-control my-4">
                                <label className="label">
                                    <span className="label-text">Product price</span>
                                </label>
                                <input
                                    value={formData.price}
                                    onChange={e => setFormData({ ...formData, price: e.target.value })}
                                    type="number"
                                    className="input input-bordered"
                                    required
                                />
                            </div>
                            <div className="form-control my-4">
                                <label className="label">
                                    <span className="label-text">Product discount (optional)</span>
                                </label>
                                <input
                                    value={formData.discount}
                                    onChange={e => setFormData({ ...formData, discount: e.target.value })}
                                    type="number"
                                    className="input input-bordered"
                                    required
                                />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Product Description</span>
                                </label>
                                <textarea
                                    value={formData.description}
                                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                                    className="textarea textarea-bordered"
                                    required
                                >
                                </textarea>
                            </div>

                            <div className="form-control mt-6">
                                <button
                                    disabled={load}
                                    className="btn btn-primary">{load ? 'Uploading' : "Post"}</button>
                            </div>
                            {
                                error?.videError && <p className='text-red-500 text-center py-3 text-[14px]'>{error?.videError}</p>
                            }
                        </form>
                    </div>

                    <div className="modal-action ">
                        <label onClick={() => setOpenModal(null)} htmlFor="my-modal-6 " className="btn bg-red-500 text-white">Cancel</label>
                    </div>
                    <ToastContainer />
                </div>
            </div>
        </div >
    );
};

export default PostVideo;