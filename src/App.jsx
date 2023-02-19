import { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Sort from "./components/Sort";
import CardRequest from "./components/CardRequest";

function App() {
  return (
    <div className="App">
      <Header />
      <Sort />
      <main className="bg-verylightgray min-h-screen py-8 px-6">
        <CardRequest />
      </main>
    </div>
  );
}

export default App;
