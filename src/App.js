import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { routes } from './routes';
import HeaderComponent from './components/HeaderComponent/HeaderComponent';
import DefaultComponent from './components/DefaultComponent/DefaultComponent';
import { isJsonString } from './utils';
import { jwtDecode } from 'jwt-decode';
import * as UserService from './services/UserService';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from './redux/slices/userSlide';

export default function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  // Decode token và lấy thông tin người dùng khi component mount
  useEffect(() => {
    const { storageData, decode } = handleDecoded();
    if (decode?.id) {
      handleGetDetailsUser(decode?.id, storageData);
    }
  }, []);

  const handleDecoded = () => {
    let storageData = localStorage.getItem('access_token');
    let decode = {};
    if (storageData && isJsonString(storageData)) {
      storageData = JSON.parse(storageData);
      decode = jwtDecode(storageData);
    }
    return { decode, storageData };
  };

  // Đăng ký interceptor cho axios để refresh token nếu cần
  UserService.axiosJWT.interceptors.request.use(
    async (config) => {
      const { decode } = handleDecoded();
      const currentTime = new Date();
      if (decode?.exp < currentTime.getTime() / 1000) {
        const data = await UserService.refreshToken();
        config.headers['token'] = `Bearer ${data?.access_token}`;
      }
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );

  const handleGetDetailsUser = async (id, token) => {
    try {
      const res = await UserService.getDetailsUser(id, token);
      dispatch(updateUser({ ...res?.data, access_token: token }));
    } catch (error) {
      console.error("Failed to fetch user details:", error);
    }
  };

  // Kiểm tra quyền truy cập cho các route yêu cầu
  const checkAuth = (route) => {
    return !route.isPrivate || user.isAdmin;
  };

  return (
    <Router>
      <Routes>
        {routes.map((route) => {
          const Page = route.page;
          const Layout = route.isShowHeader ? DefaultComponent : Fragment;
          const isAuthValid = checkAuth(route);

          // Nếu không có quyền truy cập, chuyển hướng đến trang đăng nhập
          if (route.isPrivate && !isAuthValid) {
            return <Route key={route.path} path={route.path} element={<Navigate to="/admin" />} />;
          }

          return (
            <Route
              key={route.path}
              path={route.path}
              element={
                <Fragment>
                  {route.isShowHeader && <HeaderComponent />}
                  <Layout>
                    <Page />
                  </Layout>
                </Fragment>
              }
            />
          );
        })}
      </Routes>
    </Router>
  );
}
