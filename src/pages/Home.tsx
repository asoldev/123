import "./Home.scss";
import BannerImg from "/assets/images/banner.svg";
import CuocThi from "./CuocThi"

const Home = () => {
  return (
    <>
      {/* Banner */}
      <div className="banner">
        <div className="container mx-auto">
          <div className="banner-left">
            <div>
              <div className="text-[28px] uppercase">Website thi trực tuyến</div>
              <div className="mt-[24px] text-[52px] font-[800] uppercase text-[#0056D2]">
                Đoàn thanh niên cộng sản hồ chí minh
              </div>
              <div className="mt-[64px] text-[15px]">
                Website thi trực tuyến của Đoàn Thanh niên Cộng sản Hồ Chí Minh thường được xây dựng nhằm hỗ trợ tổ chức các cuộc thi,
                hội thi dành cho đoàn viên, thanh niên và học sinh, sinh viên trên toàn quốc.
              </div>
            </div>
          </div>
          <div className="banner-right">
            <img src={BannerImg} alt="Banner" />
          </div>
        </div>
      </div>

      <CuocThi/>
    </>
  );
};

export default Home;
