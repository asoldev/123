import React from "react";

const Logo: React.FC<{size?: 'default' | 'small', text?: 'text-center' | 'text-left'}> = ({size = 'default', text = 'text-center'}) => {
  return (
    <div className="flex gap-3 items-center mt-[20px]">
      <img src="/assets/images/huy-hieu-doan.svg" alt="Huy hiệu đoàn logo" className={`${size === 'small' ? 'h-9' : ''}`} />
      <div className={`${text} font-bold ${size === 'small' ? 'text-[12px]' : ''}`}>
        ĐOÀN THANH NIÊN <br />
        CỘNG SẢN HỒ CHÍ MINH
      </div>
    </div>
  );
};
export default Logo;
