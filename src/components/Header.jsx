import React from "react";

function Header({ onClick }) {
  return (
    <div
      className="w-full px-6 py-4 flex justify-between items-center text-white "
      style={{
        background:
          "radial-gradient(128.88% 128.88% at 103.9% -10.39%, #E84D70 0%, #A337F6 53.09%, #28A7ED 100%)",
      }}
    >
      <div>
        <h1 className="font-bold text-base">Frontend Mentor</h1>
        <h2 className="font-medium text-sm opacity-75">Feedback Board</h2>
      </div>
      <div onClick={onClick}>
        <img
          src="../public/assets/shared/mobile/icon-hamburger.svg"
          alt="icon hamburger"
        />
      </div>
    </div>
  );
}

export default Header;
