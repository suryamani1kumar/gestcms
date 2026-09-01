"use client";

import React from "react";
import {
  MdCalendarToday,
  MdKeyboardArrowDown,
  MdFilterList,
  MdTrendingUp,
  MdShoppingBag,
  MdDescription,
  MdCurrencyRupee,
  MdReplay,
  MdCheckCircle,
  MdAccessTime,
  MdReceiptLong,
  MdCancel,
  MdReplayCircleFilled,
  MdVisibility,
  MdArrowForward,
  MdPeople,
  MdInventory2,
  MdMoreHoriz,
} from "react-icons/md";

/* ============================================================
   TYPES
============================================================ */

type TrendDirection = "up" | "down";

interface StatCard {
  title: string;
  value: string;
  percentage: string;
  comparison: string;
  direction: TrendDirection;
  icon: React.ElementType;
  iconBg: string;
  iconColor: string;
}

interface RecentSale {
  invoice: string;
  customer: string;
  orderId: string;
  amount: string;
  payment: "Paid" | "COD";
  status: "Paid" | "Pending" | "Delivered" | "Confirmed" | "Shipped";
  date: string;
}

interface Representative {
  name: string;
  sales: string;
  orders: number;
  target: string;
  achievement: string;
}

/* ============================================================
   DATA
============================================================ */

const statCards: StatCard[] = [
  {
    title: "Total Sales",
    value: "₹24,85,600",
    percentage: "18.6%",
    comparison: "vs previous 7 days",
    direction: "up",
    icon: MdCurrencyRupee,
    iconBg: "bg-[#fff3dd]",
    iconColor: "text-[#d39734]",
  },
  {
    title: "Total Orders",
    value: "1,284",
    percentage: "12.4%",
    comparison: "vs previous 7 days",
    direction: "up",
    icon: MdShoppingBag,
    iconBg: "bg-[#f0ecff]",
    iconColor: "text-[#8369d5]",
  },
  {
    title: "Total Invoices",
    value: "1,192",
    percentage: "10.7%",
    comparison: "vs previous 7 days",
    direction: "up",
    icon: MdDescription,
    iconBg: "bg-[#eaf8ee]",
    iconColor: "text-[#45a967]",
  },
  {
    title: "Average Order Value",
    value: "₹19,352",
    percentage: "14.2%",
    comparison: "vs previous 7 days",
    direction: "up",
    icon: MdCurrencyRupee,
    iconBg: "bg-[#fff2dc]",
    iconColor: "text-[#d19739]",
  },
  {
    title: "Total Refunds",
    value: "₹45,210",
    percentage: "3.2%",
    comparison: "vs previous 7 days",
    direction: "down",
    icon: MdReplay,
    iconBg: "bg-[#ffe9ed]",
    iconColor: "text-[#dc6679]",
  },
];

const recentSales: RecentSale[] = [
  {
    invoice: "INV-2025-1189",
    customer: "Rahul Verma",
    orderId: "ORD12584",
    amount: "₹52,600",
    payment: "Paid",
    status: "Paid",
    date: "18 May 2025",
  },
  {
    invoice: "INV-2025-1188",
    customer: "Priya Sharma",
    orderId: "ORD12583",
    amount: "₹38,900",
    payment: "Paid",
    status: "Paid",
    date: "18 May 2025",
  },
  {
    invoice: "INV-2025-1187",
    customer: "Amit Singh",
    orderId: "ORD12582",
    amount: "₹26,500",
    payment: "COD",
    status: "Pending",
    date: "18 May 2025",
  },
  {
    invoice: "INV-2025-1186",
    customer: "Neha Kapoor",
    orderId: "ORD12581",
    amount: "₹18,750",
    payment: "Paid",
    status: "Delivered",
    date: "17 May 2025",
  },
  {
    invoice: "INV-2025-1185",
    customer: "Vikram Joshi",
    orderId: "ORD12580",
    amount: "₹22,400",
    payment: "Paid",
    status: "Confirmed",
    date: "17 May 2025",
  },
  {
    invoice: "INV-2025-1184",
    customer: "Sneha Iyer",
    orderId: "ORD12579",
    amount: "₹78,600",
    payment: "Paid",
    status: "Shipped",
    date: "17 May 2025",
  },
  {
    invoice: "INV-2025-1183",
    customer: "Karan Mehta",
    orderId: "ORD12578",
    amount: "₹31,200",
    payment: "Paid",
    status: "Delivered",
    date: "17 May 2025",
  },
];

