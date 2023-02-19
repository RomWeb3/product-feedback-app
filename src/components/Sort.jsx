import React from "react";

function Sort({ onClick }) {
  return (
    <div className="w-full bg-verydarkblue flex justify-between px-6 py-2 text-white">
      <div className="flex justify-center items-center gap-2">
        <span className="text-sm">Sort by : </span>
        <span className="text-sm font-medium"> Most Upvotes</span>
        <img
          src="../public/assets/shared/icon-arrow-down.svg"
          alt="icon arrow down"
        />
      </div>
      <button
        className="bg-violet px-4 py-2.5 rounded-[10px] text-sm cursor-pointer font-bold"
        onClick={onClick}
      >
        + Add Feedback
      </button>
    </div>
  );
}

export default Sort;
