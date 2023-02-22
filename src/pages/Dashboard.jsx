import Header from "../components/Header";
import Sort from "../components/Sort";
import CardRequest from "../components/CardRequest";
import SuggestionsEmpty from "../components/SuggestionsEmpty";
import Menu from "../components/Menu";
import { useState } from "react";

function Dashboard({ datas, onNavigate }) {
  const [showMenu, setShowMenu] = useState(false);
  const [category, setCategory] = useState("all");

  return (
    <div className="App relative">
      <Header showMenu={showMenu} setShowMenu={setShowMenu} />
      <Menu
        datas={datas}
        showMenu={showMenu}
        setShowMenu={setShowMenu}
        category={category}
        setCategory={setCategory}
      />
      <Sort onClick={onNavigate} />

      <main className="bg-verylightgray min-h-screen py-8 px-6 flex flex-col gap-4">
        {datas != [] > 0 &&
          (datas.productRequests.filter(
            (productRequest) => productRequest.status === "suggestion"
          ).length > 0 ? (
            category === "all" ? (
              datas.productRequests
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
              datas.productRequests
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
