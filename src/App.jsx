import "./App.css";
import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Dashboard from "./pages/Dashboard";
import FeedbackDetail from "./pages/FeedbackDetail";
import NewFeedback from "./pages/NewFeedback";
import EditFeedback from "./pages/EditFeedback";

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
      <Routes>
        <Route
          path="/product-feedback-app/"
          element={<Dashboard datas={datas} />}
        />
        <Route
          path="/product-feedback-app/feedback/:feedbackId"
          element={<FeedbackDetail datas={datas} />}
        />
        <Route
          path="/product-feedback-app/new-feedback"
          element={<NewFeedback datas={datas} />}
        />
        <Route
          path="/product-feedback-app/edit-feedback/:feedbackId"
          element={<EditFeedback datas={datas} />}
        />
      </Routes>
    </div>
  );
}

export default App;
