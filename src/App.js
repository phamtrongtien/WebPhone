import React, { Fragment } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { routes } from './routes';
import HeaderComponent from './components/HeadrComponent/HeaderComponent';
import DefaultComponent from './components/DefaultComponent/DefaultComponent';

export default function App() {


  return (
    <div>
      <HeaderComponent />
      <Router>
        <Routes>
          {
            routes.map((route) => {
              const Page = route.page;
              const Layout = route.isShowHeader ? DefaultComponent : Fragment;
              return (<Route key={route.path} path={route.path} element={
                <Layout>
                  <Page />
                </Layout>
              } />)
            })
          }
        </Routes>
      </Router>

    </div>
  )
}