const representatives: Representative[] = [
  {
    name: "Rahul Mehta",
    sales: "₹6,52,300",
    orders: 342,
    target: "₹8,00,000",
    achievement: "81.5%",
  },
  {
    name: "Anjali Sharma",
    sales: "₹4,85,600",
    orders: 256,
    target: "₹6,00,000",
    achievement: "80.9%",
  },
  {
    name: "Vikram Singh",
    sales: "₹3,45,800",
    orders: 198,
    target: "₹5,00,000",
    achievement: "69.2%",
  },
  {
    name: "Neha Joshi",
    sales: "₹2,85,400",
    orders: 156,
    target: "₹4,00,000",
    achievement: "71.3%",
  },
  {
    name: "Arjun Patel",
    sales: "₹2,16,500",
    orders: 108,
    target: "₹3,00,000",
    achievement: "72.2%",
  },
];

const categories = [
  {
    name: "Rings",
    amount: "₹6,25,400",
    percentage: "25.2%",
    width: "100%",
    icon: "💍",
  },
  {
    name: "Necklaces",
    amount: "₹5,85,600",
    percentage: "23.6%",
    width: "94%",
    icon: "📿",
  },
  {
    name: "Earrings",
    amount: "₹4,25,300",
    percentage: "17.1%",
    width: "68%",
    icon: "💎",
  },
  {
    name: "Pendants",
    amount: "₹3,45,200",
    percentage: "13.9%",
    width: "55%",
    icon: "♦",
  },
  {
    name: "Bracelets",
    amount: "₹2,10,500",
    percentage: "8.5%",
    width: "34%",
    icon: "⭕",
  },
  {
    name: "Others",
    amount: "₹93,600",
    percentage: "3.7%",
    width: "15%",
    icon: "◯",
  },
];

/* ============================================================
   MAIN PAGE
============================================================ */

