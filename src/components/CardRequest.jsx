import React from "react";
import { useNavigate } from "react-router-dom";

function CardRequest({ productRequest }) {
  const navigate = useNavigate();

  return (
    <div
      className="bg-white w-full px-6 py-6 cursor-pointer"
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
      onClick={() =>
        navigate(`/product-feedback-app/feedback/${productRequest.id}`)
      }
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
      <h2 className="font-bold text-darkblue hover:text-[#4661E6] transition-all text-sm">
        {productRequest.title}
      </h2>
      <p className="my-2 text-gray text-sm">{productRequest.description}</p>
      <div className="mb-4 bg-lightgray w-[111px] h-[30px] flex justify-center items-center rounded-[10px] text-blue font-semibold text-sm">
        {productRequest.category.charAt(0).toUpperCase() +
          productRequest.category.slice(1)}
      </div>
      <div className="flex justify-between items-center">
        <div className="bg-lightgray hover:bg-[#CFD7FF] transition-all flex justify-center items-center gap-2.5 rounded-[10px] w-[69px] h-[32px] text-sm font-bold text-darkblue">
          <img
            src="../public/assets/shared/icon-arrow-up.svg"
            alt="icon arrow up"
          />
          {productRequest.upvotes}
        </div>
        <div className="flex items-center gap-1 text-sm font-bold text-darkblue">
          <img
            src="../public/assets/shared/icon-comments.svg"
            alt="icon comments"
          />
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
