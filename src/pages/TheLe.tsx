import { useEffect, useState } from "react";
import "./TheLe.scss";
import { useParams } from "react-router-dom";
import BannerImg from "/assets/images/banner-thele.svg";
import { Tabs } from "antd";
import type { TabsProps } from "antd";
import iconPdf from "../../public/assets/images/iconPdf.svg";
import iconDownload from "../../public/assets/images/download.svg";
import { getExamDetail } from "../api/exam";
import { useNavigate } from "react-router-dom";
interface TimeLeft {
  hours: number;
  minutes: number;
  seconds: number;
}
const TheLe = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [dataDetail, setDataDetail] = useState<any>({});

  useEffect(() => {
    fetchExamDetail(id);
    window.scrollTo(0, 0);
  }, [id]);

  const fetchExamDetail = async (id) => {
    try {
      const fetchedData = await getExamDetail(id);
      console.log('fetchedData', fetchedData);
      
      setDataDetail(fetchedData);

      if (fetchedData?.endTime) {
        const interval = setInterval(() => {
          setTimeLeft(calculateTimeLeft(fetchedData?.endTime));
        }, 1000);

        return () => clearInterval(interval);
      }
    } catch (error) {
      console.error("Error fetching exams:", error);
    } finally {
      // setLoading(false);
    }
  };
  const calculateTimeLeft = (endTime: string): TimeLeft => {
    const now = new Date();
    // const midnight = new Date();
    const end = new Date(endTime);
    // midnight.setHours(24, 0, 0, 0);
    const diff = end.getTime() - now.getTime();

    if (diff <= 0) {
      return { hours: 0, minutes: 0, seconds: 0 };
    }

    return {
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     setTimeLeft(calculateTimeLeft());
  //   }, 1000);

  //   return () => clearInterval(timer);
  // }, []);

  const formatNumber = (number: number): string =>
    number < 10 ? `0${number}` : number.toString();

  const onChange = (key: string) => {
    console.log(key);
  };
  
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Thông tin",
      children: <TabContent1 />,
    },
    {
      key: "3",
      label: "Tài liệu",
      children: <TabContent3 data={dataDetail} />,
    },
    {
      key: "4 ",
      label: "Đáp án",
      children: <TabContent4 data={dataDetail} />,
    },
  ];

  const handleNavigate = (id) => {
    if (id) {
      navigate(`/thong-tin-ca-nhan/${id}`);
    }
  };

  return (
    <>
      {/* Banner */}
      <div className="banner-thele">
        <div className="container mx-auto">
          <div className="banner-row">
            <div className="banner-left">
              <div className="py-4">
                <div className="text-[28px] uppercase">Cuộc thi trực tuyến</div>
                <div className="mt-[15px] text-[52px] font-[800] uppercase text-[#0056D2]">
                  {dataDetail?.name}
                </div>
              </div>
            </div>
            <div className="banner-right">
              <img src={BannerImg} />
            </div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-10 gap-10  lg:gap-[102px] mt-[21px] mb-10 container mx-auto p-2 lg:p-0">
        {/* Phần di chuyển lên đầu khi ở mobile */}
        <div className="lg:col-span-4 w-full order-1 lg:order-2">
          { dataDetail?.status == 'Đang thi' && 
            <div className="rounded-lg bg-white shadow-custom w-full p-4">
              <div className="h-[140px] rounded-xl bg-[#ECF4FF] pt-3 pb-1">
                <span className="flex justify-center w-full text-[15px] font-semibold leading-[18.15px] h-[25px]">
                  Cuộc thi sẽ kết thúc sau
                </span>
                <div className="mt-[10px]">
                  <div className="flex justify-center gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-[61px] h-14 bg-[#0056D2] text-white rounded-md flex items-center justify-center text-[32px] leading-[48px] font-bold">
                        {formatNumber(timeLeft.hours)}
                      </div>
                      <span className="mt-2 text-[15px] leading-[18.15px] text-[#181818]">
                        Giờ
                      </span>
                    </div>
                    <span className="text-[32px] leading-[48px] text-[#0056D2] font-bold">
                      :
                    </span>
                    <div className="flex flex-col items-center">
                      <div className="w-[61px] h-14 bg-[#0056D2] text-white rounded-md flex items-center justify-center text-[32px] leading-[48px] font-bold">
                        {formatNumber(timeLeft.minutes)}
                      </div>
                      <span className="mt-2 text-[15px] leading-[18.15px] text-[#181818]">
                        Phút
                      </span>
                    </div>
                    <span className="text-[32px] leading-[48px] text-[#0056D2] font-bold">
                      :
                    </span>
                    <div className="flex flex-col items-center">
                      <div className="w-[61px] h-14 bg-[#0056D2] text-white rounded-md flex items-center justify-center text-[32px] leading-[48px] font-bold">
                        {formatNumber(timeLeft.seconds)}
                      </div>
                      <span className="mt-2 text-[15px] leading-[18.15px] text-[#181818]">
                        Giây
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div onClick={() => handleNavigate(dataDetail?.id)} className="mt-[24px] bg-[#0056D2] rounded-[12px] px-[16px] py-[14px] text-[17px] font-[700] text-center text-white cursor-pointer">
                Vào thi ngay
              </div> 
            </div>
          }
        </div>

        {/* Phần Tabs */}
        <div className="lg:col-span-6 order-2 lg:order-1">
          <div className="custom-tabs-TheLe">
            <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
          </div>
        </div>
      </div>
    </>
  );
};

