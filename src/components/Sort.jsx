import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function Sort({ onClick, sortBy, setSortBy, count }) {
  const [showSortBy, setShowSortBy] = useState(false);

  const handleClick = (e) => {
    setSortBy(e.target.innerText);
    setShowSortBy(false);
  };

  return (
    <div className="w-full max-w-[825px] bg-verydarkblue flex justify-between px-6 py-2 md:py-[14px] text-white relative md:mt-10 xl:mt-0 md:rounded-[10px]">
      <div className="flex">
        <div className="hidden md:flex md:items-center">
          <img
            src="./assets/suggestions/icon-suggestions.svg"
            alt="icon suggestions"
          />
          <span className="text-lg font-bold ml-4 mr-9">
            {count} Suggestions
          </span>
        </div>
        <div
          className="flex justify-center items-center gap-2 cursor-pointer"
          onClick={() => setShowSortBy(!showSortBy)}
        >
          <span className="text-sm">Sort by : </span>
          <span className="text-sm font-medium select-none">{sortBy}</span>
          <img
            src="./assets/shared/arrow-down-white.png"
            alt="icon arrow down"
            className={`${
              showSortBy ? "rotate-180 " : ""
            } transition-all duration-200 w-[10px] h-[10px]`}
          />
        </div>
      </div>
      <button
        className="bg-violet hover:bg-[#C75AF6] max-w-[134px] md:max-w-[158px] w-full vsm:max-w-[110px] py-2.5 md:py-3 rounded-[10px] text-sm cursor-pointer font-bold"
        onClick={onClick}
      >
        + Add Feedback
      </button>

      <AnimatePresence>
        {showSortBy && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.2 } }}
            exit={{ opacity: 0, transition: { duration: 0.2 } }}
            className="w-[255px] h-[192px] bg-white shadow absolute z-50 top-[72px] md:top-[88px] md:left-[219px] rounded-[10px]"
          >
            <div
              className="flex items-center justify-between"
              onClick={(e) => handleClick(e)}
            >
              <p className="py-3 px-6 text-gray cursor-pointer hover:text-violet">
                Most Upvotes
              </p>
              <img
                src="./assets/shared/icon-check.svg"
                alt="icon check"
                className={`${
                  sortBy === "Most Upvotes" ? "block" : "hidden"
                } transition-all duration-300 px-6`}
              />
            </div>
            <div className="w-full h-[1px] bg-separator"></div>
            <div
              className="flex items-center justify-between"
              onClick={(e) => handleClick(e)}
            >
              <p className="py-3 px-6 text-gray cursor-pointer hover:text-violet">
                Least Upvotes
              </p>
              <img
                src="./assets/shared/icon-check.svg"
                alt="icon check"
                className={`${
                  sortBy === "Least Upvotes" ? "block" : "hidden"
                } transition-all duration-300 px-6`}
              />
            </div>
            <div className="w-full h-[1px] bg-separator"></div>
            <div
              className="flex items-center justify-between"
              onClick={(e) => handleClick(e)}
            >
              <p className="py-3 px-6 text-gray cursor-pointer hover:text-violet">
                Most Comments
              </p>
              <img
                src="./assets/shared/icon-check.svg"
                alt="icon check"
                className={`${
                  sortBy === "Most Comments" ? "block" : "hidden"
                } transition-all duration-300 px-6`}
              />
            </div>
            <div className="w-full h-[1px] bg-separator"></div>
            <div
              className="flex items-center justify-between"
              onClick={(e) => handleClick(e)}
            >
              <p className="py-3 px-6 text-gray cursor-pointer hover:text-violet">
                Least Comments
              </p>
              <img
                src="./assets/shared/icon-check.svg"
                alt="icon check"
                className={`${
                  sortBy === "Least Comments" ? "block" : "hidden"
                } transition-all duration-300 px-6`}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Sort;
