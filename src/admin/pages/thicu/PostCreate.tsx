import { ArrowLeft } from "iconsax-react";
import React from "react";
import { Tabs, TabsProps } from "antd";
import { CreateExam } from "./components/CreateExam";
import "./components/CreateExam.scss";
import { CreateExamTab2 } from "./components/CreateExamTab2";
import { SettingExam } from "./components/SettingExam";
import { useNavigate, useParams } from "react-router-dom";

const onChange = (key: string) => {
  console.log(key);
};

const items: TabsProps["items"] = [
  {
    key: "1",
    label: "Kỳ thi",
    children: <CreateExam />,
  },

  {
    key: "2",
    label: "Đề thi",
    children: <CreateExamTab2 />,
  },
  {
    key: "3",
    label: "Cài đặt đề thi",
    children: <SettingExam />,
  },
];
export const PostCreate = () => {
  const { tab } = useParams();
  const navigate = useNavigate();

  const validTabs = ["1", "2", "3"];
  const defaultTab = validTabs.includes(tab) ? tab : "2";

  return (
    <div className="mt-8 ">
      <div className="flex items-center gap-3">
        <ArrowLeft
          className="cursor-pointer"
          size="32"
          onClick={() => navigate(-1)}
        />
        <h2 className="font-medium text-[24px] leading-[28.13px] text-[#000000]">
          Tạo kỳ thi mới
        </h2>
      </div>
      <div className="mt-6 custom-tabs-PostCreate">
        <Tabs
          defaultActiveKey={defaultTab}
          type="card"
          items={items}
          onChange={onChange}
        />
      </div>
    </div>
  );
};
