"use client";

import React from "react";
import { AiFillWallet } from "react-icons/ai";

import {
  FiArrowDown,
  FiArrowRight,
  FiCalendar,
  FiCheckCircle,
  FiChevronDown,
  FiChevronRight,
  FiClock,
  FiCreditCard,
  FiDollarSign,
  FiEye,
  FiFilter,
  FiMoreHorizontal,
  FiPlus,
  FiRefreshCw,
  FiShoppingBag,
  FiTrendingDown,
  FiTrendingUp,
} from "react-icons/fi";

import {
  HiOutlineBanknotes,
  HiOutlineBuildingLibrary,
  HiOutlineCurrencyRupee,
  HiOutlineDevicePhoneMobile,
  HiOutlineShoppingBag,
  HiOutlineUserGroup,
} from "react-icons/hi2";

import {
  MdOutlineAccountBalance,
  MdOutlinePayments,
  MdOutlineQrCode,
} from "react-icons/md";

/* =========================================================
   TYPES
========================================================= */

type PaymentStat = {
  title: string;
  value: string;
  change: string;
  subtitle: string;
  type: "up" | "down";
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
};

type PaymentMethod = {
  name: string;
  amount: string;
  percentage: string;
  status: string;
  icon: React.ReactNode;
  iconBg: string;
};

type RecentPayment = {
  invoice: string;
  customer: string;
  amount: string;
  method: string;
  status: "Success" | "Pending";
  date: string;
};

type Customer = {
  name: string;
  orders: number;
  amount: string;
};

type Transaction = {
  id: string;
  customer: string;
  method: string;
  amount: string;
  status: "Success" | "Pending";
  date: string;
};

/* =========================================================
   DATA
========================================================= */

const paymentStats: PaymentStat[] = [
  {
    title: "Total Payments Received",
    value: "₹24,85,600",
    change: "18.6%",
    subtitle: "vs previous 7 days",
    type: "up",
    icon: <HiOutlineCurrencyRupee />,
    iconBg: "bg-orange-50",
    iconColor: "text-orange-500",
  },
  {
    title: "Successful Transactions",
    value: "1,567",
    change: "12.3%",
    subtitle: "vs previous 7 days",
    type: "up",
    icon: <MdOutlinePayments />,
    iconBg: "bg-violet-50",
    iconColor: "text-violet-500",
  },
  {
    title: "Pending Payments",
    value: "₹2,36,850",
    change: "8.7%",
    subtitle: "vs previous 7 days",
    type: "up",
    icon: <FiClock />,
    iconBg: "bg-orange-50",
    iconColor: "text-orange-500",
  },
  {
    title: "Total Refunds",
    value: "₹45,210",
    change: "3.2%",
    subtitle: "vs previous 7 days",
    type: "down",
    icon: <FiRefreshCw />,
    iconBg: "bg-red-50",
    iconColor: "text-red-500",
  },
  {
    title: "Net Amount Received",
    value: "₹22,49,750",
    change: "16.4%",
    subtitle: "vs previous 7 days",
    type: "up",
    icon: <AiFillWallet />,
    iconBg: "bg-purple-50",
    iconColor: "text-purple-500",
  },
];

const paymentMethods: PaymentMethod[] = [
  {
    name: "Visa ending 4242",
    amount: "₹8,25,600",
    percentage: "33.2%",
    status: "Active",
    icon: <FiCreditCard />,
    iconBg: "bg-blue-50",
  },
  {
    name: "Mastercard ending 7777",
    amount: "₹6,20,300",
    percentage: "24.9%",
    status: "Active",
    icon: <FiCreditCard />,
    iconBg: "bg-red-50",
  },
  {
    name: "UPI (GPay, PhonePe, Paytm)",
    amount: "₹6,75,300",
    percentage: "27.2%",
    status: "Active",
    icon: <MdOutlineQrCode />,
    iconBg: "bg-orange-50",
  },
  {
    name: "HDFC Net Banking",
    amount: "₹2,10,000",
    percentage: "8.4%",
    status: "Active",
    icon: <MdOutlineAccountBalance />,
    iconBg: "bg-red-50",
  },
  {
    name: "Cash on Delivery",
    amount: "₹1,13,300",
    percentage: "4.5%",
    status: "Enabled",
    icon: <HiOutlineBanknotes />,
    iconBg: "bg-blue-50",
  },
  {
    name: "Wallets (Paytm, Amazon Pay)",
    amount: "₹2,18,600",
    percentage: "8.8%",
    status: "Active",
    icon: <AiFillWallet />,
    iconBg: "bg-pink-50",
  },
];

