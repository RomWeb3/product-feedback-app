import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Dashboard from "./pages/Dashboard";
import FeedbackDetail from "./pages/FeedbackDetail";
import NewFeedback from "./pages/NewFeedback";
import EditFeedback from "./pages/EditFeedback";
import Roadmap from "./pages/Roadmap";
import useLocalStorage from "use-local-storage";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  const [datas, setDatas] = useLocalStorage("datas", []);
  const navigate = useNavigate();

  const onNavigate = () => {
    navigate("/new-feedback");
  };

  useEffect(() => {
    const localData = localStorage.getItem("datas");
    if (localData && !Array.isArray(JSON.parse(localData))) {
      setDatas(JSON.parse(localData));
    } else {
      fetch("./data/data.json")
        .then((response) => response.json())
        .then((data) => {
          setDatas(data);
          localStorage.setItem("datas", JSON.stringify(data));
        });
    }
  }, []);

  console.log(datas.productRequests);

  return (
    <div className="App">
      <ScrollToTop />
      <Routes>
        <Route
          path="/"
          element={
            <Dashboard
              datas={datas}
              setDatas={setDatas}
              onNavigate={onNavigate}
            />
          }
        />
        <Route
          path="/feedback/:feedbackId"
          element={<FeedbackDetail datas={datas} setDatas={setDatas} />}
        />
        <Route path="/new-feedback" element={<NewFeedback datas={datas} />} />
        <Route
          path="/edit-feedback/:feedbackId"
          element={<EditFeedback datas={datas} setDatas={setDatas} />}
        />
        <Route
          path="/roadmap"
          element={
            <Roadmap datas={datas} setDatas={setDatas} onClick={onNavigate} />
          }
        />
        <Route
          path="*"
          element={<Dashboard datas={datas} onNavigate={onNavigate} />}
        />
      </Routes>
    </div>
  );
}

export default App;
