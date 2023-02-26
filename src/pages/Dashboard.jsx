import Header from "../components/Header";
import Sort from "../components/Sort";
import CardRequest from "../components/CardRequest";
import SuggestionsEmpty from "../components/SuggestionsEmpty";
import Menu from "../components/Menu";
import { useEffect, useState } from "react";

function Dashboard({ datas = [], onNavigate }) {
  const [showMenu, setShowMenu] = useState(false);
  const [category, setCategory] = useState("all");
  const [sortBy, setSortBy] = useState("Most Upvotes");
  const sortedRequests = datas.productRequests || [];
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

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
    <div className="App relative md:py-[56px] md:px-10 md:bg-verylightgray md:flex md:flex-col md:items-center">
      <div className="md:flex md:gap-[10px] md:w-full md:max-w-[825px]">
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
      <Sort onClick={onNavigate} sortBy={sortBy} setSortBy={setSortBy} />

      <main className="bg-verylightgray w-full min-h-screen py-8 px-6 md:px-0 flex flex-col items-center gap-4">
        {datas != [] > 0 &&
          (sortedRequests.filter(
            (productRequest) => productRequest.status === "suggestion"
          ).length > 0 ? (
            category === "all" ? (
              sortedRequests
                .filter(
                  (productRequest) => productRequest.status === "suggestion"
                )
                .map((productRequest) => (
                  <CardRequest
                    productRequest={productRequest}
                    key={productRequest.id}
                  />
                ))
            ) : (
              sortedRequests
                .filter(
                  (productRequest) => productRequest.status === "suggestion"
                )
                .filter(
                  (productRequest) => productRequest.category === category
                )
                .map((productRequest) => (
                  <CardRequest
                    productRequest={productRequest}
                    key={productRequest.id}
                  />
                ))
            )
          ) : (
            <SuggestionsEmpty />
          ))}
      </main>
    </div>
  );
}

export default Dashboard;