export default TheLe;

const TabContent1 = () => (
  <div className="mt-8 text-[#181818]">
    <span className="text-base font-medium ">
      Cuộc thi trực tuyến tìm hiểu về thông tin đối ngoại Thành phố Hà Nội năm
      2024
    </span>
    <p className="text-base font-medium ">
      (Thể lệ số 227/TL-BTC ngày 29/8/2024 của Ban Tổ chức “Cuộc thi trực tuyến
      tìm hiểu về chuyển đổi số thành phố Hà Nội” năm 2024)
    </p>
    <p className="mt-4 text-[15px] leading-6 ">
      Triển khai thực hiện Kế hoạch số 171/KH-UBND ngày 06/8/2024 của Chủ tịch
      UBND tỉnh về Kế hoạch tổ chức các hoạt động hưởng ứng Ngày Chuyển đổi số
      quốc gia năm 2024 trên địa bàn thành phố Hà Nội.
    </p>

    <p className="mb-6 text-[15px] leading-6">
      Quyết định số 225/QĐ-STTTT ngày 28/8/2024 của Giám đốc Sở Thông tin và
      Truyền thông về thành lập Ban Tổ chức và Tổ Giúp việc cho Ban Tổ chức Cuộc
      thi trực tuyến tìm hiểu về chuyển đổi số Thành phố Hà Nội năm 2024, Ban Tổ
      chức Cuộc thi ban hành Thể lệ với những nội dung cụ thể như sau:
    </p>

    <h2 className="text-base font-semibold text-[#0056D2] ">1. Đối tượng</h2>
    <p className="mb-6 text-[15px] leading-6">
      Cán bộ, công chức, viên chức, đoàn viên, hội viên và các tầng lớp Nhân dân
      đang sinh sống, học tập và lao động trên địa bàn tỉnh Thanh Hóa (các thành
      viên trong Ban Tổ chức, Ban Giám khảo, Ban Đề thi, Tổ thư ký giúp việc
      Cuộc thi không được tham gia dự thi). 
    </p>

    <h2 className="text-base font-semibold text-[#0056D2] ">2. Nội dung</h2>
    <p className="text-[15px] leading-6">
      Tổ chức tìm hiểu về chủ trương, đường lối của Đảng; chính sách, pháp luật
      của Nhà nước về CĐS; ý nghĩa, vai trò và lợi ích của CĐS mang lại; tìm
      hiểu về nội dung, mục tiêu, nhiệm vụ, giải pháp, kết quả triển khai CĐS
      trên địa bàn tỉnh Thanh Hóa, cụ thể:
    </p>
    <ul className="list-disc pl-6 space-y-2 mb-6 text-[15px] leading-6">
      <li>
        Quyết định số 749/QĐ-TTg ngày 03/6/2020 của Thủ tướng Chính phủ về phê
        duyệt Chương trình chuyển đổi số quốc gia đến năm 2025, định hướng đến
        năm 2025;
      </li>
      <li>
        Quyết định 942/QĐ-TTg ngày 15/6/2021 của Thủ tướng Chính phủ về phê
        duyệt Chiến lược phát triển Chính phủ điện tử hướng tới Chính phủ số
        giai đoạn 2021-2025, định hướng đến năm 2030;
      </li>
      <li>
        Quyết định số 146/QĐ-TTg ngày 28/01/2022 của Thủ tướng Chính phủ về phê
        duyệt Đề án “Nâng cao nhận thức, phổ cập kỹ năng và phát triển nguồn
        nhân lực chuyển đổi số quốc gia đến năm 2025, định hướng đến năm 2030”;
      </li>
      <li>
        Quyết định số 186/QĐ-BTTTT ngày 11/02/2022 của Bộ Thông tin và Truyền
        thông về phê duyệt Chương trình thúc đẩy phát triển và sử dụng các nền
        tảng số quốc gia phục vụ chuyển đổi số, phát triển chính phủ số, kinh tế
        số, xã hội số.
      </li>
      <li>
        Quyết định số 411/QĐ-TTg ngày 31/3/2022 của Thủ tướng Chính phủ: Phê
        duyệt Chiến lược quốc gia phát triển kinh tế số và xã hội số đến năm
        2025, định hướng đến năm 2030
      </li>
      <li>
        Quyết định số 922/QĐ-BTTTT ngày 20/5/2022 của Bộ Thông tin và Truyền
        thông về phê duyệt Đề án “Xác định Bộ chỉ số đánh giá chuyển đổi số của
        các bộ, cơ quan ngang Bộ, cơ quan thuộc Chính phủ, các tỉnh, thành phố
        trực thuộc Trung ương và của Quốc gia”.
      </li>
      <li>
        Quyết định số 377/QĐ-BTTTT ngày 26/3/2021 của Bộ Thông tin và Truyền
        thông về phê duyệt Chương trình hỗ trợ doanh nghiệp nhỏ và vừa.
      </li>
      <li>
        Nghị Quyết số 06-NQ/TU ngày 10/11/2021 về chuyển đổi số trên địa bàn
        tỉnh Thanh Hóa đến năm 2025, định hướng đến năm 2030;
      </li>
      <li>
        Chỉ thị số 06/CT-UBND ngày 16/5/2022 về phát triển chính quyền điện tử
        hướng tới chính quyền số, kinh tế số và xã hội số;
      </li>
      <li>
        Kế hoạch số 85/KH-UBND ngày 25/03/2022 của UBND tỉnh về truyền thông
        thực hiện Nghị quyết số 06-NQ/TU ngày 10/11/2021 của Ban Thường vụ Tỉnh
        ủy tỉnh về chuyển đổi số trên địa bàn tỉnh Thanh Hóa đến năm 2025, định
        hướng đến năm 2030.
      </li>
      <li>
        Quyết định số 176/QĐ-UBND ngày 10/01/2022 của UBND tỉnh về Chương trình
        hành động thực hiện Nghị quyết số 06-NQ/TU ngày 10/11/2021 của Ban
        Thường vụ Tỉnh uỷ về chuyển đổi số tỉnh Thanh Hóa đến năm 2025, định
        hướng đến năm 2030;
      </li>
      <li>
        Quyết định số 969/QĐ-UBND ngày 18/3/2022 của Chủ tịch UBND tỉnh về giao
        chỉ tiêu hoàn thành chuyển đổi số cấp huyện, cấp xã trên địa bàn tỉnh
        Thanh Hóa giai đoạn 2022-2025; 
      </li>
      <li>
        Kế hoạch số 53/KH-UBND ngày 03/3/2022 của Chủ tịch UBND tỉnh về thực
        hiện Đề án “Nâng cao nhận thức, phổ cập kỹ năng và phát triển nguồn nhân
        lực chuyển đổi số quốc gia đến năm 2025, định hướng đến năm 2030” trên
        địa bàn tỉnh Thanh Hóa;
      </li>
      <li>
        Chương trình số 54/CTr-UBND ngày 03/3/2022 của Chủ tịch UBND tỉnh về
        thực hiện Chương trình xác định Chỉ số đánh giá mức độ chuyển đổi số
        doanh nghiệp và hỗ trợ thúc đẩy doanh nghiệp chuyển đổi số trên địa bàn
        tỉnh Thanh Hóa;
      </li>
      <li>
        Kế hoạch số 78/KH-UBND ngày 21/3/2022 của Chủ tịch UBND tỉnh về triển
        khai thực hiện “Chương trình thúc đẩy phát triển và sử dụng nền tảng số
        quốc gia phục vụ chuyển đổi số, phát triển chính phủ số, kinh tế số, xã
        hội số” trên địa bàn tỉnh Thanh Hóa;
      </li>
      <li>
        Kế hoạch số 106/KH-UBND ngày 12/4/2022 về triển khai thực hiện Đề án
        phát triển thanh toán không dùng tiền mặt trên địa bàn tỉnh Thanh Hoá
        giai đoạn 2021-2025;
      </li>
      <li>
        Kế hoạch số 97/KH-UBND ngày 05/4/2022 về ban hành Kế hoạch Hỗ trợ, thúc
        đẩy chuyển đổi số, thanh toán không dùng tiền mặt trong các trường học,
        cơ sở giáo dục và bệnh viện, cơ sở y tế trên địa bàn tỉnh Thanh Hóa.
      </li>
      <li>
        Quyết định số 1829/QĐ-UBND ngày 30/5/2023 về việc ban hành các tiêu chí
        chuyển đổi số cấp xã đến năm 2025 trên địa bàn tỉnh Thanh Hóa;
      </li>
      <li>
        Quyết định số 1042/QĐ-UBND ngày 18/03/2024 về ban hành tạm thời bộ tiêu
        chí chuyển đổi số cấp huyện đến năm 2025 trên đia bàn tỉnh Thanh Hóa;
      </li>
      <li>
        Kế hoạch số 134/KH-UBND ngày 16/5/2022 về triển khai thực hiện phát
        triển kinh tế số và xã hội số giai đoạn 2022-2025, trên địa bàn tỉnh
        Thanh Hóa;
      </li>
      <li>
        Kế hoạch số 77/KH-UBND ngày 28/3/2023 về phát triển doanh nghiệp công
        nghệ số tỉnh Thanh Hóa đến năm 2025 và giai đoạn 2026-2030.
      </li>
      <li>
        Các kết quả chuyển đổi số và các văn bản chỉ đạo, hướng dẫn xây dựng
        chính quyền điện tử, chuyển đổi số; hướng dẫn hoạt động Tổ công nghệ số
        cộng đồng do Bộ Thông tin và Truyền thông và UBND tỉnh, Sở Thông tin và
        Truyền thông ban hành từ năm 2020 đến nay. 
      </li>
    </ul>

    <h2 className="text-base font-semibold text-[#0056D2] mb-2">
      3. Hình thức tham gia dự thi
    </h2>
    <ul className="list-disc pl-6 space-y-2 mb-6 text-[15px] leading-6">
      <li>
        Cuộc thi được tổ chức bằng hình thức thi trắc nghiệm trực tuyến trên
        phần mềm được công khai tại địa chỉ
        https://thitructuyen.thanhhoa.gov.vn.
      </li>
      <li>
        Cuộc thi được tổ chức trong 04 đợt, mỗi đợt thí sinh dự thi trả lời 20
        câu hỏi trắc nghiệm và 01 câu hỏi phụ dự đoán có bao nhiêu người tham
        gia. Mỗi câu hỏi có từ 03 đến 04 phương án trả lời và chỉ có duy nhất
        một phương án đúng.
      </li>
      <li>
        Thời gian làm bài thi 20 phút (kể từ khi thí sinh bắt đầu làm bài thi).
      </li>
    </ul>
  </div>
);
const TabContent3 = ({ data }) => {
  return (
    <>
      { data?.filesDocuments ? 
          <div className="mt-[24px] text-[15px] text-[#676767]">Không có tài liệu</div>
          :
        <div className="mt-11 rounded-xl bg-[#F3F3F3]">
          <div className="p-5 flex justify-between items-center">
            <div className="flex items-center gap-4">
              <img src={iconPdf} alt="" className="w-[37px] h-[48px]" />
              <p className="text-[17px] leading-[19.92px] text-[#484848]">
                {data?.filesDocuments[0]?.fileName}
              </p>
            </div>
            <div className="p-5 mr-5">
              <img src={iconDownload} alt="" className="size-6" />
            </div>
          </div>
        </div>
      }
    </>
  );
};
const TabContent4 = ({ data }) => {
  return (
    <>
      { data?.status == "Đã kết thúc" ? 
        <div>
          {data?.quiz?.questions.map((question, index) => (
            <div key={question.id} style={{ marginTop: '24px' }}>
              <div className="text-[17px] font-[500]">
                Câu {index + 1}.
              </div>
              <div> {question.question}</div>
              <ul className="mt-[16px]">
                {question.answers
                  .filter((answer) => answer.correct)
                  .map((answer, idx) => (
                    <li className="text-[15px] font-[500]" key={idx} style={{ color: '#0056D2' }}>
                      {answer.answer}
                    </li>
                  ))}
              </ul>
            </div>
          ))}
        </div>
        :
        <div className="mt-[24px] text-[15px] text-[#676767]">Chưa công bố đáp án</div>
      }
    </>
  );
};

