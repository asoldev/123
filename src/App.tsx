import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { PATH, ADMIN_PATHS } from "./libs/constants/path";

// CLIENT
import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import CuocThi from "./pages/CuocThi";
import TheLe from "./pages/TheLe";
import ThongTinCaNhan from "./pages/ThongTinCaNhan";
import ThiTracNghiem from "./pages/ThiTracNghiem";
import KetQuaThi from "./pages/KetQuaThi";

// LOGIN REGISTER
import Login from "./admin/Login";
import Register from "./admin/Register";

// ADMIN_PATHS
import { AuthProvider } from "./admin/components/AuthProvider";
import AdminLayout from "./admin/components/Layout";
import Dashboard from "./admin/Dashboard";
import ProtectedAdminRoute from "./admin/components/ProtectedRoute";
import ThiCu from "./admin/pages/thicu";
import BaoCaoThongKe from "./admin/pages/baocaothongke";
import ChungChi from "./admin/pages/chungchi";
import CreateChungChi from "./admin/pages/chungchi/Create";
import EditChungChi from "./admin/pages/chungchi/Edit";
import TaiKhoan from "./admin/pages/taikhoan";
import BaiViet from "./admin/pages/posts";
import CaiDatBoLoc from "./admin/pages/caidatboloc";
import CaiDatWeb from "./admin/pages/caidatweb";
import { PostCreate } from "./admin/pages/thicu/PostCreate";

function App() {
  return (
    <>
      <AuthProvider>
        <Router>
          <Routes>
            {/* Client Routes */}
            <Route
              element={
                <ProtectedRoute>
                  <Layout />
                </ProtectedRoute>
              }
            >
              <Route path={PATH.HOME} element={<Home />} />
              <Route path={PATH.CUOC_THI} element={<CuocThi />} />
              <Route path={PATH.TO_CHUC_DOAN} element={<About />} />
              <Route path={PATH.THE_LE} element={<TheLe />} />
              <Route path={PATH.THONG_TIN} element={<ThongTinCaNhan />} />
              <Route path={PATH.KET_QUA_THI} element={<KetQuaThi />} />
            </Route>
            
            <Route path={PATH.THI_TRAC_NGHIEM} element={<ThiTracNghiem />} />

            {/* Login Register Routes  */}
            <Route path="/admin/login" element={<Login />} />
            <Route path="/admin/register" element={<Register />} />

            {/* Admin Routes */}

            <Route
              path={ADMIN_PATHS.DASHBOARD}
              element={
                <ProtectedAdminRoute>
                  <AdminLayout />
                </ProtectedAdminRoute>
              }
            >
              <Route index element={<Dashboard />} />
              <Route path={ADMIN_PATHS.THI_CU} element={<ThiCu />} />
              <Route path={ADMIN_PATHS.BAI_VIET} element={<BaiViet />} />
              <Route path={ADMIN_PATHS.POST_CREATE} element={<PostCreate />} />
              <Route
                path={ADMIN_PATHS.PREVIEW_CREATE_EXAM}
                element={<PostCreate />}
              />
              <Route
                path={ADMIN_PATHS.PREVIEW_SETTING_EXAM}
                element={<PostCreate />}
              />
              <Route
                path={ADMIN_PATHS.BAO_CAO_THONG_KE}
                element={<BaoCaoThongKe />}
              />
              <Route path={ADMIN_PATHS.CHUNG_CHI} element={<ChungChi />} />
              <Route path={ADMIN_PATHS.CREATE_CHUNG_CHI} element={<CreateChungChi />} />
              <Route path={ADMIN_PATHS.EDIT_CHUNG_CHI} element={<EditChungChi />} />
              <Route path={ADMIN_PATHS.TAI_KHOAN} element={<TaiKhoan />} />
              <Route
                path={ADMIN_PATHS.CAI_DAT_BO_LOC}
                element={<CaiDatBoLoc />}
              />
              <Route path={ADMIN_PATHS.CAI_DAT_WEB} element={<CaiDatWeb />} />
            </Route>
          </Routes>
        </Router>
      </AuthProvider>
    </>
  );
}

export default App;
