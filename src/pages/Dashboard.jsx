import React from "react";
import {
  AdminSideBar,
  BarChart,
  Layout,
  AreaChart,
  DonotChart,
  SimpleTable,
  Reviews,
  DataTable,
  RecentActivity,
  CustomerCard,
} from "../components";
import { IoLocation } from "react-icons/io5";
import { BsFillEyeSlashFill, BsGraphUp } from "react-icons/bs";
import { FaMoneyCheckAlt } from "react-icons/fa";
import { BiTrendingDown } from "react-icons/bi";
import ProgressBar from "@ramonak/react-progress-bar";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useQuery } from "react-query";
import axios from "axios";
import Loader from '../utils/Loader'


const features = [
  {
    id: "1",
    icon: IoLocation,
    title: 91400,
    desc: "Visits",
  },
  {
    id: "2",
    icon: FaMoneyCheckAlt,
    title: 91400,
    desc: "Bounce Rate",
  },
  {
    id: "3",
    icon: BsFillEyeSlashFill,
    title: 91400,
    desc: "Page View",
  },
  {
    id: "4",
    icon: BsGraphUp,
    title: 91400,
    desc: "Growth Rate",
  },
];

const Dashboard = () => {
  const { isLoading, data, refetch } = useQuery(
    ["get-all-product-details"],
    () => axios.get(`https://api.showcaseurbusiness.com/review/get-all-product-details`)
  );

    if(isLoading) return <Loader/>

  return (
    <Layout adminNav>
      <div className="flex flex-row">
        <AdminSideBar />
        <div className="basis-5/6 px-3  w-full py-6 ">
          <div className="rounded-xl px-6 py-4 w-full bg-gray-100 ">
            {/* Top Part */}
            <div className="flex flex-row items-stretch ">
              <div className="basis-4/6">
                <div className="flex gap-5 items-center justify-center mx-2 my-5">
                  {features.map((item) => (
                    <div
                      key={item.id}
                      className="rounded-3xl px-6 py-2 gap-2 h-[147px] justify-center w-[157px] flex flex-col items-center hover:scale-105 transition-transform duration-100 ease-in cursor-pointer bg-white  "
                    >
                      <item.icon className="text-3xl   text-violet-900" />
                      <div className="">
                        <h1 className="text-xl font-semibold text-center text-gray-500">
                          {item.title}
                        </h1>
                        <p className="text-md font-medium text-center text-gray-400">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-3 justify-center">
                  {/* Linear Progress bar */}
                  <div className="bg-white flex flex-col justify-center rounded-2xl w-[325px] h-[261px] px-5 py-6">
                    <p className=" text-center text-md font-semibold text-gray-600 uppercase ">
                      Customer satisfaction
                    </p>
                    <h1 className="text-3xl font-semibold text-center">
                      93.13%
                    </h1>
                    <ProgressBar
                      completed={93.13}
                      bgColor="#32CD32"
                      height="13px"
                      className="my-5"
                    />
                    <div className="flex items-center justify-evenly   gap-5">
                      <div className="">
                        <h3 className="text-md text-gray-500 font-semibold">
                          Previous
                        </h3>
                        <p className="text-md text-gray-600 font-semibold ">
                          324222
                        </p>
                      </div>
                      <div className="">
                        <h3 className="text-md text-gray-500 font-semibold">
                          Change+
                        </h3>
                        <p className="text-md text-gray-600 font-semibold ">
                          +42.9
                        </p>
                      </div>
                      <div className="">
                        <h3 className="text-md text-gray-500 font-semibold">
                          Trend
                        </h3>
                        <BiTrendingDown className="text-red-700 text-xl" />
                      </div>
                    </div>
                  </div>
                  {/* Circular Progressbar */}
                  <div className="bg-white flex justify-center rounded-2xl w-[394px] h-[264px] px-5 py-6">
                    <div className="flex-1 py-12 px-8 flex justify-center">
                      <CircularProgressbar
                        value={73}
                        text={`${73}%`}
                        strokeWidth={5}
                        styles={buildStyles({
                          textColor: "#32CD32",
                          pathColor: "#32CD32",
                          trailColor: "lightgray",
                        })}
                      />
                    </div>
                    <div className="flex-1 justify-center  flex flex-col ">
                      <div className="">
                        <h1 className="text-md w-full font-semibold text-gray-500">
                          Cart Aboondenment
                        </h1>
                        <h2 className="text-2xl font-semibold text-gray-600">
                          73%
                        </h2>
                        <p className="text-green-500  font-semibold text-md">
                          +15%
                        </p>
                      </div>
                      <div className="">
                        <h1 className="text-lg font-semibold text-gray-500">
                          Revenue Left
                        </h1>
                        <h2 className="text-2xl font-semibold text-gray-600">
                          $12432
                        </h2>
                        <p className="text-green-500  font-semibold text-md">
                          +5%
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="basis-2/6">
                <div className="bg-white px-3 py-2 rounded-xl h-full">
                  <AreaChart />
                </div>
              </div>
            </div>
            {/* Second Part */}
            <div className="flex mt-8 gap-5 justify-center  px-5 py-4 ">
              <div className="bg-white w-[600px] h-[347px] px-5 py-4 rounded-xl">
                <DonotChart />
              </div>
              <div className="bg-white w-[445px] h-[345px] px-5 py-4 rounded-xl">
                <BarChart />
              </div>
            </div>
            {/* Third Part */}
            <div className="flex mt-8 justify-center gap-5 items-start px-3 py-2">
              <div className="flex-1">
                <SimpleTable />
              </div>
              <div className="flex-1">
                <Reviews 
                  data={data?.data?.data}
                />
              </div>
            </div>
            {/* Customer Revies Carosal */}
            <div className="mt-10">
              <CustomerCard 
              data={data?.data?.data}
              refetch={refetch}
              />
            </div>
            {/* Data table */}
            <div className="flex w-full">
              <div className="basis-3/5 ">
                <DataTable />
              </div>
              <div className="basis-2/5  ">
                <RecentActivity />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
