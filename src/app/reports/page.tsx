"use client";

import React from "react";
import {
  FiCalendar,
  FiChevronDown,
  FiChevronRight,
  FiDownload,
  FiFilter,
  FiArrowUp,
  FiArrowRight,
  FiTrendingUp,
  FiDollarSign,
  FiShoppingBag,
  FiUsers,
  FiPackage,
  FiBarChart2,
  FiPieChart,
  FiActivity,
  FiBox,
  FiCreditCard,
  FiStar,
  FiShield,
  FiRefreshCw,
} from "react-icons/fi";

import {
  HiOutlineCube,
  HiOutlineDocumentReport,
  HiOutlineUserGroup,
  HiOutlineChartBar,
  HiOutlineCurrencyRupee,
} from "react-icons/hi";

import {
  MdOutlineDiamond,
  MdOutlineInventory2,
  MdOutlinePointOfSale,
} from "react-icons/md";

/* =========================================================
   TYPES
========================================================= */

type StatCard = {
  title: string;
  value: string;
  change: string;
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
};

type Shortcut = {
  title: string;
  description: string;
  icon: React.ReactNode;
  bg: string;
  color: string;
};

/* =========================================================
   DATA
========================================================= */

const stats: StatCard[] = [
  {
    title: "Total Revenue",
    value: "₹24,85,600",
    change: "18.6%",
    icon: <HiOutlineCurrencyRupee />,
    iconBg: "bg-orange-50",
    iconColor: "text-orange-500",
  },
  {
    title: "Total Orders",
    value: "1,284",
    change: "12.4%",
    icon: <FiShoppingBag />,
    iconBg: "bg-violet-50",
    iconColor: "text-violet-500",
  },
  {
    title: "New Customers",
    value: "245",
    change: "15.8%",
    icon: <FiUsers />,
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-500",
  },
  {
    title: "Products Sold",
    value: "2,356",
    change: "10.3%",
    icon: <MdOutlineDiamond />,
    iconBg: "bg-orange-50",
    iconColor: "text-orange-500",
  },
  {
    title: "Avg. Order Value",
    value: "₹19,352",
    change: "14.2%",
    icon: <FiRefreshCw />,
    iconBg: "bg-red-50",
    iconColor: "text-red-400",
  },
  {
    title: "Net Profit",
    value: "₹6,45,230",
    change: "16.7%",
    icon: <HiOutlineDocumentReport />,
    iconBg: "bg-pink-50",
    iconColor: "text-pink-500",
  },
];

const shortcuts: Shortcut[] = [
  {
    title: "Sales Report",
    description: "Detailed sales analytics",
    icon: <FiBarChart2 />,
    bg: "bg-violet-50",
    color: "text-violet-500",
  },
  {
    title: "Product Report",
    description: "Product performance insights",
    icon: <HiOutlineCube />,
    bg: "bg-emerald-50",
    color: "text-emerald-500",
  },
  {
    title: "Customer Report",
    description: "Customer analytics & insights",
    icon: <HiOutlineUserGroup />,
    bg: "bg-pink-50",
    color: "text-pink-500",
  },
  {
    title: "Inventory Report",
    description: "Stock & inventory analytics",
    icon: <MdOutlineInventory2 />,
    bg: "bg-orange-50",
    color: "text-orange-500",
  },
  {
    title: "Gemstone Report",
    description: "Gemstone inventory & sales",
    icon: <MdOutlineDiamond />,
    bg: "bg-purple-50",
    color: "text-purple-500",
  },
  {
    title: "Financial Report",
    description: "Profit, loss & financial data",
    icon: <FiCreditCard />,
    bg: "bg-pink-50",
    color: "text-pink-500",
  },
];

const products = [
  {
    name: "Diamond Necklace",
    sold: 128,
    revenue: "₹12,45,600",
    icon: "💎",
  },
  {
    name: "Emerald Ring",
    sold: 98,
    revenue: "₹8,75,200",
    icon: "💍",
  },
  {
    name: "Diamond Earrings",
    sold: 86,
    revenue: "₹6,35,400",
    icon: "💎",
  },
  {
    name: "Ruby Pendant",
    sold: 65,
    revenue: "₹4,85,000",
    icon: "🔴",
  },
  {
    name: "Gold Bracelet",
    sold: 54,
    revenue: "₹3,45,600",
    icon: "⭕",
  },
];

