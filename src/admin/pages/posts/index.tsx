import "./index.scss"
import { Button, Pagination, Input } from "antd";
import { useState, useEffect } from "react";
import { getPostDetail } from "../../apis/exam";
import { Image } from "antd";
import type { UploadProps } from "antd";
import { Upload } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import icAddImg from "/assets/images/ic-addImage.svg";
import ReactQuill, { Quill } from "react-quill";

import BlotFormatter from "quill-blot-formatter/dist/BlotFormatter";
import imageResize from "quill-image-resize-module-react";
Quill.register("modules/blotFormatter", BlotFormatter);
Quill.register("modules/imageResize", imageResize);

const { Dragger } = Upload;
const BaiViet = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [postValue, setPostValue] = useState<any>({});

  useEffect(() => {
    fetchExam();
  }, []);

  const fetchExam = async () => {
    try {
      const fetchedData = await getPostDetail(3);
      
      if(fetchedData) {
        setPostValue(fetchedData); 

        const fileImageKey =
          fetchedData.file && typeof fetchedData.file === "object"
            ? fetchedData?.file?.fileKey
            : null;

        setPreviewImage(
          fileImageKey
            ? `${
                import.meta.env.VITE_API_BASE_URL
              }/file/download-file-all-type?fileKey=${fileImageKey}`
            : ""
        );
      }
    } catch (error) {
      console.error("Error fetching exams:", error);
    }
  };

  const handleSubmit = () => {}


  const handleChange = (key: string, value: string | object) => {
    setPostValue((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };
  const handleRemoveImage = () => {
    setPreviewImage(null);

    handleChange("fileThumb", "");
  };
  const handlePreview = (file: any) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreviewImage(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };
  const props: UploadProps = {
      name: "fileImage",
      multiple: false,
      onChange(info) {
        console.log("🚀 ~ onChange ~ info:1", info);
        handleChange("fileImage", info.file.originFileObj);
        handlePreview(info.file.originFileObj);
      },
    };

  return (
    <div>
      <div className="flex items-center justify-between my-4 ">
        <h1 className="text-2xl font-bold">Quản lý bài viết</h1>
        <div>
          {
            !isEdit ? (
              <div className="flex items-center gap-3 justify-end">
                <Button
                  onClick={() => {
                    setIsEdit(true);
                  }}
                  type="primary"
                  className="border-none h-[49px] w-[141px] text-[17px] leading-[20.57px] font-bold rounded-xl"
                >
                  Chỉnh sửa
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-3 justify-end">
                <Button
                  onClick={() => {
                    setIsEdit(false);
                  }}
                  color="primary"
                  variant="outlined"
                  className="h-[49px] w-[141px] text-[17px] leading-[20.57px] font-bold rounded-xl"
                >
                  Huỷ
                </Button>
                <Button
                  onClick={() => {
                    handleSubmit();
                  }}
                  type="primary"
                  className="border-none h-[49px] w-[141px] text-[17px] leading-[20.57px] font-bold rounded-xl"
                >
                  Lưu
                </Button>
              </div>
            )
          }
        </div>
      </div>

      <div
        className={`w-full ${
          !isEdit ? " pointer-events-none" : ""
        }`}
      >
        <div>
          <h2 className="text-[17px] leading-[25.5px] font-semibold text-[#000000]">
            Ảnh bìa (16:9)
          </h2>
          <div className="mt-4 max-w-[284px] max-h-[172px]">
            {!previewImage ? (
              <Dragger {...props}>
                <div className="ant-upload-drag-icon flex justify-center">
                  <img src={icAddImg} alt="" />
                </div>
                <p className="mt-[20px] text-[15px] leading-[18.15px] font-semibold text-[#000000]">
                  Chọn ảnh trong thư viện
                </p>
                <p className="text-[15px] leading-6">
                  hoặc kéo thả tệp tại đây
                </p>
              </Dragger>
            ) : (
              <div className="relative">
                <Image
                  src={previewImage}
                  alt="Preview"
                  className="max-w-[284px] max-h-[172px]"
                />
                <Button
                  type="text"
                  danger
                  icon={<DeleteOutlined />}
                  onClick={handleRemoveImage}
                  className="absolute top-2 left-2 bg-white shadow-md"
                />
              </div>
            )}
          </div>
        </div>

        <div className="mt-[24px]">
          <p className="text-[17px] leading-[25.5px] font-semibold text-[#000000] mb-4">
            Tiêu đề
          </p>
          <Input
            placeholder="Nhập"
            className="!h-[47px]"
            value={postValue.title}
            onChange={(e) => handleChange("name", e.target.value)}
            disabled={!isEdit}
          />
        </div>

        <div className="mt-[24px]">
          <p className="text-[17px] leading-[25.5px] font-semibold text-[#000000] mb-4">
            Nội dung
          </p>
          <ReactQuill
            theme="snow"
            style={{
              height: "auto",
            }}
            value={postValue.content}
            onChange={(value) => {
              handleChange("content", value);
            }}
            placeholder="Nhập nội dung..."
          />
        </div>
      </div>
    </div>
  );
};

export default BaiViet;
