import "./KetQuaThi.scss";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getExamHistory } from "../api/exam";
import BannerKQT from "/assets/images/banner-ketquathi.svg"
import ChungChiKQT from "/assets/images/chungchi-ketquathi.svg"
import KQT1 from "/assets/images/ketquathi1.svg"
import KQT2 from "/assets/images/ketquathi2.svg"
import KQT3 from "/assets/images/ketquathi3.svg"
import Close from "/assets/images/close.svg"
import { Modal } from 'antd';

const KetQuaThi = () => {
  const navigate = useNavigate();
  const [ketQua, setKetQua] = useState<any>({});
  const [dataDetail, setDataDetail] = useState<any>({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const data = localStorage.getItem("ketquathi");
    if (data) {
        const parsedData = JSON.parse(data);
        setKetQua(parsedData.data);
        fetchExamDetail(parsedData?.data?.userExamId)
    }
  }, []);

  const fetchExamDetail = async (id) => {
      try {
        const fetchedData = await getExamHistory(id);
        console.log('fetchedData', fetchedData);
        
        setDataDetail(fetchedData);
      } catch (error) {
        console.error("Error fetching exams:", error);
      }
    };

  const handleOnBoard = () => {
      navigate(`/`);
  };

  const handleViewCertificate = () => {
    alert("Xem chứng chỉ sẽ được triển khai sau.");
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const getOptionLabel = (index) => {
    let label = '';
    while (index >= 0) {
      label = String.fromCharCode(65 + (index % 26)) + label;
      index = Math.floor(index / 26) - 1;
    }
    return label;
  };

  return (
    <div className="banner-ketquathi">
        <div className="container mx-auto">
            <div className="lg:grid grid-cols-[292px_1fr] lg:gap-[214px] banner-ketquathi">
                <div className="h-[508px] kqt-left">
                    <div className="relative">
                        <img className="w-[257px] ms-[20px]" src={BannerKQT}/>
                        <img className="absolute top-[30%] w-[292px]" src={ChungChiKQT}/>
                    </div>
                </div>

                <div className="kqt-right lg:pt-[80px]">
                    <h1 className="text-[24px] text-[#767676] font-[600] mb-[8px]">Chúc mừng! 🎉</h1>
                    <p className="text-[48px] text-[#171717] font-[600] mb-[60px]">Bạn đã hoàn thành bài thi</p>

                    <div>
                        <div className="">
                            <div className="grid grid-cols-[150px_1fr] items-center gap-[32px]">
                                <div className="flex items-center space-x-2">
                                    <img src={KQT1}/>
                                    <p className="text-[14px] text-[#5A5A5A] font-bold">Tổng điểm</p>
                                </div>
                                <p className="text-[16px] text-[#0056D2] font-bold">{ketQua?.score || 0}</p>
                            </div>
                            <div className="grid grid-cols-[150px_1fr] items-center gap-[32px] mt-[20px]">
                                <div className="flex items-center space-x-2">
                                    <img src={KQT2}/>
                                    <p className="text-[14px] text-[#5A5A5A] font-bold">Số câu trả lời đúng</p>
                                </div>
                                <p className="text-[16px] text-[#0056D2] font-bold">
                                    {ketQua?.countQuestionCorrect || 0}<span className="text-[#2D2D2D]">/{ketQua?.totalQuestion || 0}</span>
                                </p>
                            </div>
                            <div className="grid grid-cols-[150px_1fr] items-center gap-[32px] mt-[20px]">
                                <div className="flex items-center space-x-2">
                                    <img src={KQT3}/>
                                    <p className="text-[14px] text-[#5A5A5A] font-bold">Thời gian làm bài</p>
                                </div>
                                <p className="text-[16px] text-[#2D2D2D] font-bold">29 phút 30 giây</p>
                            </div>
                        </div>
                        <div onClick={showModal} 
                            className="inline-block cursor-pointer text-[16px] text-[#0056D2] font-bold border-b border-[#0056D2] mt-[20px]">
                            Xem lại bài thi
                        </div>

                        <div className="mt-[60px] flex space-x-4">
                            <div className="btn-o-thi-primary" onClick={handleOnBoard}>Về trang chủ</div>
                            <div className="btn-thi-primary" onClick={handleViewCertificate}>Xem chứng chỉ</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <Modal
            title={
            <div className="flex justify-between items-center cursor-pointer">
                <span>Lịch sử</span>
                <img src={Close} className="w-[18px]" onClick={handleCancel}/>
            </div>
            }
            open={isModalOpen} 
            footer={null}
            width={950}
            className="modal-kqt"
            closeIcon={<img src={Close} />}
            >
            <div  className="md:grid grid-cols-2 gap-[12px]">
                {dataDetail.length > 0 && dataDetail?.map((question, index) => (
                    <div key={question.id} style={{ marginTop: '24px' }}>
                    <div className="text-[17px] font-[500]">Câu {index + 1}: {question.question}</div>
                    <ul>
                        {question.answers.map((answer, idx) => {
                            const optionLabel = getOptionLabel(idx);
                            return (
                            <li className="text-[15px]" 
                                key={answer.id} style={{ color: answer.correct ? '#0056D2' : '#171717' }}>
                                <span>{optionLabel}.</span> {answer.answer}
                            </li>
                            );
                        })}
                    </ul>
                    </div>
                ))}
            </div>
        </Modal>
    </div>
  );
};

export default KetQuaThi;