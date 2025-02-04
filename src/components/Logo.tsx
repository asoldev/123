import { useNavigate } from "react-router-dom";

const Logo = () => {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate(`/`);
  };
  return (
    <div
      className="flex gap-3 items-start cursor-pointer"
      onClick={handleNavigate}
    >
      <img
        src={"/assets/images/huy-hieu-doan.svg"}
        alt="Huy hiệu đoàn logo"
        className={`h-9`}
      />
      <div className={`font-bold text-white text-[14px] text-start`}>
        ĐOÀN THANH NIÊN <br />
        CỘNG SẢN HỒ CHÍ MINH
      </div>
    </div>
  );
};
export default Logo;
