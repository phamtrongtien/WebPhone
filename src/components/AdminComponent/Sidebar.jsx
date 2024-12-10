import React, { useState } from "react";
import "./Sidebar.css";
import Logo from "../AdminComponent/imgs/logo.png";
import { UilSignOutAlt } from "@iconscout/react-unicons";
import { SidebarData } from './Data/Data';
import { UilBars } from "@iconscout/react-unicons";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Popover } from "antd";

const Sidebar = ({ setActiveComponent }) => {
  const [selected, setSelected] = useState(0);
  const [expanded, setExpanded] = useState(true);
  const navigate = useNavigate();

  // Handle navigation and active component
  const handleNavigate = (index, item) => {
    setSelected(index);
    if (item.heading === "Orders") {
      setActiveComponent('orders');
    } else if (item.heading === "Customers") {
      setActiveComponent('customers');
    } else if (item.heading === "Products") {
      setActiveComponent('products');
    } else {
      setActiveComponent(null);
    }
  };

  // Handle navigating back to the homepage
  const handleBackHome = () => {
    navigate('/');
  };

  const content = (
    <div style={{ cursor: 'pointer' }}>
      <p onClick={handleBackHome}>Trở về trang mua hàng</p>
    </div>
  );

  // Toggle the sidebar visibility
  const toggleSidebar = () => {
    setExpanded(!expanded);
  };

  return (
    <>
      {/* Hamburger Icon (Bars) */}
      <div
        className={`bars ${expanded ? 'open' : ''}`}
        onClick={toggleSidebar}
      >
        <UilBars />
      </div>

      {/* Sidebar */}
      <motion.div
        className={`sidebar ${expanded ? 'open' : ''}`}
        animate={window.innerWidth <= 768 ? `${expanded}` : ''}
      >
        {/* Logo */}
        <Popover content={content} trigger="click" placement="bottomRight">
          <div className="logo" style={{ marginLeft: '10px' }}>
            <img src={Logo} alt="logo" />
            <span>
              Sh<span>o</span>ps
            </span>
          </div>
        </Popover>

        {/* Menu Items */}
        <div className="menu">
          {SidebarData.map((item, index) => (
            <div
              className={selected === index ? "menuItem active" : "menuItem"}
              key={index}
              onClick={() => handleNavigate(index, item)}
            >
              <item.icon />
              <span>{item.heading}</span>
            </div>
          ))}

          {/* Sign out button */}
          <div className="menuItem">
            <UilSignOutAlt onClick={handleBackHome} /> Logout
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Sidebar;
