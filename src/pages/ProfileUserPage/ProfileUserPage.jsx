import React, { useEffect, useState } from 'react';
import { WrapperHeader } from '../SiginPage/style';
import { WrapperContentProfile, WrapperInput, WrapperLable, WrapperButton, ButtonUpdate } from './style';
import InputFormComponent from '../../components/InputFormComponent/InputFormComponent';
import { useDispatch, useSelector } from 'react-redux';
import * as UserService from '../../services/UserService';
import { useMutationHooks } from '../../hook/useMutationHook';
import * as message from '../../components/Message/Message';
import { updateUser } from '../../redux/slices/userSlide';
import { PlusOutlined } from '@ant-design/icons';
import { Upload } from 'antd';
import { getBase64 } from '../../utils';

const ProfileUserPage = () => {
    const user = useSelector((state) => state.user);  // Lấy thông tin người dùng từ Redux
    const dispatch = useDispatch();

    const [name, setName] = useState(user?.name);
    const [email, setEmail] = useState(user?.email);
    const [phone, setPhone] = useState(user?.phone);
    const [address, setAddress] = useState(user?.address);
    const [avatar, setAvatar] = useState(user?.avatar);

    const mutation = useMutationHooks(
        (data) => {
            const { id, access_token, ...rests } = data;
            return UserService.updateUser(id, rests, access_token);  // Cập nhật thông tin người dùng
        },
        {
            onSuccess: () => {
                message.success();  // Thông báo thành công
            },
            onError: () => {
                message.error();  // Thông báo lỗi
            },
            onSettled: () => {
                // Sau khi mutation hoàn tất, gọi lại để lấy thông tin mới nhất
                if (user?.id && user?.access_token) {
                    handLeGetDetailsUser(user?.id, user?.access_token);
                }
            }
        }
    );

    const { data, isSuccess, isError } = mutation;

    useEffect(() => {
        // Cập nhật lại thông tin người dùng từ Redux khi có thay đổi
        setName(user?.name);
        setEmail(user?.email);
        setPhone(user?.phone);
        setAddress(user?.address);
        setAvatar(user?.avatar);
    }, [user]);  // Theo dõi sự thay đổi của user trong Redux store

    useEffect(() => {
        if (isSuccess) {
            // Sau khi cập nhật thành công, lấy lại thông tin người dùng
            handLeGetDetailsUser(user?.id, user?.access_token);
            message.success();
        } else if (isError) {
            message.error();
        }
    }, [isSuccess, isError, data]);  // Chạy lại khi mutation thành công hoặc thất bại

    const handLeGetDetailsUser = async (id, token) => {
        const res = await UserService.getDetailsUser(id, token);
        dispatch(updateUser({ ...res?.data, access_token: token }));
    };

    // Xử lý các thay đổi trong các trường nhập liệu
    const handleOnchangeName = (value) => setName(value);
    const handleOnchangeEmail = (value) => setEmail(value);
    const handleOnchangePhone = (value) => setPhone(value);
    const handleOnchangeAddress = (value) => setAddress(value);

    // Xử lý khi người dùng chọn avatar
    const handleOnChangeAvatar = async ({ fileList }) => {
        const file = fileList[0];  // Lấy file đầu tiên trong danh sách

        if (file) {
            // Kiểm tra nếu file chưa có url hoặc preview
            if (!file.url && !file.preview) {
                try {
                    // Sử dụng getBase64 để tạo preview
                    file.preview = await getBase64(file.originFileObj);
                    console.log("Base64 preview:", file.preview);  // In ra base64 preview
                } catch (error) {
                    console.error("Lỗi khi chuyển đổi file sang base64:", error);
                }
            }

            // Cập nhật avatar với preview hoặc url (nếu có)
            setAvatar(file.preview || file.url);
        }
    };


    // Cập nhật thông tin người dùng
    const handleUpdate = () => {
        mutation.mutate({
            id: user?.id,
            email,
            name,
            phone,
            address,
            avatar,
            access_token: user.access_token
        });
    };
    const uploadButton = (
        <button style={{ border: 0, color: 'black', background: 'none' }} type="button">
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
        </button>

    );

    return (
        <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
            <WrapperContentProfile>
                <WrapperHeader>Thông tin người dùng</WrapperHeader>

                {/* Name Section */}
                <WrapperInput>
                    <WrapperLable>Tên</WrapperLable>
                    <InputFormComponent
                        value={name}
                        onChange={handleOnchangeName}
                        placeholder="Nhập tên của bạn"
                    />
                    <WrapperButton>
                        <ButtonUpdate onClick={handleUpdate}>Cập nhật Tên</ButtonUpdate>
                    </WrapperButton>
                </WrapperInput>

                {/* Email Section */}
                <WrapperInput>
                    <WrapperLable>Email</WrapperLable>
                    <InputFormComponent
                        value={email}
                        onChange={handleOnchangeEmail}
                        placeholder="Nhập email của bạn"
                    />
                    <WrapperButton>
                        <ButtonUpdate onClick={handleUpdate}>Cập nhật Email</ButtonUpdate>
                    </WrapperButton>
                </WrapperInput>

                {/* Phone Section */}
                <WrapperInput>
                    <WrapperLable>Phone</WrapperLable>
                    <InputFormComponent
                        value={phone}
                        onChange={handleOnchangePhone}
                        placeholder="Nhập số điện thoại của bạn"
                    />
                    <WrapperButton>
                        <ButtonUpdate onClick={handleUpdate}>Cập nhật Phone</ButtonUpdate>
                    </WrapperButton>
                </WrapperInput>

                {/* Address Section */}
                <WrapperInput>
                    <WrapperLable>Địa chỉ</WrapperLable>
                    <InputFormComponent
                        value={address}
                        onChange={handleOnchangeAddress}
                        placeholder="Nhập địa chỉ của bạn"
                    />
                    <WrapperButton>
                        <ButtonUpdate onClick={handleUpdate}>Cập nhật Địa chỉ</ButtonUpdate>
                    </WrapperButton>
                </WrapperInput>

                {/* Avatar Section */}
                <WrapperInput>
                    <WrapperLable>Avatar</WrapperLable>
                    <Upload
                        maxCount={1}
                        listType="picture-circle"
                        onChange={handleOnChangeAvatar}
                    >
                        {
                            uploadButton
                        }
                    </Upload>
                    {avatar && (
                        <img
                            src={avatar}
                            style={{
                                borderRadius: '50%',  // Làm cho ảnh có hình tròn
                                width: '100px',       // Chiều rộng ảnh
                                height: '100px',      // Chiều cao ảnh
                                objectFit: 'cover',   // Đảm bảo ảnh không bị biến dạng
                            }}
                        />
                    )}

                    <WrapperButton>
                        <ButtonUpdate onClick={handleUpdate}>Cập nhật Avatar</ButtonUpdate>
                    </WrapperButton>
                </WrapperInput>
            </WrapperContentProfile>
        </div>
    );
};

export default ProfileUserPage;
