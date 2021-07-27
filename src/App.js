import React from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import SocketContextProvider from "./context/SocketContextProvider";
import { Routes } from "./router";

function App() {
  return (
    <SocketContextProvider>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </SocketContextProvider>
  );
}

export default App;
