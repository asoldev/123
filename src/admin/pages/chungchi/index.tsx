import "./index.scss"
import { Button, Pagination, Input } from "antd";
import { formatDate } from "@/utils/common";
import { useState, useEffect } from "react";
import { SearchNormal1, ArrowRight2 } from "iconsax-react";
import { Table } from "antd";
import { useNavigate } from "react-router-dom";
import { ADMIN_PATHS } from "@/libs/constants/path";
import { getCertificateList } from "../../apis/certificate";
import DeleteIc from "/assets/images/delete.svg";

const ChungChi = () => {
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
      const fetchedData = await getCertificateList(query);
      setData(fetchedData.data); 
      setTotalRecords(fetchedData.totalRecords);
    } catch (error) {
      console.error("Error fetching exams:", error);
    } finally {
      setIsLoading(false);
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
      title: "Tên chứng chỉ",
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
      dataIndex: "createdTime",
      key: "createdTime",
      render: (text: string) => formatDate(text),
      width: 200,
    },
    {
      title: "",
      key: "actions",
      render: (_: any, record: any) => (
        <div className="flex gap-6">
          <button
            className="flex items-center gap-2 text-[#3E84F4]"
            onClick={() => navigate(`/admin/chinh-sua-chung-chi/${record.id}`)}
          >
            Chi tiết <div className="bg-[#ECF3FE] rounded-[50%] p-1"><ArrowRight2 size="14" color="#3E84F4"/></div>
          </button>
          <div className="cursor-pointer"><img src={DeleteIc}/></div>
        </div>
      ),
      width: 200,
    },
  ];

  return (
    <div>
      <div className="flex items-center justify-between my-4 ">
        <h1 className="text-2xl font-bold">Danh sách chứng chỉ</h1>
        <div className="flex gap-[16px] items-center">
          <Input
            className="w-[470px]"
            size="large"
            placeholder="Tìm kiếm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onPressEnter={() => fetchExam()} 
            prefix={<SearchNormal1 size="18"/>}
            allowClear
          />
          <Button
            type="primary"
            onClick={() => navigate(ADMIN_PATHS.CREATE_CHUNG_CHI)}
            className="h-[40px] font-[600]"
          >
            Tạo chứng chỉ mới
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
            scroll={{ y: "calc(100vh - 200px)" }}
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
            pageSizeOptions={['10', '20', '30', '50']} 
          />
        </div>
      </div>
    </div>
  );
};

export default ChungChi;
