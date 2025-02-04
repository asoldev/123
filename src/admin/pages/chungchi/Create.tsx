import "./index.scss";
import { Button, Input, Form, message } from "antd";
import { useState } from "react";
import { createCertificate } from "../../apis/exam";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "iconsax-react";

// hình ảnh mẫu chứng chỉ
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

const CreateChungChi = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [selectedTemplate, setSelectedTemplate] = useState<number>(1);

  const handleSubmit = async () => {
    try {
      await form.validateFields();

      const values = form.getFieldsValue();

      const data = {
        name: values.name,
        cerTemplateId: selectedTemplate,
      };

      const response = await createCertificate(data);

      if (response) {
        message.success("Tạo chứng chỉ thành công!");
        navigate("/admin/chung-chi");
      }
    } catch (error) {
      console.error("Lỗi khi tạo chứng chỉ:", error);
      message.error("Đã có lỗi xảy ra khi tạo chứng chỉ. Vui lòng thử lại!");
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
        <h1 className="text-2xl font-bold">Tạo chứng chỉ mới</h1>
        </div>
        <div className="flex items-center gap-3 justify-end">
          <Button
            onClick={handleSubmit}
            type="primary"
            className="border-none h-[49px] w-[141px] text-[17px] leading-[20.57px] font-bold rounded-xl"
          >
            Tạo mới
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

export default CreateChungChi;