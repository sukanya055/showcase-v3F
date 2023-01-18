import React, { useEffect, useState } from "react";
import { BsChevronLeft } from "react-icons/bs";
import { useLocation, useNavigate } from "react-router-dom";
import { uploadFile } from "react-s3";
import profileImg from "../assets/images/profile.png";
import { Layout } from "../components";
import styles from "../components/Profile/NormalProfile.module.css";
import { useCookies } from 'react-cookie';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import DeleteModal from "./modal/DeleteModal";

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



const BusinessProfile = ({userId}) => {

  const [cookies] = useCookies(['token']);
  const navigate = useNavigate();
  const [image, setImage] = useState("");
  const [ErrorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false)
  const [name, setName] = useState('')
  const [about, setAbout] = useState('')
  const [whatsapp, setWhatsApp] = useState('')
  const [phone, setPhone] = useState('')
  const [openModal, setOpenModal] = useState(false)
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
    (async () => {
      let token = cookies?.token;
      if (token !== undefined && token !== null) {
        token = token.replace(/['"]+/g, "");
        try {
          const response = await axios.get('https://api.showcaseurbusiness.com/user/getpic', {
            headers: {
              'Authorization': cookies?.token,
            }
          });
        
          setImage(response.data.profile);

        }
        catch (err) {
          console.log(err)
        }
      }
      else {
        alert("Login please");
      }
    })();

  }, [cookies]);


  const handleForm = async (e) => {
    e.preventDefault();
    setLoading(true)
 
    if (cookies?.token) {
      try {

        const { data } = await axios.patch('https://api.showcaseurbusiness.com/user/editpro', {
          name: name,
          phone: phone,
          about: about,
          whats: whatsapp,
          profile: image
        }, {
          headers: {
            'Authorization': cookies?.token,
          }
        });
        navigate('/businessProfile/businessDashboard')
      } catch (error) {
        if (error.response) {
          setLoading(false)
          setErrorMessage(error.response.data.msg)
        }
      }
    }

  };

  const onImageChange = async (event) => {

    setLoading(true)
    window.Buffer = window.Buffer || require("buffer").Buffer;
    uploadFile(event.target.files[0], config)
      .then(data => {
        setLoading(false)
    
        return setImage(data?.location)

      })
      .catch(error => {
        setLoading(false)
      
      }
      )

  };

  const handleRoute = (path) => {
    navigate(`/businessProfile/${path}`)
  }


  return (
    <Layout>
      <div className="my-20">
        <div
          className={`w-full lg:w-[830px]  mx-auto bg-[#FAFAFA] px-4 md:px-16 lg:px-20 py-20 rounded-lg ${styles.normalProfileBoxShadow}`}
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
                onClick={() => handleRoute('updateBusinessProfile')}
              />
              <label
                className="text-[#1B1C21] text-[14px] md:text-[16px] font-bold"
                htmlFor=""
                type='check'

              >
                Profile
              </label>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="radio"
                name="radio-2"
                className="radio radio-primary"
                onClick={() => handleRoute('updateBusinessPassword')}
              />
              <label
                className="text-[#1B1C21] text-[14px] md:text-[16px] font-bold"
                htmlFor=""

              >
                Change Password
              </label>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="radio"
                name="radio-2"
                className="radio radio-primary"
                onClick={() => handleRoute('updateGps')}
              />
              <label
                className="text-[#1B1C21] text-[14px] md:text-[16px] font-bold"
                htmlFor=""

              >
                GPS
              </label>
            </div>
          </div>
          <div className="py-10 flex justify-center ">
            <div>
              <div className="w-[140px] h-[140px] md:w-[154px] md:h-[154px] rounded-[50%] mx-auto">
                <img
                  className="w-[140px] h-[140px] md:w-[154px] md:h-[154px] rounded-[50%] mx-auto object-cover"
                  src={image ? image : profileImg}
                  alt=""
                />
              </div>
              <div className="text-center">
                <input
                  onChange={onImageChange}
                  type="file"
                  id="img"
                  className="hidden"
                />
                <label
                  className="btn bg-[#858A89] px-[26px] md:px-[36px] mt-[14px] text-white font-bold text-[14px] md:text-[16px] rounded-full "
                  htmlFor="img"
                >
                  {loading ? "Uploading..." : "Add pic"}
                </label>
                <p className="mt-5 text-[#858A89] text-[14px] md:text-[16px] ">
                  People visiting your profile will see the following info
                </p>
              </div>
            </div>
          </div>
          <div>
            <form onSubmit={handleForm} className="w-full lg:w-[80%] mx-auto">
              <div className="w-full mb-9">
                <label
                  className="block text-[#858A89] font-bold mb-4 text-[14px] md:text-[16px]"
                  htmlFor=""

                >
                  User Name
                </label>
                <input
                  value={name}
                  onChange={e => setName(e.target.value)}
                  type="text"
                  className="input input-bordered w-full" />
              </div>
              <div className="w-full mb-9">
                <label
                  className="block text-[#858A89] font-bold mb-4 text-[14px] md:text-[16px]"
                  htmlFor=""

                >
                  Whatsapp link
                </label>
                <input
                  value={whatsapp}
                  onChange={e => setWhatsApp(e.target.value)}
                  type="text" className="input input-bordered w-full" />
              </div>
              <div className="w-full mb-9">
                <label
                  className="block text-[#858A89] font-bold mb-4 text-[14px] md:text-[16px]"
                  htmlFor=""

                >
                  Phone Number
                </label>
                <input
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  type="text" className="input input-bordered w-full" />
              </div>
              <div className="w-full  mt-10">
                <label
                  className="block text-[#858A89] font-bold mb-4 text-[14px] md:text-[16px]"
                  htmlFor=""

                >
                  About Me
                </label>
                <textarea
                  value={about}
                  onChange={e => setAbout(e.target.value)}
                  className="textarea textarea-bordered w-full min-h-[165px]"></textarea>
              </div>
              <div className="flex gap-4 justify-center mt-[64px] flex-col md:flex-row">
                <p className="border-2 border-[#CED0D0] px-4 py-2 text-[#858A89] border-solid cursor-pointer text-center  rounded-md text-[14px] md:text-[16px]">
                  Temporarily disable my account
                </p>
                <p className="flex justify-center items-center">
                  <label onClick={()=>setOpenModal(true)} htmlFor="my-modal-3" className="border-2 border-[#CED0D0] px-4 py-2 text-[#858A89] border-solid cursor-pointer text-center rounded-md text-[14px] md:text-[16px]">Delete Account</label>
                </p>
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
            {
              openModal && <DeleteModal
              setOpenModal={setOpenModal}
              />
            }
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BusinessProfile;
