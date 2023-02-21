import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CardRequest from "../components/CardRequest";

function Roadmap({ datas, onClick }) {
  const navigate = useNavigate();
  const [status, setStatus] = useState("in-progress");

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
        <div className="flex items-center pt-5">
          <span
            className="w-[33.3%] text-center text-sm text-gray pb-4"
            style={{
              color: status === "planned" && "#3A4374",
              fontWeight: status === "planned" && "bold",
              borderBottom: status === "planned" && "4px solid #F49F85",
            }}
            onClick={() => setStatus("planned")}
          >
            Planned ({statusCounts["planned"] || 0})
          </span>
          <span
            className="w-[33.3%] text-center text-sm text-gray pb-4"
            style={{
              color: status === "in-progress" && "#3A4374",
              fontWeight: status === "in-progress" && "bold",
              borderBottom: status === "in-progress" && "4px solid #AD1FEA",
            }}
            onClick={() => setStatus("in-progress")}
          >
            In-Progress ({statusCounts["in-progress"] || 0})
          </span>
          <span
            className="w-[33.3%] text-center text-sm text-gray pb-4"
            style={{
              color: status === "live" && "#3A4374",
              fontWeight: status === "live" && "bold",
              borderBottom: status === "live" && "4px solid #62BCFA",
            }}
            onClick={() => setStatus("live")}
          >
            Live ({statusCounts["live"] || 0})
          </span>
        </div>
        <div className="w-full h-[1px] bg-separator mt-[-1px]"></div>
        <div className="w-full p-6">
          <h3 className="font-bold text-lg text-darkblue mb-[4px]">
            {status === "planned" ? (
              <>Planned ({statusCounts["planned"] || 0})</>
            ) : status === "in-progress" ? (
              <>In-Progress ({statusCounts["in-progress"] || 0})</>
            ) : (
              <>Live ({statusCounts["live"] || 0})</>
            )}
          </h3>
          <p className="text-sm text-gray mb-4">
            {status === "planned" ? (
              <>Ideas prioritized for research</>
            ) : status === "in-progress" ? (
              <>Currently being developed</>
            ) : (
              <>Released features</>
            )}
          </p>
          <div className="flex flex-col gap-4">
            {datas != [] > 0 &&
              datas.productRequests.filter(
                (productRequest) => productRequest.status === status
              ).length > 0 &&
              datas.productRequests
                .filter((productRequest) => productRequest.status === status)
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