/* =========================================================
   SMALL COMPONENTS
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

const CardHeader = ({
  title,
  right = true,
}: {
  title: string;
  right?: boolean;
}) => {
  return (
    <div className="flex items-center justify-between px-4 pt-3">
      <h3 className="text-[12px] font-semibold text-slate-800">{title}</h3>

      {right && (
        <button className="flex h-7 items-center gap-1 rounded-md border border-slate-200 px-2.5 text-[10px] text-slate-600">
          This Week
          <FiChevronDown className="text-[11px]" />
        </button>
      )}
    </div>
  );
};

/* =========================================================
   DONUT CHART
========================================================= */

const DonutChart = ({
  values,
  total,
}: {
  values: number[];
  total: string;
}) => {
  const colors = [
    "#4e87c7",
    "#e24b4b",
    "#42965f",
    "#f2a91b",
    "#c7cbd0",
  ];

  let current = 0;

  const segments = values.map((value, index) => {
    const start = current;
    current += value;

    return `${colors[index]} ${start}% ${current}%`;
  });

  return (
    <div
      className="relative h-[118px] w-[118px] shrink-0 rounded-full"
      style={{
        background: `conic-gradient(${segments.join(", ")})`,
      }}
    >
      <div className="absolute inset-[22px] flex flex-col items-center justify-center rounded-full bg-white">
        <span className="text-[14px] font-bold text-slate-800">
          {total}
        </span>
        <span className="text-[9px] text-slate-500">Total</span>
      </div>
    </div>
  );
};

/* =========================================================
   SPARKLINE
========================================================= */

const Sparkline = ({
  color = "#42a875",
  points = "0,23 8,18 16,22 24,13 32,17 40,11 48,16 56,9 64,14",
}: {
  color?: string;
  points?: string;
}) => {
  return (
    <svg
      viewBox="0 0 65 28"
      className="h-7 w-[65px]"
      preserveAspectRatio="none"
    >
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

/* =========================================================
   REVENUE CHART
========================================================= */

const RevenueChart = () => {
  const points = [
    [0, 80],
    [45, 81],
    [90, 58],
    [135, 70],
    [180, 69],
    [225, 78],
    [270, 64],
    [315, 47],
    [360, 21],
    [405, 51],
    [450, 67],
    [495, 55],
    [540, 56],
    [585, 75],
  ];

  const linePoints = points.map(([x, y]) => `${x},${y}`).join(" ");

  const areaPoints = `0,100 ${linePoints} 585,100`;

  return (
    <div className="relative mt-2 h-[150px] w-full">
      {/* Grid */}
      <div className="absolute inset-0 flex flex-col justify-between">
        {[50, 40, 30, 20, 10].map((item) => (
          <div
            key={item}
            className="flex items-center gap-2"
          >
            <span className="w-7 text-[8px] text-slate-400">
              {item}K
            </span>
            <div className="h-px flex-1 border-t border-dashed border-slate-100" />
          </div>
        ))}
      </div>

      <svg
        viewBox="0 0 585 100"
        preserveAspectRatio="none"
        className="absolute left-8 right-0 top-2 h-[115px] w-[calc(100%-32px)]"
      >
        <defs>
          <linearGradient
            id="revenueFill"
            x1="0"
            y1="0"
            x2="0"
            y2="1"
          >
            <stop
              offset="0%"
              stopColor="#e7a536"
              stopOpacity="0.25"
            />
            <stop
              offset="100%"
              stopColor="#e7a536"
              stopOpacity="0"
            />
          </linearGradient>
        </defs>

        <polygon
          points={areaPoints}
          fill="url(#revenueFill)"
        />

        <polyline
          points={linePoints}
          fill="none"
          stroke="#df9b2e"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {points.map(([x, y], index) => (
          <circle
            key={index}
            cx={x}
            cy={y}
            r="2"
            fill="#df9b2e"
          />
        ))}
      </svg>

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
            className="text-[8px] text-slate-400"
          >
            {day}
          </span>
        ))}
      </div>

      {/* Tooltip */}
      <div className="absolute right-1 top-2 rounded-lg border border-slate-100 bg-white px-3 py-2 shadow-sm">
        <p className="text-[8px] text-slate-500">
          16 May 2025
        </p>

        <div className="mt-1 flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-[#df9b2e]" />

          <span className="text-[9px] text-slate-600">
            Revenue
          </span>

          <strong className="text-[9px] text-slate-800">
            ₹32,540
          </strong>
        </div>
      </div>
    </div>
  );
};

