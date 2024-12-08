// Sidebar imports
import {
  UilEstate,
  UilClipboardAlt,
  UilUsersAlt,
  UilPackage,
  UilChart,

} from "@iconscout/react-unicons";

// Analytics Cards imports
import { UilUsdSquare, UilMoneyWithdrawal } from "@iconscout/react-unicons";
import { keyboard } from "@testing-library/user-event/dist/keyboard";

// Recent Card Imports
import img1 from "../imgs/img1.png";
import img2 from "../imgs/img2.png";
import img3 from "../imgs/img3.png";

// Sidebar Data
export const SidebarData = [
  {
    icon: UilEstate,
    heading: "Dashboard",
    path: "/admin", // Cập nhật nếu cần
  },
  {
    icon: UilClipboardAlt,
    heading: "Orders",
    // path: "/admin/order", // Đường dẫn tới ManageOrder
  },
  {
    icon: UilUsersAlt,
    heading: "Customers",
    path: "/admin/customers",
  },
  {
    icon: UilPackage,
    heading: "Products",
    path: "/admin/products",
  },
  // {
  //   icon: UilChart,
  //   heading: "Analytics",
  //   path: "/admin/analytics",
  // },
];

// Analytics Cards Data
export const cardsData = [
  {
    title: "Sales",
    color: {
      backGround: "linear-gradient(180deg, #bb67ff 0%, #c484f3 100%)",
      boxShadow: "0px 10px 20px 0px #e0c6f5",
    },
    barValue: 70,
    value: "25,970",
    png: UilUsdSquare,
    series: [
      {
        name: "Sales",
        data: [31, 40, 28, 51, 42, 109, 100],
      },
    ],
  },
  {
    title: "Revenue",
    color: {
      backGround: "linear-gradient(180deg, #FF919D 0%, #FC929D 100%)",
      boxShadow: "0px 10px 20px 0px #FDC0C7",
    },
    barValue: 80,
    value: "14,270",
    png: UilMoneyWithdrawal,
    series: [
      {
        name: "Revenue",
        data: [10, 100, 50, 70, 80, 30, 40],
      },
    ],
  },
  {
    title: "Expenses",
    color: {
      backGround:
        "linear-gradient(rgb(248, 212, 154) -146.42%, rgb(255 202 113) -46.42%)",
      boxShadow: "0px 10px 20px 0px #F9D59B",
    },
    barValue: 60,
    value: "4,270",
    png: UilClipboardAlt,
    series: [
      {
        name: "Expenses",
        data: [10, 25, 15, 30, 12, 15, 20],
      },
    ],
  },
];

// Recent Update Card Data
export const UpdatesData = [
  {
    img: img1,
    name: "Andrew Thomas",
    noti: "has ordered Apple smart watch 2500mh battery.",
    time: "25 seconds ago",
  },
  {
    img: img2,
    name: "James Bond",
    noti: "has received Samsung gadget for charging battery.",
    time: "30 minutes ago",
  },
  {
    img: img3,
    name: "Iron Man",
    noti: "has ordered Apple smart watch, samsung Gear 2500mh battery.",
    time: "2 hours ago",
  },
];
export const dataOrder = [
  {
    _id: "order1",
    paidAt: "2024-12-08T10:00:00Z",
    itemsPrice: "1,500,000 VNĐ",
    isPaid: true,
    isDelivered: false,
    isCancel: false,
    orderItems: [
      {
        name: "Apple Smart Watch",
        price: "1,000,000 VNĐ",
        amount: 1,
        image: "/path/to/smartwatch.jpg",
      },
      {
        name: "Samsung Gear 2500mAh Battery",
        price: "500,000 VNĐ",
        amount: 1,
        image: "/path/to/battery.jpg",
      },
    ],
    paymentMethod: 0, // Assume 0 is the index for some payment method
  },
  {
    _id: "order2",
    paidAt: "2024-12-07T15:30:00Z",
    itemsPrice: "2,000,000 VNĐ",
    isPaid: false,
    isDelivered: false,
    isCancel: true,
    orderItems: [
      {
        name: "Samsung Galaxy S20",
        price: "2,000,000 VNĐ",
        amount: 1,
        image: "/path/to/s20.jpg",
      },
    ],
    paymentMethod: 1, // Assume 1 is another payment method
  },
  {
    _id: "order3",
    paidAt: "2024-12-06T09:15:00Z",
    itemsPrice: "750,000 VNĐ",
    isPaid: true,
    isDelivered: true,
    isCancel: false,
    orderItems: [
      {
        name: "Apple AirPods Pro",
        price: "750,000 VNĐ",
        amount: 1,
        image: "/path/to/airpods.jpg",
      },
    ],
    paymentMethod: 2, // Assume 2 is another payment method
  },
];