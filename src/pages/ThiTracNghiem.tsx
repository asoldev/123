import "./ThiTracNghiem.scss";
import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { getExamDetail, postTest } from "../api/exam";
import { LogoutCurve } from "iconsax-react";
import { Button, Modal } from 'antd';

const ThiTracNghiem = () => {
  const location = useLocation();
  const { userExamId } = location.state || {};
  const navigate = useNavigate();
  const { id } = useParams();
  const [dataDetail, setDataDetail] = useState<any>({});
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(1200);

  useEffect(() => {
    fetchExamDetail(id);

    // Bộ đếm thời gian
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [id]);

  const fetchExamDetail = async (id) => {
    try {
      const fetchedData = await getExamDetail(id);
      setDataDetail(fetchedData);
    } catch (error) {
      console.error("Error fetching exams:", error);
    }
  };

  const handleSelectAnswer = (questionId, answerId, type) => {
    setAnswers((prev) => {
      if (type === 0) {
        return { ...prev, [questionId]: [answerId] };
      } else {
        const currentAnswers = prev[questionId] || [];
        if (currentAnswers.includes(answerId)) {
          return {
            ...prev,
            [questionId]: currentAnswers.filter((id) => id !== answerId),
          };
        } else {
          return { ...prev, [questionId]: [...currentAnswers, answerId] };
        }
      }
    });
  };

  const handleNopBai = () => {
    Modal.confirm({
      title: "Nộp bài thi",
      content: "Nhấn “Chắc chắn” đồng nghĩa với việc bạn đã hoàn tất bài thi và không thể chỉnh sửa cũng như thay đổi kết quả.",
      okText: "Chắc chắn",
      cancelText: "Quay lại",
      icon: null,
      onOk: handleSubmit,
    });
  };

  const handleOut = () => {
    Modal.confirm({
      title: "Bạn có chắc chắn muốn rời phòng thi",
      content: "Nhấn “Rời khỏi” đồng nghĩa với việc lịch sử làm bài của bạn sẽ không được lưu lại.",
      okText: "Rời khỏi",
      cancelText: "Tiếp tục",
      icon: null,
      onOk: handleBack,
    });
  };

  const handleBack = () => {
    navigate(`/cuoc-thi`);
  }
  const handleSubmit = async () => {
    try {
      const spentTime = (1200 - timeLeft) / 60;
      
      const questionsAndAnswers = Object.keys(answers).map((questionId) => ({
        questionId: parseInt(questionId),
        answersId: answers[questionId],
      }));

      const payload = {
        userExamId: userExamId,
        spentTime: spentTime.toFixed(0),
        questionsAndAnswers,
      };

      const result = await postTest(payload);
      if (result) {
        const updatedResult = { ...result, detailId: id };
        localStorage.setItem("ketquathi", JSON.stringify(updatedResult));
        navigate("/ket-qua-thi");
      }
    } catch (error) {
      console.error("Lỗi khi nộp bài:", error);
    }
  };


  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div className="bg-[#F5F5F5] min-h-screen">
      <div className="container mx-auto py-6">
        <div className="text-[20px] text-center mb-6  uppercase">
          <span className="border-b border-[#000]">CUỘC THI TRỰC TUYẾN:</span> <b>{dataDetail.name || "Đang tải..."}</b>
        </div>

        <div className="md:grid grid-cols-[1fr_300px] gap-6">

          {/* Phần bên trái: Câu hỏi */}
          <div className="thi-left md:p-4">
            {dataDetail.quiz?.questions?.map((question, index) => (
              <div key={question.id} className="mb-6">
                <p className="mb-2">
                  <b>Câu {index + 1}:</b> {question.question}
                </p>
                <div className="flex flex-col gap-2 md:ms-[45px] mt-[15px]">
                  {question.answers.map((answer) => (
                    <label
                      key={answer.id}
                      className="flex items-center gap-2 cursor-pointer rounded-[15px] px-[10px] py-[8px] bg-white"
                      style={{boxShadow: '0px 0px 8px 0px rgba(0, 0, 0, 0.08);'}}
                    >
                      <input
                        type={question.type === 0 ? "radio" : "checkbox"}
                        name={`question-${question.id}`}
                        value={answer.id}
                        checked={
                          question.type === 0
                            ? answers[question.id]?.[0] === answer.id
                            : answers[question.id]?.includes(answer.id)
                        }
                        onChange={() =>
                          handleSelectAnswer(
                            question.id,
                            answer.id,
                            question.type
                          )
                        }
                      />
                      {answer.answer}
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Phần bên phải: Thanh công cụ */}
          <div className="thi-right bg-white rounded-lg shadow">
            <div className="flex items-center justify-between bg-[#0056D2] p-[16px] rounded-tl-[12px] rounded-tr-[12px]">
                <div className="cursor-pointer" onClick={handleOut}><LogoutCurve color="#fff"/></div>
                <div>
                    <div className="text-end font-semibold text-[#fff]">
                        Thời gian còn lại
                    </div>
                    <div className="text-end text-xl font-bold text-white">
                        {formatTime(timeLeft)}
                    </div>
                </div>
            </div>
            <div className="p-[24px]">
                <div className="grid grid-cols-5 gap-2  bg-white">
                {dataDetail?.quiz?.questions?.map((question, index) => (
                    <div
                    key={question.id}
                    className={`w-10 h-10 flex items-center justify-center border rounded cursor-pointer ${
                        answers[question.id]?.length > 0
                        ? "bg-[#0056D2] text-white"
                        : "border border-[#0056D2] text-[#0056D2] font-bold"
                    }`}
                    >
                    {index + 1}
                    </div>
                ))}
                </div>
                <div className="border-t border-[#DADADA] pt-[15px] mt-[100px] mb-[32px]">
                    <div className="flex items-center gap-[12px]">
                        <div className="w-[36px] h-[36px] bg-[#0056D2]  rounded-[3px]"></div>
                        Câu hỏi đã làm
                    </div>
                    <div className="flex items-center gap-[12px] mt-[15px]">
                        <div className="w-[36px] h-[36px] border border-[#0056D2]  rounded-[3px]"></div>
                        Câu hỏi chưa làm
                    </div>
                </div>
                <button
                onClick={handleNopBai}
                className="w-full bg-[#0056D2] text-white py-2 rounded-lg font-bold hover:bg-blue-600"
                >
                Nộp bài
                </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThiTracNghiem;