/* =========================================================
   SALES PERFORMANCE
========================================================= */

const PerformanceRow = ({
  title,
  value,
  change,
  color,
  points,
}: {
  title: string;
  value: string;
  change: string;
  color: string;
  points?: string;
}) => {
  return (
    <div className="grid grid-cols-[1fr_70px_38px] items-center gap-2">
      <div>
        <p className="text-[9px] text-slate-500">{title}</p>
        <p className="mt-0.5 text-[11px] font-semibold text-slate-800">
          {value}
        </p>
      </div>

      <Sparkline
        color={color}
        points={
          points ||
          "0,20 8,12 16,16 24,9 32,17 40,10 48,14 56,8 64,12"
        }
      />

      <span className="text-right text-[9px] font-medium text-emerald-500">
        ↑ {change}
      </span>
    </div>
  );
};

/* =========================================================
   SHORTCUTS
========================================================= */

const ReportShortcuts = () => {
  return (
    <Card className="overflow-hidden">
      <div className="border-b border-slate-100 px-4 py-3">
        <h3 className="text-[13px] font-semibold text-slate-800">
          Report Shortcuts
        </h3>
      </div>

      <div>
        {shortcuts.map((item) => (
          <button
            key={item.title}
            className="flex w-full items-center gap-3 border-b border-slate-100 px-3 py-2.5 text-left last:border-b-0 hover:bg-slate-50"
          >
            <span
              className={`flex h-8 w-8 items-center justify-center rounded-lg ${item.bg} ${item.color} text-[16px]`}
            >
              {item.icon}
            </span>

            <span className="min-w-0 flex-1">
              <span className="block text-[10px] font-semibold text-slate-800">
                {item.title}
              </span>

              <span className="mt-0.5 block truncate text-[8px] text-slate-400">
                {item.description}
              </span>
            </span>

            <FiChevronRight className="text-[12px] text-slate-400" />
          </button>
        ))}
      </div>

      <button className="flex w-full items-center justify-center gap-2 py-3 text-[9px] font-medium text-[#c48a2d]">
        View All Reports
        <FiArrowRight />
      </button>
    </Card>
  );
};

/* =========================================================
   KEY INSIGHTS
========================================================= */

const KeyInsights = () => {
  return (
    <Card className="overflow-hidden">
      <div className="px-4 py-3">
        <h3 className="text-[13px] font-semibold text-slate-800">
          Key Insights
        </h3>
      </div>

      <div className="space-y-4 px-3 pb-4">

        <div className="flex gap-2">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-500">
            <FiArrowUp />
          </span>

          <div>
            <p className="text-[9px] font-semibold text-slate-800">
              Revenue is up by 18.6%
            </p>
            <p className="mt-1 text-[8px] leading-4 text-slate-400">
              Your revenue increased by ₹3,90,600
              compared to last week.
            </p>
          </div>
        </div>

        <div className="flex gap-2">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-violet-50 text-violet-500">
            <FiPieChart />
          </span>

          <div>
            <p className="text-[9px] font-semibold text-slate-800">
              Rings are top category
            </p>
            <p className="mt-1 text-[8px] leading-4 text-slate-400">
              Rings generated ₹6,25,400 in revenue
              (25.2% of total sales).
            </p>
          </div>
        </div>

        <div className="flex gap-2">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-orange-50 text-orange-500">
            <FiStar />
          </span>

          <div>
            <p className="text-[9px] font-semibold text-slate-800">
              New customers increased
            </p>
            <p className="mt-1 text-[8px] leading-4 text-slate-400">
              You gained 245 new customers, an
              increase of 15.8%.
            </p>
          </div>
        </div>

      </div>

      <button className="w-full border-t border-slate-100 py-3 text-[9px] font-medium text-[#c48a2d]">
        View Detailed Insights <FiArrowRight className="ml-1 inline" />
      </button>
    </Card>
  );
};

