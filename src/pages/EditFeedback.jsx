import React from "react";
import { useNavigate } from "react-router-dom";

function EditFeedback() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen p-6 bg-verylightgray">
      <div
        className="flex items-center gap-4 cursor-pointer"
        onClick={() => navigate(-1)}
      >
        <img src="/assets/shared/icon-arrow-left.svg" alt="icon arrow left" />
        <p className="text-sm font-bold text-gray">Go Back</p>
      </div>
    </div>
  );
}

export default EditFeedback;
