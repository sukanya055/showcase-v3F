import React from "react";
import { BsChevronLeft } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { Layout } from "../components";
const PasswordChange = () => {
  const navigate = useNavigate();
  const handleForm = (e) => {
    e.preventDefault();
  };
  return (
    <Layout>
      <>
        <div className="my-20">
          <div
            className={`w-full lg:w-[830px]  mx-auto bg-[#FAFAFA] px-4 md:px-16 lg:px-20 py-20 rounded-lg`}
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
                />
                <label
                  className="text-[#1B1C21] text-[14px] md:text-[16px] font-bold"
                  htmlFor=""
                >
                  Profile
                </label>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  name="radio-2"
                  className="radio radio-primary"
                />
                <label
                  className="text-[#1B1C21] text-[14px] md:text-[16px] font-bold"
                  htmlFor=""
                >
                  Change Password
                </label>
              </div>
            </div>
            <div>
              <form
                onSubmit={handleForm}
                className="w-full lg:w-[80%] mx-auto mt-20"
              >
                <div className="w-full mb-9">
                  <label
                    className="block text-[#858A89] font-bold mb-4 text-[14px] md:text-[16px]"
                    htmlFor=""
                  >
                    Old Password
                  </label>
                  <input
                    type="text"
                    placeholder="Enter Password"
                    className="input input-bordered w-full py-5 md:py-8"
                  />
                </div>
                <div className="w-full mb-9">
                  <label
                    className="block text-[#858A89] font-bold mb-4 text-[14px] md:text-[16px]"
                    htmlFor=""
                  >
                    New Password
                  </label>
                  <input
                    type="text"
                    placeholder="Enter Password"
                    className="input input-bordered w-full py-5 md:py-8"
                  />
                </div>
                <div className="w-full mb-[80px]">
                  <label
                    className="block text-[#858A89] font-bold mb-4 text-[14px] md:text-[16px]"
                    htmlFor=""
                  >
                    Confirm Password
                  </label>
                  <input
                    type="text"
                    placeholder="Enter Password"
                    className="input input-bordered w-full py-5 md:py-8"
                  />
                </div>

                <div className="flex justify-center mt-10">
                  <button
                    className="bg-[#3371F2] text-white px-8  md:px-40 py-3 rounded-xl text-[14px] md:text-[16px]"
                    type="submit"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </>
    </Layout>
  );
};

export default PasswordChange;
