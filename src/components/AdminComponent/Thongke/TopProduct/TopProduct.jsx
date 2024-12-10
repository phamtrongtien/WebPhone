import React, { useEffect, useState } from "react";
import { Card, List, Spin, Button } from "antd";
import {
    StarOutlined,
    ShoppingCartOutlined,
    ExclamationCircleOutlined,
} from "@ant-design/icons";
import * as ProductService from "../../../../services/ProductService";

const TopProductsStats = () => {
    const [loading, setLoading] = useState(true);
    const [selectedStat, setSelectedStat] = useState(null); // Quản lý mục được chọn
    const [topSellingProducts, setTopSellingProducts] = useState([]);
    const [bestRatedProducts, setBestRatedProducts] = useState([]);
    const [lowStockProducts, setLowStockProducts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await ProductService.getProductAll();
                if (res?.data) {
                    const products = res.data;

                    // Sản phẩm bán chạy nhất (sắp xếp theo số lượng bán `selled`)
                    setTopSellingProducts(
                        products.sort((a, b) => b.selled - a.selled).slice(0, 5)
                    );

                    // Sản phẩm được đánh giá tốt nhất (sắp xếp theo `rating`)
                    setBestRatedProducts(
                        products.sort((a, b) => b.rating - a.rating).slice(0, 5)
                    );

                    // Sản phẩm sắp hết hàng (sắp xếp theo `countInStock`)
                    setLowStockProducts(
                        products
                            .filter((product) => product.countInStock < 10)
                            .sort((a, b) => a.countInStock - b.countInStock)
                    );
                }
            } catch (error) {
                console.error("Lỗi khi lấy dữ liệu sản phẩm:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <Spin tip="Đang tải dữ liệu..." />;
    }

    // Hàm chuyển đổi trạng thái mục được chọn
    const toggleStat = (stat) => {
        setSelectedStat((prevStat) => (prevStat === stat ? null : stat));
    };

    // Nội dung thống kê dựa trên mục được chọn
    const renderStatsContent = () => {
        switch (selectedStat) {
            case "topSelling":
                return (
                    <Card
                        title={<><ShoppingCartOutlined /> Sản Phẩm Bán Chạy</>}
                        style={{ width: "100%" }}
                    >
                        <List
                            dataSource={topSellingProducts}
                            renderItem={(item) => (
                                <List.Item>
                                    <List.Item.Meta
                                        title={item.name}
                                        description={`Đã bán: ${item.selled}`}
                                    />
                                </List.Item>
                            )}
                        />
                    </Card>
                );
            case "bestRated":
                return (
                    <Card
                        title={<><StarOutlined /> Sản Phẩm Được Đánh Giá Cao</>}
                        style={{ width: "100%" }}
                    >
                        <List
                            dataSource={bestRatedProducts}
                            renderItem={(item) => (
                                <List.Item>
                                    <List.Item.Meta
                                        title={item.name}
                                        description={`Đánh giá: ${item.rating} ⭐`}
                                    />
                                </List.Item>
                            )}
                        />
                    </Card>
                );
            case "lowStock":
                return (
                    <Card
                        title={<><ExclamationCircleOutlined /> Sản Phẩm Sắp Hết Hàng</>}
                        style={{ width: "100%" }}
                    >
                        <List
                            dataSource={lowStockProducts}
                            renderItem={(item) => (
                                <List.Item>
                                    <List.Item.Meta
                                        title={item.name}
                                        description={`Còn lại: ${item.countInStock} sản phẩm`}
                                    />
                                </List.Item>
                            )}
                        />
                    </Card>
                );
            default:
                return null;
        }
    };

    return (
        <div className="top-products-stats">
            <h2>Thống Kê Sản Phẩm</h2>
            {/* Các nút chọn mục */}
            <div className="stats-options" style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
                <Button
                    type={selectedStat === "topSelling" ? "primary" : "default"}
                    icon={<ShoppingCartOutlined />}
                    onClick={() => toggleStat("topSelling")}
                >
                    Sản Phẩm Bán Chạy
                </Button>
                <Button
                    type={selectedStat === "bestRated" ? "primary" : "default"}
                    icon={<StarOutlined />}
                    onClick={() => toggleStat("bestRated")}
                >
                    Sản Phẩm Được Đánh Giá Cao
                </Button>
                <Button
                    type={selectedStat === "lowStock" ? "primary" : "default"}
                    icon={<ExclamationCircleOutlined />}
                    onClick={() => toggleStat("lowStock")}
                >
                    Sản Phẩm Sắp Hết Hàng
                </Button>
            </div>

            {/* Hiển thị nội dung dựa trên mục được chọn */}
            <div>{renderStatsContent()}</div>
        </div>
    );
};

export default TopProductsStats;
