import { useState } from "react";
import "./css/App.css";
import Header from "./components/Header";
import ImageInput from "./components/ImageInput";
import LayoutTemplate from "./components/LayoutTemplate";
import NumberImages from "./components/NumberImages";
import Download from "./components/Download";

function App() {
  return (
    <div className="app-container">
      <Header />
      <ImageInput />
      <div className="step-two-three-wrapper">
        <LayoutTemplate />
        <NumberImages />
        <Download />
      </div>
    </div>
  );
}

export default App;
