import {
  Teacher,
  FavoriteChart,
  Book,
  Award,
  UserTag,
  Setting2,
  Subtitle
} from "iconsax-react";
import "./Sidebar.scss"
import React, { ReactNode } from "react";
import { NavLink } from "react-router-dom";
import { ADMIN_PATHS } from "../../libs/constants/path";
import Logo from "./Logo";

interface IMenu {
  icon: ReactNode;
  link: string;
  title: string;
}
const menu: IMenu[] = [
  {
    icon: <Teacher size="24" />,
    link: ADMIN_PATHS.THI_CU,
    title: "Quản lý thi cử",
  },
  {
    icon: <FavoriteChart size="24" />,
    link: ADMIN_PATHS.BAO_CAO_THONG_KE,
    title: "Báo cáo thống kê",
  },
  {
    icon: <Book size="24" />,
    link: ADMIN_PATHS.BAI_VIET,
    title: "Quản lý bài viết",
  },
  {
    icon: <Award size="24" />,
    link: ADMIN_PATHS.CHUNG_CHI,
    title: "Quản lý chứng chỉ",
  },
  // {
  //   icon: <UserTag size="24" />,
  //   link: ADMIN_PATHS.TAI_KHOAN,
  //   title: "Quản lý tài khoản",
  // },
  {
    icon: <Setting2 size="24" />,
    link: ADMIN_PATHS.CAI_DAT_BO_LOC,
    title: "Cài đặt bộ lọc",
  },
  {
    icon: <Subtitle size="24" />,
    link: ADMIN_PATHS.CAI_DAT_WEB,
    title: "Cài đặt website",
  },
];
const Sidebar: React.FC = () => {
  return (
    <div className="flex flex-col px-2 pb-[10px] h-full justify-between">
      <Logo size="small" text="text-left" />
      <div className="fixed top-[80px] flex-1 flex flex-col justify-center gap-3">
        {menu.map((item, index) => (
          <div>
            <NavLink
              key={index}
              to={item.link}
              className={({ isActive }) =>
                `flex items-center nav-link w-full rounded-[4px] gap-2 mb-2 py-2 px-5
          hover:bg-[#E5EEFB] hover:text-[#0056D2] transition duration-400 ease-in-out
           ${isActive ? "bg-[#E5EEFB] group text-[#0056D2] nav-active" : ""}`
              }
            >
              <span
                className="w-8 h-8 p-1 rounded-[4px] flex items-center justify-center text-[#989FAB] icon"
              >
                {item.icon}
              </span>{" "}
              <span>{item.title}</span>
            </NavLink>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Sidebar;
