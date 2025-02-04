/* eslint-disable no-irregular-whitespace */
const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-top bg-[#0D509F] py-[24px]">
        <div className="container m-auto">
          <div className="grid lg:grid-cols-2 text-white gap-[50px]">
            <div className="md:grid grid-cols-[116px_1fr] gap-[24px]">
              <img
                src="/assets/images/huy-hieu-doan.svg"
                alt="Huy hiệu đoàn logo"
                className="md:w-full w-[50%] mb-6 md:mb-0"
              />
              <div className="">
                <div className="text-[16px] text-white font-[700] mb-[12px]">
                  ĐOÀN THANH NIÊN <br />
                  CỘNG SẢN HỒ CHÍ MINH
                </div>
                <div className="text-[14px] mb-[2px]">
                  Cơ quan phụ trách: Đoàn thanh niên Cộng sản Hồ Chí Minh
                </div>
                <div className="text-[14px] mb-[2px]">
                  Địa chỉ: 81 Lê Văn Thịnh, phường Suối Hoa, thành phố Bắc Ninh
                </div>
                <div className="text-[14px] mb-[2px]">
                  Điện thoại: 0222 3810 215
                </div>
                <div className="text-[14px] mb-[2px]">
                  Email: bantuyengiaotdbn@gmail.com
                </div>
              </div>
            </div>
            <div className="mt-[15px] lg:mt-[0]">
              <div className="grid grid-cols-2 md:grid-cols-2 gap-[20px] mb-[12px]">
              <div className="mt-[15px] lg:mt-[0]">
                <div className="text-[14px] font-[600]">Trang chủ</div>
                <div className="text-[14px] font-[600] mt-[15px]">Cuộc thi</div>
                <div className="text-[14px] font-[600] mt-[15px]">Tổ chức đoàn</div>
              </div>
              <div>
                <div className="text-[14px] font-[600] mb-[12px]">Mạng xã hội</div>
                <div className="flex">
                  <img
                    src="/assets/images/ic-fb.png"
                    className={`w-[24px] h-[24px]`}
                  />
                  <div className="ms-[10px] text-[14px]">Facebook</div>
                </div>
                <div className="flex mt-[14px]">
                  <img
                    src="/assets/images/ic-zalo.png"
                    className={`w-[24px] h-[24px]`}
                  />
                  <div className="ms-[10px] text-[14px]">Zalo</div>
                </div>
                <div className="flex mt-[14px]">
                  <img
                    src="/assets/images/ic-youtube.png"
                    className={`w-[24px] h-[24px]`}
                  />
                  <div className="ms-[10px] text-[14px]">Youtube</div>
                </div>
              </div>
              
            </div>
              </div>
          </div>
        </div>
      </div>
      <div className="footer-bottom bg-[#003177] text-center text-[14px] text-white p-[10px]">
        Bản quyền thuốc về Đoàn thanh niên Cộng sản Hồ Chí Minh
      </div>
    </footer>
  );
};

export default Footer;
