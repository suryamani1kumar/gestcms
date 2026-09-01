"use client";

import React, { useState } from "react";

import {
  FiArrowLeft,
  FiArrowRight,
  FiEdit2,
  FiPlus,
  FiPhone,
  FiMail,
  FiMapPin,
  FiCalendar,
  FiChevronDown,
  FiEye,
  FiShoppingBag,
  FiStar,
  FiAward,
  FiUser,
  FiUsers,
  FiClock,
  FiTag,
  FiHeart,
  FiMessageCircle,
  FiGift,
  FiSend,
  FiCheckCircle,
  FiPackage,
  FiCreditCard,
  FiMoreHorizontal,
} from "react-icons/fi";

import {
  HiOutlineSparkles,
  HiOutlineUserCircle,
} from "react-icons/hi2";

/* =========================================================
   TYPES
========================================================= */

type Order = {
  id: string;
  date: string;
  product: string;
  material: string;
  amount: string;
  payment: "Paid" | "Pending";
  status: "Delivered" | "Processing";
};

type Activity = {
  title: string;
  description: string;
  date: string;
  time: string;
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
};

/* =========================================================
   CUSTOMER
========================================================= */

const customer = {
  name: "Priya Sharma",
  id: "CUST10025",
  phone: "+91 98765 43210",
  email: "priyasharma@email.com",
  location: "Mumbai, Maharashtra, India",
  joined: "15 Jan 2024",
  avatar: "https://i.pravatar.cc/300?img=47",
  type: "VIP",
};

/* =========================================================
   ORDERS
========================================================= */

const orders: Order[] = [
  {
    id: "#ORD12580",
    date: "17 May 2025",
    product: "Diamond Necklace",
    material: "18K Gold",
    amount: "₹2,52,600",
    payment: "Paid",
    status: "Delivered",
  },
  {
    id: "#ORD12581",
    date: "17 May 2025",
    product: "Ruby Pendant",
    material: "18K Gold",
    amount: "₹18,750",
    payment: "Paid",
    status: "Delivered",
  },
  {
    id: "#ORD12550",
    date: "10 May 2025",
    product: "Emerald Ring",
    material: "18K Gold",
    amount: "₹38,900",
    payment: "Paid",
    status: "Delivered",
  },
  {
    id: "#ORD12430",
    date: "02 May 2025",
    product: "Diamond Earrings",
    material: "18K Gold",
    amount: "₹26,500",
    payment: "Paid",
    status: "Delivered",
  },
  {
    id: "#ORD12210",
    date: "20 Apr 2025",
    product: "Gold Bracelet",
    material: "22K Gold",
    amount: "₹22,400",
    payment: "Paid",
    status: "Delivered",
  },
];

/* =========================================================
   ACTIVITIES
========================================================= */

const activities: Activity[] = [
  {
    title: "Order Delivered",
    description: "Order #ORD12580 delivered",
    date: "17 May 2025",
    time: "04:10 PM",
    icon: <FiPackage />,
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-500",
  },
  {
    title: "Follow-up Done",
    description: "Discussed anniversary offer",
    date: "17 May 2025",
    time: "02:30 PM",
    icon: <FiPhone />,
    iconBg: "bg-violet-50",
    iconColor: "text-violet-500",
  },
  {
    title: "Order Placed",
    description: "Order #ORD12581 placed",
    date: "17 May 2025",
    time: "12:15 PM",
    icon: <FiShoppingBag />,
    iconBg: "bg-red-50",
    iconColor: "text-red-500",
  },
  {
    title: "Email Sent",
    description: "Sent new collection details",
    date: "16 May 2025",
    time: "06:45 PM",
    icon: <FiMail />,
    iconBg: "bg-orange-50",
    iconColor: "text-orange-500",
  },
  {
    title: "Customer Registered",
    description: "Added via website",
    date: "15 Jan 2024",
    time: "11:20 AM",
    icon: <FiUser />,
    iconBg: "bg-violet-50",
    iconColor: "text-violet-500",
  },
];

/* =========================================================
   STATS
========================================================= */

