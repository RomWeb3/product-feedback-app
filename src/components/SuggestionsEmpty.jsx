import React from "react";

function SuggestionsEmpty({ onClick }) {
  return (
    <div className="w-full h-[460px] md:h-[600px] bg-white flex flex-col justify-center items-center px-6 text-center rounded-[10px]">
      <div className="mb-[39px] flex justify-center">
        <img
          src="/assets/suggestions/illustration-empty.svg"
          alt="illustration empty"
        />
      </div>
      <h3 className="text-darkblue font-bold text-lg md:text-2xl">
        There is no feedback yet.
      </h3>
      <p className="mt-[14px] md:mt-4 text-sm md:text-base md:px-[140px] text-gray">
        Got a suggestion? Found a bug that needs to be squashed?
      </p>
      <p className="mb-6 md:mb-12 text-sm md:text-base md:px-[140px] text-gray">
        We love hearing about new ideas to improve our app.
      </p>
      <button
        className="bg-violet px-4 md:px-6 py-2.5 md:py-3 rounded-[10px] text-sm cursor-pointer font-bold text-white"
        onClick={onClick}
      >
        + Add Feedback
      </button>
    </div>
  );
}

export default SuggestionsEmpty;
