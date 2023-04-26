import * as React from "react";
import { Route, Routes } from "react-router";
import HomePage from "./components/HomePage";

function App() {
  return (
    
    <Routes>
      <Route exact path="/" element={<HomePage />} />
    </Routes>
  );
}

export default App;
