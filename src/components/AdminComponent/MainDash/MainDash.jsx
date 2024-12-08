import React from "react";
import Cards from "../Cards/Cards";
import Table from "../Table/Table";
import "./MainDash.css";
import HeaderComponent from "../../HeaderComponent/HeaderComponent";
import CustomerReview from "../CustomerReview/CustomerReview";
const MainDash = () => {
  return (
    <div className="MainDash">
      <HeaderComponent isHidenCart isAdminPage isName />

      {/* <Cards />
       */}
      <CustomerReview />
      <Table />
    </div>
  );
};

export default MainDash;
