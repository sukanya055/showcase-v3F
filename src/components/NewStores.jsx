import React from "react";
import { MdSlowMotionVideo } from "react-icons/md";
const NewStores = ({ src, shopname }) => {
  return (
    <div className="flex flex-col">
      <img
        src={src}
        alt={shopname}
        className="rounded-full h-[150px] w-[150px]"
      />
      <h1 className="text-lg font-semibold">{shopname}</h1>
      <p className="text-gray-600 text-md">
        <MdSlowMotionVideo /> Videos
        <span>56</span>
      </p>
    </div>
  );
};

export default NewStores;
