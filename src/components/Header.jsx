function Header({ showMenu, setShowMenu }) {
  return (
    <div className="h-full relative">
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
    </div>
  );
}

export default Header;
