import React, { useState } from "react";
import "./Sidebar.css";
import Logo from "../AdminComponent/imgs/logo.png";
import { UilSignOutAlt } from "@iconscout/react-unicons";
import { SidebarData } from './Data/Data';
import { UilBars } from "@iconscout/react-unicons";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Popover } from "antd";

const Sidebar = ({ setActiveComponent }) => { // Nhận setActiveComponent từ props
  const [selected, setSelected] = useState(0);
  const [expanded, setExpaned] = useState(true);
  const navigate = useNavigate();
  const handleNavigate = (index, item) => {
    setSelected(index);
    if (item.heading === "Orders") {
      setActiveComponent('orders'); // Hiển thị ManageOrder
    } else if (item.heading === "Customers") {
      setActiveComponent('customers'); // Hiển thị ManageCustomer

    }
    else if (item.heading === "Products") {
      setActiveComponent('products'); // 
    } else {
      setActiveComponent(null); // Ẩn ManageOrder và ManageCustomer cho các mục khác
    }
  };
  const handleBackHome = () => {
    navigate('/')
  }
  const content = (
    <div style={{ cursor: 'pointer' }}>

      <>
        <p onClick={handleBackHome}>Trở về trang mua hàng</p>

      </>

    </div>
  );

  return (
    <>
      <div className="bars" style={expanded ? { left: '60%' } : { left: '5%' }} onClick={() => setExpaned(!expanded)}>
        <UilBars />
      </div>
      <motion.div className='sidebar'
        animate={window.innerWidth <= 768 ? `${expanded}` : ''}>
        {/* Logo */}
        <Popover content={content} trigger="click" placement="bottomRight">

          <div className="logo" style={{ marginLeft: '10px' }}>
            <img src={Logo} alt="logo" />
            <span>
              Sh<span>o</span>ps
            </span>
          </div>
        </Popover>
        <div className="menu">
          {SidebarData.map((item, index) => (
            <div
              className={selected === index ? "menuItem active" : "menuItem"}
              key={index}
              onClick={() => handleNavigate(index, item)} // Truyền item vào hàm handleNavigate
            >
              <item.icon />
              <span>{item.heading}</span>
            </div>
          ))}
          {/* signoutIcon */}
          <div className="menuItem">
            <UilSignOutAlt onClick={handleBackHome} /> Logout
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Sidebar;
