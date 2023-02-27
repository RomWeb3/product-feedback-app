import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function CardRequest({ productRequest, datas, setDatas, screenWidth }) {
  const navigate = useNavigate();
  const [voted, setVoted] = useState(false);

  const onVote = () => {
    const updatedProductRequests = [...datas.productRequests];
    const index = updatedProductRequests.findIndex(
      (productRequest) => productRequest.id === productRequest.id
    );
    const updatedProductRequest = {
      ...updatedProductRequests[index],
      upvotes: voted ? productRequest.upvotes - 1 : productRequest.upvotes + 1,
    };
    updatedProductRequests[index] = updatedProductRequest;
    setDatas({ ...datas, productRequests: updatedProductRequests });
    setVoted(!voted);
  };

  // const onVote = () => {
  //   const updatedProductRequests = [...productRequest];

  //   updatedProductRequests.upvotes = voted
  //     ? productRequest.upvotes - 1
  //     : productRequest.upvotes + 1;
  //   setDatas({ ...datas, productRequest: updatedProductRequests });
  // };

  return (
    <div
      className="w-full max-w-[825px] bg-white px-6 md:px-0 py-6 md:py-[28px] md:relative"
      style={{
        borderTop:
          productRequest.status === "planned"
            ? "6px solid #F49F85"
            : productRequest.status === "in-progress"
            ? "6px solid #AD1FEA"
            : productRequest.status === "live"
            ? "6px solid #62BCFA"
            : "none",
        borderRadius:
          productRequest.status === "planned" ||
          productRequest.status === "in-progress" ||
          productRequest.status === "live"
            ? "5px 5px 10px 10px"
            : "10px",
      }}
    >
      {productRequest.status === "planned" && (
        <div className="flex items-center gap-4 mb-4">
          <div className="w-2 h-2 bg-orange rounded-full"></div>
          <p className="text-gray text-sm">Planned</p>
        </div>
      )}
      {productRequest.status === "in-progress" && (
        <div className="flex items-center gap-4 mb-4">
          <div className="w-2 h-2 bg-violet rounded-full"></div>
          <p className="text-gray text-sm">In Progress</p>
        </div>
      )}
      {productRequest.status === "live" && (
        <div className="flex items-center gap-4 mb-4">
          <div className="w-2 h-2 bg-lightblue rounded-full"></div>
          <p className="text-gray text-sm">live</p>
        </div>
      )}
      <div
        className="cursor-pointer text-darkblue hover:text-[#4661E6] md:ml-[112px]"
        onClick={() =>
          navigate(`/product-feedback-app/feedback/${productRequest.id}`)
        }
      >
        <h2 className="font-bold transition-all text-sm md:text-lg">
          {productRequest.title}
        </h2>
        <p className="mt-1 mb-[10px] md:mb-3 text-gray text-sm md:text-base">
          {productRequest.description}
        </p>
        <div className="mb-4 md:mb-0 bg-lightgray w-[111px] h-[30px] flex justify-center items-center rounded-[10px] text-blue font-semibold text-sm">
          {productRequest.category.charAt(0).toUpperCase() +
            productRequest.category.slice(1)}
        </div>
      </div>
      <div className="flex justify-between items-center">
        <button
          className="md:absolute md:top-[28px] md:left-[32px] bg-lightgray hover:bg-[#CFD7FF] w-[69px] md:w-10 h-[32px] md:h-[53px] cursor-pointer transition-all flex md:flex-col justify-center items-center gap-2.5 md:gap-2 rounded-[10px] text-sm font-bold text-darkblue"
          style={{ background: voted && "#4661E6", color: voted && "#fff" }}
          onClick={() => {
            onVote();
            voted === false ? setVoted(true) : setVoted(false);
          }}
        >
          <img
            src={
              voted
                ? "/assets/shared/icon-arrow-up-white.svg"
                : "/assets/shared/icon-arrow-up.svg"
            }
            alt="icon arrow up"
          />
          {productRequest.upvotes}
        </button>
        <div className="md:absolute md:right-[32px] md:top-0 md:bottom-0 md:m-auto flex items-center gap-1 md:gap-2 text-sm font-bold text-darkblue">
          <img src="/assets/shared/icon-comments.svg" alt="icon comments" />
          {productRequest.comments?.length > 0
            ? productRequest.comments.length +
              productRequest.comments?.reduce(
                (total, comment) => total + (comment.replies?.length || 0),
                0
              )
            : 0}
        </div>
      </div>
    </div>
  );
}

export default CardRequest;
