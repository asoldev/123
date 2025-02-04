import React, { useEffect, useState } from "react";
import {
  Button,
  Form,
  Input,
  Card,
  Select,
  Space,
  Radio,
  Upload,
  Modal,
  Checkbox,
  message,
} from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { Add, AddCircle } from "iconsax-react";
import {
  createExamTabs2,
  createQuestionApi,
  deleteExamTabs2Api,
  deleteQuestionApi,
  getExamDetailTabs2,
  updateExamTabs2Api,
  updateQuestionApi,
} from "@/admin/apis/exam";
import { useNavigate, useParams } from "react-router-dom";
import { ADMIN_PATHS } from "@/libs/constants/path";
import {
  ExamPramsCreateUpdateQuestion,
  ExamPramsTabs2,
  UpdateDataQuestion,
} from "@/admin/types/exam";

export const CreateExamTab2 = () => {
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [idOption, setIdOption] = useState<number | undefined>();
  const [isEdit, setIsEdit] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<string[][]>([]);
  const [questionsFiles, setQuestionsFiles] = useState<string[][]>([]);
  const [listQuestionDelete, setListQuestionDelete] = useState<string[]>([]);
  const [answerDeleteId, setAnswerDeleteId] = useState<string[]>([]);
  const { quizId } = useParams();
  const navigate = useNavigate();

  // State for the questions
  const [questions, setQuestions] = useState<
    {
      id?: string | number;
      quizId?: string | number;
      questionIndex: number;
      type: "0" | "1";
      question: string;
      answers: {
        answer: string;
        correct: boolean;
        id?: number | string | null;
        questionId?: number | string | null;
      }[];
    }[]
  >([
    {
      questionIndex: 0,
      type: "0",
      question: "",
      answers: [{ answer: "", correct: false, id: null, questionId: null }],
    },
  ]);

  const handleAddQuestion = () => {
    setQuestions([
      ...questions,
      {
        questionIndex: questions.length,
        type: "0" as "0" | "1", // Default type
        question: "",
        answers: [{ answer: "", correct: false }],
      },
    ]);
  };

  const handleRemoveQuestion = async (index: number) => {
    try {
      const updatedQuestions = questions.filter(
        (_, qIndex) => qIndex !== index
      );

      setQuestions(updatedQuestions);
      const res = await deleteQuestionApi(questions[index].id);
      if (res?.message) {
        message.success(res?.message);
        fetchDetailSettingExam();
      }
    } catch (error) {
      message.error(error?.errorMsg);
    }
  };

  const handleAddOption = (index: number) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].answers.push({ answer: "", correct: false });
    setQuestions(updatedQuestions);
  };

  const handleRemoveOption = (qIndex: number, oIndex: number) => {
    const updatedQuestions = [...questions];

    setAnswerDeleteId((prev) => {
      const updatedAnswerDeleteId = [...prev];
      updatedAnswerDeleteId.push(
        updatedQuestions[qIndex].answers[oIndex].id as string
      );
      return updatedAnswerDeleteId;
    });

    updatedQuestions[qIndex].answers.splice(oIndex, 1);
    setQuestions(updatedQuestions);
  };

  const handleQuestionChange = (index: number, value: string) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].question = value;
    setQuestions(updatedQuestions);
  };

  const handleOptionChange = (
    qIndex: number,
    oIndex: number,
    value: string
  ) => {
    const updatedQuestions = [...questions];
    updatedQuestions[qIndex].answers[oIndex].answer = value;
    setQuestions(updatedQuestions);
  };

  const handleCorrectChange = (
    qIndex: number,
    oIndex: number,
    checked: boolean
  ) => {
    const updatedQuestions = [...questions];
    const currentQuestion = updatedQuestions[qIndex];

    if (currentQuestion.type === "0") {
      currentQuestion.answers.forEach((option, index) => {
        if (index === oIndex) {
          option.correct = checked;
        } else {
          option.correct = false;
        }
      });
    } else {
      currentQuestion.answers[oIndex].correct = checked;
    }

    setQuestions(updatedQuestions);
  };

  const onFinish = async (value) => {
    const newDataCreate: ExamPramsTabs2 = {
      id: quizId,
      quizId: localStorage.getItem("quizId")
        ? JSON.parse(localStorage.getItem("quizId")!)
        : null,
      name: value.name,
      questions: questions.map((question, index) => ({
        question: question.question,
        type: question.type,
        questionIndex: index,
        answers: question.answers.map((answer) => ({
          answer: answer.answer,
          correct: answer.correct,
        })),
      })),
    };
    const newDataUpdate: ExamPramsTabs2 = {
      id: quizId,
      quizId: localStorage.getItem("quizId")
        ? JSON.parse(localStorage.getItem("quizId")!)
        : null,
      name: value.name,
    };

    try {
      let res;
      if (quizId) {
        res = await updateExamTabs2Api(newDataUpdate);
      } else {
        res = await createExamTabs2(newDataCreate, questionsFiles);
      }

      if (res?.data && res?.message) {
        setIsEdit(false);
        message.success(res.message);
        // navigate(ADMIN_PATHS.THI_CU);
        if (res?.data[0].quizId) {
          localStorage.setItem("quizId", JSON.stringify(res?.data[0].quizId));
        }
      }
    } catch {
      message.error("Thêm mới đề thi thất bại");
    }
  };
  const handlePreview = (file: File, index: number) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setUploadedFile((prev: string[][]) => {
        const updatedFiles = [...prev];
        if (!updatedFiles[index]) {
          updatedFiles[index] = [];
        }
        updatedFiles[index].push(e.target?.result as string);
        return updatedFiles;
      });
    };
    reader.readAsDataURL(file);
  };

  const getPropsUploadFile = (index) => ({
    beforeUpload: (file) => {
      const isImage = file.type.startsWith("image/");
      const isVideo = file.type.startsWith("video/");
      const isLt30M = file.size / 1024 / 1024 < 30;

      if (!isLt30M) {
        message.error("File phải nhỏ hơn 30MB!");
        return Upload.LIST_IGNORE;
      }

      if (isImage) {
        if (uploadedFile[index]?.length >= 5) {
          message.error("Chỉ được phép upload tối đa 5 ảnh!");
          return Upload.LIST_IGNORE;
        }
      } else if (isVideo) {
        if (
          uploadedFile[index]?.some((file: any) =>
            file.type.startsWith("video/")
          )
        ) {
          message.error("Chỉ được phép upload 1 video!");
          return Upload.LIST_IGNORE;
        }
      } else {
        message.error("Chỉ được phép upload ảnh hoặc video!");
        return Upload.LIST_IGNORE;
      }

      handlePreview(file, index);
      // setQuestionsFiles((prev) => {
      //   const updatedFiles = [...prev];
      //   updatedFiles[index] = file;
      //   return updatedFiles;
      // });
      setQuestionsFiles((prev: string[][]) => {
        const updatedFiles = prev.map((files, i) =>
          i === index ? [...files, file] : files
        );
        if (!updatedFiles[index]) {
          updatedFiles[index] = [file];
        }
        return updatedFiles;
      });

      return false; // Chặn upload tự động, xử lý upload theo cách riêng nếu cần
    },
  });
  const handleConfirm = () => {
    handleRemoveQuestion(idOption);
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const handleDeleteExam = async (id: string | number) => {
    try {
      const res = await deleteExamTabs2Api(id);
      if (res.message) {
        navigate(ADMIN_PATHS.THI_CU);
        message.success(res?.message);
      }
    } catch {
      message.error("Xoá thất bại");
    }
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
  const fetchAndConvertToFile = async (url, fileName, type) => {
    const response = await fetch(url);
    const blob = await response.blob();
    const file = new File([blob], fileName, { type: type });
    return file;
  };
  const fetchDetailSettingExam = async () => {
    try {
      const fetchedData = await getExamDetailTabs2(quizId);
      if (fetchedData) {
        form.setFieldsValue({ name: fetchedData.name });

        const formattedQuestions = fetchedData.questions.map((question) => ({
          id: question.id,
          questionIndex: question.questionIndex,
          quizId: question.quizId,
          type: question.type.toString() as "0" | "1",
          question: question.question,
          answers: question.answers.map((answer) => ({
            answer: answer.answer,
            correct: answer.correct,
            id: answer.id,
            questionId: answer.questionId,
          })),
        }));

        setQuestions(formattedQuestions);

        // Chuyển đổi fileKey thành URL và tải tệp về
        const filesData: any = await Promise.all(
          fetchedData.questions.map(async (question) => {
            if (question.files) {
              const filePromises = question.files.map(async (file: any) => {
                const isImage = file?.fileName.match(/\.(jpeg|jpg|png|gif)$/i);
                const isVideo = file?.fileName.match(/\.(mp4|mov|avi|mkv)$/i);

                // Tạo URL
                const fileUrl = `${
                  import.meta.env.VITE_API_BASE_URL
                }/file/download-file-all-type?fileKey=${file?.fileKey}`;

                // Tải tệp và chuyển thành File
                const fileObject = await fetchAndConvertToFile(
                  fileUrl,
                  file.fileName,
                  isImage
                    ? "image/*"
                    : isVideo
                    ? "video/*"
                    : "application/octet-stream"
                );

                return {
                  ...convertedDataToFile(file),
                  file: fileObject, // Thêm đối tượng File vào
                  url: fileUrl,
                  type: isImage ? "image" : isVideo ? "video" : "other",
                  fileKey: file.fileKey,
                };
              });

              return Promise.all(filePromises);
            }
            return [];
          })
        );

        setUploadedFile(filesData);
        setQuestionsFiles(filesData);
      }
    } catch (error) {
      setIsEdit(false);
      if (error.response?.data?.errorCode === "NOT_EXIST") {
        message.error(error.response?.data?.errorMsg);
        navigate(ADMIN_PATHS.DASHBOARD);
      }
    }
  };

  useEffect(() => {
    if (quizId) {
      fetchDetailSettingExam();
    }
    window.scrollTo(0, 0);
  }, [quizId]);
  const handleRemoveImage = (qIndex: number, fileIndex: number) => {
    setUploadedFile((prev) => {
      const updatedFiles = prev.map((files, i) =>
        i === qIndex ? files.filter((_, index) => index !== fileIndex) : files
      );
      return updatedFiles;
    });
    setQuestionsFiles((prev) => {
      const updatedFiles = prev.map((files, i) =>
        i === qIndex ? files.filter((_, index) => index !== fileIndex) : files
      );
      return updatedFiles;
    });
    setListQuestionDelete((prev) => [
      ...prev,
      (questionsFiles[qIndex][fileIndex] as any)?.fileKey,
    ]);
  };
  const handleSaveQuestion = async (index) => {
    try {
      const newData: ExamPramsCreateUpdateQuestion = {
        id: questions[index]?.id,
        quizId: questions[index]?.quizId
          ? questions[index]?.quizId
          : localStorage.getItem("quizId")
          ? JSON.parse(localStorage.getItem("quizId")!)
          : null,
        question: questions[index].question,
        type: questions[index].type,
        questionIndex: index,
        answers: questions[index].answers.map((answer) => ({
          answer: answer.answer,
          correct: answer.correct,
        })),
      };

      const updateDataQuestion: UpdateDataQuestion = {
        id: questions[index]?.id,
        question: questions[index].question,
        type: questions[index].type,
        questionIndex: index,
        addAnswers: questions[index].answers.map((answer) => ({
          answer: answer.answer,
          correct: answer.correct,
          id: answer?.id,
        })),
        fileKeysDelete: listQuestionDelete,
        answersIdDelete: answerDeleteId,
      };

      let res;
      if (questions[index]?.quizId) {
        res = await updateQuestionApi(
          updateDataQuestion,
          questionsFiles[index].filter((item: any) => !item.fileKey)
        );
      } else {
        res = await createQuestionApi(newData, questionsFiles[index]);
      }

      if (res.data && res.message) {
        setAnswerDeleteId([]);
        setListQuestionDelete([]);
        message.success(res.message);
      }
    } catch (error) {
      message.error(error?.errorMsg);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mt-6">
        <h2 className="text-2xl leading-[28.13px] font-medium">
          Cài đặt kỳ thi
        </h2>
        {quizId ? (
          !isEdit ? (
            <div className="flex items-center gap-3 justify-end">
              <Button
                type="text"
                danger
                icon={<DeleteOutlined />}
                onClick={(e) => {
                  e.preventDefault();
                  handleDeleteExam(quizId);
                }}
                className=" bg-[#DA251D1A] shadow-md h-12 !w-12 rounded-xl"
              />
              <Button
                onClick={(e) => {
                  e.preventDefault();
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
                onClick={(e) => {
                  e.preventDefault();
                  handleDeleteExam(quizId);
                }}
                className=" bg-[#DA251D1A] shadow-md h-12 !w-12 rounded-xl"
              />
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  setIsEdit(false);
                }}
                color="primary"
                variant="outlined"
                className="h-[49px] w-[141px] text-[17px] leading-[20.57px] font-bold rounded-xl"
              >
                Huỷ
              </Button>
              <Button
                htmlType="submit"
                form="examForm"
                type="primary"
                className="border-none h-[49px] w-[141px] text-[17px] leading-[20.57px] font-bold rounded-xl"
              >
                Lưu
              </Button>
            </div>
          )
        ) : (
          <Button
            type="primary"
            className="border-none h-[49px] w-[141px] text-[17px] leading-[20.57px] font-bold rounded-xl"
            htmlType="submit"
            form="examForm"
          >
            Tạo
          </Button>
        )}
        {/* <Button
          type="primary"
          className="border-none h-[49px] w-[141px] text-[17px] leading-[20.57px] font-bold rounded-xl"
          htmlType="submit"
          form="examForm"
        >
          Tạo
        </Button> */}
      </div>
      <Form
        id="examForm"
        form={form}
        layout="vertical"
        onFinish={onFinish}
        className={`mt-6 ${quizId && !isEdit ? "pointer-events-none" : ""}`}
      >
        <Form.Item
          label="Tên đề thi"
          name="name"
          className="text-[17px] leading-[25.5px] font-semibold text-[#000000]"
        >
          <Input
            className="!h-12"
            placeholder="Tìm hiểu về thông tin đối ngoại"
          />
        </Form.Item>

        <div className="mt-4">
          <h2 className="text-[17px] leading-[25.5px] font-semibold text-[#000000] mb-4">
            Bộ câu hỏi
          </h2>
          <div
            onClick={handleAddQuestion}
            className="bg-[#0056D21A] flex justify-center items-center rounded-xl py-4 cursor-pointer"
          >
            <Button
              type="link"
              className="text-[17px] leading-[25.5px] text-[#0056D2]"
              icon={<AddCircle size="24" color="#0056D2" variant="Bold" />}
            >
              Thêm câu hỏi
            </Button>
          </div>
          {questions.map((question, qIndex) => (
            <Card
              className="mt-6 border border-[#ADADAD] mb-5"
              key={question.questionIndex}
              title={`Câu ${qIndex + 1} `}
              extra={
                <div className="flex items-center h-full gap-3">
                  <Form.Item
                    name={["questions", qIndex, "type"]}
                    className="mb-0"
                  >
                    <Select
                      defaultValue={question.type}
                      onChange={(value) => {
                        const updatedQuestions = [...questions];
                        updatedQuestions[qIndex].type = value;
                        setQuestions(updatedQuestions);
                      }}
                      options={[
                        { value: "0", label: "Trắc nghiệm" },
                        { value: "1", label: "Hộp kiểm" },
                      ]}
                    />
                  </Form.Item>
                  <Upload
                    {...getPropsUploadFile(qIndex)}
                    showUploadList={false}
                  >
                    <Button
                      type="link"
                      icon={<Add size={24} />}
                      variant="outlined"
                      className="border border-primary"
                    >
                      Tải tệp lên
                    </Button>
                  </Upload>

                  <Button
                    danger
                    icon={<DeleteOutlined />}
                    onClick={() => {
                      setIsModalVisible(true);
                      setIdOption(qIndex);
                    }}
                  />
                </div>
              }
            >
              <div className="flex gap-4">
                {uploadedFile &&
                  uploadedFile.length > 0 &&
                  uploadedFile[qIndex] &&
                  uploadedFile[qIndex].map((file: any, fileIndex) => (
                    <div key={fileIndex} className="rounded-xl relative w-fit">
                      <div className="pb-5 flex justify-between items-center w-full">
                        <div className="flex items-center gap-4 w-full">
                          {(typeof file === "string" &&
                            file.startsWith("data:image/")) ||
                          file?.type === "image" ? (
                            <img
                              src={file?.url || file}
                              alt={`file-${fileIndex}`}
                              className="max-h-40"
                            />
                          ) : (
                            <video
                              src={file?.url || file}
                              controls
                              className="max-h-40"
                            />
                          )}
                        </div>
                      </div>
                      <Button
                        type="text"
                        danger
                        icon={<DeleteOutlined />}
                        onClick={() => handleRemoveImage(qIndex, fileIndex)}
                        className="absolute top-2 right-2 bg-white shadow-md"
                      />
                    </div>
                  ))}
              </div>
              <Input
                placeholder="Nhập câu hỏi"
                value={question.question}
                onChange={(e) => handleQuestionChange(qIndex, e.target.value)}
                className="!h-[48px]"
              />

              <Space direction="vertical" style={{ width: "100%" }}>
                {question.answers.map((option, oIndex) => (
                  <div
                    key={oIndex}
                    className={`flex items-center ${
                      oIndex === 0 ? "mt-4" : ""
                    }`}
                  >
                    {question.type === "0" ? (
                      <Radio
                        checked={option.correct}
                        onChange={(e) =>
                          handleCorrectChange(qIndex, oIndex, e.target.checked)
                        }
                      />
                    ) : (
                      <Checkbox
                        checked={option.correct}
                        onChange={(e) =>
                          handleCorrectChange(qIndex, oIndex, e.target.checked)
                        }
                      />
                    )}
                    <Input
                      placeholder={`Tùy chọn ${oIndex + 1}`}
                      value={option.answer}
                      onChange={(e) =>
                        handleOptionChange(qIndex, oIndex, e.target.value)
                      }
                      className="mr-2 border-none"
                    />
                    <Button
                      danger
                      onClick={() => handleRemoveOption(qIndex, oIndex)}
                    >
                      X
                    </Button>
                  </div>
                ))}
              </Space>
              <div className="mt-5 flex justify-between items-center">
                <Button
                  variant="text"
                  icon={<Add size={24} />}
                  onClick={() => handleAddOption(qIndex)}
                >
                  Thêm tùy chọn
                </Button>
                {quizId && isEdit && (
                  <Button
                    type="primary"
                    onClick={() => {
                      handleSaveQuestion(qIndex);
                    }}
                  >
                    Lưu
                  </Button>
                )}
              </div>
              <div>
                <Button
                  className="mt-6 text-[#06C270] bg-[#06C2701A] h-[48px] rounded-xl"
                  variant="text"
                  //   onClick={() => handleAddOption(qIndex)}
                >
                  Chọn đáp án
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </Form>
      <Modal
        open={isModalVisible}
        title={
          <h1 className="font-bold text-2xl leading-[29.05px] text-center">
            Xóa câu hỏi
          </h1>
        }
        onCancel={handleCancel}
        footer={[
          <div className="gap-3 flex items-center w-full justify-center mt-14">
            <Button
              key="cancel"
              variant="outlined"
              className="h-[49px] w-[220px] border rounded-xl font-semibold text-[17px] leading-[20.57px] text-[#0056D2] border-[#0056D2]"
              onClick={handleConfirm}
            >
              Xác nhận
            </Button>
            <Button
              key="confirm"
              type="primary"
              className="h-[49px] w-[220px] border rounded-xl font-semibold text-[17px] leading-[20.57px]"
              onClick={handleCancel}
            >
              Hủy bỏ
            </Button>
          </div>,
        ]}
      >
        <div className="mt-[52px]">
          <p className="text-xl leading-6 text-[#181818]">
            Nhấn “Xác nhận” đồng nghĩa với tất cả những thông tin liên quan đến
            câu hỏi sẽ bị xóa
          </p>
        </div>
      </Modal>
    </div>
  );
};
