import React, { useState, useEffect } from "react";
import { Layout, MainProducts } from "../components";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { FiFilter } from "react-icons/fi";
import SideBarProduct from "../components/SideBarProduct";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import axios from "axios";
import Loader from "../utils/Loader";
import ReactPaginate from "react-paginate";
const Products = () => {
  const [price, setPrice] = useState("");
  const [selectedCollections, setSelectedCollections] = useState([]);
  const [sizeNumber, setSizeNumber] = useState(price?.max);
  
  const [defaultLoader, setDefaultLoader] = useState(false);
  const [sortedBy, setSortedBy] = useState("1");
  const { content } = useParams();
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(8);
  const [count, setCount] = useState();
  const [loader, setLoader] = useState(true);

  const { isLoading, data, refetch } = useQuery(
    [
      "get-all-video",
      content?.split("-")[0],
      content?.split("-")[1],
      sortedBy,
      sizeNumber,
      page,
    ],

    () =>
      axios.get(
        `https://api.showcaseurbusiness.com/admin/get-product?content=${
          content.split("-")[0]
        }&user=${content?.split("-")[1]}&sortedBy=${sortedBy}&minPrice=${
          price?.min || 0
        }&maxPrice=${sizeNumber}&size=${size}&page=${page}`
      )
  );

  useEffect(() => {
    const length = Math.ceil(data?.data?.count / 8);
    setCount(length);
  }, [data?.data?.count]);

  useEffect(() => {
    if (sizeNumber) {
      setLoader(false);
    }
  }, [sizeNumber]);
  useEffect(() => {
    if (defaultLoader) {
      setLoader(false);
    }
  }, [defaultLoader]);


  const handlePageClick = (data) => {
    setPage(data?.selected);
  };

  const handleOnChangeCollections = (e) => {
    if (e.target.checked) {
      setSelectedCollections([...selectedCollections, e.target.value]);
    } else {
      setSelectedCollections(
        selectedCollections.filter((item) => item !== e.target.value)
      );
    }
  };


  return (
    <Layout>
      <div className="px-8 py-5">
        <div className="">
          <p className="font-normal text-gray-700 text-md">
            {content?.split("-")[1]} Sections
          </p>
          <h1 className="font-semibold capitalize text-lg">
            {content?.split("-")[1]} {content?.split("-")[0]} -{" "}
            {data?.data?.result?.length} items
          </h1>
        </div>

        <div className="flex justify-between mt-5 md:justify-end items-center">
          <label
            htmlFor="my-modal-3"
            className=" md:hidden flex items-center btn modal-button"
          >
            <FiFilter className="text-2xl   cursor-pointer text-gray-900" />
          </label>

          <select
            disabled={defaultLoader}
            className="select  w-auto select-primary bg-gray-100  max-w-xs capitalize "
            onChange={(e) => setSortedBy(e.target.value)}
          >
            <option value="Sort By" disabled selected>
              Sort By
            </option>

            <option value="-1">Price high to low</option>
            <option value="1">Price Low to High</option>
          </select>
        </div>

        <div className="flex flex-row h-full ">
          <div className="basis-1/4 h-full px-4 py-3 hidden md:block items-center">
            <SideBarProduct
              selectedCollections={selectedCollections}
              handleOnChangeCollections={handleOnChangeCollections}
              sizeNumber={sizeNumber}
              setSizeNumber={setSizeNumber}
              content={content}
              setPrice={setPrice}
              refetch={refetch}
              setDefaultLoader={setDefaultLoader}
            />
          </div>
          <div className="md:basis-3/4 basis-4/4 h-full">
            {loader && <Loader />}
            <MainProducts
              filteredData={data?.data?.result}
              isLoading={isLoading}
            />
          </div>
        </div>
        <div className="md:hidden block absolute top-0">
          <input type="checkbox" id="my-modal-3" className="modal-toggle" />
          <div className="modal">
            <div className="modal-box relative">
              <label
                htmlFor="my-modal-3"
                className="btn btn-sm btn-circle text-xl  absolute right-2 top-2"
              >
                ✕
              </label>
              <div className="mt-8">
                <SideBarProduct
                  selectedCollections={selectedCollections}
                  handleOnChangeCollections={handleOnChangeCollections}
                  sizeNumber={sizeNumber}
                  setSizeNumber={setSizeNumber}
                />
              </div>
            </div>
          </div>
        </div>

        {data?.data?.result?.length > 0 && (
          <div className="flex justify-center items-center mb-5">
            <div className="w-[100%]  flex items-center justify-center">
              <ReactPaginate
                previousLabel={
                  <HiChevronLeft className="text-3xl  flex justify-center items-center" />
                }
                nextLabel={
                  <HiChevronRight className="text-3xl flex justify-center items-center" />
                }
                breakLabel={"..."}
                pageCount={count}
                marginPagesDisplayed={1}
                pageRangeDisplayed={2}
                onPageChange={handlePageClick}
                containerClassName={"paginateContainer"}
                pageClassName={"page-btn"}
                previousClassName={"previous"}
                previousLinkClassName={"link-btn"}
                pageLinkClassName={"link-btn"}
                nextClassName={"previous"}
                breakClassName={"page-btn"}
                breakLinkClassName={"link-btn"}
                nextLinkClassName={"link-btn"}
                activeClassName={"active-btn"}
                activeLinkClassName={"active-btn"}
              />
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Products;