/* =========================================================
   SALES SUMMARY
========================================================= */

const SalesSummary = () => {
  const rows = [
    ["Revenue", "₹24,85,600", "₹20,95,000", "₹3,90,600", "18.6%"],
    ["Orders", "1,284", "1,142", "142", "12.4%"],
    ["Quantity Sold", "2,356", "2,139", "217", "10.3%"],
    ["New Customers", "245", "212", "33", "15.8%"],
    ["Avg. Order Value", "₹19,352", "₹16,811", "₹2,541", "14.2%"],
  ];

  return (
    <Card className="overflow-hidden">
      <div className="px-4 pt-3">
        <h3 className="text-[12px] font-semibold text-slate-800">
          Sales Summary{" "}
          <span className="font-normal text-slate-400">
            (This Week vs Last Week)
          </span>
        </h3>
      </div>

      <div className="mt-2 overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-y border-slate-100 text-[8px] text-slate-500">
              <th className="px-4 py-2 font-medium">Metrics</th>
              <th className="px-2 py-2 text-right font-medium">
                This Week
              </th>
              <th className="px-2 py-2 text-right font-medium">
                Last Week
              </th>
              <th className="px-2 py-2 text-right font-medium">
                Change
              </th>
              <th className="px-2 py-2 text-right font-medium">
                Change (%)
              </th>
              <th className="px-4 py-2 text-right font-medium">
                Trend
              </th>
            </tr>
          </thead>

          <tbody>
            {rows.map((row, index) => (
              <tr
                key={row[0]}
                className="border-b border-slate-50 last:border-0"
              >
                <td className="px-4 py-2 text-[9px] font-medium text-slate-600">
                  {row[0]}
                </td>

                <td className="px-2 py-2 text-right text-[9px] font-medium text-slate-700">
                  {row[1]}
                </td>

                <td className="px-2 py-2 text-right text-[9px] text-slate-500">
                  {row[2]}
                </td>

                <td className="px-2 py-2 text-right text-[9px] text-slate-600">
                  {row[3]}
                </td>

                <td className="px-2 py-2 text-right text-[9px] font-medium text-emerald-500">
                  ↑ {row[4]}
                </td>

                <td className="px-4 py-2">
                  <div className="flex justify-end">
                    <Sparkline
                      points={
                        index % 2 === 0
                          ? "0,20 8,14 16,18 24,10 32,15 40,7 48,13 56,8 64,4"
                          : "0,17 8,19 16,12 24,15 32,8 40,13 48,10 56,6 64,9"
                      }
                    />
                  </div>
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
   SALES HEATMAP
========================================================= */

const SalesHeatmap = () => {
  const values = [
    [1, 2, 3, 2, 4, 2, 1],
    [2, 3, 4, 5, 5, 3, 2],
    [1, 3, 5, 4, 5, 4, 2],
    [2, 4, 4, 5, 4, 5, 3],
    [1, 2, 3, 4, 3, 3, 2],
    [1, 2, 2, 3, 4, 2, 1],
    [1, 2, 3, 2, 3, 2, 1],
  ];

  const getOpacity = (value: number) => {
    return 0.08 + value * 0.14;
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader title="Sales Heatmap" />

      <div className="px-4 pb-3 pt-3">

        <div className="ml-8 grid grid-cols-7 gap-1">
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
              className="text-center text-[7px] text-slate-500"
            >
              {day}
            </span>
          ))}
        </div>

        <div className="mt-1 space-y-1">
          {values.map((row, rowIndex) => (
            <div
              key={rowIndex}
              className="grid grid-cols-[28px_repeat(7,1fr)] gap-1"
            >
              <span className="flex items-center text-[7px] text-slate-500">
                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][
                  rowIndex
                ]}
              </span>

              {row.map((value, index) => (
                <div
                  key={index}
                  className="h-[14px] rounded-[3px]"
                  style={{
                    backgroundColor: `rgba(216, 151, 42, ${getOpacity(
                      value,
                    )})`,
                  }}
                />
              ))}
            </div>
          ))}
        </div>

        <div className="mt-3 flex items-center justify-end gap-2">
          <span className="text-[7px] text-slate-500">
            Low Sales
          </span>

          <div className="flex">
            {[1, 2, 3, 4, 5].map((value) => (
              <span
                key={value}
                className="h-2.5 w-7"
                style={{
                  backgroundColor: `rgba(216, 151, 42, ${getOpacity(
                    value,
                  )})`,
                }}
              />
            ))}
          </div>

          <span className="text-[7px] text-slate-500">
            High Sales
          </span>
        </div>

      </div>
    </Card>
  );
};

