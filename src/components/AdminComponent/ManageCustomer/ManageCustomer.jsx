// ManageCustomer.js
import React from 'react';
import './style.css'; // Tạo file CSS cho kiểu dáng nếu cần

const ManageCustomer = () => {
    // Dữ liệu mẫu cho danh sách khách hàng
    const customers = [
        { id: 1, name: "Nguyễn Văn A", email: "a@example.com", phone: "0123456789", status: "Active" },
        { id: 2, name: "Trần Thị B", email: "b@example.com", phone: "0987654321", status: "Inactive" },
        { id: 3, name: "Lê Văn C", email: "c@example.com", phone: "0112233445", status: "Active" },
        // Thêm khách hàng khác ở đây
    ];

    return (
        <div className="manage-customer">
            <h2>Quản Lý Khách Hàng</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Tên</th>
                        <th>Email</th>
                        <th>Số Điện Thoại</th>
                        <th>Trạng Thái</th>
                    </tr>
                </thead>
                <tbody>
                    {customers.map((customer) => (
                        <tr key={customer.id}>
                            <td>{customer.id}</td>
                            <td>{customer.name}</td>
                            <td>{customer.email}</td>
                            <td>{customer.phone}</td>
                            <td>{customer.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ManageCustomer;
