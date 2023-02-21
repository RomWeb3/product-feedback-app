import React from "react";
import { useNavigate } from "react-router-dom";

function NewFeedback() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen p-6 bg-verylightgray">
      <div
        className="flex items-center gap-4 cursor-pointer"
        onClick={() => navigate(`/product-feedback-app/`)}
      >
        <img src="/assets/shared/icon-arrow-left.svg" alt="icon arrow left" />
        <p className="text-sm font-bold text-gray">Go Back</p>
      </div>
      <div className="mt-[35px] bg-white w-full rounded-[10px] p-6 relative">
        <div className="w-10 h-10 rounded-full absolute left-6 top-[-20px]">
          <img
            src="/assets/shared/icon-new-feedback.svg"
            alt="icon new feedback"
          />
        </div>
        <h2 className="font-bold text-lg text-darkblue tracking-tighter mb-6 mt-5">
          Create New Feedback
        </h2>
        <h3 className="font-bold text-sm text-darkblue mb-[3px]">
          Feedback Title
        </h3>
        <p className="text-sm text-gray mb-4">
          Add a short, descriptive headline
        </p>
        <input
          type="text"
          className="w-full h-[48px] bg-verylightgray rounded-[5px] px-4 mb-6"
        />
        <h3 className="font-bold text-sm text-darkblue mb-[3px]">Category</h3>
        <p className="text-sm text-gray mb-4">
          Choose a category for your feedback
        </p>
        <input
          type="text"
          className="w-full h-[48px] bg-verylightgray rounded-[5px] px-4 mb-6"
        />
        <h3 className="font-bold text-sm text-darkblue mb-[3px]">
          Feedback Detail
        </h3>
        <p className="text-sm text-gray mb-4">
          Include any specific comments on what should be improved, added, etc.
        </p>
        <textarea
          type="text"
          className="w-full h-[120px] bg-verylightgray rounded-[5px] p-4 mb-10 resize-none"
        />
        <button className="w-full h-[40px] bg-violet rounded-[10px] text-lightgray text-sm font-bold mb-4">
          Add Feedback
        </button>
        <button
          className="w-full h-[40px] bg-darkblue rounded-[10px] text-lightgray text-sm font-bold"
          onClick={() => navigate(`/product-feedback-app/`)}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default NewFeedback;
