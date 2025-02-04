import React, { useState, useEffect } from "react";
import Logo from "./Logo";
import { ReactNode } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { PATH } from "@/libs/constants/path";
import Search from "/assets/images/ic-search.png"
import "./Header.css";

interface IMenu {
  icon: ReactNode;
  link: string;
  title: string;
}

const Header: React.FC = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const source = location.state?.source;
  

  const menu: IMenu[] = [
    {
      link: PATH.HOME,
      title: "Trang chủ",
      icon: undefined,
    },
    {
      link: PATH.CUOC_THI,
      title: "Cuộc thi",
      icon: undefined,
    },
    {
      link: PATH.TO_CHUC_DOAN,
      title: "Giới thiệu tổ chức đoàn",
      icon: undefined,
    }
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <header className="header">
      <div className="navbar container  m-auto">
        <div className="navbar-link">
          <Logo />
          {/* Nút mở menu */}
          <button
            className="menu-toggle-btn lg:hidden md:text-[#fff]"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            ☰
          </button>
          {/* Menu chính */}
          <div
            className={`menu flex gap-[24px] lg:items-center ${
              isMenuOpen ? "block" : "hidden"
            } lg:flex`}
          >
            {menu.map((item, index) => (
              <NavLink
                key={index}
                to={item.link}
                className={({ isActive }) =>
                  `group inline-flex items-center p-[10px] rounded-md text-base font-medium text-center ${
                    isActive || item.link == source ? "active" : ""
                  }`
                }
              >
                <span
                  className="navbar-text"
                  dangerouslySetInnerHTML={{ __html: item.title }}
                ></span>
              </NavLink>
            ))}
            <div className="menu-search-container relative">
              <input
                className="menu-search"
                placeholder="Tìm kiếm cuộc thi..."
              />
              <div className="ic-search">
                <img width={'24px'} src={Search}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