/* =========================================================
   MAIN DASHBOARD
========================================================= */

const ReportsAnalytics = () => {
  return (
    <div className="min-h-screen bg-[#fafafa] p-2.5 text-slate-800">

      <div className="mx-auto max-w-[1500px]">

        {/* =====================================================
            HEADER
        ====================================================== */}

        <header className="mb-3 flex flex-col justify-between gap-3 lg:flex-row lg:items-center">

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-[19px] font-bold tracking-tight text-slate-900">
                Reports & Analytics
              </h1>

              <FiTrendingUp className="text-[17px] text-[#c58b2f]" />
            </div>

            <p className="mt-0.5 text-[9px] text-slate-500">
              Real-time insights and performance metrics for your
              business.
            </p>
          </div>

          <div className="flex items-center gap-2">

            {/* Date */}
            <button className="flex h-8 items-center gap-2 rounded-md border border-slate-200 bg-white px-3 text-[9px] text-slate-700 shadow-sm">
              <FiCalendar className="text-[12px]" />
              12 May 2025 - 18 May 2025
              <FiChevronDown className="text-[10px]" />
            </button>

            {/* Filters */}
            <button className="flex h-8 items-center gap-2 rounded-md border border-slate-200 bg-white px-3 text-[9px] text-slate-700 shadow-sm">
              <FiFilter />
              Filters
            </button>

            {/* Export */}
            <button className="flex h-8 items-center gap-2 rounded-md bg-[#17152d] px-3.5 text-[9px] font-medium text-white shadow-sm">
              <FiDownload />
              Export Report
            </button>

          </div>
        </header>

        {/* =====================================================
            MAIN GRID
        ====================================================== */}

        <div className="grid grid-cols-1 gap-2.5 xl:grid-cols-[minmax(0,1fr)_190px]">

          {/* ===================================================
              LEFT CONTENT
          ==================================================== */}

          <main className="min-w-0">

            {/* =================================================
                STAT CARDS
            ================================================== */}

            <div className="grid grid-cols-2 gap-2 md:grid-cols-3 xl:grid-cols-6">

              {stats.map((stat) => (
                <Card
                  key={stat.title}
                  className="min-h-[76px] px-3 py-2.5"
                >
                  <div className="flex items-center gap-2.5">

                    <div
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[18px] ${stat.iconBg} ${stat.iconColor}`}
                    >
                      {stat.icon}
                    </div>

                    <div className="min-w-0">
                      <p className="truncate text-[8px] text-slate-500">
                        {stat.title}
                      </p>

                      <p className="mt-0.5 truncate text-[13px] font-bold text-slate-800">
                        {stat.value}
                      </p>

                      <p className="mt-1 whitespace-nowrap text-[7px]">
                        <span className="font-medium text-emerald-500">
                          ↑ {stat.change}
                        </span>

                        <span className="ml-1 text-slate-400">
                          vs last week
                        </span>
                      </p>
                    </div>

                  </div>
                </Card>
              ))}

            </div>

            {/* =================================================
                TABS
            ================================================== */}

            <div className="mt-2 flex items-center gap-7 overflow-x-auto border-b border-slate-200">
              {[
                "Business Overview",
                "Sales Analysis",
                "Customer Insights",
                "Product Insights",
                "Financial Overview",
              ].map((tab, index) => (
                <button
                  key={tab}
                  className={`relative whitespace-nowrap py-2 text-[9px] ${
                    index === 0
                      ? "font-semibold text-[#b87920]"
                      : "text-slate-600"
                  }`}
                >
                  {tab}

                  {index === 0 && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] rounded-full bg-[#d4932e]" />
                  )}
                </button>
              ))}
            </div>

            {/* =================================================
                FIRST ROW
            ================================================== */}

            <div className="mt-2 grid grid-cols-1 gap-2 lg:grid-cols-[1.45fr_1.05fr_1fr]">

              {/* Revenue */}
              <Card className="min-h-[240px]">
                <CardHeader title="Revenue Overview" />

                <div className="px-4 pt-2">

                  <div className="flex items-end gap-3">
                    <div>
                      <p className="text-[9px] text-slate-500">
                        Total Revenue
                      </p>

                      <p className="mt-0.5 text-[15px] font-bold text-slate-800">
                        ₹24,85,600
                      </p>
                    </div>

                    <span className="mb-0.5 text-[9px] font-medium text-emerald-500">
                      ↑ 18.6%
                    </span>
                  </div>

                  <RevenueChart />

                </div>
              </Card>

              {/* Revenue By Channel */}
              <Card className="min-h-[240px]">
                <CardHeader title="Revenue by Channel" />

                <div className="flex items-center gap-4 px-4 py-6">

                  <DonutChart
                    values={[50.1, 31.6, 9.9, 5.2, 3.2]}
                    total="₹24,85,600"
                  />

                  <div className="min-w-0 flex-1 space-y-3">
                    {[
                      ["Website", "₹12,45,300", "50.1%", "#d99b2e"],
                      ["Store", "₹7,85,600", "31.6%", "#6774c7"],
                      ["Mobile App", "₹2,45,200", "9.9%", "#43945d"],
                      ["Marketplace", "₹1,28,500", "5.2%", "#d84d4d"],
                      ["Other", "₹81,000", "3.2%", "#9da4ad"],
                    ].map(([name, amount, percent, color]) => (
                      <div
                        key={name}
                        className="grid grid-cols-[8px_1fr_auto] items-center gap-2"
                      >
                        <span
                          className="h-2 w-2 rounded-full"
                          style={{ backgroundColor: color }}
                        />

                        <span className="truncate text-[8px] text-slate-600">
                          {name}
                        </span>

                        <span className="text-[8px] text-slate-600">
                          {amount} ({percent})
                        </span>
                      </div>
                    ))}
                  </div>

                </div>
              </Card>

              {/* Sales Performance */}
              <Card className="min-h-[240px]">
                <CardHeader title="Sales Performance" />

                <div className="space-y-3 px-4 py-4">

                  <PerformanceRow
                    title="Total Sales"
                    value="₹24,85,600"
                    change="18.6%"
                    color="#42a875"
                  />

                  <PerformanceRow
                    title="Total Orders"
                    value="1,284"
                    change="12.4%"
                    color="#8a72db"
                  />

                  <PerformanceRow
                    title="Total Quantity Sold"
                    value="2,356"
                    change="10.3%"
                    color="#5e9bd2"
                  />

                  <PerformanceRow
                    title="Average Order Value"
                    value="₹19,352"
                    change="14.2%"
                    color="#e89b2d"
                  />

                  <PerformanceRow
                    title="Conversion Rate"
                    value="2.35%"
                    change="8.6%"
                    color="#e4678c"
                  />

                </div>
              </Card>

            </div>

            {/* =================================================
                SECOND ROW
            ================================================== */}

            <div className="mt-2 grid grid-cols-1 gap-2 lg:grid-cols-[1fr_1fr_1fr]">

              {/* Top Categories */}
              <Card className="min-h-[205px]">
                <CardHeader title="Top Selling Categories" />

                <div className="flex items-center gap-4 px-4 py-5">

                  <DonutChart
                    values={[25.2, 23.6, 17.1, 13.9, 8.5, 11.7]}
                    total=""
                  />

                  <div className="flex-1 space-y-2.5">

                    {[
                      ["Rings", "₹6,25,400", "25.2%", "#d99b2e"],
                      ["Necklaces", "₹5,85,600", "23.6%", "#6774c7"],
                      ["Earrings", "₹4,25,300", "17.1%", "#43945d"],
                      ["Pendants", "₹3,45,200", "13.9%", "#d84d4d"],
                      ["Bracelets", "₹2,10,500", "8.5%", "#8d949c"],
                      ["Others", "₹2,93,600", "11.7%", "#b8bdc3"],
                    ].map(([name, amount, percent, color]) => (
                      <div
                        key={name}
                        className="grid grid-cols-[7px_1fr_auto] gap-2"
                      >
                        <span
                          className="mt-1 h-2 w-2 rounded-full"
                          style={{ backgroundColor: color }}
                        />

                        <span className="text-[8px] text-slate-600">
                          {name}
                        </span>

                        <span className="text-[8px] text-slate-600">
                          {amount} ({percent})
                        </span>
                      </div>
                    ))}

                  </div>

                </div>
              </Card>

              {/* Top Products */}
              <Card className="min-h-[205px] overflow-hidden">
                <CardHeader title="Top Selling Products" />

                <div className="mt-2">

                  <div className="grid grid-cols-[1fr_40px_70px] border-y border-slate-100 px-4 py-2 text-[8px] text-slate-500">
                    <span>Product</span>
                    <span>Sold</span>
                    <span>Revenue</span>
                  </div>

                  {products.map((product) => (
                    <div
                      key={product.name}
                      className="grid grid-cols-[1fr_40px_70px] items-center border-b border-slate-50 px-4 py-1.5"
                    >
                      <div className="flex min-w-0 items-center gap-2">
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-slate-50 text-[11px]">
                          {product.icon}
                        </span>

                        <span className="truncate text-[8px] text-slate-700">
                          {product.name}
                        </span>
                      </div>

                      <span className="text-[8px] text-slate-600">
                        {product.sold}
                      </span>

                      <span className="text-[8px] text-slate-600">
                        {product.revenue}
                      </span>
                    </div>
                  ))}

                </div>

                <button className="flex w-full items-center justify-center gap-1 py-2 text-[8px] font-medium text-[#c48a2d]">
                  View All Products
                  <FiArrowRight />
                </button>
              </Card>

              {/* Customer Insights */}
              <Card className="min-h-[205px]">
                <CardHeader title="Customer Insights" />

                <div className="flex items-center gap-4 px-4 py-6">

                  <DonutChart
                    values={[28.7, 43.9, 11.2, 9, 1.8]}
                    total="8,542"
                  />

                  <div className="flex-1 space-y-3">

                    {[
                      ["New Customers", "245", "28.7%", "#6774c7"],
                      ["Returning Customers", "421", "49.3%", "#8bc34a"],
                      ["VIP Customers", "96", "11.2%", "#f0a51e"],
                      ["Inactive Customers", "77", "9.0%", "#d85555"],
                      ["Others", "35", "1.8%", "#8b929a"],
                    ].map(([name, amount, percent, color]) => (
                      <div
                        key={name}
                        className="grid grid-cols-[7px_1fr_auto] gap-2"
                      >
                        <span
                          className="mt-1 h-2 w-2 rounded-full"
                          style={{ backgroundColor: color }}
                        />

                        <span className="text-[8px] text-slate-600">
                          {name}
                        </span>

                        <span className="text-[8px] text-slate-600">
                          {amount} ({percent})
                        </span>
                      </div>
                    ))}

                  </div>

                </div>
              </Card>

            </div>

            {/* =================================================
                THIRD ROW
            ================================================== */}

            <div className="mt-2 grid grid-cols-1 gap-2 lg:grid-cols-[1.7fr_1fr]">

              <SalesSummary />

              <SalesHeatmap />

            </div>

          </main>

          {/* ===================================================
              RIGHT SIDEBAR
          ==================================================== */}

          <aside className="space-y-2.5">

            <ReportShortcuts />

            <KeyInsights />

          </aside>

        </div>

      </div>

    </div>
  );
};

export default ReportsAnalytics;