import React from "react";
import { Link } from "react-router-dom";
import Logo from "./components/Logo";
import Banner1 from "/assets/images/text-1.svg";
import Banner2 from "/assets/images/text-2.svg";
import BgAuth from "/assets/images/bg-auth.png";
const Register = () => {
  return (
    <div className="relative w-full min-h-[1024px] flex">
      <div
        style={{ backgroundImage: `url(${BgAuth})` }}
        className="bg-center bg-top-center bg-no-repeat bg-cover min-h-[1024px] h-full w-[59.31%] max-w-[854px]"
      >
        <div className="pt-[65px] flex items-center flex-col">
          <div className="relative">
            <img src={Banner1} alt="" />
            <img src={Banner2} alt="" className="absolute bottom-[15px]" />
          </div>
        </div>
      </div>
      <div className="flex-1 flex flex-col items-center justify-center py-[55px] relative">
        <div className="top-[55px] absolute left-1/2 transform -translate-x-1/2">
          <Logo />
        </div>
        <div className="w-full px-20">
          <h1 className="text-[30px] font-semibold text-primary">Đăng ký</h1>
          <form className="space-y-6 mt-9">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-base font-medium">
                Tài khoản
              </label>
              <input
                id="email"
                placeholder="Nhập địa chỉ email"
                type="email"
                className={`mt-2 block w-full px-4 py-2 border rounded-lg`}
              />
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-base font-medium">
                Mật khẩu
              </label>
              <input
                id="password"
                type="password"
                placeholder="Nhập mật khẩu"
                className={`mt-2 block w-full px-4 py-2 border rounded-lg`}
              />
            </div>

            {/* Password Confirm Field */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-base font-medium"
              >
                Xác nhận mật khẩu
              </label>
              <input
                id="confirmPassword"
                type="confirmPassword"
                placeholder="Nhập lại mật khẩu"
                className={`mt-2 block w-full px-4 py-2 border rounded-lg`}
              />
            </div>
            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-primary text-white py-2 px-4 min-h-12 rounded-2xl hover:bg-primary/80 text-base font-medium"
            >
              Đăng ký
            </button>
            <div className="flex justify-center items-center gap-[10px]">
              <div>Đã có tài khoản?</div>
              <Link to="/admin/login" className="text-primary font-semibold">
                Đăng nhập ngay
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
