import React from 'react';
import video1 from '../assets/video/pexels-ron-lach-8306452.mp4';
import video2 from '../assets/video/production ID_4008527.mp4';

const DummyVideos = () => {
    return (
        <div>
            <h1 className="text-gray-900 text-2xl font-bold mb-1 pl-5 pb-5">Locations near you</h1>
        <div className="flex flex-wrap">
        <div className="w-full md:w-6/12 lg:w-3/12 mb-6 px-6 sm:px-6 lg:px-4">
            <div className="flex flex-col">
           <video className="w-full h-[200px]" controls src={video1} />
           <div className="mt-3 px-4 py-3">
           <h4 className="text-md font-normal text-black capitalize">
          Store: <span className="capitalize">Smiley</span>
        </h4>
      <h4 className="text-md font-normal text-black capitalize">
          Offer: <span className="capitalize">30%</span>
        </h4>
    </div>
            </div>
        </div>

        <div className="w-full md:w-6/12 lg:w-3/12 mb-6 px-6 sm:px-6 lg:px-4">
            <div className="flex flex-col">
          <video  className="w-full h-[200px]" controls src={video2} />
                <div className="mt-3 px-4 py-3">
           <h4 className="text-md font-normal text-black capitalize">
          Store: <span className="capitalize">Smiley</span>
        </h4>
      <h4 className="text-md font-normal text-black capitalize">
          Offer: <span className="capitalize">30%</span>
        </h4>
    </div>
            </div>
        </div>

        <div className="w-full md:w-6/12 lg:w-3/12 mb-6 px-6 sm:px-6 lg:px-4">
            <div className="flex flex-col">
            <video className="w-full h-[200px]" controls src={video1} />
            <div className="mt-3 px-4 py-3">
           <h4 className="text-md font-normal text-black capitalize">
          Store: <span className="capitalize">Smiley</span>
        </h4>
      <h4 className="text-md font-normal text-black capitalize">
          Offer: <span className="capitalize">30%</span>
        </h4>
    </div>
            </div>
        </div>

        <div className="w-full md:w-6/12 lg:w-3/12 mb-6 px-6 sm:px-6 lg:px-4">
            <div className="flex flex-col">
            <video  className="w-full h-[200px]" controls src={video2} />
            <div className="mt-3 px-4 py-3">
           <h4 className="text-md font-normal text-black capitalize">
          Store: <span className="capitalize">Smiley</span>
        </h4>
      <h4 className="text-md font-normal text-black capitalize">
          Offer: <span className="capitalize">30%</span>
        </h4>
    </div>
            </div>
        </div>
    </div>
    </div>
    );
};

export default DummyVideos;