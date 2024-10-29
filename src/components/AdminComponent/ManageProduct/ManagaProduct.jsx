import React, { useState } from 'react';
import { Table, Button, Input, Modal, Form } from 'antd';
import './style.css';

const ManageProduct = () => {
    // Dữ liệu mẫu cho danh sách sản phẩm
    const initialProducts = [
        { key: '1', id: '001', name: 'Apple iPhone 13', price: 999, status: 'Available' },
        { key: '2', id: '002', name: 'Samsung Galaxy S21', price: 799, status: 'Available' },
        { key: '3', id: '003', name: 'Google Pixel 6', price: 599, status: 'Unavailable' },
    ];

    const [products, setProducts] = useState(initialProducts);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [currentProduct, setCurrentProduct] = useState(null);
    const [form] = Form.useForm();

    const columns = [
        {
            title: 'ID Sản phẩm',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Tên sản phẩm',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Giá',
            dataIndex: 'price',
            key: 'price',
            render: price => `$${price}`,
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
        },
        {
            title: 'Hành động',
            key: 'action',
            render: (_, record) => (
                <>
                    <Button type="link" onClick={() => editProduct(record)}>Chỉnh sửa</Button>
                    <Button type="link" danger onClick={() => deleteProduct(record.key)}>Xóa</Button>
                </>
            ),
        },
    ];

    const editProduct = (product) => {
        setCurrentProduct(product);
        form.setFieldsValue(product);
        setIsModalVisible(true);
    };

    const deleteProduct = (key) => {
        setProducts(products.filter(product => product.key !== key));
    };

    const handleOk = () => {
        form
            .validateFields()
            .then(values => {
                if (currentProduct) {
                    setProducts(products.map(product => (product.key === currentProduct.key ? { ...product, ...values } : product)));
                } else {
                    setProducts([...products, { key: Date.now(), ...values }]);
                }
                setIsModalVisible(false);
                form.resetFields();
                setCurrentProduct(null);
            })
            .catch(info => {
                console.log('Validate Failed:', info);
            });
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        form.resetFields();
        setCurrentProduct(null);
    };

    return (
        <div className="manage-product">
            <h2>Quản Lý Sản Phẩm</h2>
            <Button type="primary" onClick={() => setIsModalVisible(true)}>
                Thêm Sản Phẩm
            </Button>
            <Table columns={columns} dataSource={products} style={{ marginTop: 20 }} />

            <Modal title={currentProduct ? 'Chỉnh Sửa Sản Phẩm' : 'Thêm Sản Phẩm'} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <Form form={form} layout="vertical">
                    <Form.Item name="id" label="ID Sản phẩm" rules={[{ required: true, message: 'Vui lòng nhập ID sản phẩm!' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="name" label="Tên sản phẩm" rules={[{ required: true, message: 'Vui lòng nhập tên sản phẩm!' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="price" label="Giá" rules={[{ required: true, message: 'Vui lòng nhập giá sản phẩm!' }]}>
                        <Input type="number" />
                    </Form.Item>
                    <Form.Item name="status" label="Trạng thái" rules={[{ required: true, message: 'Vui lòng chọn trạng thái!' }]}>
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default ManageProduct;
