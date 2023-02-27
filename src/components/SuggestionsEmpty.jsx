import React from "react";

function SuggestionsEmpty({ onClick }) {
  return (
    <div className="w-full h-[460px] bg-white flex flex-col justify-center items-center px-6 text-center rounded-[10px]">
      <div className="mb-[39px] flex justify-center">
        <img
          src="/assets/suggestions/illustration-empty.svg"
          alt="illustration empty"
        />
      </div>
      <h3 className="text-darkblue font-bold text-lg">
        There is no feedback yet.
      </h3>
      <p className="mt-[14px] mb-6 text-sm text-gray">
        Got a suggestion? Found a bug that needs to be squashed? We love hearing
        about new ideas to improve our app.
      </p>
      <button
        className="bg-violet px-4 py-2.5 rounded-[10px] text-sm cursor-pointer font-bold text-white"
        onClick={onClick}
      >
        + Add Feedback
      </button>
    </div>
  );
}

export default SuggestionsEmpty;
