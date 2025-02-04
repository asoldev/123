import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const Layout: React.FC = () => {
  return (
    <div className="relative">
      <Header />
      <div className="relative min-h-[calc(100vh-100px)] bg-[#fff]">
        <main>{<Outlet />}</main>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
