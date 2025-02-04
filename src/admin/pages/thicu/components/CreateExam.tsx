import React, { useEffect, useState } from "react";
import "../components/CreateExam.scss";
import {
  Avatar,
  Button,
  Checkbox,
  ConfigProvider,
  DatePicker,
  Divider,
  Image,
  Input,
  Select,
  TimePicker,
} from "antd";
import ReactQuill, { Quill } from "react-quill";
import type { UploadProps } from "antd";
import { message, Upload } from "antd";
import icAddImg from "/assets/images/ic-addImage.svg";
import { ArrowDown2, Calendar, Refresh, SearchNormal1 } from "iconsax-react";
import viVN from "antd/es/locale/vi_VN";
import iconPdf from "/assets/images/iconPdf.svg";
import iconDownload from "/assets/images/download.svg";
import dayjs from "dayjs";
import "dayjs/locale/vi";
import BlotFormatter from "quill-blot-formatter/dist/BlotFormatter";
import imageResize from "quill-image-resize-module-react";
Quill.register("modules/blotFormatter", BlotFormatter);
Quill.register("modules/imageResize", imageResize);
import "react-quill/dist/quill.snow.css";
import { DeleteOutlined } from "@ant-design/icons";
import {
  createExamApi,
  deleteExamApi,
  getExamDetail,
  updateExamApi,
} from "@/admin/apis/exam";
import { createExamParam, createExamResult } from "@/admin/types/exam";
import { ApiResponse } from "@/admin/types/api";
import utc from "dayjs/plugin/utc";
import { useNavigate, useParams } from "react-router-dom";
import { ADMIN_PATHS } from "@/libs/constants/path";

