import React, { useState } from 'react';
import { Table, Button, Input, Modal, Form } from 'antd';
import './style.css';

const ManageProduct = () => {
    const initialProducts = [
        {
            key: '1',
            id: '001',
            name: 'Apple iPhone 13',
            image: 'https://example.com/iphone_13.jpg',
            type: 'Smartphone',
            price: 999,
            countInStock: 50,
            rating: 4.8,
            description: 'iPhone 13 with A15 Bionic chip and Super Retina XDR display.',
            discount: 10,
            selled: 500,
            status: 'Available'
        },
        {
            key: '2',
            id: '002',
            name: 'Samsung Galaxy S21',
            image: 'https://example.com/galaxy_s21.jpg',
            type: 'Smartphone',
            price: 799,
            countInStock: 80,
            rating: 4.5,
            description: 'Samsung Galaxy S21 with Exynos 2100 and Dynamic AMOLED display.',
            discount: 15,
            selled: 1000,
            status: 'Available'
        },
    ];

    const [stateProduct, setStateProduct] = useState({
        name: '',
        image: '',
        type: '',
        price: '',
        countInStock: '',
        rating: '',
        description: '',
        discount: '',
        selled: '',
        status: ''
    });

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
            title: 'Hình ảnh',
            dataIndex: 'image',
            key: 'image',
            render: (image) => <img src={image} alt="product" style={{ width: '50px', height: '50px', objectFit: 'cover' }} />,
        },
        {
            title: 'Loại',
            dataIndex: 'type',
            key: 'type',
        },
        {
            title: 'Giá',
            dataIndex: 'price',
            key: 'price',
            render: (price) => `$${price}`,
        },
        {
            title: 'Giảm giá (%)',
            dataIndex: 'discount',
            key: 'discount',
        },
        {
            title: 'Số lượng còn',
            dataIndex: 'countInStock',
            key: 'countInStock',
        },
        {
            title: 'Đã bán',
            dataIndex: 'selled',
            key: 'selled',
        },
        {
            title: 'Xếp hạng',
            dataIndex: 'rating',
            key: 'rating',
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

    // Handle input changes for form fields
    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setStateProduct((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };
    const onFinish = () => {

    }
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
                    <Form.Item name="name" label="Tên sản phẩm" rules={[{ required: true, message: 'Vui lòng nhập tên sản phẩm!' }]}>
                        <Input value={stateProduct.name} onChange={handleOnChange} name="name" />
                    </Form.Item>
                    <Form.Item name="image" label="Hình ảnh (URL)" rules={[{ required: true, message: 'Vui lòng nhập đường dẫn hình ảnh!' }]}>
                        <Input value={stateProduct.image} onChange={handleOnChange} name="image" />
                    </Form.Item>
                    <Form.Item name="type" label="Loại sản phẩm" rules={[{ required: true, message: 'Vui lòng nhập loại sản phẩm!' }]}>
                        <Input value={stateProduct.type} onChange={handleOnChange} name="type" />
                    </Form.Item>
                    <Form.Item name="price" label="Giá" rules={[{ required: true, message: 'Vui lòng nhập giá sản phẩm!' }]}>
                        <Input value={stateProduct.price} onChange={handleOnChange} name="price" type="number" />
                    </Form.Item>
                    <Form.Item name="discount" label="Giảm giá (%)" rules={[{ required: true, message: 'Vui lòng nhập mức giảm giá!' }]}>
                        <Input value={stateProduct.discount} onChange={handleOnChange} name="discount" type="number" />
                    </Form.Item>
                    <Form.Item name="countInStock" label="Số lượng trong kho" rules={[{ required: true, message: 'Vui lòng nhập số lượng còn!' }]}>
                        <Input value={stateProduct.countInStock} onChange={handleOnChange} name="countInStock" type="number" />
                    </Form.Item>
                    <Form.Item name="selled" label="Đã bán" rules={[{ required: true, message: 'Vui lòng nhập số lượng đã bán!' }]}>
                        <Input value={stateProduct.selled} onChange={handleOnChange} name="selled" type="number" />
                    </Form.Item>
                    <Form.Item name="rating" label="Xếp hạng" rules={[{ required: true, message: 'Vui lòng nhập xếp hạng!' }]}>
                        <Input value={stateProduct.rating} onChange={handleOnChange} name="rating" type="number" step="0.1" />
                    </Form.Item>
                    <Form.Item name="description" label="Mô tả" rules={[{ required: true, message: 'Vui lòng nhập mô tả!' }]}>
                        <Input.TextArea value={stateProduct.description} onChange={handleOnChange} name="description" rows={4} />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default ManageProduct;
