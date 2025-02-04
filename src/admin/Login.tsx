import Logo from "./components/Logo";
import Banner1 from "/assets/images/text-1.svg";
import Banner2 from "/assets/images/text-2.svg";
import BgAuth from "/assets/images/bg-auth.png";
import { Form } from "antd";
import { useNavigate } from "react-router-dom";
import { ChangeEvent, useState, useEffect } from "react";
import { useAuth } from "./components/AuthProvider";
import { getAccountDetail } from "./apis/accountService";
import { postLogin } from "./apis/auth";
import { jwtDecode } from "jwt-decode";

type LoginFormInputs = {
  username: string;
  password: string;
};

const Login = () => {
  const { login, isAuthenticated, setUserData } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState<string>("");
  
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/admin'); // Redirect to home page if already logged in
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (data: LoginFormInputs) => {
    try {
      const response = await postLogin(data.username, data.password);
      const { token, role, id } = response;
      if(token){ 
        login(token, role, id); // Store token and role
        const dataDetail  = await getAccountDetail(id.toString());
        const decodedToken: { roles: string[], sub: string } = jwtDecode(token);
        setUserData({
          sub: decodedToken.sub,
          info: dataDetail
        });
        navigate('/admin');
      }else{
        setError("Tài khoản hoặc mật khẩu không chính xác");
      }
     
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (_) {
      setError("Tài khoản hoặc mật khẩu không chính xác");
    }
  };

  function handleChange(_event: ChangeEvent<HTMLInputElement>): void {
    if (error) setError("");
  }

  return (
    <div className="relative w-full min-h-[100vh] flex">
      <div
        style={{ backgroundImage: `url(${BgAuth})` }}
        className="bg-center bg-top-center bg-no-repeat bg-cover min-h-[100vh] h-full w-[59.31%] max-w-[854px]"
      >
        <div className="pt-[50px] flex items-center flex-col">
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
          <h1 className="text-[30px] font-semibold text-primary">Đăng nhập</h1>
          <Form className="space-y-6 mt-9" onFinish={handleSubmit}>
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-base font-medium">
                Tài khoản
              </label>
              <Form.Item
                name="username"
                rules={[{ required: true, message: "Vui lòng nhập tài khoản" }]}
              >
                <input
                  id="username"
                  placeholder="Tài khoản"
                  className={`mt-2 block w-full px-4 py-2 border rounded-lg`}
                  onChange={handleChange}
                  autoComplete="off"
                />
              </Form.Item>
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-base font-medium">
                Mật khẩu
              </label>
              <Form.Item
                name={"password"}
                rules={[{ required: true, message: "Vui lòng nhập mật khẩu" }]}
              >
                <input
                  id="password"
                  type="password"
                  placeholder="Nhập mật khẩu"
                  className={`mt-2 block w-full px-4 py-2 border rounded-lg`}
                  onChange={handleChange}
                  autoComplete="off"
                />
              </Form.Item>
            </div>
            {/* Error Message */}
            {error && <div className="text-red-500">{error}</div>}
            {/* <div className="text-right">
              <Link to={"/"} className="text-primary font-semibold">
                Quên mật khẩu
              </Link>
            </div> */}
            {/* Submit Button */}
            <button
              type="submit"
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Đăng nhập
            </button>
            {/* <div className="flex justify-center items-center gap-[10px]">
              <div>Chưa có tài khoản?</div>
              <Link to="/register" className="text-primary font-semibold">
                Đăng ký ngay
              </Link>
            </div> */}
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;