const recentPayments: RecentPayment[] = [
  {
    invoice: "INV-2025-1189",
    customer: "Rahul Verma",
    amount: "₹52,600",
    method: "Visa •••• 4242",
    status: "Success",
    date: "18 May 2025, 10:30 AM",
  },
  {
    invoice: "INV-2025-1188",
    customer: "Priya Sharma",
    amount: "₹38,900",
    method: "UPI • Google Pay",
    status: "Success",
    date: "18 May 2025, 09:15 AM",
  },
  {
    invoice: "INV-2025-1187",
    customer: "Amit Singh",
    amount: "₹26,500",
    method: "Net Banking • HDFC",
    status: "Success",
    date: "18 May 2025, 08:45 AM",
  },
  {
    invoice: "INV-2025-1186",
    customer: "Neha Kapoor",
    amount: "₹18,750",
    method: "Cash on Delivery",
    status: "Pending",
    date: "17 May 2025, 06:20 PM",
  },
  {
    invoice: "INV-2025-1185",
    customer: "Vikram Joshi",
    amount: "₹22,400",
    method: "Paytm Wallet",
    status: "Success",
    date: "17 May 2025, 04:10 PM",
  },
  {
    invoice: "INV-2025-1184",
    customer: "Sneha Iyer",
    amount: "₹78,600",
    method: "Mastercard •••• 7777",
    status: "Success",
    date: "17 May 2025, 11:45 AM",
  },
  {
    invoice: "INV-2025-1183",
    customer: "Karan Mehta",
    amount: "₹31,200",
    method: "UPI • PhonePe",
    status: "Success",
    date: "17 May 2025, 10:20 AM",
  },
];

const customers: Customer[] = [
  {
    name: "Rahul Verma",
    orders: 8,
    amount: "₹2,85,600",
  },
  {
    name: "Priya Sharma",
    orders: 6,
    amount: "₹2,15,400",
  },
  {
    name: "Amit Singh",
    orders: 7,
    amount: "₹1,95,300",
  },
  {
    name: "Neha Kapoor",
    orders: 5,
    amount: "₹1,42,750",
  },
  {
    name: "Vikram Joshi",
    orders: 6,
    amount: "₹1,25,400",
  },
];

const transactions: Transaction[] = [
  {
    id: "ORD12584",
    customer: "Rahul Verma",
    method: "Credit Card • Visa ending 4242",
    amount: "₹52,600",
    status: "Success",
    date: "18 May 2025, 10:30 AM",
  },
  {
    id: "ORD12583",
    customer: "Priya Sharma",
    method: "UPI • Google Pay",
    amount: "₹38,900",
    status: "Success",
    date: "18 May 2025, 09:15 AM",
  },
  {
    id: "ORD12582",
    customer: "Amit Singh",
    method: "Net Banking • HDFC",
    amount: "₹26,500",
    status: "Success",
    date: "18 May 2025, 08:45 AM",
  },
  {
    id: "ORD12581",
    customer: "Neha Kapoor",
    method: "Cash on Delivery",
    amount: "₹18,750",
    status: "Pending",
    date: "17 May 2025, 06:20 PM",
  },
  {
    id: "ORD12580",
    customer: "Vikram Joshi",
    method: "Wallet • Paytm",
    amount: "₹22,400",
    status: "Success",
    date: "17 May 2025, 04:10 PM",
  },
];

/* =========================================================
   CARD
========================================================= */

const Card = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={`rounded-lg border border-slate-200 bg-white ${className}`}
    >
      {children}
    </div>
  );
};

/* =========================================================
   CARD HEADER
========================================================= */

