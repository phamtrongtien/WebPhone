import React, { useEffect, useState } from 'react';
import { WrapperContentProfile, WrapperInput, WrapperLable, WrapperButton, ButtonUpdate, WrapperHeaderF } from './style';
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
    const [city, setCity] = useState(user?.city);  // Thêm state cho city
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
                if (user?.id && user?.access_token) {
                    handLeGetDetailsUser(user?.id, user?.access_token);
                }
            }
        }
    );

    const { data, isSuccess, isError } = mutation;

    useEffect(() => {
        setName(user?.name);
        setEmail(user?.email);
        setPhone(user?.phone);
        setAddress(user?.address);
        setCity(user?.city);  // Cập nhật city khi user thay đổi
        setAvatar(user?.avatar);
    }, [user]);

    useEffect(() => {
        if (isSuccess) {
            handLeGetDetailsUser(user?.id, user?.access_token);
            message.success();
        } else if (isError) {
            message.error();
        }
    }, [isSuccess, isError, data]);

    const handLeGetDetailsUser = async (id, token) => {
        const res = await UserService.getDetailsUser(id, token);
        dispatch(updateUser({ ...res?.data, access_token: token }));
    };

    const handleOnchangeName = (value) => setName(value);
    const handleOnchangeEmail = (value) => setEmail(value);
    const handleOnchangePhone = (value) => setPhone(value);
    const handleOnchangeAddress = (value) => setAddress(value);
    const handleOnchangeCity = (value) => setCity(value);  // Thêm hàm thay đổi city

    const handleOnChangeAvatar = async ({ fileList }) => {
        const file = fileList[0];
        if (file) {
            if (!file.url && !file.preview) {
                try {
                    file.preview = await getBase64(file.originFileObj);
                    console.log("Base64 preview:", file.preview);
                } catch (error) {
                    console.error("Lỗi khi chuyển đổi file sang base64:", error);
                }
            }
            setAvatar(file.preview || file.url);
        }
    };

    const handleUpdate = () => {
        mutation.mutate({
            id: user?.id,
            email,
            name,
            phone,
            address,
            city,  // Gửi city lên server
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
                <WrapperHeaderF>Thông tin người dùng</WrapperHeaderF>

                <WrapperInput>
                    <WrapperLable>Tên</WrapperLable>
                    <InputFormComponent
                        value={name}
                        onChange={handleOnchangeName}
                        placeholder="Nhập tên của bạn"
                    />
                </WrapperInput>

                <WrapperInput>
                    <WrapperLable>Email</WrapperLable>
                    <InputFormComponent
                        value={email}
                        onChange={handleOnchangeEmail}
                        placeholder="Nhập email của bạn"
                    />
                </WrapperInput>

                <WrapperInput>
                    <WrapperLable>Phone</WrapperLable>
                    <InputFormComponent
                        value={phone}
                        onChange={handleOnchangePhone}
                        placeholder="Nhập số điện thoại của bạn"
                    />
                </WrapperInput>

                <WrapperInput>
                    <WrapperLable>Địa chỉ</WrapperLable>
                    <InputFormComponent
                        value={address}
                        onChange={handleOnchangeAddress}
                        placeholder="Nhập địa chỉ của bạn"
                    />
                </WrapperInput>

                <WrapperInput>
                    <WrapperLable>Thành phố</WrapperLable>
                    <InputFormComponent
                        value={city}
                        onChange={handleOnchangeCity}  // Cập nhật city
                        placeholder="Nhập thành phố của bạn"
                    />
                </WrapperInput>

                <WrapperInput>
                    <WrapperLable>Avatar</WrapperLable>
                    <Upload
                        maxCount={1}
                        listType="picture-circle"
                        onChange={handleOnChangeAvatar}
                    >
                        {uploadButton}
                    </Upload>
                    {avatar && (
                        <img
                            src={avatar}
                            style={{
                                borderRadius: '50%',
                                width: '100px',
                                height: '100px',
                                objectFit: 'cover',
                            }}
                        />
                    )}
                </WrapperInput>

                <WrapperButton>
                    <ButtonUpdate onClick={handleUpdate}>Cập nhật thông tin</ButtonUpdate>
                </WrapperButton>
            </WrapperContentProfile>
        </div>
    );
};

export default ProfileUserPage;
