import React, { useState, useEffect } from 'react';
import { Table, Button, Input, Popconfirm } from 'antd';
import { SearchOutlined } from '@ant-design/icons';  // Import biểu tượng tìm kiếm

const Tablecomponent = (props) => {
    const { users = [], isLoadingUser = false, onEditUser, onDeleteUser } = props;

    const [searchText, setSearchText] = useState('');
    const [filteredUsers, setFilteredUsers] = useState(users);

    useEffect(() => {
        // Cập nhật lại filteredUsers khi users thay đổi
        setFilteredUsers(users);
    }, [users]);

    const handleSearchChange = (e) => {
        setSearchText(e.target.value);
    };

    const handleSearch = () => {
        const filtered = users.filter((user) =>
            user.name.toLowerCase().includes(searchText.toLowerCase())
        );
        setFilteredUsers(filtered);
    };

    const handleTableChange = (pagination, filters, sorter) => {
        let sortedData = [...filteredUsers];

        if (sorter.order === 'ascend') {
            sortedData = sortedData.sort((a, b) => (a[sorter.field] > b[sorter.field] ? 1 : -1));
        } else if (sorter.order === 'descend') {
            sortedData = sortedData.sort((a, b) => (a[sorter.field] < b[sorter.field] ? 1 : -1));
        }

        setFilteredUsers(sortedData);
    };

    const columns = [
        {
            title: "Tên người dùng",
            dataIndex: 'name',
            key: 'name',
            sorter: true,
            render: (name) => <span>{name}</span>,
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: 'Địa chỉ',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Quyền quản trị',
            dataIndex: 'isAdmin',
            key: 'isAdmin',
            render: (isAdmin) => (isAdmin ? 'Quản trị viên' : 'Người dùng'),
        },
        {
            title: 'Hành động',
            key: 'action',
            render: (_, record) => (
                <div style={{ display: 'flex', gap: '8px' }}>
                    <Button type="primary" onClick={() => onEditUser(record)}>
                        Chỉnh sửa
                    </Button>
                    {!record.isAdmin && (
                        <Popconfirm
                            title="Bạn có chắc chắn muốn xóa người dùng này không?"
                            onConfirm={() => onDeleteUser(record)}
                            okText="Xóa"
                            cancelText="Hủy"
                        >
                            <Button type="primary" danger>
                                Xóa
                            </Button>
                        </Popconfirm>
                    )}
                </div>
            ),
        },
    ];

    return (
        <div>
            <div style={{ marginBottom: 20 }}>
                <Input
                    placeholder="Tìm kiếm tên người dùng"
                    value={searchText}
                    onChange={handleSearchChange}
                    style={{ width: 300, marginRight: 10 }}
                    prefix={<SearchOutlined />} // Biểu tượng tìm kiếm trong ô input
                />
                <Button onClick={handleSearch} type="primary">
                    Tìm kiếm
                </Button>
            </div>

            <div style={{ width: "100%" }}>
                <Table
                    columns={columns}
                    dataSource={filteredUsers}
                    loading={isLoadingUser}
                    pagination={{
                        pageSize: 5,
                        total: filteredUsers.length,
                        showTotal: (total) => `Tổng cộng ${total} người dùng`,
                    }}
                    onChange={handleTableChange} // Thêm phương thức xử lý thay đổi bảng
                    style={{ marginTop: 20, padding: 0 }}
                    rowClassName="large-table-row"
                    size="large"
                    bordered
                />
            </div>
        </div>
    );
};

export default Tablecomponent;
