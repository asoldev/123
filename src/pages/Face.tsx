import "./Home.scss";
import BannerImg from "/assets/images/banner.svg"
import { formatDate } from "@/utils/common";
import { useNavigate } from "react-router-dom";
import thumbnail1 from "/assets/images/thumnail1.png"
import thumbnail2 from "/assets/images/thumnail2.png"
import thumbnail3 from "/assets/images/thumnail3.png"
import thumbnail4 from "/assets/images/thumnail4.png"
import CalendarImg from "/assets/images/ic-calendar.png"

const data = [
 {
   id: 1,
   thumbnail: thumbnail1,
   createdAt: '10/09 - 15/10/2024',
   title: 'Tìm hiểu về thông tin đối ngoại',
   shortDescription: ''
 },
 {
   id: 2,
   thumbnail: thumbnail2,
   createdAt: '10/09 - 15/10/2024',
   title: 'Bồi dưỡng nâng cao nhận thức về Đảng của Đảng bộ',
   shortDescription: ''
 },
 {
   id: 3,
   thumbnail: thumbnail3,
   createdAt: '10/09 - 15/10/2024',
   title: 'Bồi dưỡng lý luận chính trị dành cho các Đảng viên mới',
   shortDescription: ''
 },
 {
   id: 4,
   thumbnail: thumbnail4,
   createdAt: '10/09 - 15/10/2024',
   title: 'Bồi dưỡng nâng cao nhận thức về Đảng của Đảng bộ',
   shortDescription: ''
 },
]
const CuocThi = () => {
 const navigate = useNavigate();

 const handleNavigate = (id) => {
   if (id) {
    //  navigate(`/thele/${id}`, {
    //    state: { source: "/guong-mat-thanh-thieu-nien-tieu-bieu" },
    //  });
    navigate(`/the-le/${id}`)
   }
 };
 return (
   <div className=" my-[40px]">
     {/* Kỳ thi đang diễn ra */}
     <div className="container mx-auto">
       <div className="text-[24px] font-[600]">Kỳ thi đang diễn ra</div>
       <div className="my-[20px] grid md:grid-cols-2 lg:grid-cols-4 gap-[20px]">
         {data.map((item, index) => (
           <div
             key={index}
             className="p-[12px] rounded-[12px] cursor-pointer border border-[#DADADA]"
             onClick={() => handleNavigate(item.id)}
           >
             <img
               src={item.thumbnail}
               className="w-full h-[172px] object-cover rounded-[4px]"
               alt={item.thumbnail}
             />
             <div className="py-[8px] text-[16px] font-[500] min-h-[54px]">
               {item.title}
             </div>
             
             <div className="mt-[8px] font-[400] text-[#767A7F] text-[14px] flex gap-[4px]">
               {/* {formatDate(item.createdAt)} */}
               <img width={'20'} src={CalendarImg} /> {item.createdAt}
             </div>
           </div>
         ))}
       </div>
       <div className="viewmore mx-[15px] md:mx-0">Xem thêm 4 kỳ thi</div>
     </div>

     {/* Kỳ thi sắp tới */}
     <div className="container mx-auto mt-[40px]">
       <div className="text-[24px] font-[600]">Kỳ thi sắp tới</div>
       <div className="my-[20px] grid md:grid-cols-2 lg:grid-cols-4 gap-[20px]">
         {data.map((item, index) => (
           <div
             key={index}
             className="p-[12px] rounded-[12px] cursor-pointer border border-[#DADADA]"
             onClick={() => handleNavigate(item.id)}
           >
             <img
               src={item.thumbnail}
               className="w-full h-[172px] object-cover rounded-[4px]"
               alt={item.thumbnail}
             />
             <div className="py-[8px] text-[16px] font-[500] min-h-[54px]">
               {item.title}
             </div>
             
             <div className="mt-[8px] font-[400] text-[#767A7F] text-[14px] flex gap-[4px]">
               {/* {formatDate(item.createdAt)} */}
               <img width={'20'} src={CalendarImg} /> {item.createdAt}
             </div>
           </div>
         ))}
       </div>
       <div className="viewmore mx-[15px] md:mx-0">Xem thêm 4 kỳ thi</div>
     </div>

     {/* Kỳ thi đã kết thúc */}
     <div className="container mx-auto mt-[40px]">
       <div className="text-[24px] font-[600]">Kỳ thi đã kết thúc</div>
       <div className="my-[20px] grid md:grid-cols-2 lg:grid-cols-4 gap-[20px]">
         {data.map((item, index) => (
           <div
             key={index}
             className="p-[12px] rounded-[12px] cursor-pointer border border-[#DADADA]"
             onClick={() => handleNavigate(item.id)}
           >
             <img
               src={item.thumbnail}
               className="w-full h-[172px] object-cover rounded-[4px]"
               alt={item.thumbnail}
             />
             <div className="py-[8px] text-[16px] font-[500] min-h-[54px]">
               {item.title}
             </div>
             
             <div className="mt-[8px] font-[400] text-[#767A7F] text-[14px] flex gap-[4px]">
               {/* {formatDate(item.createdAt)} */}
               <img width={'20'} src={CalendarImg} /> {item.createdAt}
             </div>
           </div>
         ))}
       </div>
       <div className="viewmore mx-[15px] md:mx-0">Xem thêm 4 kỳ thi</div>
     </div>
   </div>
 );
};

export default CuocThi;
