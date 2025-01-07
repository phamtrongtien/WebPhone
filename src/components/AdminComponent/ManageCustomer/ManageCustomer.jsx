import React, { useEffect, useState } from 'react';
import './style.css';
import { Button, Form, Input, InputNumber, message, Modal, Upload } from 'antd';
import TablecomponentUser from '../../TableComponentUser/TableComponentUser';
import { PlusOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useMutationHooks } from '../../../hook/useMutationHook';
import * as UserService from '../../../services/UserService';

const ManageCustomer = () => {
    const user = useSelector((state) => state.user);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const [form] = Form.useForm();
    const [stateUser, setStateUser] = useState({
        name: '',
        email: '',
        password: '',
        phone: null,
        address: '',
        avatar: '',
        isAdmin: false
    });

    const queryClient = useQueryClient();

    // Ensure access_token is available and passed to API calls
    const accessToken = user?.access_token;

    // API request mutation to get all users


    const getAllUsers = async () => {
        const res = await UserService.getAllUsers(accessToken);  // Pass access_token here
        return res;
    };

    const { isLoading: isLoadingUser, data: users } = useQuery({
        queryKey: ['users'],
        queryFn: getAllUsers
    });

    const handleOk = () => {
        form.submit();
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setStateUser({
            name: '',
            email: '',
            password: '',
            phone: null,
            address: '',
            avatar: '',
            isAdmin: false
        });
        form.resetFields();
        setCurrentUser(null);
    };

    const handleDeleteUser = async (userId) => {
        try {
            await UserService.deleteUser(userId._id, accessToken);  // Pass access_token here
            message.success('Người dùng đã được xóa thành công!');

            // Làm mới danh sách người dùng sau khi xóa
            queryClient.invalidateQueries(['users']);
        } catch (error) {
            message.error('Có lỗi xảy ra khi xóa người dùng!');
        }
    };



    return (
        <div className="manage-customer">
            <h2>Quản Lý Người Dùng</h2>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <TablecomponentUser
                    users={users?.data}
                    isLoadingUser={isLoadingUser}

                    onDeleteUser={handleDeleteUser}
                />
            </div>

            <Modal
                title={currentUser ? 'Chỉnh Sửa Người Dùng' : 'Thêm Người Dùng'}
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={[
                    <Button key="cancel" onClick={handleCancel}>
                        Hủy
                    </Button>,
                    <Button key="submit" type="primary" onClick={handleOk}>
                        Submit
                    </Button>,
                ]}
            >

            </Modal>
        </div>
    );
};

export default ManageCustomer;
