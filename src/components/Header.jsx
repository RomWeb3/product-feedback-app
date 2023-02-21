import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Header({ datas }) {
  const [showMenu, setShowMenu] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const navigate = useNavigate();

  const closeMenu = (e) => {
    if (e.target === e.currentTarget) {
      setShowMenu(false);
    }
  };

  const statusCounts = datas.productRequests?.reduce((counts, request) => {
    counts[request.status] = (counts[request.status] || 0) + 1;
    return counts;
  }, {});

  return (
    <>
      <div
        className="w-full px-6 py-4 flex justify-between items-center text-white"
        style={{
          background:
            "radial-gradient(128.88% 128.88% at 103.9% -10.39%, #E84D70 0%, #A337F6 53.09%, #28A7ED 100%)",
        }}
      >
        <div>
          <h1 className="font-bold text-base">Frontend Mentor</h1>
          <h2 className="font-medium text-sm opacity-75">Feedback Board</h2>
        </div>
        <div onClick={() => setShowMenu(!showMenu)}>
          {!showMenu ? (
            <img
              src="../public/assets/shared/mobile/icon-hamburger.svg"
              alt="icon hamburger"
            />
          ) : (
            <img
              src="../public/assets/shared/mobile/icon-close.svg"
              alt="icon close"
            />
          )}
        </div>
      </div>
      {showMenu && (
        <div
          className="w-full h-full bg-semiblack absolute top-72px z-10"
          onClick={closeMenu}
        >
          <div className="w-[271px] h-full bg-verylightgray absolute top-72px right-0 z-20 py-6 px-6 flex flex-col gap-6 ">
            <div className="w-full h-[178px] bg-white rounded-[10px] px-6 py-6 flex flex-wrap gap-2 items-center">
              <button
                className={`${
                  selectedCategory === "All"
                    ? "bg-blue text-white"
                    : "bg-lightgray text-blue"
                } px-4 py-2.5 rounded-[10px] font-semibold text-sm transition-all`}
                onClick={() => setSelectedCategory("All")}
              >
                All
              </button>
              <button
                className={`${
                  selectedCategory === "UI"
                    ? "bg-blue text-white"
                    : "bg-lightgray text-blue"
                } px-4 py-2.5 rounded-[10px] font-semibold text-sm transition-all`}
                onClick={() => setSelectedCategory("UI")}
              >
                UI
              </button>
              <button
                className={`${
                  selectedCategory === "UX"
                    ? "bg-blue text-white"
                    : "bg-lightgray text-blue"
                } px-4 py-2.5 rounded-[10px] font-semibold text-sm transition-all`}
                onClick={() => setSelectedCategory("UX")}
              >
                UX
              </button>
              <button
                className={`${
                  selectedCategory === "Enhancement"
                    ? "bg-blue text-white"
                    : "bg-lightgray text-blue"
                } px-4 py-2.5 rounded-[10px] font-semibold text-sm transition-all`}
                onClick={() => setSelectedCategory("Enhancement")}
              >
                Enhancement
              </button>
              <button
                className={`${
                  selectedCategory === "Bug"
                    ? "bg-blue text-white"
                    : "bg-lightgray text-blue"
                } px-4 py-2.5 rounded-[10px] font-semibold text-sm transition-all`}
                onClick={() => setSelectedCategory("Bug")}
              >
                Bug
              </button>
              <button
                className={`${
                  selectedCategory === "Feature"
                    ? "bg-blue text-white"
                    : "bg-lightgray text-blue"
                } px-4 py-2.5 rounded-[10px] font-semibold text-sm transition-all`}
                onClick={() => setSelectedCategory("Feature")}
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
    </>
  );
}

export default Header;
