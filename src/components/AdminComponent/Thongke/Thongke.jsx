import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import * as OrderService from "../../../services/OrderService";
import { useSelector } from "react-redux";
import "./CustomerReview.css";

const CustomerReview = () => {
  const user = useSelector((state) => state.user);
  const [orderss, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showChartRevenue, setShowChartRevenue] = useState(false);
  const [showChartOrderSummary, setShowChartOrderSummary] = useState(false);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [deliveredOrders, setDeliveredOrders] = useState(0);
  const [cancelledOrders, setCancelledOrders] = useState(0);
  const [timeFilter, setTimeFilter] = useState("all");
  const [selectedDate, setSelectedDate] = useState(null);
  const [orderDetails, setOrderDetails] = useState([]);
  const [paymentMethods, setPaymentMethods] = useState({
    creditCard: 0,
    paypal: 0,
    cashOnDelivery: 0,
  });
  const getAllOrder = async () => {
    try {
      const res = await OrderService.getAllOrder(user.access_token);
      const orders = res.data;

      const groupedOrders = orders.reduce((acc, order) => {
        const date = new Date(order.paidAt).toISOString().split("T")[0];
        if (!acc[date]) {
          acc[date] = { totalPrice: 0, delivered: 0, cancelled: 0, orders: [] };
        }
        if (!order.isCancel) {
          acc[date].totalPrice += order.totalPrice;
        }
        if (order.isDelivered) {
          acc[date].delivered += 1;
        } else if (order.isCancel) {
          acc[date].cancelled += 1;
        }
        acc[date].orders.push(order);
        return acc;
      }, {});

      const groupedOrdersArray = Object.keys(groupedOrders).map((date) => ({
        date,
        totalPrice: groupedOrders[date].totalPrice,
        delivered: groupedOrders[date].delivered,
        cancelled: groupedOrders[date].cancelled,
        orders: groupedOrders[date].orders,
      }));

      const total = groupedOrdersArray.reduce(
        (sum, order) => sum + order.totalPrice,
        0
      );
      const deliveredCount = groupedOrdersArray.reduce(
        (sum, order) => sum + order.delivered,
        0
      );
      const cancelledCount = groupedOrdersArray.reduce(
        (sum, order) => sum + order.cancelled,
        0
      );
      const paymentCounts = {
        creditCard: 0,
        paypal: 0,
        cashOnDelivery: 0,
      };

      orders.forEach((order) => {
        if (order.paymentMethod) {
          paymentCounts[order.paymentMethod] += 1;
        }
      });
      groupedOrdersArray.sort((a, b) => new Date(a.date) - new Date(b.date));

      setOrders(groupedOrdersArray);
      setFilteredOrders(groupedOrdersArray);
      setTotalRevenue(total);
      setPaymentMethods(paymentCounts);
      setDeliveredOrders(deliveredCount);
      setCancelledOrders(cancelledCount);
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

  useEffect(() => {
    const today = new Date();
    const filtered = orderss.filter((order) => {
      const orderDate = new Date(order.date);
      if (timeFilter === "week") {
        const lastWeek = new Date(today.setDate(today.getDate() - 7));
        return orderDate >= lastWeek && orderDate <= new Date();
      }
      if (timeFilter === "month") {
        const lastMonth = new Date(today.setMonth(today.getMonth() - 1));
        return orderDate >= lastMonth && orderDate <= new Date();
      }
      return true;
    });
    setFilteredOrders(filtered);
  }, [timeFilter, orderss]);

  const handleBarClick = (date) => {
    const details = orderss.find((order) => order.date === date);
    setSelectedDate(date);
    setOrderDetails(details ? details.orders : []);
  };

  const paymentMethodData = {
    series: [
      paymentMethods.creditCard,
      paymentMethods.paypal,
      paymentMethods.cashOnDelivery,
    ],
    options: {
      chart: {
        type: "pie",
      },
      labels: ["Thẻ tín dụng 💳", "PayPal 💰", "Thanh toán khi nhận hàng 💵"],
      colors: ["#4CAF50", "#FFC107", "#F44336"],
      legend: {
        position: "bottom",
      },
      dataLabels: {
        formatter: (value, { seriesIndex }) =>
          `${paymentMethods[Object.keys(paymentMethods)[seriesIndex]]} đơn`,
      },
    },
  };
  const revenueData = {
    series: [
      {
        name: "Order Value",
        data: filteredOrders.map((order) => order.totalPrice),
      },
    ],
    options: {
      chart: { type: "area", height: "auto" },
      fill: { colors: ["#fff"], type: "gradient" },
      dataLabels: { enabled: false },
      stroke: { curve: "smooth", colors: ["#ff929f"] },
      tooltip: {
        x: { format: "dd/MM/yy" },
        y: { formatter: (value) => `${value.toLocaleString()} VND` },
      },
      xaxis: {
        categories: filteredOrders.map((order) => order.date),
        labels: { formatter: (value) => new Date(value).toLocaleDateString() },
      },
    },
  };

  const orderSummaryData = {
    series: [
      { name: "Đơn đã giao", data: filteredOrders.map((order) => order.delivered) },
      { name: "Đơn đã hủy", data: filteredOrders.map((order) => order.cancelled) },
    ],
    options: {
      chart: {
        type: "bar",
        events: {
          dataPointSelection: (event, chartContext, config) => {
            handleBarClick(filteredOrders[config.dataPointIndex].date);
          },
        },
      },
      xaxis: {
        categories: filteredOrders.map((order) => order.date),
        labels: { formatter: (value) => new Date(value).toLocaleDateString() },
      },
    },
  };

  if (isLoading) {
    return <div className="loader"></div>;
  }

  return (
    <div className="CustomerReview">
      <div className="filter-container">
        <label>Lọc theo thời gian: </label>
        <select value={timeFilter} onChange={(e) => setTimeFilter(e.target.value)}>
          <option value="all">Tất cả</option>
          <option value="week">7 ngày gần nhất</option>
          <option value="month">30 ngày gần nhất</option>
        </select>
      </div>

      {!showChartRevenue ? (
        <div className="revenue-box" onClick={() => setShowChartRevenue(true)}>
          <h2>Doanh thu</h2>
          <p>{totalRevenue.toLocaleString()} VND</p>
          <small>Nhấn để xem chi tiết biểu đồ</small>
        </div>
      ) : (
        <div className="chart-container">
          <button onClick={() => setShowChartRevenue(false)}>Đóng</button>
          <Chart options={revenueData.options} series={revenueData.series} type="area" />
        </div>
      )}

      {!showChartOrderSummary ? (
        <div className="revenue-box" onClick={() => setShowChartOrderSummary(true)}>
          <h2>Tóm tắt đơn hàng</h2>
          <p>Đã giao: {deliveredOrders} | Đã hủy: {cancelledOrders}</p>
          <p>Tổng số đơn hàng: {deliveredOrders + cancelledOrders}</p>

        </div>
      ) : (
        <div className="chart-container">
          <button onClick={() => setShowChartOrderSummary(false)}>Đóng</button>
          <Chart options={orderSummaryData.options} series={orderSummaryData.series} type="bar" />
        </div>
      )}

      {selectedDate && (
        <div className="modal">
          <div className="modal-content">
            <h2>Chi tiết đơn hàng - {selectedDate}</h2>
            <ul>
              {orderDetails.map((order, index) => (
                <li key={index}>
                  <p>Mã đơn: {order.id}</p>
                  <p>Tổng tiền: {order.totalPrice.toLocaleString()} VND</p>
                  <p>Trạng thái: {order.isDelivered ? "Đã giao" : "Đã hủy"}</p>
                </li>
              ))}
            </ul>
            <button onClick={() => setSelectedDate(null)}>Đóng</button>
          </div>
        </div>
      )}
      <div className="payment-method-box">
        <h2>Xu hướng thanh toán</h2>
        <Chart
          options={paymentMethodData.options}
          series={paymentMethodData.series}
          type="pie"
          width="380"
        />
      </div>
    </div>
  );
};

export default CustomerReview;
