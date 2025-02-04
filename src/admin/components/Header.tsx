import { Avatar, Dropdown, MenuProps, Space } from "antd";
import { ArrowDown2 } from "iconsax-react";
import React from "react";
import Ava from "/assets/images/ava.png";
import { useAuth } from "./AuthProvider";

const items: MenuProps["items"] = [
  {
    label: <p>Đăng xuất</p>,
    key: "LOGOUT",
  },
];

const Header: React.FC = () => {
  const { logout } = useAuth();
  
  const menuProps = {
    items,
    onClick: logout,
  };

  return (
    <header className="bg-white z-10 fixed top-0 w-[calc(100%_-_230px)] flex justify-end gap-2 h-[59px] px-4 py-[11.5px] border-b">
      {/* <Logo size="small" text="text-left" /> */}
      <div className="flex gap-3 items-center">
        <Dropdown menu={menuProps}>
          <Space className="flex gap-[6px] items-center cursor-pointer">
            <Avatar size={36} src={Ava}></Avatar>
            <ArrowDown2 size="16" variant="Bold" />
          </Space>
        </Dropdown>
      </div>
    </header>
  );
};

export default Header;
