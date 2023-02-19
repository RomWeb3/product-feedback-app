import "./App.css";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import FeedbackDetail from "./pages/FeedbackDetail";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/product-feedback-app/" element={<Dashboard />} />
        <Route
          path="/product-feedback-app/feedback/:feedbackId"
          element={<FeedbackDetail />}
        />
      </Routes>
    </div>
  );
}

export default App;