export default function SalesPage() {
  return (
    <div className="min-h-screen bg-[#fafafa] p-2 font-sans text-[#292d32]">
      <div className="mx-auto w-full space-y-3">
        {/* =====================================================
            PAGE HEADER
        ====================================================== */}

        <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-[16px] font-semibold leading-5 text-[#25292e]">
              Sales Overview
            </h1>

            <p className="mt-0.5 text-[8px] text-[#85898d]">
              Track your sales performance and growth.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              className="
                flex
                h-[30px]
                items-center
                gap-2
                rounded-[5px]
                border
                border-[#e4e0da]
                bg-white
                px-3
                text-[8px]
                text-[#555a5e]
              "
            >
              <MdCalendarToday className="text-[12px]" />

              <span>12 May 2025 - 18 May 2025</span>

              <MdKeyboardArrowDown className="text-[13px]" />
            </button>

            <button
              type="button"
              className="
                flex
                h-[30px]
                items-center
                gap-1.5
                rounded-[5px]
                border
                border-[#e4e0da]
                bg-white
                px-3
                text-[8px]
                font-medium
                text-[#555a5e]
              "
            >
              <MdFilterList className="text-[13px]" />
              Filters
            </button>
          </div>
        </div>

        {/* =====================================================
            STAT CARDS
        ====================================================== */}

        <div className="grid grid-cols-2 gap-2 md:grid-cols-3 xl:grid-cols-5">
          {statCards.map((card) => (
            <SalesStatCard
              key={card.title}
              card={card}
            />
          ))}
        </div>

        {/* =====================================================
            MAIN CHARTS
        ====================================================== */}

        <div className="grid grid-cols-1 gap-2 xl:grid-cols-[1.15fr_1fr_1fr]">
          {/* SALES TREND */}
          <SalesTrend />

          {/* SALES BY CHANNEL */}
          <SalesByChannel />

          {/* SALES BY CATEGORY */}
          <SalesByCategory />
        </div>

        {/* =====================================================
            SECONDARY KPI STRIP
        ====================================================== */}

        <SecondaryStats />

        {/* =====================================================
            BOTTOM SECTION
        ====================================================== */}

        <div className="grid grid-cols-1 gap-2 xl:grid-cols-[1.2fr_1fr_0.85fr]">
          {/* RECENT SALES */}
          <RecentSales />

          {/* REPRESENTATIVES */}
          <TopRepresentatives />

          {/* SALES TARGET */}
          <SalesTargets />
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   STAT CARD
============================================================ */

function SalesStatCard({
  card,
}: {
  card: StatCard;
}) {
  const Icon = card.icon;

  return (
    <div
      className="
        rounded-[7px]
        border
        border-[#ebe7e1]
        bg-white
        px-3
        py-3
      "
    >
      <div className="flex items-center gap-3">
        <div
          className={`
            flex
            h-[42px]
            w-[42px]
            shrink-0
            items-center
            justify-center
            rounded-full
            ${card.iconBg}
            ${card.iconColor}
          `}
        >
          <Icon className="text-[21px]" />
        </div>

        <div className="min-w-0">
          <p className="text-[8px] font-medium text-[#686c71]">
            {card.title}
          </p>

          <p className="mt-1 text-[16px] font-semibold leading-4 text-[#282c31]">
            {card.value}
          </p>

          <div className="mt-1.5 flex items-center gap-1 text-[7px]">
            <span
              className={
                card.direction === "up"
                  ? "font-medium text-[#40a35f]"
                  : "font-medium text-[#e05d68]"
              }
            >
              {card.direction === "up" ? "↑" : "↓"}{" "}
              {card.percentage}
            </span>

            <span className="text-[#8c9094]">
              {card.comparison}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   CARD WRAPPER
============================================================ */

function ChartCard({
  title,
  children,
  action,
}: {
  title: string;
  children: React.ReactNode;
  action?: React.ReactNode;
}) {
  return (
    <div
      className="
        overflow-hidden
        rounded-[7px]
        border
        border-[#e9e5df]
        bg-white
      "
    >
      <div className="flex items-center justify-between px-3 py-2.5">
        <h2 className="text-[10px] font-semibold text-[#35393e]">
          {title}
        </h2>

        {action}
      </div>

      {children}
    </div>
  );
}

/* ============================================================
   SALES TREND
============================================================ */

function SalesTrend() {
  return (
    <ChartCard
      title="Sales Trend"
      action={<SmallSelect text="Daily" />}
    >
      <div className="px-3 pb-3">
        {/* Legend */}
        <div className="mb-2 flex items-center gap-4 text-[7px]">
          <span className="flex items-center gap-1">
            <span className="h-[3px] w-[9px] rounded-full bg-[#d09a42]" />
            <span className="text-[#777]">This Week</span>
          </span>

          <span className="flex items-center gap-1">
            <span className="h-[3px] w-[9px] border-t border-dashed border-[#c9c9c9]" />
            <span className="text-[#888]">Last Week</span>
          </span>
        </div>

        <div className="relative h-[190px] w-full">
          {/* Grid */}
          <div className="absolute inset-0 flex flex-col justify-between pb-7 pl-7">
            {[50, 40, 30, 20, 10, 0].map((value) => (
              <div
                key={value}
                className="flex items-center"
              >
                <span className="absolute -left-7 w-5 text-right text-[6px] text-[#8c9094]">
                  {value}K
                </span>

                <div className="h-px w-full bg-[#f1eee9]" />
              </div>
            ))}
          </div>

          {/* SVG Chart */}
          <svg
            viewBox="0 0 520 190"
            className="absolute inset-0 h-full w-full overflow-visible"
            preserveAspectRatio="none"
          >
            {/* Area */}
            <path
              d="
                M 30 137
                L 92 137
                L 154 103
                L 216 120
                L 278 111
                L 340 126
                L 402 111
                L 464 82
                L 505 105
                L 505 165
                L 30 165
                Z
              "
              fill="url(#salesGradient)"
            />

            {/* Last week */}
            <path
              d="
                M 30 151
                L 92 133
                L 154 119
                L 216 131
                L 278 134
                L 340 144
                L 402 120
                L 464 148
                L 505 126
              "
              fill="none"
              stroke="#d2d2d2"
              strokeWidth="2"
              strokeDasharray="5 5"
            />

            {/* This week */}
            <path
              d="
                M 30 137
                L 92 137
                L 154 103
                L 216 120
                L 278 111
                L 340 126
                L 402 111
                L 464 82
                L 505 105
              "
              fill="none"
              stroke="#d09a42"
              strokeWidth="2.5"
            />

            {/* Points */}
            {[
              [30, 137],
              [92, 137],
              [154, 103],
              [216, 120],
              [278, 111],
              [340, 126],
              [402, 111],
              [464, 82],
              [505, 105],
            ].map(([x, y], index) => (
              <circle
                key={index}
                cx={x}
                cy={y}
                r="3"
                fill="white"
                stroke="#d09a42"
                strokeWidth="2"
              />
            ))}

            <defs>
              <linearGradient
                id="salesGradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="0%"
                  stopColor="#d09a42"
                  stopOpacity="0.16"
                />

                <stop
                  offset="100%"
                  stopColor="#d09a42"
                  stopOpacity="0"
                />
              </linearGradient>
            </defs>
          </svg>

          {/* Tooltip */}
          <div
            className="
              absolute
              right-[5%]
              top-[17%]
              rounded-[5px]
              border
              border-[#e7e2db]
              bg-white
              px-2
              py-2
              shadow-sm
            "
          >
            <p className="text-[7px] font-semibold text-[#42464b]">
              16 May 2025
            </p>

            <p className="mt-1 text-[7px] text-[#777]">
              <span className="mr-1 inline-block h-[5px] w-[5px] rounded-full bg-[#d09a42]" />
              This Week&nbsp;&nbsp;
              <b className="text-[#444]">₹32,540</b>
            </p>

            <p className="mt-1 text-[7px] text-[#777]">
              <span className="mr-1 inline-block h-[5px] w-[5px] rounded-full bg-[#cfcfcf]" />
              Last Week&nbsp;&nbsp;
              <b className="text-[#444]">₹24,120</b>
            </p>
          </div>

          {/* X labels */}
          <div className="absolute bottom-0 left-7 right-0 flex justify-between">
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
                className="text-[6px] text-[#81858a]"
              >
                {day}
              </span>
            ))}
          </div>
        </div>
      </div>
    </ChartCard>
  );
}

/* ============================================================
   SALES BY CHANNEL
============================================================ */

function SalesByChannel() {
  const channels = [
    {
      name: "Website",
      value: "₹12,45,300",
      percent: "50.1%",
      color: "#6ba2d7",
    },
    {
      name: "Store",
      value: "₹7,85,600",
      percent: "31.6%",
      color: "#e45f69",
    },
    {
      name: "Mobile App",
      value: "₹2,45,200",
      percent: "9.9%",
      color: "#72a345",
    },
    {
      name: "Marketplace",
      value: "₹1,28,500",
      percent: "5.2%",
      color: "#52a27b",
    },
    {
      name: "Other",
      value: "₹81,000",
      percent: "3.2%",
      color: "#56697d",
    },
  ];

  return (
    <ChartCard
      title="Sales by Channel"
      action={<SmallSelect text="This Week" />}
    >
      <div className="flex min-h-[235px] items-center justify-center gap-5 px-3 pb-3">
        {/* Donut */}
        <div className="relative h-[145px] w-[145px] shrink-0">
          <div
            className="
              absolute
              inset-0
              rounded-full
            "
            style={{
              background:
                "conic-gradient(#6ba2d7 0deg 180deg, #e45f69 180deg 294deg, #72a345 294deg 330deg, #52a27b 330deg 348deg, #e3a044 348deg 360deg)",
            }}
          />

          <div
            className="
              absolute
              left-1/2
              top-1/2
              flex
              h-[82px]
              w-[82px]
              -translate-x-1/2
              -translate-y-1/2
              flex-col
              items-center
              justify-center
              rounded-full
              bg-white
            "
          >
            <span className="text-[7px] text-[#777]">
              Total
            </span>

            <span className="mt-1 text-[13px] font-semibold text-[#35393d]">
              ₹24,85,600
            </span>
          </div>
        </div>

        {/* Legend */}
        <div className="space-y-3">
          {channels.map((channel) => (
            <div
              key={channel.name}
              className="flex min-w-[145px] items-center gap-2"
            >
              <span
                className="h-[7px] w-[7px] rounded-[2px]"
                style={{
                  backgroundColor: channel.color,
                }}
              />

              <span className="flex-1 text-[7px] text-[#5f6367]">
                {channel.name}
              </span>

              <span className="text-[7px] font-medium text-[#444]">
                {channel.value}
              </span>

              <span className="w-[28px] text-right text-[6px] text-[#888]">
                ({channel.percent})
              </span>
            </div>
          ))}
        </div>
      </div>
    </ChartCard>
  );
}

/* ============================================================
   SALES BY CATEGORY
============================================================ */

function SalesByCategory() {
  return (
    <ChartCard
      title="Sales by Category"
      action={<SmallSelect text="This Week" />}
    >
      <div className="space-y-3 px-3 pb-3 pt-2">
        {categories.map((category, index) => (
          <div
            key={category.name}
            className="flex items-center gap-2"
          >
            <div
              className="
                flex
                h-[26px]
                w-[27px]
                shrink-0
                items-center
                justify-center
                rounded-[5px]
                bg-[#f5f3ef]
                text-[14px]
              "
            >
              {category.icon}
            </div>

            <span className="w-[55px] text-[7px] text-[#555]">
              {category.name}
            </span>

            <div className="flex-1">
              <div className="h-[4px] rounded-full bg-[#f1eee9]">
                <div
                  className={`h-full rounded-full ${
                    index === 0
                      ? "bg-[#df9c37]"
                      : index === 1
                        ? "bg-[#8c68cf]"
                        : index === 2
                          ? "bg-[#7aa63d]"
                          : index === 3
                            ? "bg-[#dd6673]"
                            : index === 4
                              ? "bg-[#6ba4d4]"
                              : "bg-[#9da6b3]"
                  }`}
                  style={{
                    width: category.width,
                  }}
                />
              </div>
            </div>

            <span className="w-[62px] text-right text-[7px] font-medium text-[#4c5054]">
              {category.amount}
            </span>

            <span className="w-[29px] text-right text-[6px] text-[#888]">
              ({category.percentage})
            </span>
          </div>
        ))}
      </div>
    </ChartCard>
  );
}

/* ============================================================
   SECONDARY STATS
============================================================ */

function SecondaryStats() {
  const stats = [
    {
      title: "Paid Orders",
      value: "892",
      percentage: "69.5%",
      direction: "up",
      icon: MdCheckCircle,
      bg: "bg-[#e8f7ea]",
      color: "text-[#4aa861]",
    },
    {
      title: "Pending Orders",
      value: "46",
      percentage: "3.6%",
      direction: "up",
      icon: MdInventory2,
      bg: "bg-[#fff2dd]",
      color: "text-[#d3973d]",
    },
    {
      title: "Overdue Invoices",
      value: "18",
      percentage: "1.4%",
      direction: "down",
      icon: MdReceiptLong,
      bg: "bg-[#ffe9ed]",
      color: "text-[#db6375]",
    },
    {
      title: "Cancelled Orders",
      value: "68",
      percentage: "5.3%",
      direction: "up",
      icon: MdCancel,
      bg: "bg-[#e9f2ff]",
      color: "text-[#5d87d2]",
    },
    {
      title: "Returned Orders",
      value: "32",
      percentage: "2.5%",
      direction: "up",
      icon: MdReplayCircleFilled,
      bg: "bg-[#f0ebff]",
      color: "text-[#8568d1]",
    },
  ];

  return (
    <div
      className="
        grid
        grid-cols-2
        overflow-hidden
        rounded-[7px]
        border
        border-[#e9e5df]
        bg-white
        sm:grid-cols-3
        lg:grid-cols-5
      "
    >
      {stats.map((stat, index) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.title}
            className={`
              flex
              items-center
              gap-2.5
              px-3
              py-2.5
              ${
                index !== stats.length - 1
                  ? "border-r border-[#eeeae4]"
                  : ""
              }
            `}
          >
            <div
              className={`
                flex
                h-[34px]
                w-[34px]
                shrink-0
                items-center
                justify-center
                rounded-full
                ${stat.bg}
                ${stat.color}
              `}
            >
              <Icon className="text-[17px]" />
            </div>

            <div>
              <p className="text-[7px] text-[#707479]">
                {stat.title}
              </p>

              <div className="mt-1 flex items-center gap-1.5">
                <span className="text-[12px] font-semibold text-[#363a3e]">
                  {stat.value}
                </span>

                <span
                  className={`text-[6px] ${
                    stat.direction === "down"
                      ? "text-[#db6671]"
                      : "text-[#45a360]"
                  }`}
                >
                  {stat.direction === "down"
                    ? "↓"
                    : "↑"}{" "}
                  {stat.percentage}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ============================================================
   RECENT SALES
============================================================ */

function RecentSales() {
  return (
    <TableCard
      title="Recent Sales"
      footer="View All Invoices"
    >
      <div className="overflow-x-auto">
        <table className="w-full min-w-[600px]">
          <thead>
            <tr className="border-b border-[#eeeae4]">
              {[
                "Invoice ID",
                "Customer",
                "Order ID",
                "Amount",
                "Payment",
                "Status",
                "Date",
                "",
              ].map((head) => (
                <th
                  key={head}
                  className="px-2 py-2 text-left text-[6.5px] font-medium text-[#666b70]"
                >
                  {head}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {recentSales.map((sale) => (
              <tr
                key={sale.invoice}
                className="border-b border-[#f1eee9] last:border-0"
              >
                <td className="px-2 py-1.5 text-[6.5px] text-[#555]">
                  {sale.invoice}
                </td>

                <td className="px-2 py-1.5 text-[7px] font-medium text-[#41454a]">
                  {sale.customer}
                </td>

                <td className="px-2 py-1.5 text-[6.5px] text-[#777]">
                  {sale.orderId}
                </td>

                <td className="px-2 py-1.5 text-[7px] font-medium text-[#444]">
                  {sale.amount}
                </td>

                <td className="px-2 py-1.5">
                  <PaymentBadge payment={sale.payment} />
                </td>

                <td className="px-2 py-1.5">
                  <SalesStatus status={sale.status} />
                </td>

                <td className="whitespace-nowrap px-2 py-1.5 text-[6.5px] text-[#777]">
                  {sale.date}
                </td>

                <td className="px-2 py-1.5 text-right">
                  <MdVisibility className="text-[11px] text-[#888]" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </TableCard>
  );
}

/* ============================================================
   TOP REPRESENTATIVES
============================================================ */

function TopRepresentatives() {
  return (
    <TableCard
      title="Top Sales Representatives"
      action={<SmallSelect text="This Week" />}
      footer="View All Representatives"
    >
      <div className="overflow-x-auto">
        <table className="w-full min-w-[460px]">
          <thead>
            <tr className="border-b border-[#eeeae4]">
              <th className="px-2 py-2 text-left text-[6.5px] font-medium text-[#666b70]">
                Representative
              </th>

              <th className="px-2 py-2 text-left text-[6.5px] font-medium text-[#666b70]">
                Sales
              </th>

              <th className="px-2 py-2 text-left text-[6.5px] font-medium text-[#666b70]">
                Orders
              </th>

              <th className="px-2 py-2 text-left text-[6.5px] font-medium text-[#666b70]">
                Target
              </th>

              <th className="px-2 py-2 text-left text-[6.5px] font-medium text-[#666b70]">
                Achievement
              </th>
            </tr>
          </thead>

          <tbody>
            {representatives.map((rep) => (
              <tr
                key={rep.name}
                className="border-b border-[#f1eee9] last:border-0"
              >
                <td className="px-2 py-2">
                  <div className="flex items-center gap-2">
                    <div
                      className="
                        flex
                        h-[23px]
                        w-[23px]
                        items-center
                        justify-center
                        rounded-full
                        bg-gradient-to-br
                        from-[#c8bba5]
                        to-[#6f6659]
                        text-[6px]
                        font-semibold
                        text-white
                      "
                    >
                      {rep.name
                        .split(" ")
                        .map((x) => x[0])
                        .join("")}
                    </div>

                    <span className="text-[7px] font-medium text-[#444]">
                      {rep.name}
                    </span>
                  </div>
                </td>

                <td className="px-2 py-2 text-[6.5px] text-[#555]">
                  {rep.sales}
                </td>

                <td className="px-2 py-2 text-[6.5px] text-[#555]">
                  {rep.orders}
                </td>

                <td className="px-2 py-2 text-[6.5px] text-[#555]">
                  {rep.target}
                </td>

                <td className="px-2 py-2">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[6.5px] text-[#555]">
                      {rep.achievement}
                    </span>

                    <div className="h-[3px] w-[50px] rounded-full bg-[#eee]">
                      <div
                        className="h-full rounded-full bg-[#43a364]"
                        style={{
                          width: rep.achievement,
                        }}
                      />
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </TableCard>
  );
}

/* ============================================================
   SALES TARGETS
============================================================ */

function SalesTargets() {
  return (
    <ChartCard
      title="Sales Targets"
      action={<SmallSelect text="This Month" />}
    >
      <div className="px-3 pb-3">
        <div className="flex items-center gap-4">
          {/* Progress Circle */}
          <div className="relative h-[82px] w-[82px] shrink-0">
            <div
              className="
                absolute
                inset-0
                rounded-full
              "
              style={{
                background:
                  "conic-gradient(#c7923f 0deg 274deg, #eeeae4 274deg 360deg)",
              }}
            />

            <div
              className="
                absolute
                inset-[6px]
                flex
                flex-col
                items-center
                justify-center
                rounded-full
                bg-white
              "
            >
              <span className="text-[15px] font-semibold text-[#3c4044]">
                76%
              </span>

              <span className="text-[6px] text-[#888]">
                Overall
              </span>

              <span className="text-[6px] text-[#888]">
                Achievement
              </span>
            </div>
          </div>

          {/* Target values */}
          <div className="flex-1 space-y-3">
            <div>
              <p className="text-[6.5px] text-[#85898d]">
                Target
              </p>

              <p className="mt-1 text-[10px] font-semibold text-[#3c4044]">
                ₹50,00,000
              </p>
            </div>

            <div>
              <p className="text-[6.5px] text-[#85898d]">
                Achieved
              </p>

              <p className="mt-1 text-[10px] font-semibold text-[#3c4044]">
                ₹38,12,450
              </p>
            </div>
          </div>
        </div>

        <div className="mt-3 flex items-center justify-between border-t border-[#eeeae4] pt-2">
          <div>
            <p className="text-[6.5px] text-[#888]">
              Remaining
            </p>

            <p className="mt-1 text-[9px] font-semibold text-[#444]">
              ₹11,87,550
            </p>
          </div>

          <button
            type="button"
            className="
              rounded-[4px]
              bg-[#c59340]
              px-3
              py-1.5
              text-[7px]
              font-medium
              text-white
            "
          >
            View Targets
          </button>
        </div>

        {/* Channel target */}
        <div className="mt-3 border-t border-[#eeeae4] pt-2.5">
          <h3 className="text-[8px] font-semibold text-[#444]">
            Target by Channel
          </h3>

          <div className="mt-3 space-y-3">
            <TargetBar
              name="Website"
              value="₹20,00,000 / ₹28,00,000"
              percentage="71%"
              width="71%"
            />

            <TargetBar
              name="Store"
              value="₹12,50,000 / ₹15,00,000"
              percentage="83%"
              width="83%"
            />

            <TargetBar
              name="Mobile App"
              value="₹4,25,000 / ₹5,50,000"
              percentage="77%"
              width="77%"
            />

            <TargetBar
              name="Marketplace"
              value="₹1,12,450 / ₹1,50,000"
              percentage="75%"
              width="75%"
            />
          </div>
        </div>
      </div>
    </ChartCard>
  );
}

/* ============================================================
   TARGET BAR
============================================================ */

function TargetBar({
  name,
  value,
  percentage,
  width,
}: {
  name: string;
  value: string;
  percentage: string;
  width: string;
}) {
  return (
    <div>
      <div className="mb-1 flex items-center justify-between">
        <span className="text-[6.5px] text-[#555]">
          {name}
        </span>

        <div className="flex gap-2">
          <span className="text-[6px] text-[#777]">
            {value}
          </span>

          <span className="w-[20px] text-right text-[6px] text-[#666]">
            {percentage}
          </span>
        </div>
      </div>

      <div className="h-[3px] rounded-full bg-[#eeeae5]">
        <div
          className="h-full rounded-full bg-[#c99542]"
          style={{ width }}
        />
      </div>
    </div>
  );
}

/* ============================================================
   TABLE CARD
============================================================ */

function TableCard({
  title,
  children,
  footer,
  action,
}: {
  title: string;
  children: React.ReactNode;
  footer?: string;
  action?: React.ReactNode;
}) {
  return (
    <div
      className="
        overflow-hidden
        rounded-[7px]
        border
        border-[#e9e5df]
        bg-white
      "
    >
      <div className="flex items-center justify-between px-3 py-2.5">
        <h2 className="text-[10px] font-semibold text-[#35393e]">
          {title}
        </h2>

        {action}
      </div>

      {children}

      {footer && (
        <div className="border-t border-[#eeeae4] px-3 py-2 text-center">
          <button
            type="button"
            className="
              inline-flex
              items-center
              gap-1
              text-[7px]
              font-medium
              text-[#c18f38]
            "
          >
            {footer}
            <MdArrowForward className="text-[10px]" />
          </button>
        </div>
      )}
    </div>
  );
}

/* ============================================================
   SMALL SELECT
============================================================ */

function SmallSelect({
  text,
}: {
  text: string;
}) {
  return (
    <button
      type="button"
      className="
        flex
        h-[24px]
        items-center
        gap-1
        rounded-[4px]
        border
        border-[#e8e4de]
        bg-white
        px-2
        text-[7px]
        text-[#666b70]
      "
    >
      {text}
      <MdKeyboardArrowDown className="text-[11px]" />
    </button>
  );
}

/* ============================================================
   PAYMENT BADGE
============================================================ */

function PaymentBadge({
  payment,
}: {
  payment: "Paid" | "COD";
}) {
  return (
    <span
      className={`
        inline-flex
        rounded-[3px]
        px-1.5
        py-0.5
        text-[6.5px]
        font-medium
        ${
          payment === "Paid"
            ? "bg-[#e6f7e9] text-[#46a360]"
            : "bg-[#fff1d8] text-[#d2932d]"
        }
      `}
    >
      {payment}
    </span>
  );
}

/* ============================================================
   SALES STATUS
============================================================ */

function SalesStatus({
  status,
}: {
  status: RecentSale["status"];
}) {
  const styles: Record<RecentSale["status"], string> = {
    Paid: "bg-[#e5f6e7] text-[#43a15c]",
    Pending: "bg-[#fff0d7] text-[#d09129]",
    Delivered: "bg-[#e5f7e9] text-[#43a35e]",
    Confirmed: "bg-[#e6f5f8] text-[#348c9b]",
    Shipped: "bg-[#e8f2ff] text-[#4388c0]",
  };

  return (
    <span
      className={`
        inline-flex
        rounded-[3px]
        px-1.5
        py-0.5
        text-[6.5px]
        font-medium
        ${styles[status]}
      `}
    >
      {status}
    </span>
  );
}