const stats = [
  {
    title: "Total Spent",
    value: "₹8,75,400",
    subtitle: "↑ 18.5% vs last year",
    icon: <FiCreditCard />,
    iconBg: "bg-orange-50",
    iconColor: "text-orange-500",
    subtitleColor: "text-emerald-500",
  },
  {
    title: "Orders",
    value: "23",
    subtitle: "View all Orders",
    icon: <FiShoppingBag />,
    iconBg: "bg-violet-50",
    iconColor: "text-violet-500",
    subtitleColor: "text-slate-500",
  },
  {
    title: "Average Order Value",
    value: "₹38,061",
    subtitle: "↑ 12.4% vs last year",
    icon: <HiOutlineSparkles />,
    iconBg: "bg-violet-50",
    iconColor: "text-violet-500",
    subtitleColor: "text-emerald-500",
  },
  {
    title: "Reward Points",
    value: "1,250",
    subtitle: "Redeemable",
    icon: <FiStar />,
    iconBg: "bg-yellow-50",
    iconColor: "text-yellow-500",
    subtitleColor: "text-slate-500",
  },
  {
    title: "Customer Tier",
    value: "Platinum",
    subtitle: "Since 15 Jan 2024",
    icon: <FiAward />,
    iconBg: "bg-orange-50",
    iconColor: "text-orange-500",
    subtitleColor: "text-slate-500",
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
   STAT CARD
========================================================= */

const StatCard = ({
  title,
  value,
  subtitle,
  icon,
  iconBg,
  iconColor,
  subtitleColor,
}: {
  title: string;
  value: string;
  subtitle: string;
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
  subtitleColor: string;
}) => {
  return (
    <div className="flex h-[88px] items-center gap-3 px-3">

      <div
        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[15px] ${iconBg} ${iconColor}`}
      >
        {icon}
      </div>

      <div className="min-w-0">

        <p className="text-[7px] font-medium text-slate-500">
          {title}
        </p>

        <p className="mt-1 text-[14px] font-bold leading-none text-slate-800">
          {value}
        </p>

        <p className={`mt-2 text-[6px] ${subtitleColor}`}>
          {subtitle}
        </p>

      </div>

    </div>
  );
};

/* =========================================================
   INFO ROW
========================================================= */

const InfoRow = ({
  label,
  value,
  children,
}: {
  label: string;
  value?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div className="grid grid-cols-[105px_1fr] items-start gap-2">

      <span className="text-[7px] text-slate-500">
        {label}
      </span>

      <span className="text-[7px] font-medium leading-3 text-slate-700">
        {children || value || "—"}
      </span>

    </div>
  );
};

/* =========================================================
   SECTION TITLE
========================================================= */

const SectionTitle = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <h3 className="mb-3 text-[9px] font-bold text-slate-800">
      {children}
    </h3>
  );
};

/* =========================================================
   TAG
========================================================= */

const CustomerTag = ({
  icon,
  children,
  color = "violet",
}: {
  icon: React.ReactNode;
  children: React.ReactNode;
  color?: "violet" | "orange" | "blue" | "green";
}) => {
  const colors = {
    violet: "bg-violet-50 text-violet-500",
    orange: "bg-orange-50 text-orange-500",
    blue: "bg-blue-50 text-blue-500",
    green: "bg-emerald-50 text-emerald-500",
  };

  return (
    <span
      className={`inline-flex w-fit items-center gap-1 rounded px-2 py-1 text-[7px] ${colors[color]}`}
    >
      {icon}
      {children}
    </span>
  );
};

/* =========================================================
   DONUT CHART
========================================================= */

const SpendingChart = () => {
  return (
    <div className="flex items-center gap-6">

      <div
        className="relative flex h-[116px] w-[116px] shrink-0 items-center justify-center rounded-full"
        style={{
          background:
            "conic-gradient(#c8953d 0deg 257deg, #8055c8 257deg 333deg, #83c0e5 333deg 351deg, #f39ba7 351deg 360deg)",
        }}
      >

        <div className="flex h-[82px] w-[82px] flex-col items-center justify-center rounded-full bg-white">

          <span className="text-[7px] text-slate-500">
            Total Spent
          </span>

          <span className="mt-1 text-[11px] font-bold text-slate-800">
            ₹8,75,400
          </span>

        </div>

      </div>

      <div className="space-y-3">

        <ChartLegend
          color="bg-[#c8953d]"
          title="Jewellery"
          value="₹6,25,400"
          percent="71.4%"
        />

        <ChartLegend
          color="bg-[#8055c8]"
          title="Gemstones"
          value="₹1,85,000"
          percent="21.1%"
        />

        <ChartLegend
          color="bg-[#83c0e5]"
          title="Making Charges"
          value="₹45,000"
          percent="5.1%"
        />

        <ChartLegend
          color="bg-[#f39ba7]"
          title="Other Charges"
          value="₹20,000"
          percent="2.4%"
        />

      </div>

    </div>
  );
};

/* =========================================================
   CHART LEGEND
========================================================= */

const ChartLegend = ({
  color,
  title,
  value,
  percent,
}: {
  color: string;
  title: string;
  value: string;
  percent: string;
}) => {
  return (
    <div className="flex items-start gap-2">

      <span
        className={`mt-1 h-2 w-2 shrink-0 rounded-full ${color}`}
      />

      <div>

        <p className="text-[7px] text-slate-600">
          {title}
        </p>

        <p className="mt-0.5 text-[7px] font-medium text-slate-700">
          {value}
          <span className="ml-1 text-slate-400">
            ({percent})
          </span>
        </p>

      </div>

    </div>
  );
};

/* =========================================================
   ORDER PRODUCT IMAGE
========================================================= */

const ProductImage = ({ index }: { index: number }) => {
  const images = [
    "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=100&q=80",
    "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=100&q=80",
    "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=100&q=80",
    "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=100&q=80",
    "https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=100&q=80",
  ];

  return (
    <img
      src={images[index]}
      alt="Jewellery"
      className="h-7 w-7 rounded object-cover"
    />
  );
};

/* =========================================================
   MAIN PAGE
========================================================= */

const CustomerDetails = () => {
  const [activeTab, setActiveTab] = useState("Overview");

  const tabs = [
    "Overview",
    "Orders (23)",
    "Wishlist (12)",
    "Addresses (3)",
    "Follow-ups (6)",
    "Notes (4)",
    "Communication",
    "Activity Log",
  ];

  return (
    <main className="min-h-screen bg-[#fafafa] p-1.5 text-slate-800">

      <div className="mx-auto max-w-[1500px]">

        {/* =================================================
            HEADER
        ================================================== */}

        <div className="mb-2 flex items-start justify-between">

          <div>

            <h1 className="text-[16px] font-bold text-slate-900">
              Customers
            </h1>

            <div className="mt-1 flex items-center gap-2 text-[7px] text-slate-500">

              <span>Dashboard</span>

              <span>›</span>

              <span>Customers</span>

              <span>›</span>

              <span className="text-slate-700">
                Customer Details
              </span>

            </div>

          </div>

          <div className="flex items-center gap-2">

            <button
              className="flex h-7 items-center gap-1.5 rounded border border-slate-200 bg-white px-3 text-[7px] font-medium text-slate-600 hover:bg-slate-50"
            >
              <FiArrowLeft />
              Back
            </button>

            <button
              className="flex h-7 items-center gap-1.5 rounded bg-[#b7832d] px-3 text-[7px] font-medium text-white shadow-sm hover:bg-[#a57525]"
            >
              <FiEdit2 />
              Edit Customer
            </button>

            <button
              className="flex h-7 items-center gap-1.5 rounded bg-slate-900 px-3 text-[7px] font-medium text-white shadow-sm hover:bg-slate-800"
            >
              <FiPlus />
              Add Customer
            </button>

          </div>

        </div>

        {/* =================================================
            CUSTOMER PROFILE + STATS
        ================================================== */}

        <Card className="overflow-hidden">

          <div className="flex items-center gap-5 p-3">

            {/* PROFILE */}

            <div className="flex min-w-[275px] items-center gap-4">

              <img
                src={customer.avatar}
                alt={customer.name}
                className="h-[76px] w-[76px] rounded-full object-cover ring-1 ring-slate-200"
              />

              <div>

                <div className="flex items-center gap-2">

                  <h2 className="text-[14px] font-bold text-slate-800">
                    {customer.name}
                  </h2>

                  <span className="rounded bg-violet-50 px-2 py-1 text-[7px] font-semibold text-violet-500">
                    {customer.type}
                  </span>

                </div>

                <p className="mt-1 text-[7px] text-slate-600">
                  Customer ID: {customer.id}
                </p>

                <div className="mt-2 space-y-1">

                  <p className="flex items-center gap-1.5 text-[7px] text-slate-600">
                    <FiPhone className="text-[8px]" />
                    {customer.phone}
                  </p>

                  <p className="flex items-center gap-1.5 text-[7px] text-slate-600">
                    <FiMail className="text-[8px]" />
                    {customer.email}
                  </p>

                  <p className="flex items-center gap-1.5 text-[7px] text-slate-600">
                    <FiMapPin className="text-[8px]" />
                    {customer.location}
                  </p>

                  <p className="flex items-center gap-1.5 text-[7px] text-slate-600">
                    <FiCalendar className="text-[8px]" />
                    Joined on {customer.joined}
                  </p>

                </div>

              </div>

            </div>

            {/* STATS */}

            <div className="grid flex-1 grid-cols-5 gap-2">

              {stats.map((stat) => (
                <Card key={stat.title}>
                  <StatCard {...stat} />
                </Card>
              ))}

            </div>

          </div>

          {/* =================================================
              TABS
          ================================================== */}

          <div className="flex overflow-x-auto border-t border-slate-100 px-3">

            {tabs.map((tab) => {

              const isActive = activeTab === tab;

              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`relative whitespace-nowrap px-3 py-2.5 text-[7px] font-medium transition ${
                    isActive
                      ? "text-[#b7832d]"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >

                  {tab}

                  {isActive && (
                    <span className="absolute bottom-0 left-2 right-2 h-[2px] rounded-full bg-[#c8953d]" />
                  )}

                </button>
              );
            })}

          </div>

        </Card>

        {/* =================================================
            MAIN CONTENT
        ================================================== */}

        <div className="mt-2.5 grid grid-cols-12 gap-2.5">

          {/* ===============================================
              LEFT / MAIN
          ================================================ */}

          <div className="col-span-12 lg:col-span-8">

            <div className="grid grid-cols-12 gap-2.5">

              {/* CUSTOMER INFORMATION */}

              <Card className="col-span-12 md:col-span-5 p-3">

                <SectionTitle>
                  Customer Information
                </SectionTitle>

                <div className="space-y-2.5">

                  <InfoRow
                    label="Full Name"
                    value="Priya Sharma"
                  />

                  <InfoRow
                    label="Date of Birth"
                    value="12 Feb 1990"
                  />

                  <InfoRow
                    label="Anniversary"
                    value="—"
                  />

                  <InfoRow
                    label="Phone"
                    value="+91 98765 43210"
                  />

                  <InfoRow
                    label="Email"
                    value="priyasharma@email.com"
                  />

                  <InfoRow
                    label="Gender"
                    value="Female"
                  />

                  <InfoRow
                    label="Preferred Language"
                    value="English"
                  />

                  <InfoRow label="Sales Person">

                    <span className="flex items-center gap-1.5">

                      <img
                        src="https://i.pravatar.cc/50?img=44"
                        alt="Sales Person"
                        className="h-4 w-4 rounded-full"
                      />

                      Neha Kapoor

                    </span>

                  </InfoRow>

                  <InfoRow label="Customer Group">

                    <span className="rounded bg-violet-50 px-2 py-1 text-[6px] text-violet-500">
                      VIP Customers
                    </span>

                  </InfoRow>

                  <InfoRow
                    label="GST Number"
                    value="—"
                  />

                  <InfoRow
                    label="PAN Number"
                    value="—"
                  />

                </div>

              </Card>

              {/* PREFERENCES */}

              <Card className="col-span-12 md:col-span-5 p-3">

                <SectionTitle>
                  Preferences
                </SectionTitle>

                <div className="space-y-2.5">

                  <InfoRow label="Preferred Jewellery">

                    <span className="flex items-center gap-1.5">
                      <FiTag className="text-[8px]" />
                      Diamond, Gold
                    </span>

                  </InfoRow>

                  <InfoRow label="Preferred Gemstone">

                    <span className="flex items-center gap-1.5">
                      <HiOutlineSparkles className="text-[8px]" />
                      Ruby, Emerald
                    </span>

                  </InfoRow>

                  <InfoRow label="Metal Preference">

                    <span className="flex items-center gap-1.5">
                      <FiAward className="text-[8px]" />
                      18K Gold, Platinum
                    </span>

                  </InfoRow>

                  <InfoRow label="Budget Range">

                    <span>
                      ₹50,000 - ₹2,00,000
                    </span>

                  </InfoRow>

                  <InfoRow label="Favourite Collections">

                    <span>
                      Royal, Heritage, Classic
                    </span>

                  </InfoRow>

                  <InfoRow label="Preferred Contact">

                    <span className="flex items-center gap-1.5">
                      <FiMessageCircle className="text-[8px]" />
                      WhatsApp, Email
                    </span>

                  </InfoRow>

                  <InfoRow label="Best Contact Time">

                    <span className="flex items-center gap-1.5">
                      <FiClock className="text-[8px]" />
                      Evening (6 PM - 9 PM)
                    </span>

                  </InfoRow>

                  <InfoRow label="Notes">

                    <span>
                      Loves traditional designs
                      <br />
                      for special occasions.
                    </span>

                  </InfoRow>

                </div>

              </Card>

              {/* TAGS */}

              <Card className="col-span-12 md:col-span-2 p-3">

                <SectionTitle>
                  Customer Tags
                </SectionTitle>

                <div className="flex flex-col gap-2">

                  <CustomerTag
                    icon={<FiAward />}
                    color="orange"
                  >
                    VIP
                  </CustomerTag>

                  <CustomerTag
                    icon={<HiOutlineSparkles />}
                  >
                    High Spender
                  </CustomerTag>

                  <CustomerTag
                    icon={<FiUsers />}
                    color="blue"
                  >
                    Loyal Customer
                  </CustomerTag>

                  <CustomerTag
                    icon={<FiGift />}
                  >
                    Wedding Buyer
                  </CustomerTag>

                  <CustomerTag
                    icon={<FiStar />}
                  >
                    Referral Customer
                  </CustomerTag>

                  <button className="mt-1 flex w-fit items-center gap-1 rounded border border-dashed border-slate-300 px-2 py-1.5 text-[7px] text-slate-600 hover:bg-slate-50">
                    <FiPlus />
                    Add Tag
                  </button>

                </div>

              </Card>

              {/* RECENT ORDERS */}

              <Card className="col-span-12 overflow-hidden">

                <div className="flex items-center justify-between px-3 py-3">

                  <SectionTitle>
                    Recent Orders
                  </SectionTitle>

                </div>

                <div className="overflow-x-auto">

                  <table className="w-full min-w-[650px]">

                    <thead>

                      <tr className="border-y border-slate-100 bg-[#fcfcfc]">

                        <th className="px-3 py-2 text-left text-[6px] font-medium text-slate-500">
                          Order ID
                        </th>

                        <th className="px-2 py-2 text-left text-[6px] font-medium text-slate-500">
                          Date
                        </th>

                        <th className="px-2 py-2 text-left text-[6px] font-medium text-slate-500">
                          Products
                        </th>

                        <th className="px-2 py-2 text-right text-[6px] font-medium text-slate-500">
                          Amount
                        </th>

                        <th className="px-2 py-2 text-center text-[6px] font-medium text-slate-500">
                          Payment
                        </th>

                        <th className="px-2 py-2 text-center text-[6px] font-medium text-slate-500">
                          Status
                        </th>

                        <th className="px-3 py-2 text-center text-[6px] font-medium text-slate-500">
                          Action
                        </th>

                      </tr>

                    </thead>

                    <tbody>

                      {orders.map((order, index) => (

                        <tr
                          key={order.id}
                          className="border-b border-slate-50 hover:bg-slate-50/50"
                        >

                          <td className="px-3 py-2 text-[7px] text-slate-600">
                            {order.id}
                          </td>

                          <td className="px-2 py-2 text-[7px] text-slate-600">
                            {order.date}
                          </td>

                          <td className="px-2 py-2">

                            <div className="flex items-center gap-2">

                              <ProductImage index={index} />

                              <div>

                                <p className="text-[7px] font-medium text-slate-700">
                                  {order.product}
                                </p>

                                <p className="text-[6px] text-slate-400">
                                  {order.material}
                                </p>

                              </div>

                            </div>

                          </td>

                          <td className="px-2 py-2 text-right text-[7px] font-medium text-slate-700">
                            {order.amount}
                          </td>

                          <td className="px-2 py-2 text-center">

                            <span className="rounded bg-emerald-50 px-2 py-1 text-[6px] font-medium text-emerald-500">
                              {order.payment}
                            </span>

                          </td>

                          <td className="px-2 py-2 text-center">

                            <span className="rounded bg-emerald-50 px-2 py-1 text-[6px] font-medium text-emerald-500">
                              {order.status}
                            </span>

                          </td>

                          <td className="px-3 py-2 text-center">

                            <button className="text-slate-400 hover:text-slate-700">
                              <FiEye className="text-[10px]" />
                            </button>

                          </td>

                        </tr>

                      ))}

                    </tbody>

                  </table>

                </div>

                <div className="flex justify-center border-t border-slate-100 py-2.5">

                  <button className="flex items-center gap-2 text-[7px] font-medium text-[#b7832d] hover:text-[#966c26]">

                    View All Orders
                    <FiArrowRight />

                  </button>

                </div>

              </Card>

            </div>

          </div>

          {/* ===============================================
              RIGHT SIDEBAR
          ================================================ */}

          <div className="col-span-12 lg:col-span-4">

            <div className="grid gap-2.5">

              {/* RECENT ACTIVITY */}

              <Card className="overflow-hidden">

                <div className="p-3">

                  <SectionTitle>
                    Recent Activity
                  </SectionTitle>

                  <div className="relative">

                    {/* TIMELINE LINE */}

                    <div className="absolute bottom-2 left-[5px] top-2 w-px bg-slate-200" />

                    <div className="space-y-4">

                      {activities.map((activity) => (

                        <div
                          key={activity.title}
                          className="relative flex gap-3"
                        >

                          {/* DOT */}

                          <div className="relative z-10 mt-1 flex h-3 w-3 shrink-0 items-center justify-center rounded-full bg-white">

                            <span className="h-1.5 w-1.5 rounded-full bg-[#b7832d]" />

                          </div>

                          {/* ICON */}

                          <div
                            className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[9px] ${activity.iconBg} ${activity.iconColor}`}
                          >
                            {activity.icon}
                          </div>

                          {/* CONTENT */}

                          <div className="min-w-0 flex-1">

                            <div className="flex items-start justify-between gap-2">

                              <div>

                                <p className="text-[7px] font-semibold text-slate-700">
                                  {activity.title}
                                </p>

                                <p className="mt-1 text-[6px] text-slate-400">
                                  {activity.description}
                                </p>

                              </div>

                              <div className="shrink-0 text-right">

                                <p className="text-[6px] text-slate-600">
                                  {activity.date}
                                </p>

                                <p className="mt-1 text-[6px] text-slate-400">
                                  {activity.time}
                                </p>

                              </div>

                            </div>

                          </div>

                        </div>

                      ))}

                    </div>

                  </div>

                </div>

                <div className="border-t border-slate-100 py-2.5 text-center">

                  <button className="text-[7px] font-medium text-[#b7832d]">
                    View All Activity
                    <span className="ml-2">→</span>
                  </button>

                </div>

              </Card>

              {/* SPENDING SUMMARY */}

              <Card className="p-3">

                <div className="mb-4 flex items-center justify-between">

                  <SectionTitle>
                    Spending Summary
                  </SectionTitle>

                  <button className="flex items-center gap-1 rounded border border-slate-200 px-2 py-1.5 text-[6px] text-slate-600">
                    This Year
                    <FiChevronDown />
                  </button>

                </div>

                <SpendingChart />

                {/* BOTTOM SUMMARY */}

                <div className="mt-5 grid grid-cols-2 border-t border-slate-100 pt-4">

                  <div className="text-center">

                    <p className="text-[7px] text-slate-600">
                      Last Purchase
                    </p>

                    <p className="mt-2 text-[10px] font-bold text-slate-800">
                      17 May 2025
                    </p>

                  </div>

                  <div className="border-l border-slate-100 text-center">

                    <p className="text-[7px] text-slate-600">
                      First Purchase
                    </p>

                    <p className="mt-2 text-[10px] font-bold text-slate-800">
                      15 Jan 2024
                    </p>

                  </div>

                </div>

              </Card>

            </div>

          </div>

        </div>

      </div>

    </main>
  );
};

export default CustomerDetails;