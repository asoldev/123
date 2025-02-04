import {
  createSettingExam,
  deleteSettingExamApi,
  getSettingExamDetail,
} from "@/admin/apis/exam";
import { ApiResponse } from "@/admin/types/api";
import { settingExamResult } from "@/admin/types/exam";
import { DeleteOutlined } from "@ant-design/icons";
import {
  Button,
  Form,
  InputNumber,
  message,
  Radio,
  Select,
  Switch,
} from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ADMIN_PATHS } from "@/libs/constants/path";
export const SettingExam = () => {
  const navigate = useNavigate();
  const { quizId } = useParams();
  const [form] = Form.useForm();
  const [isEdit, setIsEdit] = useState(false);

  const [idQuiz, setIdQuiz] = useState<string | number | undefined>("");
  const [idSetting, setIdSetting] = useState<string | number | undefined>("");

  const onFinish = async (values) => {
    const data = {
      ...values,
      id: idSetting,
      quizId: localStorage.getItem("quizId")
        ? JSON.parse(localStorage.getItem("quizId")!)
        : null,
      limitRetry: values.limitRetry === "1" ? values.numberLimitRetry : 0,
    };
    if (!data.quizId) {
      message.error("Vui lòng tạo đề thi trước khi tạo cài đặt kỳ thi");
      return;
    }
    try {
      const res: ApiResponse<settingExamResult> = await createSettingExam(data);

      if (res?.data && res?.message) {
        message.success(res?.message);
      }
    } catch (error) {
      message.error(error.response.data.errorMsg);
    }
  };
  const fetchDetailSettingExam = async () => {
    try {
      const fetchedData = await getSettingExamDetail(quizId);
      if (fetchedData) {
        setIdQuiz(fetchedData?.quizId);
        setIdSetting(fetchedData?.id);
        form.setFieldsValue({
          examDuration: fetchedData.examDuration,
          limitQuestion: fetchedData.limitQuestion,
          maxScore: fetchedData.maxScore,
          passingScore: fetchedData.passingScore,
          limitRetry: fetchedData.limitRetry > 0 ? "1" : "0",
          numberLimitRetry:
            fetchedData.limitRetry > 0 ? fetchedData.limitRetry : undefined,
          showCertificate: fetchedData.showCertificate,
          showResult: fetchedData.showResult,
          shuffle: fetchedData.shuffle,
          blockTabCopy: fetchedData.blockTabCopy,
        });
      }
    } catch (error) {
      if (error.response.data.errorCode === "NOT_EXIST") {
        setIdQuiz(undefined);
        setIdSetting(undefined);
        message.error(error.response.data.errorMsg);
        // navigate(ADMIN_PATHS.DASHBOARD);
      }
    }
  };
  useEffect(() => {
    if (quizId) {
      fetchDetailSettingExam();
    }
    window.scrollTo(0, 0);
  }, [quizId]);
  const handleDeleteSettingExam = async (id: string | number) => {
    try {
      const res = await deleteSettingExamApi(id);
      if (res.message) {
        navigate(ADMIN_PATHS.THI_CU);
        message.success(res?.message);
      }
    } catch (error) {
      message.error(error.response.data.errorMsg);
    }
  };
  return (
    <div>
      <div className="flex justify-between items-center mt-6">
        <h2 className="text-2xl leading-[28.13px] font-medium">
          Cài đặt kỳ thi
        </h2>
        {idQuiz && !isEdit ? (
          <div className="flex items-center gap-3 justify-end">
            <Button
              type="text"
              danger
              icon={<DeleteOutlined />}
              htmlType="button"
              onClick={(event) => {
                event.preventDefault(); // Ngăn chặn hành vi mặc định
                handleDeleteSettingExam(quizId);
              }}
              className=" bg-[#DA251D1A] shadow-md h-12 !w-12 rounded-xl"
            />
            <Button
              onClick={(event) => {
                event.preventDefault(); // Ngăn chặn hành vi mặc định
                setIsEdit(true);
              }}
              type="primary"
              htmlType="button"
              className="border-none h-[49px] w-[141px] text-[17px] leading-[20.57px] font-bold rounded-xl"
            >
              Chỉnh sửa
            </Button>
          </div>
        ) : (
          <div className="flex items-center gap-3 justify-end">
            {isEdit && (
              <Button
                onClick={(event) => {
                  event.preventDefault(); // Ngăn chặn hành vi mặc định
                  setIsEdit(false);
                }}
                color="primary"
                variant="outlined"
                htmlType="button"
                className="h-[49px] w-[141px] text-[17px] leading-[20.57px] font-bold rounded-xl"
              >
                Huỷ
              </Button>
            )}

            <Button
              type="primary"
              className="border-none h-[49px] w-[141px] text-[17px] leading-[20.57px] font-bold rounded-xl"
              htmlType="submit"
              form="settingFormExam"
            >
              Lưu
            </Button>
          </div>
        )}
      </div>
      <Form
        id="settingFormExam"
        form={form}
        layout="vertical"
        onFinish={onFinish}
        className="mt-6"
        initialValues={{
          examDuration: "90",
          limitQuestion: "30",
          passingScore: 8,
          maxScore: 10,
          limitRetry: "1",
          numberLimitRetry: 1,
          showCertificate: true,
          showResult: true,
          shuffle: true,
          blockTabCopy: true,
        }}
      >
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Form.Item
              label="Thời gian làm bài thi"
              name="examDuration"
              className="text-[17px] leading-[25.5px] font-semibold text-[#000000]"
              //   rules={[{ required: true, message: "Vui lòng nhập tên đề thi!" }]}
            >
              <Select
                className="h-[48px]"
                defaultValue="90"
                options={[
                  { value: "15", label: "15 phút" },
                  { value: "30", label: "30 phút" },
                  { value: "45", label: "45 phút" },
                  { value: "60", label: "60 phút" },
                  { value: "90", label: "90 phút" },
                  { value: "120", label: "120 phút" },
                ]}
              />
            </Form.Item>
          </div>
          <div>
            <Form.Item
              label="Giới hạn câu hỏi"
              name="limitQuestion"
              className="text-[17px] leading-[25.5px] font-semibold text-[#000000]"
              //   rules={[{ required: true, message: "Vui lòng nhập tên đề thi!" }]}
            >
              <Select
                className="h-[48px]"
                defaultValue="30"
                options={[
                  { value: "10", label: "10 câu" },
                  { value: "20", label: "20 câu" },
                  { value: "30", label: "30 câu" },
                  { value: "50", label: "50 câu" },
                ]}
              />
            </Form.Item>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Form.Item
              label="Số điểm đạt đề thi"
              name="passingScore"
              className="text-[17px] leading-[25.5px] font-semibold text-[#000000]"
            >
              <InputNumber
                className="h-[48px]"
                min={1}
                max={10}
                defaultValue={8}
              />
            </Form.Item>
          </div>
          <div>
            <Form.Item
              label="Số điểm tối đa"
              name="maxScore"
              className="text-[17px] leading-[25.5px] font-semibold text-[#000000]"
            >
              <InputNumber
                className="h-[48px]"
                min={1}
                max={10}
                defaultValue={8}
              />
            </Form.Item>
          </div>
        </div>
        <div className=" grid grid-cols-2 gap-3">
          <div className="allowedAttempts">
            <Form.Item
              label="Số lần được phép làm lại đề thi"
              name="limitRetry"
              className="text-[17px] leading-[25.5px] font-semibold text-[#000000]"
            >
              <Radio.Group
                block
                options={[
                  {
                    label: (
                      <div className="flex items-center">
                        <Form.Item name="numberLimitRetry" className="mb-0">
                          <InputNumber defaultValue={1} />
                        </Form.Item>
                        <p className="pl-3 text-[15px] leading-[22.5px]  font-normal ">
                          Lần
                        </p>
                      </div>
                    ),
                    value: "1",
                  },
                  {
                    label: (
                      <p className="text-[15px] leading-[22.5px] font-normal">
                        Không giới hạn
                      </p>
                    ),
                    value: "0",
                  },
                ]}
                defaultValue="Apple"
              />
            </Form.Item>
          </div>
        </div>
        <div className=" grid grid-cols-2 gap-3">
          <div>
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                {" "}
                <p className="text-[17px] leading-[25.5px] font-semibold text-[#000000]">
                  Chứng chỉ thi đạt&nbsp;{" "}
                </p>
                <p className="text-[15px] leading-[25.5px] font-normal text-[#000000]">
                  {" "}
                  (khi đủ số điểm đạt)
                </p>
              </div>
              <Form.Item name="showCertificate" className="mb-0">
                <Switch defaultChecked />
              </Form.Item>
            </div>
          </div>
        </div>
        <div className=" grid grid-cols-2 gap-3 mt-6">
          <div>
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                {" "}
                <p className="text-[17px] leading-[25.5px] font-semibold text-[#000000]">
                  Tự động công bố đáp án &nbsp;{" "}
                </p>
                <p className="text-[15px] leading-[25.5px] font-normal text-[#000000]">
                  {" "}
                  (khi kỳ thi kết thúc)
                </p>
              </div>
              <Form.Item name="showResult" className="mb-0">
                <Switch defaultChecked />
              </Form.Item>
            </div>
          </div>
        </div>
        <div className=" grid grid-cols-2 gap-3 mt-6">
          <div>
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                {" "}
                <p className="text-[17px] leading-[25.5px] font-semibold text-[#000000]">
                  Trộn đề
                </p>
              </div>
              <Form.Item name="shuffle" className="mb-0">
                <Switch defaultChecked />
              </Form.Item>
            </div>
          </div>
        </div>
        <div className=" grid grid-cols-2 gap-3 mt-6">
          <div>
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                {" "}
                <p className="text-[17px] leading-[25.5px] font-semibold text-[#000000]">
                  Chống chuyển tab & copy paste
                </p>
              </div>
              <Form.Item name="blockTabCopy" className="mb-0">
                <Switch defaultChecked />
              </Form.Item>
            </div>
          </div>
        </div>
      </Form>
    </div>
  );
};
