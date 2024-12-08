import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import * as OrderService from '../../../services/OrderService';
import { useSelector } from 'react-redux';
import './CustomerReview.css'; // Thêm file CSS cho hiệu ứng

const CustomerReview = () => {
  const user = useSelector((state) => state.user);
  const [orderss, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showChartRevenue, setShowChartRevenue] = useState(false); // State để kiểm soát hiển thị biểu đồ doanh thu
  const [showChartOrderSummary, setShowChartOrderSummary] = useState(false); // State để kiểm soát hiển thị biểu đồ tóm tắt đơn hàng
  const [totalRevenue, setTotalRevenue] = useState(0); // Tổng doanh thu
  const [deliveredOrders, setDeliveredOrders] = useState(0); // Số lượng đơn đã giao
  const [cancelledOrders, setCancelledOrders] = useState(0); // Số lượng đơn đã hủy

  const getAllOrder = async () => {
    try {
      const res = await OrderService.getAllOrder(user.access_token);
      const orders = res.data;

      // Nhóm các đơn hàng theo ngày
      const groupedOrders = orders.reduce((acc, order) => {
        const date = new Date(order.paidAt).toISOString().split("T")[0];
        if (!acc[date]) {
          acc[date] = { totalPrice: 0, delivered: 0, cancelled: 0 };
        }
        acc[date].totalPrice += order.totalPrice;

        // Kiểm tra trạng thái đơn hàng với `isDelivered` và `isCancel`
        if (order.isDelivered) {
          acc[date].delivered += 1;
        } else if (order.isCancel) {
          acc[date].cancelled += 1;
        }

        return acc;
      }, {});

      // Chuyển đổi nhóm đơn hàng thành mảng và tính tổng doanh thu
      const groupedOrdersArray = Object.keys(groupedOrders).map(date => ({
        date,
        totalPrice: groupedOrders[date].totalPrice,
        delivered: groupedOrders[date].delivered,
        cancelled: groupedOrders[date].cancelled,
      }));

      const total = groupedOrdersArray.reduce((sum, order) => sum + order.totalPrice, 0);
      const deliveredCount = groupedOrdersArray.reduce((sum, order) => sum + order.delivered, 0);
      const cancelledCount = groupedOrdersArray.reduce((sum, order) => sum + order.cancelled, 0);

      // Sắp xếp ngày tháng tăng dần
      groupedOrdersArray.sort((a, b) => new Date(a.date) - new Date(b.date));

      setOrders(groupedOrdersArray);
      setTotalRevenue(total);
      setDeliveredOrders(deliveredCount); // Cập nhật số lượng đơn đã giao
      setCancelledOrders(cancelledCount); // Cập nhật số lượng đơn đã hủy
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching orders:", error);
      setOrders([]);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAllOrder();
  }, [user.access_token]);

  // Data for revenue chart
  const revenueData = {
    series: [
      {
        name: "Order Value",
        data: orderss.map(order => order.totalPrice),
      },
    ],
    options: {
      chart: {
        type: "area",
        height: "auto",
      },
      fill: {
        colors: ["#fff"],
        type: "gradient",
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
        colors: ["#ff929f"],
      },
      tooltip: {
        x: {
          format: "dd/MM/yy",
        },
        y: {
          formatter: (value) => `${value.toLocaleString()} VND`,
        },
      },
      grid: {
        show: false,
      },
      xaxis: {
        type: "category",
        categories: orderss.map(order => order.date),
        labels: {
          formatter: (value) => new Date(value).toLocaleDateString(),
        },
      },
      yaxis: {
        min: 0,
        labels: {
          formatter: (value) => `${value.toLocaleString()} VND`,
        },
        title: {
          text: "Tổng tiền (VND)",
          style: {
            color: "#666",
            fontSize: "12px",
          },
        },
      },
      toolbar: {
        show: false,
      },
    },
  };

  // Data for order summary chart
  const orderSummaryData = {
    series: [
      {
        name: "Đơn đã giao",
        data: orderss.map(order => order.delivered),
      },
      {
        name: "Đơn đã hủy",
        data: orderss.map(order => order.cancelled),
      },
    ],
    options: {
      chart: {
        type: "bar",
        height: "auto",
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        width: 2,
        colors: ["#ff929f", "#ff5e6d"],
      },
      tooltip: {
        x: {
          format: "dd/MM/yy",
        },
        y: {
          formatter: (value) => value,
        },
      },
      xaxis: {
        type: "category",
        categories: orderss.map(order => order.date),
        labels: {
          formatter: (value) => new Date(value).toLocaleDateString(),
        },
      },
      yaxis: {
        min: 0,
        title: {
          text: "Số lượng đơn hàng",
          style: {
            color: "#666",
            fontSize: "12px",
          },
        },
      },
      toolbar: {
        show: false,
      },
    },
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="CustomerReview">
      {/* Revenue Box */}
      {!showChartRevenue ? (
        <div
          className="revenue-box"
          onClick={() => setShowChartRevenue(true)} // Khi click, chuyển sang hiển thị biểu đồ doanh thu
        >
          <h2>Doanh thu</h2>
          <p className="revenue-total">{totalRevenue.toLocaleString()} VND</p>
          <small>Nhấn để xem chi tiết biểu đồ</small>
        </div>
      ) : (
        <div className={`chart-container ${showChartRevenue ? "expand" : ""}`}>
          <button className="close-btn" onClick={() => setShowChartRevenue(false)}>X</button>
          <Chart options={revenueData.options} series={revenueData.series} type="area" />
        </div>
      )}

      {/* Order Summary Box */}
      {!showChartOrderSummary ? (
        <div
          className="revenue-box"
          onClick={() => setShowChartOrderSummary(true)} // Khi click, chuyển sang hiển thị biểu đồ tóm tắt đơn hàng
        >
          <h2>Tóm tắt đơn hàng</h2>
          <p className="revenue-total">
            Đã giao: {deliveredOrders} | Đã hủy: {cancelledOrders}
          </p>
          <small>Nhấn để xem chi tiết biểu đồ</small>
        </div>
      ) : (
        <div className={`chart-container ${showChartOrderSummary ? "expand" : ""}`}>
          <button className="close-btn" onClick={() => setShowChartOrderSummary(false)}>X</button>
          <Chart options={orderSummaryData.options} series={orderSummaryData.series} type="bar" />
        </div>
      )}
    </div>
  );
};

export default CustomerReview;
