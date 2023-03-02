function Header({ showMenu, setShowMenu, screenWidth }) {
  return screenWidth < 768 ? (
    <div className="h-full relative">
      <div
        className="w-full px-6 py-4 flex justify-between items-center text-white"
        style={{
          background:
            "radial-gradient(128.88% 128.88% at 103.9% -10.39%, #E84D70 0%, #A337F6 53.09%, #28A7ED 100%)",
        }}
      >
        <div>
          <h1 className="font-bold text-base">Feedback App</h1>
          <h2 className="font-medium text-sm opacity-75">Feedback Board</h2>
        </div>
        <div
          className="transition-all duration-1000"
          onClick={() => setShowMenu(!showMenu)}
        >
          {!showMenu ? (
            <img
              src="/assets/shared/mobile/icon-hamburger.svg"
              alt="icon hamburger"
              className="transition-all duration-1000"
            />
          ) : (
            <img
              src="/assets/shared/mobile/icon-close.svg"
              alt="icon close"
              className="transition-all duration-1000"
            />
          )}
        </div>
      </div>
    </div>
  ) : (
    <div className="w-[33%] xl:w-[255px] min-w-[223px] h-[178px] xl:h-[137px] relative">
      <div
        className="w-full h-full px-6 py-6 flex justify-between items-end text-white rounded-[10px]"
        style={{
          background:
            "radial-gradient(128.88% 128.88% at 103.9% -10.39%, #E84D70 0%, #A337F6 53.09%, #28A7ED 100%)",
        }}
      >
        <div>
          <h1 className="font-bold text-xl">Feedback App</h1>
          <h2 className="font-medium text-base opacity-75">Feedback Board</h2>
        </div>
      </div>
    </div>
  );
}

export default Header;
