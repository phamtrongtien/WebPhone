import React from "react";
import Cards from "../Cards/Cards";
import Table from "../Table/Table";
import "./MainDash.css";
import HeaderComponent from "../../HeaderComponent/HeaderComponent";
import Thongke from "../Thongke/Thongke";
import TopProductsStats from "../Thongke/TopProduct/TopProduct";
const MainDash = () => {
  return (
    <div className="MainDash">
      <HeaderComponent isHidenCart isAdminPage isName />

      {/* <Cards />
       */}
      <Thongke />
      <TopProductsStats />
      {/* <Table /> */}
    </div>
  );
};

export default MainDash;
