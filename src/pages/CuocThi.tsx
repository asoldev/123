import "./Home.scss";
import { useEffect, useState } from "react";
import CalendarImg from "/assets/images/ic-calendar.png";
import DefaultImg from "/assets/images/img-default.svg";
import { useNavigate } from "react-router-dom";
import { getExam } from "../api/exam";
import { formatDateNotTime } from "@/utils/common";

const CuocThi = () => {
  return <p>ABC</p>
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({ before: [], within: [], after: [] });
  const [displayCount, setDisplayCount] = useState(4);

  useEffect(() => {
    fetchExam();
    window.scrollTo(0, 0);
  }, []);

  const fetchExam = async () => {
    setLoading(true);
    try {
      const fetchedData = await getExam();
      setData(fetchedData);
    } catch (error) {
      console.error("Error fetching exams:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleNavigate = (id) => {
    if (id) {
      navigate(`/the-le/${id}`);
    }
  };

  const handleViewMore = (totalExams) => {
    setDisplayCount((prev) => {
      const remainingExams = totalExams - prev; // Tính số lượng kỳ thi còn lại
      return prev + (remainingExams > 4 ? 4 : remainingExams); // Tăng thêm 4 hoặc số lượng còn lại
    });
  };

  const renderExamList = (exams) => {
    const totalExams = exams.length;
    const remainingExams = totalExams - displayCount;

    return (
      <>
        {/* Hiển thị danh sách kỳ thi */}
        {exams.slice(0, displayCount).map((item, index) => (
          <div
            key={index}
            className="p-[12px] rounded-[12px] cursor-pointer border border-[#DADADA]"
            onClick={() => handleNavigate(item.id)}
          >
            <img
              src={
                item.fileImage
                  ? `${import.meta.env.VITE_API_BASE_URL}/file/download-file-all-type?fileKey=${item.fileImage?.fileKey}`
                  : DefaultImg
              }
              className="w-full h-[172px] object-cover rounded-[4px]"
              alt="Thumbnail"
            />
            <div className="py-[8px] text-[16px] font-[500] min-h-[54px]">
              {item.name}
            </div>
            <div className="mt-[8px] font-[400] text-[#767A7F] text-[14px] flex gap-[4px]">
              <img width="20" src={CalendarImg} alt="Calendar" />
              {formatDateNotTime(item.startTime)} - {formatDateNotTime(item.endTime)}
            </div>
          </div>
        ))}

        {/* Hiển thị nút "Xem thêm" nếu còn kỳ thi chưa hiển thị */}
        {remainingExams > 0 && (
          <div
            className="viewmore inline-block w-[170px] cursor-pointer text-center mt-[20px]"
            onClick={() => handleViewMore(totalExams)}
          >
            Xem thêm {remainingExams > 4 ? 4 : remainingExams} kỳ thi
          </div>
        )}
      </>
    );
  };
  

  return (
    <div className="my-[40px]">
      {/* Kỳ thi đang diễn ra */}
      { data.within.length > 0 && <div className="container mx-auto">
        <div className="text-[24px] font-[600]">Kỳ thi đang diễn ra</div>
        <div className="my-[20px] grid md:grid-cols-2 lg:grid-cols-4 gap-[20px]">
          {renderExamList(data.within)}
        </div>
      </div> }

      {/* Kỳ thi sắp tới */}
      { data.before.length > 0 && <div className="container mx-auto mt-[40px]">
        <div className="text-[24px] font-[600]">Kỳ thi sắp tới</div>
        <div className="my-[20px] grid md:grid-cols-2 lg:grid-cols-4 gap-[20px]">
          {renderExamList(data.before)}
        </div>
      </div> }

      {/* Kỳ thi đã kết thúc */}
      { data.after.length > 0 && <div className="container mx-auto mt-[40px]">
        <div className="text-[24px] font-[600]">Kỳ thi đã kết thúc</div>
        <div className="my-[20px] grid md:grid-cols-2 lg:grid-cols-4 gap-[20px]">
          {renderExamList(data.after)}
        </div>
        {/* <div className="viewmore mx-[15px] md:mx-0">Xem thêm các kỳ thi</div> */}
      </div> }
    </div>
  );
};

export default CuocThi;
