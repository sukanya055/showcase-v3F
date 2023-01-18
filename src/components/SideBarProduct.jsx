import React, { useEffect, useState } from "react";
import { mensCategories } from "../utils/data";
import productVideo from "../assets/video/product.mp4";
import blackFilter from "../assets/blackFilter.png";
import yellowFilter from "../assets/YellowFilter.png";
import axios from "axios";
const SideBarProduct = ({
  selectedCollections,
  sizeNumber,
  SetSize,
  setSizeNumber,
  handleOnChangeCollections,
  content,
  setPrice,
  refetch,
  setDefaultLoader,
  setDiscount
}) => {
  const [priceValue, setPriceValue] = useState(0);
  const [bestVideo, setBestVideo] = useState([]);
  useEffect(() => {
    (async () => {
      const { data } = await axios.get(
        `https://api.showcaseurbusiness.com/admin/min-max-price?content=${
          content?.split("-")[1]?content?.split("-")[1]:"empty"
        }&inputSearch=${content?.split("-")[0]?content?.split("-")[0]:"empty"}`
      );
      setPriceValue(data?.data);
      setPrice(data?.data);
   
      if (!data?.data?.max) setDefaultLoader(true);
      setSizeNumber(data?.data?.max);
      
    })();
  }, [content, setPrice, setSizeNumber, setDefaultLoader]);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(
          `https://api.showcaseurbusiness.com/admin/best-seller-video`
        );
        setBestVideo(data?.data);
      } catch (error) {}
    })();
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center">
        <p className="font-medium text-lg uppercase">Filters</p>
        <div className="flex items-center gap-1">
          <img src={yellowFilter} alt="black" className="h-8 " />
          <img src={blackFilter} alt="black" className="h-8" />
        </div>
      </div>

      <div className="mt-3">
        <h1 className="text-lg font-bold  ">FILTER BY PRICE</h1>
        <div className="w-[100px] h-[2px] bg-yellow-500" />
      </div>
      <div className="mt-3">
        <input
          disabled={!priceValue?.max && true}
          type="range"
          min={0}
          max={priceValue?.max ? priceValue?.max : 1}
          value={sizeNumber}
          onChange={(e) => {
            setSizeNumber(+e.target.value);
            refetch();
          }}
          className="range range-secondary range-xs"
          step="0"
        />
        <div className="w-full flex justify-between text-md font-semibold text-gray-400 px-2">
          <span>{0}</span>
          <span>{priceValue?.max ? priceValue?.max : 1}</span>
        </div>
        <div className="flex justify-end w-full  ">
          <button
            disabled={!priceValue?.max && true}
            onClick={() => setSizeNumber(priceValue?.max ? priceValue?.max : 1)}
            className="btn btn-sm  bg-transparent text-red-600 mt-3"
          >
            Clear all
          </button>
        </div>
      </div>
      <div className="mt-5">
        <h1 className="text-lg font-bold  ">BEST SELLER</h1>
        <div className="w-[100px] h-[2px] bg-yellow-500" />
      </div>
      {bestVideo.map((product) => (
        <div
          className="mt-5 flex flex-col items-center gap-2 w-full"
          key={product?._id}
        >
          <div className=" flex flex-row gap-[2px] w-full">
            <div className="basis-1/2">
              <video height="500" className="w-full" controls>
                <source src={product?.link} type="video/mp4" />
              </video>
            </div>
            <div className="basis-1/2">
              <h1 className="text-md font-semibold text-gray-500 text-center">
                {product?.category}
              </h1>
              <p className="text-lg text-center font-semibold text-yellow-500">
                ₹
                {(
                  +product?.price -
                  (+product?.price * +product?.discount) / 100
                ).toFixed(0)}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SideBarProduct;
