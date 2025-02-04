import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";

const Layout: React.FC = () => {
  return (
    <div>
      <div className="relative flex overflow-hidden">
        <nav className="w-[230px] h-auto border-r">
          <Sidebar />
        </nav>
        <main className="flex-1 overflow-auto">
          <Header />
          <div className="px-[22px] pt-[60px] h-[100vh]">
            {<Outlet />}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
