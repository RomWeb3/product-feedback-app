import React from "react";

function CardRequest() {
  return (
    <div className="bg-white w-full px-6 py-6 rounded-[10px]">
      <h2>Add tags for solutions</h2>
      <p>Easier to search for solutions based on a specific stack.</p>
      <div>Enhancement</div>
      <div className="flex justify-between items-center">
        <div className="bg-lightgray flex justify-center items-center gap-2.5 rounded-[10px]">
          <img
            src="../public/assets/shared/icon-arrow-up.svg"
            alt="icon arrow up"
          />
          112
        </div>
        <div className="flex items-center gap-1">
          <img
            src="../public/assets/shared/icon-comments.svg"
            alt="icon comments"
          />
          2
        </div>
      </div>
    </div>
  );
}

export default CardRequest;