const CardHeader = ({
  title,
  action = "This Week",
}: {
  title: string;
  action?: string;
}) => {
  return (
    <div className="flex items-center justify-between border-b-0 px-3.5 pt-3">
      <h3 className="text-[11px] font-semibold text-slate-800">
        {title}
      </h3>

      {action && (
        <button className="flex h-6 items-center gap-1 rounded border border-slate-200 px-2 text-[8px] text-slate-600">
          {action}
          <FiChevronDown className="text-[9px]" />
        </button>
      )}
    </div>
  );
};

/* =========================================================
   STAT CARDS
========================================================= */

const PaymentStats = () => {
  return (
    <div className="grid grid-cols-2 gap-2 md:grid-cols-3 xl:grid-cols-5">
      {paymentStats.map((stat) => (
        <Card
          key={stat.title}
          className="min-h-[89px] px-3 py-3"
        >
          <div className="flex items-center gap-3">

            <div
              className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[18px] ${stat.iconBg} ${stat.iconColor}`}
            >
              {stat.icon}
            </div>

            <div className="min-w-0">
              <p className="truncate text-[8px] text-slate-600">
                {stat.title}
              </p>

              <p className="mt-1 truncate text-[15px] font-bold tracking-tight text-slate-800">
                {stat.value}
              </p>

              <p className="mt-1 whitespace-nowrap text-[7px]">
                {stat.type === "up" ? (
                  <span className="font-semibold text-emerald-500">
                    ↑ {stat.change}
                  </span>
                ) : (
                  <span className="font-semibold text-red-500">
                    ↓ {stat.change}
                  </span>
                )}

                <span className="ml-1 text-slate-400">
                  {stat.subtitle}
                </span>
              </p>
            </div>

          </div>
        </Card>
      ))}
    </div>
  );
};

/* =========================================================
   PAYMENT TREND CHART
========================================================= */

const PaymentTrendChart = () => {
  const received = [
    [0, 82],
    [45, 75],
    [90, 52],
    [135, 65],
    [180, 60],
    [225, 70],
    [270, 52],
    [315, 42],
    [360, 17],
    [405, 48],
    [450, 59],
    [495, 47],
    [540, 53],
    [585, 67],
  ];

  const refunds = [
    [0, 95],
    [45, 88],
    [90, 75],
    [135, 81],
    [180, 73],
    [225, 78],
    [270, 70],
    [315, 67],
    [360, 56],
    [405, 68],
    [450, 64],
    [495, 72],
    [540, 73],
    [585, 66],
  ];

  const receivedPoints = received
    .map(([x, y]) => `${x},${y}`)
    .join(" ");

  const refundPoints = refunds
    .map(([x, y]) => `${x},${y}`)
    .join(" ");

  const receivedArea = `0,100 ${receivedPoints} 585,100`;

  return (
    <div className="px-3.5 pb-3 pt-1">

      {/* Legend */}
      <div className="mb-2 flex items-center gap-4">
        <span className="flex items-center gap-1 text-[8px] text-slate-500">
          <span className="h-1.5 w-1.5 rounded-full bg-[#df9b2e]" />
          Payments Received
        </span>

        <span className="flex items-center gap-1 text-[8px] text-slate-500">
          <span className="h-1.5 w-1.5 rounded-full bg-[#ec7a7a]" />
          Refunds
        </span>
      </div>

      <div className="relative h-[155px]">

        {/* Y Axis */}
        <div className="absolute bottom-5 left-0 top-0 flex w-7 flex-col justify-between">
          {["50K", "40K", "30K", "20K", "10K"].map(
            (value) => (
              <span
                key={value}
                className="text-[7px] text-slate-400"
              >
                {value}
              </span>
            ),
          )}
        </div>

        {/* Chart */}
        <svg
          viewBox="0 0 585 100"
          preserveAspectRatio="none"
          className="absolute left-8 top-0 h-[125px] w-[calc(100%-32px)]"
        >
          <defs>
            <linearGradient
              id="paymentArea"
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop
                offset="0%"
                stopColor="#dfa033"
                stopOpacity="0.18"
              />
              <stop
                offset="100%"
                stopColor="#dfa033"
                stopOpacity="0"
              />
            </linearGradient>
          </defs>

          {/* Horizontal grid */}
          {[20, 40, 60, 80].map((y) => (
            <line
              key={y}
              x1="0"
              x2="585"
              y1={y}
              y2={y}
              stroke="#edf0f2"
              strokeDasharray="3 3"
            />
          ))}

          {/* Area */}
          <polygon
            points={receivedArea}
            fill="url(#paymentArea)"
          />

          {/* Received */}
          <polyline
            points={receivedPoints}
            fill="none"
            stroke="#dc982d"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Refund */}
          <polyline
            points={refundPoints}
            fill="none"
            stroke="#ed7777"
            strokeWidth="1.5"
            strokeDasharray="3 2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Received points */}
          {received.map(([x, y], index) => (
            <circle
              key={`r-${index}`}
              cx={x}
              cy={y}
              r="1.8"
              fill="#dc982d"
            />
          ))}

          {/* Refund points */}
          {refunds.map(([x, y], index) => (
            <circle
              key={`f-${index}`}
              cx={x}
              cy={y}
              r="1.5"
              fill="#ed7777"
            />
          ))}
        </svg>

        {/* Tooltip */}
        <div className="absolute right-0 top-0 rounded-md border border-slate-100 bg-white px-2.5 py-2 shadow-md">
          <p className="text-[8px] font-medium text-slate-700">
            16 May 2025
          </p>

          <div className="mt-1.5 space-y-1">
            <div className="flex items-center justify-between gap-4">
              <span className="flex items-center gap-1 text-[7px] text-slate-500">
                <span className="h-1.5 w-1.5 rounded-full bg-[#dc982d]" />
                Payments Received
              </span>

              <strong className="text-[7px] text-slate-700">
                ₹32,540
              </strong>
            </div>

            <div className="flex items-center justify-between gap-4">
              <span className="flex items-center gap-1 text-[7px] text-slate-500">
                <span className="h-1.5 w-1.5 rounded-full bg-[#ed7777]" />
                Refunds
              </span>

              <strong className="text-[7px] text-slate-700">
                ₹4,120
              </strong>
            </div>
          </div>
        </div>

        {/* X axis */}
        <div className="absolute bottom-0 left-8 right-0 flex justify-between">
          {[
            "12 May",
            "13 May",
            "14 May",
            "15 May",
            "16 May",
            "17 May",
            "18 May",
          ].map((day) => (
            <span
              key={day}
              className="text-[7px] text-slate-400"
            >
              {day}
            </span>
          ))}
        </div>

      </div>
    </div>
  );
};

/* =========================================================
   DONUT CHART
========================================================= */

const PaymentDonut = () => {
  const segments = [
    "#568bc9 0% 42.1%",
    "#7382c7 42.1% 69.3%",
    "#42945f 69.3% 86.4%",
    "#df514b 86.4% 91.6%",
    "#4e718b 91.6% 96.1%",
    "#c6cbd0 96.1% 100%",
  ];

  return (
    <div
      className="relative h-[126px] w-[126px] shrink-0 rounded-full"
      style={{
        background: `conic-gradient(${segments.join(", ")})`,
      }}
    >
      <div className="absolute inset-[25px] flex flex-col items-center justify-center rounded-full bg-white">
        <span className="text-[9px] text-slate-500">
          Total
        </span>

        <strong className="mt-0.5 text-[12px] font-bold text-slate-800">
          ₹24,85,600
        </strong>
      </div>
    </div>
  );
};

/* =========================================================
   PAYMENTS BY METHOD
========================================================= */

const PaymentsByMethod = () => {
  const data = [
    ["Credit / Debit Card", "₹10,45,600", "42.1%", "#df9b2e"],
    ["UPI", "₹6,75,300", "27.2%", "#6878c8"],
    ["Net Banking", "₹4,32,800", "17.4%", "#42945f"],
    ["Wallets", "₹2,18,600", "8.8%", "#db5a4f"],
    ["Cash on Delivery", "₹1,13,300", "4.5%", "#5b7a91"],
  ];

  return (
    <Card className="min-h-[235px]">
      <CardHeader title="Payments by Method" />

      <div className="flex items-center gap-5 px-4 py-6">
        <PaymentDonut />

        <div className="flex-1 space-y-3">
          {data.map(([name, amount, percentage, color]) => (
            <div
              key={name}
              className="grid grid-cols-[7px_1fr_auto] items-center gap-2"
            >
              <span
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: color }}
              />

              <span className="text-[8px] text-slate-600">
                {name}
              </span>

              <span className="whitespace-nowrap text-[8px] text-slate-600">
                {amount} ({percentage})
              </span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};

/* =========================================================
   PAYMENT METHODS
========================================================= */

const PaymentMethods = () => {
  return (
    <Card className="overflow-hidden">
      <div className="flex items-center justify-between px-3.5 pt-3">
        <h3 className="text-[11px] font-semibold text-slate-800">
          Payment Methods
        </h3>

        <button className="rounded border border-slate-200 px-2 py-1 text-[7px] text-slate-600">
          Manage Methods
        </button>
      </div>

      <div className="mt-2">
        {paymentMethods.map((method) => (
          <div
            key={method.name}
            className="grid grid-cols-[25px_1fr_42px_46px] items-center gap-1 border-b border-slate-50 px-3.5 py-1.5 last:border-b-0"
          >
            <span
              className={`flex h-5 w-5 items-center justify-center rounded ${method.iconBg} text-[11px] text-slate-600`}
            >
              {method.icon}
            </span>

            <span className="truncate text-[7px] font-medium text-slate-700">
              {method.name}
            </span>

            <span className="text-right text-[7px] text-slate-700">
              {method.amount}
            </span>

            <div className="flex justify-end">
              <span className="rounded bg-emerald-50 px-1.5 py-0.5 text-[6px] font-medium text-emerald-600">
                {method.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

/* =========================================================
   STATUS BADGE
========================================================= */

const StatusBadge = ({
  status,
}: {
  status: "Success" | "Pending";
}) => {
  if (status === "Success") {
    return (
      <span className="rounded bg-emerald-50 px-1.5 py-0.5 text-[6px] font-medium text-emerald-600">
        Success
      </span>
    );
  }

  return (
    <span className="rounded bg-orange-50 px-1.5 py-0.5 text-[6px] font-medium text-orange-500">
      Pending
    </span>
  );
};

/* =========================================================
   RECENT PAYMENTS
========================================================= */

const RecentPayments = () => {
  return (
    <Card className="overflow-hidden">
      <div className="flex items-center justify-between px-3.5 pt-3">
        <h3 className="text-[11px] font-semibold text-slate-800">
          Recent Payments
        </h3>

        <button className="text-[8px] font-medium text-[#c58a2c]">
          View All
        </button>
      </div>

      <div className="mt-2 overflow-x-auto">
        <table className="w-full min-w-[620px]">
          <thead>
            <tr className="border-y border-slate-100 text-left text-[7px] text-slate-500">
              <th className="px-3.5 py-2 font-medium">
                Invoice ID
              </th>
              <th className="px-2 py-2 font-medium">
                Customer
              </th>
              <th className="px-2 py-2 font-medium">
                Amount
              </th>
              <th className="px-2 py-2 font-medium">
                Payment Method
              </th>
              <th className="px-2 py-2 font-medium">
                Status
              </th>
              <th className="px-2 py-2 font-medium">
                Date & Time
              </th>
              <th className="px-3.5 py-2 text-right font-medium">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {recentPayments.map((payment) => (
              <tr
                key={payment.invoice}
                className="border-b border-slate-50 last:border-b-0"
              >
                <td className="px-3.5 py-2 text-[7px] text-slate-600">
                  {payment.invoice}
                </td>

                <td className="px-2 py-2 text-[7px] font-medium text-slate-700">
                  {payment.customer}
                </td>

                <td className="px-2 py-2 text-[7px] text-slate-700">
                  {payment.amount}
                </td>

                <td className="px-2 py-2 text-[7px] text-slate-500">
                  {payment.method}
                </td>

                <td className="px-2 py-2">
                  <StatusBadge status={payment.status} />
                </td>

                <td className="px-2 py-2 whitespace-nowrap text-[7px] text-slate-500">
                  {payment.date}
                </td>

                <td className="px-3.5 py-2 text-right">
                  <button className="text-slate-400 hover:text-slate-700">
                    <FiEye className="text-[10px]" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

/* =========================================================
   CUSTOMER AVATAR
========================================================= */

const CustomerAvatar = ({
  index,
}: {
  index: number;
}) => {
  const colors = [
    "bg-orange-100",
    "bg-violet-100",
    "bg-emerald-100",
    "bg-blue-100",
    "bg-pink-100",
  ];

  return (
    <span
      className={`flex h-5 w-5 items-center justify-center rounded-full text-[8px] font-semibold text-slate-600 ${colors[index % colors.length]}`}
    >
      {["R", "P", "A", "N", "V"][index]}
    </span>
  );
};

/* =========================================================
   TOP CUSTOMERS
========================================================= */

const TopCustomers = () => {
  return (
    <Card className="overflow-hidden">
      <div className="flex items-center justify-between px-3.5 pt-3">
        <h3 className="text-[11px] font-semibold text-slate-800">
          Top Customers by Payments
        </h3>

        <button className="flex items-center gap-1 rounded border border-slate-200 px-2 py-1 text-[7px] text-slate-600">
          This Month
          <FiChevronDown />
        </button>
      </div>

      <div className="mt-2">
        <div className="grid grid-cols-[1fr_40px_72px] border-y border-slate-100 px-3.5 py-2 text-[7px] text-slate-500">
          <span>Customer</span>
          <span>Orders</span>
          <span className="text-right">Amount Paid</span>
        </div>

        {customers.map((customer, index) => (
          <div
            key={customer.name}
            className="grid grid-cols-[1fr_40px_72px] items-center border-b border-slate-50 px-3.5 py-2 last:border-0"
          >
            <div className="flex items-center gap-2">
              <CustomerAvatar index={index} />

              <span className="text-[7px] font-medium text-slate-700">
                {customer.name}
              </span>
            </div>

            <span className="text-[7px] text-slate-600">
              {customer.orders}
            </span>

            <span className="text-right text-[7px] text-slate-700">
              {customer.amount}
            </span>
          </div>
        ))}
      </div>

      <button className="m-2 flex w-[calc(100%-16px)] items-center justify-center rounded border border-slate-200 py-1.5 text-[8px] font-medium text-[#c58a2c]">
        View All Customers
        <FiArrowRight className="ml-1" />
      </button>
    </Card>
  );
};

/* =========================================================
   UPCOMING SETTLEMENTS
========================================================= */

const UpcomingSettlements = () => {
  const data = [
    ["Bank Account •••• 4242", "20 May 2025", "₹5,68,900"],
    ["PayPal Wallet", "20 May 2025", "₹1,35,600"],
    ["Cash Collection", "19 May 2025", "₹2,24,800"],
  ];

  return (
    <Card className="overflow-hidden">
      <div className="flex items-center justify-between px-3.5 pt-3">
        <h3 className="text-[10px] font-semibold text-slate-800">
          Upcoming Settlements
        </h3>

        <button className="text-[7px] text-[#c58a2c]">
          View All
        </button>
      </div>

      <div className="mt-2">
        {data.map(([name, date, amount]) => (
          <div
            key={name}
            className="border-b border-slate-50 px-3.5 py-2 last:border-0"
          >
            <div className="grid grid-cols-[1fr_auto_auto] items-center gap-2">
              <div>
                <p className="truncate text-[7px] font-medium text-slate-700">
                  {name}
                </p>

                <p className="mt-0.5 text-[6px] text-slate-400">
                  {name.includes("Bank")
                    ? "Bank Account"
                    : name.includes("PayPal")
                      ? "PayPal Wallet"
                      : "Cash Account"}
                </p>
              </div>

              <span className="text-[7px] text-slate-500">
                {date}
              </span>

              <span className="text-[7px] font-medium text-slate-700">
                {amount}
              </span>

              <span className="col-span-3 ml-auto rounded bg-blue-50 px-1.5 py-0.5 text-[6px] text-blue-500">
                Upcoming
              </span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

/* =========================================================
   RECENT TRANSACTIONS
========================================================= */

const RecentTransactions = () => {
  return (
    <Card className="overflow-hidden">
      <div className="flex items-center justify-between px-3.5 pt-3">
        <h3 className="text-[10px] font-semibold text-slate-800">
          Recent Transactions
        </h3>

        <button className="text-[7px] text-[#c58a2c]">
          View All
        </button>
      </div>

      <div className="mt-2">
        {transactions.map((transaction, index) => (
          <div
            key={transaction.id}
            className="grid grid-cols-[22px_1fr_auto] gap-2 border-b border-slate-50 px-3.5 py-2 last:border-0"
          >
            <span
              className={`flex h-5 w-5 items-center justify-center rounded ${[
                "bg-blue-50 text-blue-500",
                "bg-emerald-50 text-emerald-500",
                "bg-orange-50 text-orange-500",
                "bg-pink-50 text-pink-500",
                "bg-blue-50 text-blue-500",
              ][index]}`}
            >
              {index === 0 && <FiCreditCard />}
              {index === 1 && <MdOutlineQrCode />}
              {index === 2 && <MdOutlineAccountBalance />}
              {index === 3 && <FiShoppingBag />}
              {index === 4 && <AiFillWallet />}
            </span>

            <div className="min-w-0">
              <p className="truncate text-[7px] font-medium text-slate-700">
                {transaction.id} • {transaction.customer}
              </p>

              <p className="mt-0.5 truncate text-[6px] text-slate-400">
                {transaction.method}
              </p>

              <StatusBadge status={transaction.status} />
            </div>

            <div className="text-right">
              <p className="text-[7px] font-medium text-slate-700">
                {transaction.amount}
              </p>

              <p className="mt-1 whitespace-nowrap text-[6px] text-slate-400">
                {transaction.date}
              </p>
            </div>
          </div>
        ))}
      </div>

      <button className="m-2 flex w-[calc(100%-16px)] items-center justify-center rounded border border-slate-200 py-1.5 text-[7px] font-medium text-[#c58a2c]">
        View All Transactions
      </button>
    </Card>
  );
};

/* =========================================================
   PAYMENTS SUMMARY
========================================================= */

const PaymentsSummary = () => {
  const data = [
    {
      title: "Opening Balance",
      value: "₹1,25,000",
      color: "text-slate-800",
    },
    {
      title: "Payments Received",
      value: "₹24,85,600",
      color: "text-emerald-500",
    },
    {
      title: "Refunds Issued",
      value: "- ₹45,210",
      color: "text-red-500",
    },
    {
      title: "Fees & Charges",
      value: "- ₹15,880",
      color: "text-red-500",
    },
    {
      title: "Net Amount",
      value: "₹25,49,510",
      color: "text-emerald-500",
    },
  ];

  return (
    <Card className="overflow-hidden">
      <div className="px-3.5 pt-3">
        <h3 className="text-[10px] font-semibold text-slate-800">
          Payments Summary
        </h3>
      </div>

      <div className="grid grid-cols-2 divide-x divide-slate-200 py-5 md:grid-cols-5">
        {data.map((item) => (
          <div
            key={item.title}
            className="px-4 text-center first:border-l-0"
          >
            <p className="text-[7px] text-slate-500">
              {item.title}
            </p>

            <p
              className={`mt-2 text-[12px] font-bold ${item.color}`}
            >
              {item.value}
            </p>
          </div>
        ))}
      </div>
    </Card>
  );
};

/* =========================================================
   GET PAID FASTER
========================================================= */

const GetPaidFaster = () => {
  return (
    <div className="relative overflow-hidden rounded-lg bg-[#f8f1e6] px-3.5 py-3">

      <div className="relative z-10 max-w-[180px]">
        <h3 className="text-[10px] font-bold text-slate-800">
          Get Paid Faster!
        </h3>

        <p className="mt-1 text-[7px] leading-3.5 text-slate-500">
          Share payment links with your customers
          and get paid instantly.
        </p>

        <button className="mt-2 rounded bg-[#c38a30] px-3 py-1.5 text-[7px] font-medium text-white shadow-sm">
          Create Payment Link
        </button>
      </div>

      {/* Decorative payment illustration */}
      <div className="absolute right-2 top-1/2 -translate-y-1/2">

        <div className="relative h-[75px] w-[80px]">

          <div className="absolute right-1 top-2 h-[55px] w-[37px] rounded-[7px] border-2 border-[#dda445] bg-white/70">
            <div className="mx-auto mt-2 h-2 w-4 rounded bg-[#dda445]" />

            <div className="mx-auto mt-2 flex h-6 w-6 items-center justify-center rounded bg-[#dda445]/20 text-[#c38a30]">
              <HiOutlineCurrencyRupee />
            </div>
          </div>

          <div className="absolute bottom-1 left-2 flex h-6 w-6 items-center justify-center rounded-full bg-[#d89c38] text-white shadow">
            <HiOutlineCurrencyRupee />
          </div>

          <div className="absolute left-7 top-3 flex h-5 w-5 items-center justify-center rounded-full bg-[#d89c38] text-white shadow">
            <HiOutlineCurrencyRupee />
          </div>

          <div className="absolute bottom-0 right-10 h-3 w-3 rounded-full border-2 border-[#d89c38]" />

        </div>
      </div>

    </div>
  );
};

/* =========================================================
   MAIN PAGE
========================================================= */

const PaymentsOverview = () => {
  return (
    <div className="min-h-screen bg-[#fafafa] p-2.5 text-slate-800">

      <div className="mx-auto max-w-[1500px]">

        {/* =====================================================
            HEADER
        ====================================================== */}

        <header className="mb-3 flex flex-col justify-between gap-3 lg:flex-row lg:items-center">

          <div>
            <h1 className="text-[18px] font-bold tracking-tight text-slate-900">
              Payments Overview
            </h1>

            <p className="mt-0.5 text-[9px] text-slate-500">
              Track and manage all payment activities in one place.
            </p>
          </div>

          <div className="flex items-center gap-2">

            <button className="flex h-8 items-center gap-2 rounded-md border border-slate-200 bg-white px-3 text-[8px] text-slate-700 shadow-sm">
              <FiCalendar className="text-[11px]" />
              12 May 2025 - 18 May 2025
              <FiChevronDown className="text-[9px]" />
            </button>

            <button className="flex h-8 items-center gap-2 rounded-md border border-slate-200 bg-white px-3 text-[8px] text-slate-700 shadow-sm">
              <FiFilter />
              Filters
            </button>

          </div>

        </header>

        {/* =====================================================
            KPI
        ====================================================== */}

        <PaymentStats />

        {/* =====================================================
            MAIN CONTENT
        ====================================================== */}

        <div className="mt-2.5 grid grid-cols-1 gap-2.5 xl:grid-cols-[minmax(0,1fr)_325px]">

          {/* ===================================================
              LEFT
          ==================================================== */}

          <main className="min-w-0">

            {/* TOP CHARTS */}

            <div className="grid grid-cols-1 gap-2.5 lg:grid-cols-[1.25fr_1fr]">

              <Card className="min-h-[235px]">
                <CardHeader title="Payment Trends" />
                <PaymentTrendChart />
              </Card>

              <PaymentsByMethod />

            </div>

            {/* SECOND ROW */}

            <div className="mt-2.5 grid grid-cols-1 gap-2.5 lg:grid-cols-[1.3fr_0.7fr]">

              <RecentPayments />

              <TopCustomers />

            </div>

            {/* SUMMARY */}

            <div className="mt-2.5">
              <PaymentsSummary />
            </div>

          </main>

          {/* ===================================================
              RIGHT SIDEBAR
          ==================================================== */}

          <aside className="space-y-2.5">

            <PaymentMethods />

            <UpcomingSettlements />

            <RecentTransactions />

            <GetPaidFaster />

          </aside>

        </div>

      </div>

    </div>
  );
};

export default PaymentsOverview;