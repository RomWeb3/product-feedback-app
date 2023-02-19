import { useState } from "react";

function Header({ onClick }) {
  const [showMenu, setShowMenu] = useState(false);

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
        <div>
          <div className="w-[271px] h-full bg-verylightgray absolute top-72px right-0 z-10 py-6 px-6 flex flex-col gap-6 ">
            <div className="w-full h-[178px] bg-white rounded-[10px]"></div>
            <div className="w-full h-[178px] bg-white rounded-[10px]"></div>
          </div>
        </div>
      )}
    </>
  );
}

export default Header;
