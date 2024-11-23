import React, { useEffect, useState } from 'react';
import './style.css';
import { Button, Form, Input, InputNumber, message, Modal, Upload } from 'antd';
import TablecomponentUser from '../../TableComponentUser/TableComponentUser';
import { PlusOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useMutationHooks } from '../../../hook/useMutationHook';
import * as UserService from '../../../services/UserService';
import { getBase64 } from '../../../utils';
import * as messagel from '../../Message/Message';

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

    const oneFinish = async () => {
        try {
            if (currentUser) {
                // Cập nhật thông tin người dùng
                await UserService.updateUser(currentUser._id, stateUser, accessToken);  // Pass access_token here
                message.success('Người dùng đã được cập nhật thành công!');
            } else {
                // Thêm người dùng mới

                message.success('Người dùng đã được thêm thành công!');
            }

            // Làm mới danh sách người dùng sau khi thêm hoặc cập nhật
            queryClient.invalidateQueries(['users']);

            setIsModalVisible(false);
            form.resetFields();
            setCurrentUser(null);
        } catch (error) {
            message.error('Có lỗi xảy ra!');
        }
    };

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

    const handleOnChangeAvatar = async ({ fileList }) => {
        const file = fileList[0];
        if (file) {
            if (!file.url && !file.preview) {
                try {
                    file.preview = await getBase64(file.originFileObj);
                } catch (error) {
                    console.error('Lỗi khi chuyển đổi file sang base64:', error);
                }
            }
            setStateUser({
                ...stateUser,
                avatar: file.preview || file.url
            });
        }
    };

    const handleOnChange = (value, name) => {
        setStateUser({
            ...stateUser,
            [name]: value,
        });
    };

    const handleEditUser = (user) => {
        setCurrentUser(user);
        setStateUser({
            name: user.name,
            email: user.email,
            password: user.password,
            phone: user.phone,
            address: user.address,
            avatar: user.avatar,
            isAdmin: user.isAdmin
        });
        setIsModalVisible(true);
        form.setFieldsValue({
            name: user.name,
            email: user.email,
            phone: user.phone,
            address: user.address,
            avatar: user.avatar,
            isAdmin: user.isAdmin
        });
    };

    return (
        <div className="manage-customer">
            <h2>Quản Lý Người Dùng</h2>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <TablecomponentUser
                    users={users?.data}
                    isLoadingUser={isLoadingUser}
                    onEditUser={handleEditUser}
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
                <Form form={form} layout="vertical" onFinish={oneFinish} autoComplete="off">
                    <Form.Item name="name" label="Tên người dùng" rules={[{ required: true, message: 'Vui lòng nhập tên người dùng!' }]}>
                        <Input name="name" value={stateUser.name} onChange={(e) => handleOnChange(e.target.value, 'name')} />
                    </Form.Item>
                    <Form.Item name="avatar" label="Ảnh đại diện" rules={[{ required: true, message: 'Vui lòng chọn ảnh!' }]}>
                        <Upload
                            maxCount={1}
                            listType="picture-circle"
                            onChange={handleOnChangeAvatar}
                        >
                            {stateUser.avatar ? (
                                <img
                                    src={stateUser.avatar}
                                    alt="avatar"
                                    style={{ borderRadius: '50%', width: '100px', height: '100px', objectFit: 'cover' }}
                                />
                            ) : (
                                <div>
                                    <PlusOutlined />
                                    <div style={{ marginTop: 8 }}>Upload</div>
                                </div>
                            )}
                        </Upload>
                    </Form.Item>
                    <Form.Item name="email" label="Email" rules={[{ required: true, message: 'Vui lòng nhập email!' }]}>
                        <Input name="email" value={stateUser.email} onChange={(e) => handleOnChange(e.target.value, 'email')} />
                    </Form.Item>
                    <Form.Item name="phone" label="Số điện thoại" rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}>
                        <InputNumber
                            name="phone"
                            value={stateUser.phone}
                            onChange={(value) => handleOnChange(value, 'phone')}
                            style={{ width: '100%' }}
                        />
                    </Form.Item>
                    <Form.Item name="address" label="Địa chỉ" rules={[{ required: true, message: 'Vui lòng nhập địa chỉ!' }]}>
                        <Input.TextArea
                            name="address"
                            value={stateUser.address}
                            onChange={(e) => handleOnChange(e.target.value, 'address')}
                            rows={4}
                        />
                    </Form.Item>
                    <Form.Item name="isAdmin" label="Quyền quản trị viên">
                        <InputNumber
                            name="isAdmin"
                            value={stateUser.isAdmin}
                            onChange={(value) => handleOnChange(value, 'isAdmin')}
                            style={{ width: '100%' }}
                        />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default ManageCustomer;
