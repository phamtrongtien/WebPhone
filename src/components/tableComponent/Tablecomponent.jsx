import React, { useState, useEffect } from 'react';
import { Table, Button, Input, Popconfirm } from 'antd';
import { SearchOutlined } from '@ant-design/icons';  // Import biểu tượng tìm kiếm
import './style.css';

const Tablecomponent = (props) => {
    const { products = [], isLoadingProduct = false, onEditProduct, onDeleteProduct } = props;

    const [searchText, setSearchText] = useState('');
    const [filteredProducts, setFilteredProducts] = useState(products);

    useEffect(() => {
        // Cập nhật lại filteredProducts khi products thay đổi
        setFilteredProducts(products);
    }, [products]);

    const handleSearchChange = (e) => {
        setSearchText(e.target.value);
    };

    const handleSearch = () => {
        const filtered = products.filter((product) =>
            product.name.toLowerCase().includes(searchText.toLowerCase())
        );
        setFilteredProducts(filtered);
    };

    const handleTableChange = (pagination, filters, sorter) => {
        let sortedData = [...filteredProducts];

        if (sorter.order === 'ascend') {
            sortedData = sortedData.sort((a, b) => (a[sorter.field] > b[sorter.field] ? 1 : -1));
        } else if (sorter.order === 'descend') {
            sortedData = sortedData.sort((a, b) => (a[sorter.field] < b[sorter.field] ? 1 : -1));
        }

        setFilteredProducts(sortedData);
    };

    const columns = [
        {
            title: "Tên sản phẩm",
            dataIndex: 'name',
            key: 'name',
            sorter: true,
            render: (name) => <span>{name}</span>,
        },
        {
            title: 'Hình ảnh',
            dataIndex: 'image',
            key: 'image',
            render: (image) => (
                <img
                    src={image}
                    alt="product"
                    style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                />
            ),
        },
        { title: 'Loại', dataIndex: 'type', key: 'type', sorter: true },
        { title: 'Giá', dataIndex: 'price', key: 'price', render: (price) => `$${price}`, sorter: true },
        { title: 'Số lượng tồn', dataIndex: 'countInStock', key: 'countInStock', sorter: true },
        { title: 'Đánh giá', dataIndex: 'rating', key: 'rating', sorter: true },
        { title: 'Mô tả', dataIndex: 'description', key: 'description' },
        { title: 'Giảm giá (%)', dataIndex: 'discount', key: 'discount', sorter: true },
        { title: 'Đã bán', dataIndex: 'selled', key: 'selled', sorter: true },
        {
            title: 'Hành động',
            key: 'action',
            render: (_, record) => (
                <div style={{ display: 'flex', gap: '8px' }}>
                    <Button type="primary" onClick={() => onEditProduct(record)}>
                        Chỉnh sửa
                    </Button>
                    <Popconfirm
                        title="Bạn có chắc chắn muốn xóa sản phẩm này không?"
                        onConfirm={() => onDeleteProduct(record)}
                        okText="Xóa"
                        cancelText="Hủy"
                    >
                        <Button type="primary" danger>
                            Xóa
                        </Button>
                    </Popconfirm>
                </div>
            ),
        },
    ];

    return (
        <div>
            <div style={{ marginBottom: 20 }}>
                <Input
                    placeholder="Tìm kiếm tên sản phẩm"
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
                    dataSource={filteredProducts}
                    loading={isLoadingProduct}
                    pagination={{
                        pageSize: 5,
                        total: filteredProducts.length,
                        showTotal: (total) => `Tổng cộng ${total} sản phẩm`,
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
