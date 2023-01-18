import React from "react";
import Card from "./Card";

const MainProducts = ({ filteredData, isLoading }) => {

  return (
    <div>
      <div className="flex flex-wrap mt-8 gap-20 items-center justify-center">
        {filteredData?.length > 0 ? (
          filteredData?.map((product) => (
            <Card key={product._id} product={product} />
          ))
        ) : (
          <p className="text-xl font-semibold capitalize text-red-500">
            {(
              filteredData?.length === 0) &&
              " No Products Data Available"}
          </p>
        )}
        
      </div>
    </div>
  );
};

export default MainProducts;
