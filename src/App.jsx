import { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/Header";
import Sort from "./components/Sort";
import CardRequest from "./components/CardRequest";

function App() {
  const [datas, setDatas] = useState([]);

  useEffect(() => {
    fetch("../src/data/data.json")
      .then((response) => response.json())
      .then((data) => setDatas(data));
  }, []);

  console.log(datas);

  return (
    <div className="App">
      <Header />
      <Sort />
      <main className="bg-verylightgray min-h-screen py-8 px-6 flex flex-col gap-4">
        {datas != [] > 0 &&
          datas.productRequests
            .filter((productRequest) => productRequest.status === "suggestion")
            .map((productRequest) => (
              <CardRequest
                productRequest={productRequest}
                key={productRequest.id}
              />
            ))}
      </main>
    </div>
  );
}

export default App;