dayjs.extend(utc);
const { Dragger } = Upload;
const { Option } = Select;
interface FileInfo {
  uid: string;
  lastModified: number;
  lastModifiedDate: Date;
  name: string;
  size: number;
  type: string;
  webkitRelativePath: string;
}
export const CreateExam = () => {
  const [selectAll, setSelectAll] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [examValue, setExamValue] = useState<{
    code: string;
    name: string;
    startDate: string;
    startTime: string;
    endDate: string;
    endTime: string;
    districtUnit: string;
    provinceCityUnit: string;
    wardCommuneUnit: string;
    villageHamletUnit: string;
    description: string;
    fileImage:
      | string
      | {
          uid: string;
          lastModified: number;
          lastModifiedDate: Date;
          name: string;
          size: number;
          type: string;
          webkitRelativePath: string;
        };
    fileThumb:
      | string
      | {
          uid: string;
          lastModified: number;
          lastModifiedDate: Date;
          name: string;
          size: number;
          type: string;
          webkitRelativePath: string;
        };
    filesDocument:
      | string
      | {
          uid: string;
          lastModified: number;
          lastModifiedDate: Date;
          name: string;
          size: number;
          type: string;
          webkitRelativePath: string;
        };
  }>({
    code: "",
    name: "",
    startDate: "",
    startTime: "",
    endDate: "",
    endTime: "",
    districtUnit: "",
    provinceCityUnit: "",
    wardCommuneUnit: "",
    villageHamletUnit: "",
    description: "",
    fileImage: "",
    fileThumb: "",
    filesDocument: "",
  });
  const [selectedCandidates, setSelectedCandidates] = useState<string[]>([]);
  const [searchValue, setSearchValue] = useState("");
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [previewCoverImage, setPreviewCoverImage] = useState<string | null>(
    null
  );
  const [uploadedFile, setUploadedFile] = useState(null);
  const navigate = useNavigate();
  const { idExam } = useParams();

  const handleRefresh = () => {
    const randomCode = `BG${Math.floor(1000 + Math.random() * 9000)}`;
    setExamValue((prevState) => ({
      ...prevState,
      code: randomCode,
    }));
  };
  const handleChange = (key: string, value: string | object) => {
    setExamValue((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };
  const props: UploadProps = {
    name: "fileImage",
    multiple: false,
    onChange(info) {
      handleChange("fileImage", info.file.originFileObj);
      handlePreview(info.file.originFileObj);
    },
  };
  const propsAnhBia: UploadProps = {
    name: "fileThumb",
    multiple: false,
    onChange(info) {
      handlePreviewCover(info.file.originFileObj);
      handleChange("fileThumb", info.file.originFileObj);
    },
  };

  const handleSubmit = async (type: string) => {
    const newData: createExamParam = {
      fileImage: examValue.fileImage,
      fileThumb: examValue.fileThumb,
      filesDocument: examValue.filesDocument,
      exam: {
        id: idExam,
        quizId: localStorage.getItem("quizId")
          ? JSON.parse(localStorage.getItem("quizId")!)
          : null,
        // certificateId: 1,
        // filterId: 1,
        name: examValue.name,
        code: examValue.code,
        startTime: dayjs(`${examValue.startDate}T${examValue.startTime}`)
          .utc()
          .format("YYYY-MM-DDTHH:mm:ss"),
        endTime: dayjs(`${examValue.endDate}T${examValue.endTime}`)
          .utc()
          .format("YYYY-MM-DDTHH:mm:ss"),
        information: examValue.description,
      },
    };

    if (!newData.exam.quizId) {
      message.error("Vui lòng tạo đề thi trước khi tạo kỳ thi");
      return;
    }
    try {
      let res: ApiResponse<createExamResult>;
      if (type === "create") {
        res = await createExamApi(newData);
      } else {
        res = await updateExamApi(newData);
      }
      if (res?.data) {
        navigate(ADMIN_PATHS.THI_CU);
        message.success(res?.message);
      }
    } catch {
      message.error("Thêm mới kỳ thi thất bại");
    }
  };
  const onChangeTime = (key: string, time, timeString: string) => {
    setExamValue((prevState) => ({
      ...prevState,
      [key]: timeString,
    }));
  };
  const onChangeDate = (key: string, date, dateString: string) => {
    setExamValue((prevState) => ({
      ...prevState,
      [key]: dateString,
    }));
  };

  const candidates = [
    { id: 1, name: "Hồ Quang Hiếu", avatar: "https://i.pravatar.cc/50?img=1" },
    { id: 2, name: "Nguyễn Văn A", avatar: "https://i.pravatar.cc/50?img=2" },
    { id: 3, name: "Trần Thị B", avatar: "https://i.pravatar.cc/50?img=3" },
    { id: 4, name: "Phạm Văn C", avatar: "https://i.pravatar.cc/50?img=4" },
  ];

  const filteredCandidates = candidates.filter((candidate) =>
    candidate.name.toLowerCase().includes(searchValue.toLowerCase())
  );
  const handleSelectAllChange = () => {
    if (selectAll) {
      setSelectedCandidates([]); // Unselect all if currently selected
    } else {
      setSelectedCandidates(
        filteredCandidates.map((candidate) => candidate.id.toString())
      ); // Select all
    }
    setSelectAll(!selectAll);
  };
  const handleCheckboxChange = (id: number) => {
    setSelectedCandidates((prev) =>
      prev.includes(id.toString())
        ? prev.filter((candidateId) => candidateId !== id.toString())
        : [...prev, id.toString()]
    );
  };
  const convertedDataToFile = (item) => {
    return {
      uid: `rc-upload-${Date.now()}-${item?.id}`,
      lastModified: new Date(item?.updatedTime).getTime(),
      lastModifiedDate: new Date(item?.updatedTime),
      name: item.fileName,
      size: item.size,
      type: item.type,
      webkitRelativePath: "",
    };
  };
  const fetchDetailExam = async () => {
    try {
      const fetchedData: any = await getExamDetail(idExam);
      if (fetchedData) {
        if (fetchedData.filesDocuments.length > 0) {
          const fileMetadata = convertedDataToFile(
            fetchedData.filesDocuments[0]
          );
          const fileUrl = `${
            import.meta.env.VITE_API_BASE_URL
          }/file/download-file-all-type?fileKey=${
            fetchedData.filesDocuments?.[0]?.fileKey
          }`;
          if (fileUrl) {
            const response = await fetch(fileUrl);
            if (response.ok) {
              const blob = await response.blob();
              console.log("Received Blob:", blob);

              setUploadedFile({
                ...fileMetadata,
                blob,
              });
            } else {
              console.error("Failed to fetch file from URL:", fileUrl);
            }
          }
        }

        const fileImageKey =
          fetchedData.fileImage && typeof fetchedData.fileImage === "object"
            ? fetchedData?.fileImage?.fileKey
            : null;

        setPreviewImage(
          fileImageKey
            ? `${
                import.meta.env.VITE_API_BASE_URL
              }/file/download-file-all-type?fileKey=${fileImageKey}`
            : ""
        );

        const fileThumbKey =
          fetchedData.fileThumb && typeof fetchedData.fileThumb === "object"
            ? fetchedData?.fileThumb?.fileKey
            : null;

        setPreviewCoverImage(
          fileThumbKey
            ? `${
                import.meta.env.VITE_API_BASE_URL
              }/file/download-file-all-type?fileKey=${fileThumbKey}`
            : ""
        );

        setExamValue((prevState) => ({
          ...prevState,
          code: fetchedData.code || prevState.code,
          name: fetchedData.name || prevState.name,
          filesDocument:
            fetchedData.filesDocuments.length > 0
              ? convertedDataToFile(fetchedData.filesDocuments[0])
              : "",
          fileImage: convertedDataToFile(fetchedData.fileImage),
          fileThumb: convertedDataToFile(fetchedData.fileThumb),
          startDate:
            dayjs.utc(fetchedData.startTime).local().format("YYYY-MM-DD") ||
            prevState.startDate,
          startTime:
            dayjs.utc(fetchedData.startTime).local().format("HH:mm") ||
            prevState.startTime,
          endDate:
            dayjs.utc(fetchedData.endTime).local().format("YYYY-MM-DD") ||
            prevState.endDate,
          endTime:
            dayjs.utc(fetchedData.endTime).local().format("HH:mm") ||
            prevState.endTime,
          description: fetchedData.information || prevState.description,
        }));
      }
    } catch (error) {
      console.error("Error fetching exams:", error);
    }
  };
  useEffect(() => {
    if (idExam) {
      fetchDetailExam();
    }
    window.scrollTo(0, 0);
  }, [idExam]);

  const dropdownRender = () => (
    <div style={{ padding: "8px", maxHeight: "300px", overflowY: "auto" }}>
      {/* Input Tìm Kiếm */}
      <Input
        prefix={<SearchNormal1 size="20" className="mr-2" />}
        placeholder="Tìm kiếm"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        className="py-3 mb-2"
      />
      <div
        className="flex justify-between items-center p-2 cursor-pointer"
        onClick={handleSelectAllChange}
      >
        <span>Tất cả ứng viên (1-1000)</span>
        <Checkbox checked={selectAll} onChange={handleSelectAllChange} />
      </div>
      {filteredCandidates.map((candidate) => (
        <div
          key={candidate.id}
          className="flex items-center justify-between py-1 px-2 border border-[#f0f0f0] cursor-pointer "
          onClick={() => handleCheckboxChange(candidate.id)}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <Avatar src={candidate.avatar} size={32} />
            <span className="ml-2">{candidate.name}</span>
          </div>
          <Checkbox
            checked={selectedCandidates.includes(candidate.id.toString())}
            onChange={() => handleCheckboxChange(candidate.id)}
          />
        </div>
      ))}
    </div>
  );
  const handleUpload = (file: FileInfo) => {
    setUploadedFile(file);
    return false; // Prevent automatic upload
  };
  const uploadPropsDocument = {
    multiple: true,
    showUploadList: false,
    accept: ".pdf,.doc,.docx,.png,.xlsx,.xls",
    beforeUpload: (file: FileInfo) => {
      handleChange("filesDocument", file);
      handleUpload(file);
      return false;
    },
  };

  const handlePreview = (file: FileInfo) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreviewImage(e.target?.result as string);
    };
    reader.readAsDataURL(file as unknown as Blob);
  };

  const handlePreviewCover = (file: FileInfo) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreviewCoverImage(e.target?.result as string);
    };
    reader.readAsDataURL(file as unknown as Blob);
  };
  const handleRemoveImage = () => {
    setPreviewImage(null);

    handleChange("fileThumb", "");
  };
  const handleRemoveFileThumb = () => {
    setPreviewCoverImage(null);
    handleChange("fileThumb", "");
  };
  const handleDeleteExam = async (id: string | number) => {
    try {
      const res = await deleteExamApi(id);
      if (res.message) {
        navigate(ADMIN_PATHS.THI_CU);
        message.success(res?.message);
      }
    } catch {
      message.error("Xóa kỳ thi thất bại");
    }
  };
  const handleDownload = () => {
    if (uploadedFile.blob) {
      const blob = uploadedFile.blob;

      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = uploadedFile.name;
      document.body.appendChild(a);
      a.click();

      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } else {
      console.error("Không có dữ liệu file hợp lệ để tải xuống.");
    }
  };

  return (
    <div className="">
      <div className="flex justify-between items-center mt-6">
        <h2 className="text-2xl leading-[28.13px] font-medium">
          Cài đặt kỳ thi
        </h2>
        {idExam ? (
          !isEdit ? (
            <div className="flex items-center gap-3 justify-end">
              <Button
                type="text"
                danger
                icon={<DeleteOutlined />}
                onClick={() => {
                  handleDeleteExam(idExam);
                }}
                className=" bg-[#DA251D1A] shadow-md h-12 !w-12 rounded-xl"
              />
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
                type="text"
                danger
                icon={<DeleteOutlined />}
                onClick={() => {
                  handleDeleteExam(idExam);
                }}
                className=" bg-[#DA251D1A] shadow-md h-12 !w-12 rounded-xl"
              />
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
                  handleSubmit("update");
                }}
                type="primary"
                className="border-none h-[49px] w-[141px] text-[17px] leading-[20.57px] font-bold rounded-xl"
              >
                Lưu
              </Button>
            </div>
          )
        ) : (
          <Button
            onClick={() => {
              handleSubmit("create");
            }}
            type="primary"
            className="border-none h-[49px] w-[141px] text-[17px] leading-[20.57px] font-bold rounded-xl"
          >
            Tạo
          </Button>
        )}
      </div>
      <div
        className={`border border-[#ADADAD] rounded-xl p-4 mt-6 ${
          idExam && !isEdit ? " pointer-events-none" : ""
        }`}
      >
        <div>
          <h2 className="text-[17px] leading-[25.5px] font-semibold text-[#000000]">
            Ảnh hiển thị (284x172px)
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
        <div className="mt-6">
          <h2 className="text-[17px] leading-[25.5px] font-semibold text-[#000000]">
            Ảnh bìa (1440x277px)
          </h2>
          <div className="mt-3 max-h-[239px]">
            {previewCoverImage ? (
              <div className="relative">
                <Image
                  src={previewCoverImage}
                  alt="Preview Cover"
                  className="w-full  max-h-[239px]"
                />
                <Button
                  type="text"
                  danger
                  icon={<DeleteOutlined />}
                  onClick={handleRemoveFileThumb}
                  className="absolute top-2 left-2 bg-white shadow-md"
                />
              </div>
            ) : (
              <Dragger {...propsAnhBia}>
                <div className="ant-upload-drag-icon flex justify-center">
                  <img src={icAddImg} alt="" />
                </div>
                <p className="mt-7 text-[15px] leading-[18.15px] font-semibold text-[#000000]">
                  Chọn ảnh trong thư viện
                </p>
                <p className="text-[15px] leading-6">
                  hoặc kéo thả tệp tại đây
                </p>
              </Dragger>
            )}
          </div>
        </div>
        <div className="mt-6">
          <div className="grid grid-cols-2 gap-[10px]">
            <div>
              <p className="text-[17px] leading-[25.5px] font-semibold text-[#000000] mb-4">
                Tên kỳ thi
              </p>
              <Input
                placeholder="Nhập"
                className="!h-[47px]"
                value={examValue.name}
                onChange={(e) => handleChange("name", e.target.value)}
                disabled={idExam && !isEdit}
              />
            </div>
            <div>
              <p className="text-[17px] leading-[25.5px] font-semibold text-[#000000] mb-4">
                Mã kỳ thi
              </p>
              <Input
                placeholder="BG4876"
                className="py-[11px]"
                value={examValue.code}
                disabled={idExam && !isEdit}
                suffix={
                  <Refresh
                    size="24"
                    onClick={handleRefresh}
                    style={{ cursor: "pointer" }}
                  />
                }
              />
            </div>
          </div>
        </div>
        <Divider style={{ border: "1px solid #E5E5E5" }} />
        <div className="">
          <p className="text-[17px] leading-[25.5px] font-semibold text-[#000000] mb-4">
            Ngày bắt đầu
          </p>
          <div className="grid grid-cols-2 gap-[10px] ">
            <TimePicker
              format={"HH:mm"}
              placeholder="Chọn giờ bắt đầu"
              suffixIcon={<ArrowDown2 size={24} className="px-1" />}
              onChange={(time, timeString: string) =>
                onChangeTime("startTime", time, timeString)
              }
              disabled={idExam && !isEdit}
              needConfirm={false}
              className="!h-12  "
              value={
                examValue.startTime ? dayjs(examValue.startTime, "HH:mm") : null
              }
            />
            <ConfigProvider locale={viVN}>
              <DatePicker
                onChange={(date, dateString: string) =>
                  onChangeDate("startDate", date, dateString)
                }
                disabled={idExam && !isEdit}
                placeholder="Chọn ngày bắt đầu"
                className="h-12"
                prefix={<Calendar size={24} className="px-1" />}
                suffixIcon=""
                value={examValue.startDate ? dayjs(examValue.startDate) : null}
              />
            </ConfigProvider>
          </div>
        </div>
        <div className="mt-4">
          <p className="text-[17px] leading-[25.5px] font-semibold text-[#000000] mb-4">
            Ngày kết thúc
          </p>
          <div className="grid grid-cols-2 gap-[10px] customTimePicker">
            <TimePicker
              format={"HH:mm"}
              placeholder="Chọn giờ kết thúc"
              suffixIcon={<ArrowDown2 size={24} className="px-1" />}
              onChange={(time, timeString: string) =>
                onChangeTime("endTime", time, timeString)
              }
              disabled={idExam && !isEdit}
              needConfirm={false}
              className="!h-12"
              value={
                examValue.endTime ? dayjs(examValue.endTime, "HH:mm") : null
              }
            />

            <ConfigProvider locale={viVN}>
              <DatePicker
                onChange={(date, dateString: string) =>
                  onChangeDate("endDate", date, dateString)
                }
                disabled={idExam && !isEdit}
                placeholder="Chọn ngày kết thúc"
                style={{ height: "48px" }}
                prefix={<Calendar size={24} className="px-1" />}
                suffixIcon=""
                value={examValue.endDate ? dayjs(examValue.endDate) : null}
              />
            </ConfigProvider>
          </div>
          <div className="mt-6">
            <h2 className="text-[17px] leading-[25.5px] font-semibold text-[#000000] ">
              Chỉ định ứng viên
            </h2>
            <p className="font-normal text-[15px] leading-[22.5px] py-4">
              Chọn bộ lọc
            </p>
            <Select
              placeholder="Theo địa danh"
              className="w-full customSelect"
              dropdownRender={dropdownRender}
              value={selectedCandidates}
              onChange={(values) => setSelectedCandidates(values)}
              mode="multiple"
              allowClear
              disabled={idExam && !isEdit}
            >
              {candidates.map((candidate) => (
                <Option
                  key={candidate.id.toString()}
                  value={candidate.id.toString()}
                >
                  {candidate.name}
                </Option>
              ))}
            </Select>
          </div>
          <div className="mt-6">
            <div className="grid grid-cols-2 gap-[10px]">
              <div>
                <p className="text-[15px] leading-[18.15px] font-medium text-[#0056D2] mb-2">
                  Đơn vị cấp Tỉnh/Thành phố
                </p>
                <Select
                  placeholder="Mặc định"
                  className="h-12 w-full"
                  onChange={(value) => {
                    handleChange("provinceCityUnit", value);
                  }}
                  disabled={idExam && !isEdit}
                  options={[
                    { value: "jack", label: "Jack" },
                    { value: "lucy", label: "Lucy" },
                    { value: "Yiminghe", label: "yiminghe" },
                    { value: "disabled", label: "Disabled", disabled: true },
                  ]}
                />
              </div>
              <div>
                <p className="text-[15px] leading-[18.15px] font-medium text-[#0056D2] mb-2">
                  Đơn vị cấp Quận/Huyện
                </p>
                <Select
                  placeholder="Mặc định"
                  className="h-12 w-full"
                  onChange={(value) => {
                    handleChange("districtUnit", value);
                  }}
                  disabled={idExam && !isEdit}
                  options={[
                    { value: "jack", label: "Jack" },
                    { value: "lucy", label: "Lucy" },
                    { value: "Yiminghe", label: "yiminghe" },
                    { value: "disabled", label: "Disabled", disabled: true },
                  ]}
                />
              </div>
            </div>
          </div>
          <div className="mt-6 pb-6">
            <div className="grid grid-cols-2 gap-[10px]">
              <div>
                <p className="text-[15px] leading-[18.15px] font-medium text-[#0056D2] mb-2">
                  Đơn vị cấp Xã/Phường
                </p>
                <Select
                  disabled={idExam && !isEdit}
                  placeholder="Mặc định"
                  className="h-12 w-full"
                  onChange={(value) => {
                    handleChange("wardCommuneUnit", value);
                  }}
                  options={[
                    { value: "jack", label: "Jack" },
                    { value: "lucy", label: "Lucy" },
                    { value: "Yiminghe", label: "yiminghe" },
                    { value: "disabled", label: "Disabled", disabled: true },
                  ]}
                />
              </div>
              <div>
                <p className="text-[15px] leading-[18.15px] font-medium text-[#0056D2] mb-2">
                  Đơn vị cấp Thôn/Xóm
                </p>
                <Select
                  disabled={idExam && !isEdit}
                  placeholder="Mặc định"
                  className="h-12 w-full"
                  onChange={(value) => {
                    handleChange("villageHamletUnit", value);
                  }}
                  options={[
                    { value: "jack", label: "Jack" },
                    { value: "lucy", label: "Lucy" },
                    { value: "Yiminghe", label: "yiminghe" },
                    { value: "disabled", label: "Disabled", disabled: true },
                  ]}
                />
              </div>
            </div>
          </div>
          <Divider style={{ border: "1px solid #E5E5E5" }} />
          <div className="">
            <p className="text-[17px] leading-[25.5px] font-semibold text-[#000000] mb-4">
              Thông tin kỳ thi
            </p>
            <ReactQuill
              theme="snow"
              style={{
                height: "auto",
              }}
              value={examValue.description}
              onChange={(value) => {
                handleChange("description", value);
              }}
              placeholder="Nhập thông tin kỳ thi..."
            />
          </div>
          <div className="mt-6">
            <div className="w-full flex justify-between items-center">
              <p className="text-[17px] leading-[25.5px] font-semibold text-[#000000] mb-4">
                Tài liệu
              </p>
              <Upload {...uploadPropsDocument}>
                <Button
                  type="primary"
                  className="border-none h-[49px] w-[87px] text-[17px] leading-[20.57px] font-bold rounded-xl"
                >
                  Tải file
                </Button>
              </Upload>
            </div>
            <div className="rounded-lg bg-[#F7F7F7] border border-[#CFCFCF]  flex items-center h-[104px] mt-4">
              {uploadedFile ? (
                <div className=" rounded-xl bg-[#F3F3F3] w-full">
                  <div className="p-5 flex justify-between items-center w-full">
                    <div className="flex items-center gap-4">
                      <img src={iconPdf} alt="" className="w-[37px] h-[48px]" />
                      <p className="text-[17px] leading-[19.92px] text-[#484848]">
                        {uploadedFile?.name || uploadedFile?.fileName}
                      </p>
                    </div>
                    <div
                      className={`p-5 mr-5 cursor-pointer ${
                        isEdit ? "" : "hidden"
                      }`}
                      onClick={handleDownload}
                    >
                      <img src={iconDownload} alt="" className="size-6" />
                    </div>
                  </div>
                </div>
              ) : (
                <span className="text-center w-full">
                  Chưa có tệp nào được tải lên
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
