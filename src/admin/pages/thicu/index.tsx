import "./index.scss";
import { Button, Pagination, Input } from "antd";
import { formatDate } from "@/utils/common";
import { useState, useEffect } from "react";
import { SearchNormal1, ArrowRight2 } from "iconsax-react";
import { Table } from "antd";
import { useNavigate } from "react-router-dom";
import { ADMIN_PATHS } from "@/libs/constants/path";
import { getExamList } from "../../apis/exam";

const ThiCu = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalRecords, setTotalRecords] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchExam();
    window.scrollTo(0, 0);
  }, [pageIndex, pageSize]);

  const fetchExam = async () => {
    setIsLoading(true);
    const query = new URLSearchParams({
      name: searchTerm || "",
      page: (pageIndex - 1).toString(),
      size: pageSize.toString(),
    });

    try {
      const fetchedData = await getExamList(query);

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
      render: (data) => (
        <div className="flex gap-2">
          <button
            className="flex items-center gap-2 text-[#3E84F4]"
            onClick={() => {
              navigate(
                `/admin/preview-tao-ky-thi-moi/${data?.id}/quizId/${data?.quizId}/tabs/2`
              );
              // navigate(`/admin/preview-tao-ky-thi-moi/${id}/tabs/2`);
            }}
          >
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

  return (
    <div>
      <div className="flex items-center justify-between my-4 ">
        <h1 className="text-2xl font-bold">Danh sách thi cử</h1>
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
          <Button
            type="primary"
            onClick={() => navigate(ADMIN_PATHS.POST_CREATE)}
            className="h-[40px] font-[600]"
          >
            Tạo kỳ thi mới
          </Button>
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
            scroll={{ y: "calc(100vh - 260px)" }}
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

export default ThiCu;
