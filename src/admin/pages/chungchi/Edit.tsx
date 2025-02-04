import "./index.scss";
import { useState, useEffect } from "react";
import { Button, Input, Form, message } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "iconsax-react";
import { getCertificate, updateCertificate } from "../../apis/exam"; // Thêm API updateCertificate

// Hình ảnh mẫu chứng chỉ
import ImgChungchi1 from "/assets/images/chungchi1.png";
import ImgChungchi2 from "/assets/images/chungchi2.png";
import ImgChungchi3 from "/assets/images/chungchi3.png";
import ImgChungchi4 from "/assets/images/chungchi4.png";

const chungchiLst = [
  { id: 1, img: ImgChungchi1 },
  { id: 2, img: ImgChungchi2 },
  { id: 3, img: ImgChungchi3 },
  { id: 4, img: ImgChungchi4 },
];

const EditChungChi = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [selectedTemplate, setSelectedTemplate] = useState<number>(1);
  const [postValue, setPostValue] = useState<any>({});

  useEffect(() => {
    fetchCertificate(id);
  }, [id]);

  const fetchCertificate = async (id) => {
    try {
      const fetchedData = await getCertificate(id);
      console.log("fetchedData", fetchedData);

      if (fetchedData) {
        setPostValue(fetchedData); // Cập nhật postValue với dữ liệu từ API
        form.setFieldsValue({
          name: fetchedData.name, // Cập nhật giá trị của trường "name" trong form
        });
        setSelectedTemplate(fetchedData.cerTemplateId); // Cập nhật mẫu chứng chỉ được chọn
      }
    } catch (error) {
      console.error("Error fetching certificate:", error);
    }
  };

  const handleSubmit = async () => {
    try {
      await form.validateFields();

      const values = form.getFieldsValue();

      const data = {
        id: postValue.id, // Sử dụng ID từ postValue
        name: values.name,
        cerTemplateId: selectedTemplate, // Sử dụng mẫu chứng chỉ đã chọn
      };

      const response = await updateCertificate(data); // Gọi API chỉnh sửa

      if (response) {
        message.success("Chỉnh sửa chứng chỉ thành công!");
        navigate("/admin/chung-chi");
      }
    } catch (error) {
      console.error("Lỗi khi chỉnh sửa chứng chỉ:", error);
      message.error("Đã có lỗi xảy ra khi chỉnh sửa chứng chỉ. Vui lòng thử lại!");
    }
  };

  const handleTemplateClick = (id: number) => {
    setSelectedTemplate(id);
  };

  return (
    <div>
      <div className="flex items-center justify-between my-4">
        <div className="flex items-center gap-3">
          <ArrowLeft
            className="cursor-pointer"
            size="32"
            onClick={() => navigate(-1)}
          />
          <h1 className="text-2xl font-bold">Chỉnh sửa chứng chỉ</h1>
        </div>
        <div className="flex items-center gap-3 justify-end">
          <Button
            onClick={handleSubmit}
            type="primary"
            className="border-none h-[49px] w-[141px] text-[17px] leading-[20.57px] font-bold rounded-xl"
          >
            Lưu
          </Button>
        </div>
      </div>

      <div className="w-full">
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Tên chứng chỉ"
            rules={[
              { required: true, message: "Vui lòng nhập tên chứng chỉ!" },
            ]}
          >
            <Input
              placeholder="Nhập"
              className="!h-[47px]"
            />
          </Form.Item>

          <div className="mt-[24px]">
            <p className="text-[17px] leading-[25.5px] font-semibold text-[#000000] mb-4">
              Chọn mẫu chứng chỉ
            </p>
            <div className="flex items-center gap-[16px]">
              {chungchiLst.map((item) => (
                <img
                  key={item.id}
                  src={item.img}
                  alt={`Mẫu chứng chỉ ${item.id}`}
                  onClick={() => handleTemplateClick(item.id)}
                  style={{
                    border: selectedTemplate === item.id ? "3px solid #1890ff" : "3px solid #fff",
                    borderRadius: "8px",
                    cursor: "pointer",
                  }}
                />
              ))}
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default EditChungChi;