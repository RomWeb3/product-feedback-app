import React from "react";
import { useNavigate } from "react-router-dom";
import CardRequest from "../components/CardRequest";

function Roadmap({ datas, onClick }) {
  const navigate = useNavigate();

  const statusCounts = datas?.productRequests?.reduce((counts, request) => {
    counts[request.status] = (counts[request.status] || 0) + 1;
    return counts;
  }, {});

  return datas != [] > 0 ? (
    <>
      <div className="w-full h-[100px] bg-verydarkblue px-6 flex justify-between items-center">
        <div className="flex flex-col gap-[3px] justify-center items-center">
          <div
            className="flex items-center gap-4 cursor-pointer"
            onClick={() => navigate(`/product-feedback-app/`)}
          >
            <img
              src="/assets/shared/icon-arrow-left.svg"
              alt="icon arrow left"
            />
            <p className="text-sm font-bold text-white">Go Back</p>
          </div>
          <h1 className="text-lg font-bold text-white tracking-tighter">
            Roadmap
          </h1>
        </div>
        <button
          className="bg-violet px-4 py-2.5 rounded-[10px] text-sm cursor-pointer font-bold text-white"
          onClick={onClick}
        >
          + Add Feedback
        </button>
      </div>
      <div className="w-full min-h-screen bg-verylightgray">
        <div className="flex items-center py-5">
          <span className="w-[33.3%] text-center text-sm text-gray">
            Planned ({statusCounts["planned"] || 0})
          </span>
          <span className="w-[33.3%] text-center text-sm text-gray">
            In-progress ({statusCounts["in-progress"] || 0})
          </span>
          <span className="w-[33.3%] text-center text-sm text-gray">
            Live ({statusCounts["live"] || 0})
          </span>
        </div>
        <div className="w-full h-[1px] bg-separator"></div>
        <div className="w-full p-6">
          <h3 className="font-bold text-lg text-darkblue mb-[4px]">
            In-progress ({statusCounts["in-progress"] || 0})
          </h3>
          <p className="text-sm text-gray mb-4">
            Features currently being developed
          </p>
          <div className="flex flex-col gap-4">
            {datas != [] > 0 &&
              datas.productRequests.filter(
                (productRequest) => productRequest.status === "in-progress"
              ).length > 0 &&
              datas.productRequests
                .filter(
                  (productRequest) => productRequest.status === "in-progress"
                )
                .map((productRequest) => (
                  <CardRequest
                    productRequest={productRequest}
                    key={productRequest.id}
                  />
                ))}
          </div>
        </div>
      </div>
    </>
  ) : null;
}

export default Roadmap;
