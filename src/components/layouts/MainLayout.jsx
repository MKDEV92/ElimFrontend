// src/components/layouts/MainLayout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../layouts/Footer"
import Navbar from "./Navbar";

const MainLayout = () => {
  return (
    <>
      <Navbar/>
      <div className="min-h-screen">
        <Outlet />
      </div>
      <Footer/>
    </>
  );
};

export default MainLayout;
