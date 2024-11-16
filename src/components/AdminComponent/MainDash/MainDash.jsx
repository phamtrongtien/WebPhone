import React from "react";
import Cards from "../Cards/Cards";
import Table from "../Table/Table";
import "./MainDash.css";
import HeaderComponent from "../../HeaderComponent/HeaderComponent";
const MainDash = () => {
  return (
    <div className="MainDash">
      <HeaderComponent isHidenCart isAdminPage isName />

      <Cards />
      <Table />
    </div>
  );
};

export default MainDash;
