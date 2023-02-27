import React from "react";
import { useNavigate } from "react-router-dom";

function Menu({
  datas,
  showMenu,
  setShowMenu,
  category,
  setCategory,
  screenWidth,
}) {
  const navigate = useNavigate();
  const sortedRequests = datas.productRequests || [];

  const closeMenu = (e) => {
    if (e.target === e.currentTarget) {
      setShowMenu(false);
    }
  };

  const statusCounts = sortedRequests.reduce((counts, request) => {
    counts[request.status] = (counts[request.status] || 0) + 1;
    return counts;
  }, {});

  return screenWidth < 768 ? (
    <div>
      {showMenu && (
        <div>
          <div
            className="w-full h-[calc(100%-72px)] bg-semiblack absolute z-10"
            onClick={closeMenu}
          ></div>
          <div className="w-[271px] h-[calc(100%-72px)] bg-verylightgray absolute right-0 z-20 py-6 px-6 flex flex-col gap-6">
            <div className="w-full h-[178px] bg-white rounded-[10px] px-6 py-6 flex flex-wrap gap-2 items-center">
              <button
                className={`${
                  category === "all"
                    ? "bg-blue text-white"
                    : "bg-lightgray text-blue"
                } px-4 py-2.5 rounded-[10px] font-semibold text-sm transition-all`}
                onClick={() => {
                  setCategory("all");
                  setShowMenu(false);
                }}
              >
                All
              </button>
              <button
                className={`${
                  category === "ui"
                    ? "bg-blue text-white"
                    : "bg-lightgray text-blue"
                } px-4 py-2.5 rounded-[10px] font-semibold text-sm transition-all`}
                onClick={() => {
                  setCategory("ui");
                  setShowMenu(false);
                }}
              >
                UI
              </button>
              <button
                className={`${
                  category === "ux"
                    ? "bg-blue text-white"
                    : "bg-lightgray text-blue"
                } px-4 py-2.5 rounded-[10px] font-semibold text-sm transition-all`}
                onClick={() => {
                  setCategory("ux");
                  setShowMenu(false);
                }}
              >
                UX
              </button>
              <button
                className={`${
                  category === "enhancement"
                    ? "bg-blue text-white"
                    : "bg-lightgray text-blue"
                } px-4 py-2.5 rounded-[10px] font-semibold text-sm transition-all`}
                onClick={() => {
                  setCategory("enhancement");
                  setShowMenu(false);
                }}
              >
                Enhancement
              </button>
              <button
                className={`${
                  category === "bug"
                    ? "bg-blue text-white"
                    : "bg-lightgray text-blue"
                } px-4 py-2.5 rounded-[10px] font-semibold text-sm transition-all`}
                onClick={() => {
                  setCategory("bug");
                  setShowMenu(false);
                }}
              >
                Bug
              </button>
              <button
                className={`${
                  category === "feature"
                    ? "bg-blue text-white"
                    : "bg-lightgray text-blue"
                } px-4 py-2.5 rounded-[10px] font-semibold text-sm transition-all`}
                onClick={() => {
                  setCategory("feature");
                  setShowMenu(false);
                }}
              >
                Feature
              </button>
            </div>
            <div className="w-full h-[178px] bg-white rounded-[10px] px-6 flex flex-col justify-center">
              <div className="flex justify-between items-center mb-6">
                <h4 className="font-bold text-lg text-darkblue">Roadmap</h4>
                <button
                  className="font-semibold text-sm text-blue underline"
                  onClick={() => navigate("/product-feedback-app/roadmap")}
                >
                  View
                </button>
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-2 h-2 bg-orange rounded-full"></div>
                    <p className="text-gray">Planned</p>
                  </div>
                  <p className="font-bold text-base text-gray">
                    {statusCounts["planned"] || 0}
                  </p>
                </div>
                <div className="flex justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-2 h-2 bg-violet rounded-full"></div>
                    <p className="text-gray">In-Progress</p>
                  </div>
                  <p className="font-bold text-base text-gray">
                    {statusCounts["in-progress"] || 0}
                  </p>
                </div>
                <div className="flex justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-2 h-2 bg-lightblue rounded-full"></div>
                    <p className="text-gray">Live</p>
                  </div>
                  <p className="font-bold text-base text-gray">
                    {statusCounts["live"] || 0}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  ) : (
    <div className="w-[66%] xl:w-full">
      <div className="bg-verylightgray flex xl:flex-col gap-[10px] xl:gap-6">
        <div className="w-[100%] xl:max-w-[255px] h-[178px] bg-white rounded-[10px] px-6 py-6 flex flex-wrap gap-2 items-center">
          <button
            className={`${
              category === "all"
                ? "bg-blue text-white"
                : "bg-lightgray text-blue hover:bg-[#CFD7FF]"
            } px-4 py-2.5 rounded-[10px] font-semibold text-sm transition-all`}
            onClick={() => {
              setCategory("all");
              setShowMenu(false);
            }}
          >
            All
          </button>
          <button
            className={`${
              category === "ui"
                ? "bg-blue text-white"
                : "bg-lightgray text-blue hover:bg-[#CFD7FF]"
            } px-4 py-2.5 rounded-[10px] font-semibold text-sm transition-all`}
            onClick={() => {
              setCategory("ui");
              setShowMenu(false);
            }}
          >
            UI
          </button>
          <button
            className={`${
              category === "ux"
                ? "bg-blue text-white"
                : "bg-lightgray text-blue hover:bg-[#CFD7FF]"
            } px-4 py-2.5 rounded-[10px] font-semibold text-sm transition-all`}
            onClick={() => {
              setCategory("ux");
              setShowMenu(false);
            }}
          >
            UX
          </button>
          <button
            className={`${
              category === "enhancement"
                ? "bg-blue text-white"
                : "bg-lightgray text-blue hover:bg-[#CFD7FF]"
            } px-4 py-2.5 rounded-[10px] font-semibold text-sm transition-all`}
            onClick={() => {
              setCategory("enhancement");
              setShowMenu(false);
            }}
          >
            Enhancement
          </button>
          <button
            className={`${
              category === "bug"
                ? "bg-blue text-white"
                : "bg-lightgray text-blue hover:bg-[#CFD7FF]"
            } px-4 py-2.5 rounded-[10px] font-semibold text-sm transition-all`}
            onClick={() => {
              setCategory("bug");
              setShowMenu(false);
            }}
          >
            Bug
          </button>
          <button
            className={`${
              category === "feature"
                ? "bg-blue text-white"
                : "bg-lightgray text-blue hover:bg-[#CFD7FF]"
            } px-4 py-2.5 rounded-[10px] font-semibold text-sm transition-all`}
            onClick={() => {
              setCategory("feature");
              setShowMenu(false);
            }}
          >
            Feature
          </button>
        </div>
        <div className="w-[100%] xl:max-w-[255px] h-[178px] bg-white rounded-[10px] px-6 flex flex-col justify-center">
          <div className="flex justify-between items-center mb-6">
            <h4 className="font-bold text-lg text-darkblue">Roadmap</h4>
            <button
              className="font-semibold text-sm text-blue hover:text-[#8397F8] underline"
              onClick={() => navigate("/product-feedback-app/roadmap")}
            >
              View
            </button>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex justify-between">
              <div className="flex items-center gap-4">
                <div className="w-2 h-2 bg-orange rounded-full"></div>
                <p className="text-gray">Planned</p>
              </div>
              <p className="font-bold text-base text-gray">
                {statusCounts["planned"] || 0}
              </p>
            </div>
            <div className="flex justify-between">
              <div className="flex items-center gap-4">
                <div className="w-2 h-2 bg-violet rounded-full"></div>
                <p className="text-gray">In-Progress</p>
              </div>
              <p className="font-bold text-base text-gray">
                {statusCounts["in-progress"] || 0}
              </p>
            </div>
            <div className="flex justify-between">
              <div className="flex items-center gap-4">
                <div className="w-2 h-2 bg-lightblue rounded-full"></div>
                <p className="text-gray">Live</p>
              </div>
              <p className="font-bold text-base text-gray">
                {statusCounts["live"] || 0}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Menu;
