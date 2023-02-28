import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CardRequest from "../components/CardRequest";

function Roadmap({ datas, setDatas, onClick }) {
  const navigate = useNavigate();
  const [status, setStatus] = useState("in-progress");
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  const statusCounts = datas?.productRequests?.reduce((counts, request) => {
    counts[request.status] = (counts[request.status] || 0) + 1;
    return counts;
  }, {});

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return screenWidth < 768 ? (
    datas != [] > 0 ? (
      <>
        <div className="w-full h-[100px] bg-verydarkblue px-6 flex justify-between items-center">
          <div className="flex flex-col gap-[3px] justify-center items-center">
            <div
              className="flex items-center gap-3 cursor-pointer"
              onClick={() => navigate(`/product-feedback-app/`)}
            >
              <img
                src="/assets/shared/icon-arrow-left-white.svg"
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
                      datas={datas}
                      setDatas={setDatas}
                    />
                  ))}
            </div>
          </div>
        </div>
      </>
    ) : null
  ) : datas != [] > 0 ? (
    <div className="px-10 bg-verylightgray min-h-screen py-[56px] xl:pt-[78px] flex flex-col items-center">
      <div className="w-full max-w-[1110px] h-[100px] md:h-[113px] bg-verydarkblue px-6 md:px-8 flex justify-between items-center rounded-[10px]">
        <div className="flex flex-col gap-[3px] justify-center">
          <div
            className="flex items-center gap-4 cursor-pointer"
            onClick={() => navigate(`/product-feedback-app/`)}
          >
            <img
              src="/assets/shared/icon-arrow-left-white.svg"
              alt="icon arrow left"
            />
            <p className="text-sm font-bold text-white hover:underline transition-all">
              Go Back
            </p>
          </div>
          <h1 className="text-lg md:text-2xl font-bold text-white tracking-tighter">
            Roadmap
          </h1>
        </div>
        <button
          className="bg-violet hover:bg-[#C75AF6] transition-all px-4 md:px-6 py-2.5 md:py-3 rounded-[10px] text-sm cursor-pointer font-bold text-white"
          onClick={onClick}
        >
          + Add Feedback
        </button>
      </div>
      <div className="w-full max-w-[1110px] pt-8 grid grid-cols-3 gap-[10px] lg:gap-[20px] xl:gap-[30px]">
        <div>
          <h3 className="font-bold text-base xl:text-lg text-darkblue mb-[4px]">
            Planned ({statusCounts["planned"] || 0})
          </h3>
          <p className="text-sm xl:text-base text-gray mb-4">
            Ideas prioritized for research
          </p>
          <div className="w-full flex flex-col gap-4">
            {datas != [] > 0 &&
              datas.productRequests.filter(
                (productRequest) => productRequest.status === status
              ).length > 0 &&
              datas.productRequests
                .filter((productRequest) => productRequest.status === "planned")
                .map((productRequest) => (
                  <CardRequest
                    productRequest={productRequest}
                    key={productRequest.id}
                    withoutMediaQueries={true}
                    datas={datas}
                    setDatas={setDatas}
                  />
                ))}
          </div>
        </div>
        <div>
          <h3 className="font-bold text-base xl:text-lg text-darkblue mb-[4px]">
            In-Progress ({statusCounts["in-progress"] || 0})
          </h3>
          <p className="text-sm xl:text-base text-gray mb-4">
            Currently being developed
          </p>
          <div className="w-full flex flex-col gap-4">
            {datas != [] > 0 &&
              datas.productRequests.filter(
                (productRequest) => productRequest.status === status
              ).length > 0 &&
              datas.productRequests
                .filter(
                  (productRequest) => productRequest.status === "in-progress"
                )
                .map((productRequest) => (
                  <CardRequest
                    productRequest={productRequest}
                    key={productRequest.id}
                    withoutMediaQueries={true}
                    datas={datas}
                    setDatas={setDatas}
                  />
                ))}
          </div>
        </div>
        <div>
          <h3 className="font-bold text-base xl:text-lg text-darkblue mb-[4px]">
            Live ({statusCounts["live"] || 0})
          </h3>
          <p className="text-sm xl:text-base text-gray mb-4">
            Released features
          </p>
          <div className="w-full flex flex-col gap-4">
            {datas != [] > 0 &&
              datas.productRequests.filter(
                (productRequest) => productRequest.status === status
              ).length > 0 &&
              datas.productRequests
                .filter((productRequest) => productRequest.status === "live")
                .map((productRequest) => (
                  <CardRequest
                    productRequest={productRequest}
                    key={productRequest.id}
                    withoutMediaQueries={true}
                    datas={datas}
                    setDatas={setDatas}
                  />
                ))}
          </div>
        </div>
      </div>
    </div>
  ) : null;
}

export default Roadmap;
