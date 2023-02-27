import Header from "../components/Header";
import Sort from "../components/Sort";
import CardRequest from "../components/CardRequest";
import SuggestionsEmpty from "../components/SuggestionsEmpty";
import Menu from "../components/Menu";
import { useEffect, useState } from "react";

function Dashboard({ datas = [], setDatas, onNavigate }) {
  const [showMenu, setShowMenu] = useState(false);
  const [category, setCategory] = useState("all");
  const [sortBy, setSortBy] = useState("Most Upvotes");
  const sortedRequests = datas.productRequests || [];
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const suggestionCount =
    category === "all"
      ? sortedRequests.filter(
          (productRequest) => productRequest.status === "suggestion"
        ).length
      : sortedRequests
          .filter((productRequest) => productRequest.status === "suggestion")
          .filter((productRequest) => productRequest.category === category)
          .length;

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  switch (sortBy) {
    case "Most Upvotes":
      sortedRequests.sort((a, b) => b.upvotes - a.upvotes);
      break;

    case "Least Upvotes":
      sortedRequests.sort((a, b) => a.upvotes - b.upvotes);
      break;
    case "Most Comments":
      sortedRequests.sort(
        (a, b) =>
          (b.comments?.length > 0
            ? b.comments.length +
              b.comments?.reduce(
                (total, comment) => total + (comment.replies?.length || 0),
                0
              )
            : 0) -
          (a.comments?.length > 0
            ? a.comments.length +
              a.comments?.reduce(
                (total, comment) => total + (comment.replies?.length || 0),
                0
              )
            : 0)
      );
      break;

    case "Least Comments":
      sortedRequests.sort(
        (a, b) =>
          (a.comments?.length > 0
            ? a.comments.length +
              a.comments?.reduce(
                (total, comment) => total + (comment.replies?.length || 0),
                0
              )
            : 0) -
          (b.comments?.length > 0
            ? b.comments.length +
              b.comments?.reduce(
                (total, comment) => total + (comment.replies?.length || 0),
                0
              )
            : 0)
      );
      break;

    default:
      break;
  }

  return (
    <div className="App relative md:py-[56px] xl:py-[90px] min-h-screen md:px-10 bg-verylightgray md:flex md:flex-col md:items-center xl:items-start xl:flex-row xl:justify-center xl:gap-[30px]">
      <div className="md:flex xl:flex-col md:gap-[10px] xl:gap-6 md:w-full xl:w-[255px] md:max-w-[825px]">
        <Header
          showMenu={showMenu}
          setShowMenu={setShowMenu}
          screenWidth={screenWidth}
        />
        <Menu
          datas={datas}
          showMenu={showMenu}
          setShowMenu={setShowMenu}
          category={category}
          setCategory={setCategory}
          screenWidth={screenWidth}
        />
      </div>

      <main className="w-full max-w-[825px] flex flex-col items-center">
        <Sort
          onClick={onNavigate}
          sortBy={sortBy}
          setSortBy={setSortBy}
          count={suggestionCount}
        />

        <div className="bg-verylightgray w-full py-8 px-6 md:px-0 flex flex-col items-center gap-4">
          {suggestionCount > 0 ? (
            sortedRequests
              .filter(
                (productRequest) => productRequest.status === "suggestion"
              )
              .filter(
                (productRequest) =>
                  category === "all" || productRequest.category === category
              )
              .map((productRequest) => (
                <CardRequest
                  productRequest={productRequest}
                  datas={datas}
                  setDatas={setDatas}
                  key={productRequest.id}
                />
              ))
          ) : (
            <SuggestionsEmpty onClick={onNavigate} />
          )}
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
