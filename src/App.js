import React, { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { routes } from './routes';
import HeaderComponent from './components/HeaderComponent/HeaderComponent';
import DefaultComponent from './components/DefaultComponent/DefaultComponent';
// import axios from 'axios';

export default function App() {
  // useEffect(() => {
  //   fetchApi()
  // }, []);
  // const fetchApi = async () => {
  //   try {
  //     const res = await axios.get(`${process.env.REACT_APP_API_URL_BACKEND}/product/alldetails`);
  //     console.log('Kết quả API:', res.data);
  //   } catch (error) {
  //     console.error('Lỗi khi gọi API:', error);
  //   }
  // }

  return (
    <Router>
      <Routes>
        {routes.map((route) => {
          const Page = route.page;
          const Layout = route.isShowHeader ? DefaultComponent : Fragment;

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
