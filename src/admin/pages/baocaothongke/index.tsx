import "./index.scss";
import { Pagination, Input } from "antd";
import { formatDate } from "@/utils/common";
import { useState, useEffect } from "react";
import { SearchNormal1, ArrowRight2 } from "iconsax-react";
import { Table } from "antd";
import { useNavigate } from "react-router-dom";
import { getExamList, getStatistics } from "../../apis/exam";
import PeopleIc from "/assets/images/people.svg";
import TeacherIc from "/assets/images/teacher.svg";
import NoteIc from "/assets/images/note-2.svg";
import AwardIc from "/assets/images/award.svg";

type StatisticData = {
  countexam: number;
  countuser: number;
  countusercomplete: number;
};

const BaoCaoThongKe = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [dataStatistic, setDataStatistic] = useState<StatisticData>({
    countexam: 0,
    countuser: 0,
    countusercomplete: 0,
  });
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalRecords, setTotalRecords] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchExam();
    window.scrollTo(0, 0);
  }, [pageIndex, pageSize]);

  useEffect(() => {
    fetchStatistic();
  }, []);

  const fetchStatistic = async () => {
    try {
      const fetchedData = await getStatistics();
      console.log("fetchStatistic", fetchedData);

      setDataStatistic(fetchedData);
    } catch (error) {
      console.error("Error fetching exams:", error);
    }
  };

  const fetchExam = async () => {
    setIsLoading(true);
    const query = new URLSearchParams({
      name: searchTerm || "",
      page: (pageIndex - 1).toString(),
      size: pageSize.toString(),
    });

    try {
      const fetchedData = await getExamList(query);
      console.log("fetchedData", fetchedData);

      setData(fetchedData.data);
      setTotalRecords(fetchedData.totalRecords);
    } catch (error) {
      console.error("Error fetching exams:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case "Đang thi":
        return "bg-[#E7F7EF] text-[#0CAF60] w-[105px] h-[26px] rounded-[25px] flex item-center justify-center";
      case "Đã kết thúc":
        return "bg-[#FEECEC] text-[#F43E3E] w-[105px] h-[26px] rounded-[25px] flex item-center justify-center";
      case "Chưa thi":
        return "bg-[#3E84F4] text-[#ECF3FE] w-[105px] h-[26px] rounded-[25px] flex item-center justify-center";
      default:
        return "";
    }
  };

  const columns = [
    {
      title: "STT",
      dataIndex: "id",
      key: "id",
      render: (_: any, __: any, index: number) => index + 1,
      width: 70,
    },
    {
      title: "Tên kỳ thi",
      dataIndex: "name",
      key: "name",
      render: (text: string) => (
        <div
          className="font-[500]"
          dangerouslySetInnerHTML={{
            __html: text?.length > 255 ? `${text.slice(0, 255)}...` : text,
          }}
        />
      ),
      width: 250,
    },
    {
      title: "Ngày tạo",
      dataIndex: "startTime",
      key: "startTime",
      render: (text: string) => formatDate(text),
      width: 200,
    },
    {
      title: "Ngày cập nhật",
      dataIndex: "endTime",
      key: "endTime",
      render: (text: string) => formatDate(text),
      width: 200,
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (text: string) => (
        <div className={getStatusClass(text)}>{text}</div>
      ),
      width: 150,
    },
    {
      title: "",
      key: "actions",
      render: () => (
        <div className="flex gap-2">
          <button className="flex items-center gap-2 text-[#3E84F4]">
            Chi tiết{" "}
            <div className="bg-[#ECF3FE] rounded-[50%] p-1">
              <ArrowRight2 size="14" color="#3E84F4" />
            </div>
          </button>
        </div>
      ),
      width: 200,
    },
  ];

  const stats = [
    {
      label: "Số lượng thí sinh tham gia",
      value: dataStatistic?.countuser || 0,
      color: "text-[#ED6823]",
      bg: "bg-[#FFE5D8]",
      icon: PeopleIc,
    },
    {
      label: "Tổng số kỳ thi",
      value: dataStatistic?.countexam || 0,
      color: "text-[#3E84F4]",
      bg: "bg-[#ECF3FE]",
      icon: TeacherIc,
    },
    {
      label: "Đang thực hiện",
      value: dataStatistic?.countuser || 0,
      color: "text-[#DD9B00]",
      bg: "bg-[#FEF2D6]",
      icon: NoteIc,
    },
    {
      label: "Đã hoàn thành",
      value: dataStatistic?.countusercomplete || 0,
      color: "text-[#0CAF60]",
      bg: "bg-[#E7F7EF]",
      icon: AwardIc,
    },
  ];

  return (
    <div className="my-4">
      <div className="grid grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`flex items-center justify-between ${stat.bg} p-[12px] rounded-[8px] border border-[#E9EAEC]`}
          >
            <div>
              <div className="font-[500]">{stat.label}</div>
              <div className={`${stat.color} text-[24px] font-bold`}>
                {stat.value}
              </div>
            </div>
            <div>
              <img src={stat.icon} alt={stat.label} />
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between my-4">
        <h1 className="text-2xl font-bold">Danh sách kỳ thi</h1>
        <div className="flex gap-[16px] items-center">
          <Input
            className="w-[470px]"
            size="large"
            placeholder="Tìm kiếm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onPressEnter={() => fetchExam()}
            prefix={<SearchNormal1 size="18" />}
            allowClear
          />
        </div>
      </div>

      <div className="w-full">
        <div className="mb-4">
          <Table
            className="custom-table"
            dataSource={data}
            columns={columns}
            loading={isLoading}
            rowKey="id"
            pagination={false}
            scroll={{ y: "calc(100vh - 370px)" }}
          />
        </div>

        <div className="fixed bottom-5 right-[22px] bg-gray-200 border rounded-lg p-1">
          <Pagination
            current={pageIndex}
            total={totalRecords}
            pageSize={pageSize}
            onChange={(page, pageSize) => {
              setPageIndex(page);
              setPageSize(pageSize);
            }}
            showSizeChanger
            pageSizeOptions={["10", "20", "30", "50"]}
          />
        </div>
      </div>
    </div>
  );
};

export default BaoCaoThongKe;
