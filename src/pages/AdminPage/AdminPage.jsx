import React, { useState } from 'react';
import './App.css';
import MainDash from "../../components/AdminComponent/MainDash/MainDash";
import RightSide from '../../components/AdminComponent/RigtSide/RightSide';
import Sidebar from '../../components/AdminComponent/Sidebar';
import ManageOrder from '../../components/AdminComponent/ManageOrder/ManageOrder'; // Import ManageOrder
import ManageCustomer from '../../components/AdminComponent/ManageCustomer/ManageCustomer'; // Import ManageCustomer
import ManageProduct from '../../components/AdminComponent/ManageProduct/ManagaProduct';
import HeaderComponent from '../../components/HeaderComponent/HeaderComponent';

function AdminPage() {
    const [activeComponent, setActiveComponent] = useState(null); // State để kiểm soát component đang hiển thị

    const renderActiveComponent = () => {
        switch (activeComponent) {
            case 'orders':
                return <ManageOrder />;
            case 'customers':
                return <ManageCustomer />;
            case 'products':
                return <ManageProduct />
            default:
                return (
                    <>
                        <MainDash />
                        {/* <RightSide /> */}
                    </>
                );
        }
    };

    return (
        <div className="App">
            <div className="AppGlass">
                <Sidebar setActiveComponent={setActiveComponent} /> {/* Truyền hàm để cập nhật state */}
                {renderActiveComponent()} {/* Render component dựa trên state */}
            </div>
        </div>
    );
}

export default AdminPage;
