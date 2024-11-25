import React, { useState, useEffect } from 'react';
import { Table, Button, Input, Popconfirm } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
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
            <div style={{ marginBottom: 20, display: 'flex', flex: 'row' }}>
                <div> <Input
                    placeholder="Tìm kiếm tên sản phẩm"
                    value={searchText}
                    onChange={handleSearchChange}
                    style={{ width: 300, marginRight: 10 }}
                    prefix={<SearchOutlined />} // Biểu tượng tìm kiếm trong ô input
                />
                    <Button onClick={handleSearch} type="primary">
                        Tìm kiếm
                    </Button></div>
                <div style={{ width: 300, marginLeft: 20 }}>
                    <ReactHTMLTableToExcel
                        id="export-to-excel"
                        className="ant-btn ant-btn-primary"
                        table="product-table"
                        filename="DanhSachSanPham"
                        sheet="Sheet1"
                        buttonText="Xuất Excel"
                    />
                </div>
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
                    onChange={handleTableChange}
                    style={{ marginTop: 20, padding: 0 }}
                    rowClassName="large-table-row"
                    size="large"
                    bordered
                />
            </div>

            {/* Ẩn bảng chứa dữ liệu để xuất Excel */}
            <table id="product-table" style={{ display: 'none' }}>
                <thead>
                    <tr>
                        <th>Tên sản phẩm</th>
                        <th>Hình ảnh</th>
                        <th>Loại</th>
                        <th>Giá</th>
                        <th>Số lượng tồn</th>
                        <th>Đánh giá</th>
                        <th>Mô tả</th>
                        <th>Giảm giá (%)</th>
                        <th>Đã bán</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredProducts.map((product, index) => (
                        <tr key={index}>
                            <td>{product.name}</td>
                            <td>{product.image}</td> {/* Hiển thị URL thay vì thẻ <img> */}
                            <td>{product.type}</td>
                            <td>{product.price}</td>
                            <td>{product.countInStock}</td>
                            <td>{product.rating}</td>
                            <td>{product.description}</td>
                            <td>{product.discount}</td>
                            <td>{product.selled}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Tablecomponent;
