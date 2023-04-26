import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage";

ReactDOM.render(
  <BrowserRouter>
    <React.StrictMode>
          <Routes>
              <Route exact path="/" element={<HomePage/>} />
          </Routes>
    </React.StrictMode>
  </BrowserRouter>,
  document.getElementById("root")
);
