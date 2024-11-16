import React, { useState } from "react";
import "./Sidebar.css";
import Logo from "../AdminComponent/imgs/logo.png";
import { UilSignOutAlt } from "@iconscout/react-unicons";
import { SidebarData } from './Data/Data';
import { UilBars } from "@iconscout/react-unicons";
import { motion } from "framer-motion";

const Sidebar = ({ setActiveComponent }) => { // Nhận setActiveComponent từ props
  const [selected, setSelected] = useState(0);
  const [expanded, setExpaned] = useState(true);

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

  return (
    <>
      <div className="bars" style={expanded ? { left: '60%' } : { left: '5%' }} onClick={() => setExpaned(!expanded)}>
        <UilBars />
      </div>
      <motion.div className='sidebar'
        animate={window.innerWidth <= 768 ? `${expanded}` : ''}>
        {/* Logo */}
        <div className="logo" style={{ marginLeft: '10px' }}>
          <img src={Logo} alt="logo" />
          <span>
            Sh<span>o</span>ps
          </span>
        </div>

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
            <UilSignOutAlt /> Logout
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Sidebar;
