import React from "react";

function CardRequest() {
  return (
    <div className="bg-white w-full px-6 py-6 rounded-[10px]">
      <h2 className="font-bold text-darkblue text-sm">
        Add tags for solutions
      </h2>
      <p className="my-2 text-gray text-sm">
        Easier to search for solutions based on a specific stack.
      </p>
      <div className="mb-4 bg-lightgray w-[111px] h-[30px] flex justify-center items-center rounded-[10px] text-blue font-semibold text-sm">
        Enhancement
      </div>
      <div className="flex justify-between items-center">
        <div className="bg-lightgray flex justify-center items-center gap-2.5 rounded-[10px] w-[69px] h-[32px] text-sm font-bold text-darkblue">
          <img
            src="../public/assets/shared/icon-arrow-up.svg"
            alt="icon arrow up"
          />
          112
        </div>
        <div className="flex items-center gap-1 text-sm font-bold text-darkblue">
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
