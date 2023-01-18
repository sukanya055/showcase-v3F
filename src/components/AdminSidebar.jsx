import React from "react";
import {
  MdOutlineDashboard,
  MdOutlineWidgets,
  MdOutlineManageAccounts,
  MdOutlineSettings,
} from "react-icons/md";
import { TiShoppingCart } from "react-icons/ti";
import { GiShipWheel } from "react-icons/gi";
const itemStyle =
  "flex items-center gap-2 text-gray-500 font-normal text-lg capitalize transition-transform delay-75 duration-100 ease-in cursor-pointer hover:scale-105";
const AdminSideBar = () => {
  return (
    <div className="basis-1/6 px-8 py-12 ">
      <div className="flex flex-col gap-4">
        <div className={itemStyle}>
          <MdOutlineDashboard />
          <h1>Dashboard</h1>
        </div>
        <div className={itemStyle}>
          <TiShoppingCart />
          <h1>E-Commerce</h1>
        </div>
        <div className={itemStyle}>
          <GiShipWheel />
          <h1>apps</h1>
        </div>
        <div className={itemStyle}>
          <MdOutlineWidgets />
          <h1>Widget</h1>
        </div>
      </div>
      <div className="flex flex-col gap-3 mt-16">
        <div className={itemStyle}>
          <MdOutlineManageAccounts />
          <h1>Account</h1>
        </div>
        <div className={itemStyle}>
          <MdOutlineSettings />
          <h1>Settings</h1>
        </div>
      </div>
    </div>
  );
};

export default AdminSideBar;
