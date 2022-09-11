import React from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import SocketContextProvider from "./context/SocketContextProvider";
import { Routes } from "./router";
import ReactPWAInstallProvider from "react-pwa-install";

function App() {
  return (
    <ReactPWAInstallProvider enableLogging>
      <SocketContextProvider>
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </SocketContextProvider>
    </ReactPWAInstallProvider>
  );
}

export default App;
