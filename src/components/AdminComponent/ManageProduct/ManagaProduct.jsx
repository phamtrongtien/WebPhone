import React, { useEffect, useState } from 'react';
import { Button, Modal, Form, Input, InputNumber, Upload, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import './style.css';
import { getBase64 } from '../../../utils';
import * as ProductService from '../../../services/ProductService';
import { useMutationHooks } from '../../../hook/useMutationHook';
import * as messagel from '../../Message/Message';
import { useQueryClient, useQuery } from '@tanstack/react-query';
import Tablecomponent from '../../tableComponent/Tablecomponent';
import { useSelector } from 'react-redux';

const ManageProduct = () => {
    const user = useSelector((state) => state.user);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [currentProduct, setCurrentProduct] = useState(null);
    const [form] = Form.useForm();
    const [stateProduct, setStateProduct] = useState({
        name: '',
        type: '',
        price: null,
        countInStock: null,
        rating: null,
        description: '',
        discount: null,
        selled: null,
        image: ''
    });

    const queryClient = useQueryClient();  // Khai báo queryClient

    const mutation = useMutationHooks((data) => ProductService.createProduct(data));
    const { data, isSuccess, isError } = mutation;

    useEffect(() => {
        if (isSuccess && data?.status === "OK") {
            messagel.success();
            handleCancel();
        } else if (isError) {
            messagel.error();
        }
    }, [isSuccess, data]);

    const getAllProduct = async () => {
        const res = await ProductService.getProductAll();
        return res;
    };

    const { isLoading: isLoadingProduct, data: products } = useQuery({
        queryKey: ['products'],
        queryFn: getAllProduct
    });

    const oneFinish = async () => {
        try {
            if (currentProduct) {
                // Cập nhật sản phẩm
                await ProductService.updateProduct(currentProduct._id, stateProduct, user.access_token);
                message.success('Sản phẩm đã được cập nhật thành công!');
            } else {
                // Thêm sản phẩm mới
                await mutation.mutateAsync(stateProduct);
                message.success('Sản phẩm đã được thêm thành công!');
            }

            // Làm mới danh sách sản phẩm sau khi thêm hoặc cập nhật
            queryClient.invalidateQueries(['products']);

            setIsModalVisible(false);
            form.resetFields();
            setCurrentProduct(null);
        } catch (error) {
            message.error('Có lỗi xảy ra!');
        }
    };

    const handleOk = () => {
        form.submit();
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setStateProduct({
            name: '',
            type: '',
            price: null,
            countInStock: null,
            rating: null,
            description: '',
            discount: null,
            selled: null,
            image: ''
        });
        form.resetFields();
        setCurrentProduct(null);
    };

    const handleDeleteProduct = async (productId) => {
        try {
            await ProductService.deleteProduct(productId._id, user.access_token);
            message.success('Sản phẩm đã được xóa thành công!');

            // Làm mới danh sách sản phẩm sau khi xóa
            queryClient.invalidateQueries(['products']);
        } catch (error) {
            message.error('Có lỗi xảy ra khi xóa sản phẩm!');
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
            setStateProduct({
                ...stateProduct,
                image: file.preview || file.url
            });
        }
    };

    const handleOnChange = (value, name) => {
        setStateProduct({
            ...stateProduct,
            [name]: value,
        });
    };

    const handleEditProduct = (product) => {
        setCurrentProduct(product);
        setStateProduct({
            name: product.name,
            type: product.type,
            price: product.price,
            countInStock: product.countInStock,
            rating: product.rating,
            description: product.description,
            discount: product.discount,
            selled: product.selled,
            image: product.image
        });
        setIsModalVisible(true);
        form.setFieldsValue({
            name: product.name,
            type: product.type,
            price: product.price,
            countInStock: product.countInStock,
            rating: product.rating,
            description: product.description,
            discount: product.discount,
            selled: product.selled,
            image: product.image
        });
    };

    return (
        <div className="manage-product">
            <div>
                <h2>Quản Lý Sản Phẩm</h2>
                <Button type="primary" onClick={() => setIsModalVisible(true)}>
                    Thêm Sản Phẩm
                </Button>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Tablecomponent
                    products={products?.data}
                    isLoadingProduct={isLoadingProduct}
                    onEditProduct={handleEditProduct}
                    onDeleteProduct={handleDeleteProduct}
                />
            </div>

            <Modal
                title={currentProduct ? 'Chỉnh Sửa Sản Phẩm' : 'Thêm Sản Phẩm'}
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
                    <Form.Item name="name" label="Tên sản phẩm" rules={[{ required: true, message: 'Vui lòng nhập tên sản phẩm!' }]}>
                        <Input name="name" value={stateProduct.name} onChange={(e) => handleOnChange(e.target.value, 'name')} />
                    </Form.Item>
                    <Form.Item name="image" label="Hình ảnh" rules={[{ required: true, message: 'Vui lòng nhập ảnh sản phẩm!' }]}>
                        <Upload
                            maxCount={1}
                            listType="picture-circle"
                            onChange={handleOnChangeAvatar}
                        >
                            {stateProduct.image ? (
                                <img
                                    src={stateProduct.image}
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
                    <Form.Item name="type" label="Loại sản phẩm" rules={[{ required: true, message: 'Vui lòng nhập loại sản phẩm!' }]}>
                        <Input name="type" value={stateProduct.type} onChange={(e) => handleOnChange(e.target.value, 'type')} />
                    </Form.Item>
                    <Form.Item name="price" label="Giá" rules={[{ required: true, message: 'Vui lòng nhập giá sản phẩm!' }]}>
                        <InputNumber
                            name="price"
                            value={stateProduct.price}
                            onChange={(value) => handleOnChange(value, 'price')}
                            style={{ width: '100%' }}
                        />
                    </Form.Item>
                    <Form.Item name="countInStock" label="Số lượng" rules={[{ required: true, message: 'Vui lòng nhập số lượng sản phẩm!' }]}>
                        <InputNumber
                            name="countInStock"
                            value={stateProduct.countInStock}
                            onChange={(value) => handleOnChange(value, 'countInStock')}
                            style={{ width: '100%' }}
                        />
                    </Form.Item>
                    <Form.Item name="rating" label="Đánh giá">
                        <InputNumber
                            name="rating"
                            value={stateProduct.rating}
                            onChange={(value) => handleOnChange(value, 'rating')}
                            style={{ width: '100%' }}
                        />
                    </Form.Item>
                    <Form.Item name="discount" label="Giảm giá">
                        <InputNumber
                            name="discount"
                            value={stateProduct.discount}
                            onChange={(value) => handleOnChange(value, 'discount')}
                            style={{ width: '100%' }}
                        />
                    </Form.Item>
                    <Form.Item name="selled" label="Đã bán">
                        <InputNumber
                            name="selled"
                            value={stateProduct.selled}
                            onChange={(value) => handleOnChange(value, 'selled')}
                            style={{ width: '100%' }}
                        />
                    </Form.Item>
                    <Form.Item name="description" label="Mô tả">
                        <Input.TextArea
                            name="description"
                            value={stateProduct.description}
                            onChange={(e) => handleOnChange(e.target.value, 'description')}
                            rows={4}
                        />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default ManageProduct;
