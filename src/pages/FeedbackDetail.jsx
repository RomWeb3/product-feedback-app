import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import CardRequest from "../components/CardRequest";

function FeedbackDetail({ datas }) {
  const navigate = useNavigate();
  const { feedbackId } = useParams();
  const productRequests = datas.productRequests;

  const filteredRequests = productRequests?.filter(
    (productRequest) => productRequest.id === feedbackId * 1
  );

  return (
    <div className="h-screen p-6 bg-verylightgray">
      <div className="flex justify-between mb-6">
        <div
          className="flex items-center gap-4 cursor-pointer"
          onClick={() => navigate(`/product-feedback-app/`)}
        >
          <img
            src="../public/assets/shared/icon-arrow-left.svg"
            alt="icon arrow left"
          />
          <p className="text-sm font-bold text-gray">Go Back</p>
        </div>
        <button className="px-4 py-[10.5px] bg-blue rounded-[10px] text-lightgray text-sm font-bold">
          Edit Feedback
        </button>
      </div>

      {datas != [] > 0 &&
        filteredRequests.map((productRequest) => (
          <CardRequest
            productRequest={productRequest}
            key={productRequest.id}
          />
        ))}

      <div className="bg-white w-full p-6 rounded-[10px] mt-6">
        <h5 className="font-bold text-lg text-darkblue tracking-tighter mb-6">
          {datas != [] > 0 &&
            filteredRequests.map((productRequest) =>
              productRequest.comments?.length > 0
                ? productRequest.comments.length +
                  (productRequest.comments.length > 1
                    ? " Comments"
                    : " Comment")
                : "No Comments yet"
            )}
        </h5>
      </div>

      <div className="bg-white w-full p-6 rounded-[10px] mt-6">
        <h5 className="font-bold text-lg text-darkblue tracking-tighter mb-6">
          Add Comment
        </h5>
        <textarea
          className="mb-4 bg-verylightgray w-full h-[80px] rounded-[5px] p-4 resize-none text-sm"
          type="text"
          placeholder="Type your comment here"
        />
        <div className="flex justify-between">
          <p>250 Characters left</p>
          <button>Post Comment</button>
        </div>
      </div>
    </div>
  );
}

export default FeedbackDetail;
