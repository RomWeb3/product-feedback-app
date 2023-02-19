import Header from "../components/Header";
import Sort from "../components/Sort";
import CardRequest from "../components/CardRequest";
import SuggestionsEmpty from "../components/SuggestionsEmpty";

function Dashboard({ datas }) {
  return (
    <div className="App">
      <Header datas={datas} />
      <Sort />
      <main className="bg-verylightgray min-h-screen py-8 px-6 flex flex-col gap-4">
        {datas != [] > 0 &&
          (datas.productRequests.filter(
            (productRequest) => productRequest.status === "suggestion"
          ).length > 0 ? (
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
            <SuggestionsEmpty />
          ))}
      </main>
    </div>
  );
}

export default Dashboard;
