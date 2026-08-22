"use client";

import PageHeader from "@/components/pageheader/PageHeader";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

import {
  FiChevronDown,
  FiChevronLeft,
  FiChevronRight,
  FiFilter,
  FiMoreVertical,
  FiSearch,
  FiUsers,
  FiUserPlus,
  FiUserCheck,
  FiAward,
  FiUserX,
} from "react-icons/fi";

import { HiOutlineUserGroup, HiOutlineSparkles } from "react-icons/hi2";

/* =========================================================
   TYPES
========================================================= */

type Customer = {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  orders: number;
  spent: string;
  type: "VIP" | "Regular" | "New";
  status: "Active" | "Inactive";
  avatar: string;
};

/* =========================================================
   DATA
========================================================= */

const customers: Customer[] = [
  {
    id: "CUST00125",
    name: "Rahul Verma",
    email: "rahul.verma@gmail.com",
    phone: "+91 98765 43210",
    location: "Mumbai, Maharashtra",
    orders: 18,
    spent: "₹4,25,600",
    type: "VIP",
    status: "Active",
    avatar: "https://i.pravatar.cc/100?img=12",
  },
  {
    id: "CUST00126",
    name: "Priya Sharma",
    email: "priya.sharma@gmail.com",
    phone: "+91 91234 56789",
    location: "Delhi, Delhi",
    orders: 12,
    spent: "₹2,85,400",
    type: "Regular",
    status: "Active",
    avatar: "https://i.pravatar.cc/100?img=47",
  },
  {
    id: "CUST00127",
    name: "Amit Singh",
    email: "amit.singh@gmail.com",
    phone: "+91 99887 66554",
    location: "Jaipur, Rajasthan",
    orders: 9,
    spent: "₹1,95,200",
    type: "VIP",
    status: "Active",
    avatar: "https://i.pravatar.cc/100?img=11",
  },
  {
    id: "CUST00128",
    name: "Neha Kapoor",
    email: "neha.kapoor@gmail.com",
    phone: "+91 90123 45678",
    location: "Bangalore, Karnataka",
    orders: 7,
    spent: "₹1,45,300",
    type: "Regular",
    status: "Active",
    avatar: "https://i.pravatar.cc/100?img=44",
  },
  {
    id: "CUST00129",
    name: "Vikram Joshi",
    email: "vikram.joshi@gmail.com",
    phone: "+91 93456 78901",
    location: "Ahmedabad, Gujarat",
    orders: 5,
    spent: "₹98,600",
    type: "Regular",
    status: "Inactive",
    avatar: "https://i.pravatar.cc/100?img=68",
  },
  {
    id: "CUST00130",
    name: "Kavya Patel",
    email: "kavya.patel@gmail.com",
    phone: "+91 90999 11223",
    location: "Surat, Gujarat",
    orders: 4,
    spent: "₹76,400",
    type: "New",
    status: "Active",
    avatar: "https://i.pravatar.cc/100?img=32",
  },
];

/* =========================================================
   STATS
========================================================= */

const stats = [
  {
    title: "Total Customers",
    value: "8,542",
    change: "15.3%",
    icon: <HiOutlineUserGroup />,
    iconBg: "bg-orange-50",
    iconColor: "text-orange-500",
  },
  {
    title: "New Customers",
    value: "842",
    change: "12.5%",
    icon: <FiUserPlus />,
    iconBg: "bg-cyan-50",
    iconColor: "text-cyan-500",
  },
  {
    title: "VIP Customers",
    value: "521",
    change: "8.7%",
    icon: <HiOutlineSparkles />,
    iconBg: "bg-orange-50",
    iconColor: "text-orange-500",
  },
  {
    title: "Active Customers",
    value: "6,219",
    change: "16.2%",
    icon: <FiUserCheck />,
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-500",
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
    <div className={`rounded-lg border border-slate-200 bg-white ${className}`}>
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
  change,
  icon,
  iconBg,
  iconColor,
}: {
  title: string;
  value: string;
  change: string;
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
}) => {
  return (
    <Card className="h-[62px] px-3 py-2">
      <div className="flex h-full items-center gap-2.5">
        <div
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[15px] ${iconBg} ${iconColor}`}
        >
          {icon}
        </div>

        <div className="min-w-0">
          <p className="text-[7px] font-medium text-slate-600">{title}</p>

          <p className="mt-0.5 text-[14px] font-bold leading-none text-slate-800">
            {value}
          </p>

          <p className="mt-1 text-[6px] text-slate-400">
            <span className="font-semibold text-emerald-500">↑ {change}</span>{" "}
            vs last month
          </p>
        </div>
      </div>
    </Card>
  );
};

/* =========================================================
   CUSTOMER TYPE BADGE
========================================================= */

const CustomerType = ({ type }: { type: Customer["type"] }) => {
  const styles = {
    VIP: "bg-red-50 text-red-500",
    Regular: "bg-slate-50 text-slate-500 border border-slate-200",
    New: "bg-blue-50 text-blue-500",
  };

  return (
    <span
      className={`inline-flex rounded px-1.5 py-[2px] text-[6px] font-medium ${styles[type]}`}
    >
      {type}
    </span>
  );
};

/* =========================================================
   STATUS
========================================================= */

const StatusBadge = ({ status }: { status: Customer["status"] }) => {
  if (status === "Active") {
    return (
      <span className="inline-flex rounded bg-emerald-50 px-1.5 py-[2px] text-[6px] font-medium text-emerald-500">
        Active
      </span>
    );
  }

  return (
    <span className="inline-flex rounded bg-red-50 px-1.5 py-[2px] text-[6px] font-medium text-red-500">
      Inactive
    </span>
  );
};

/* =========================================================
   CUSTOMER TABLE
========================================================= */

const CustomerTable = ({ data }: { data: Customer[] }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[850px]">
        {/* TABLE HEADER */}
        <thead>
          <tr className="border-y border-slate-100 bg-[#fcfcfc]">
            <th className="w-8 px-3 py-2 text-center text-[6px] font-medium text-slate-500">
              #
            </th>

            <th className="px-2 py-2 text-left text-[6px] font-medium text-slate-500">
              Customer
            </th>

            <th className="px-2 py-2 text-left text-[6px] font-medium text-slate-500">
              Contact
            </th>

            <th className="px-2 py-2 text-left text-[6px] font-medium text-slate-500">
              Location
            </th>

            <th className="px-2 py-2 text-center text-[6px] font-medium text-slate-500">
              Total Orders
            </th>

            <th className="px-2 py-2 text-right text-[6px] font-medium text-slate-500">
              Total Spent
            </th>

            <th className="px-2 py-2 text-center text-[6px] font-medium text-slate-500">
              Customer Type
            </th>

            <th className="px-2 py-2 text-center text-[6px] font-medium text-slate-500">
              Status
            </th>

            <th className="px-3 py-2 text-center text-[6px] font-medium text-slate-500">
              Action
            </th>
          </tr>
        </thead>

        {/* TABLE BODY */}
        <tbody>
          {data.map((customer, index) => (
            <tr
              key={customer.id}
              className="border-b border-slate-50 transition hover:bg-slate-50/50"
            >
              {/* NUMBER */}
              <td className="px-3 py-2 text-center text-[7px] text-slate-500">
                {index + 1}
              </td>

              {/* CUSTOMER */}
              <td className="px-2 py-2">
                <div className="flex items-center gap-2">
                  <img
                    src={customer.avatar}
                    alt={customer.name}
                    className="h-6 w-6 rounded-full object-cover"
                  />

                  <div className="min-w-0">
                    <p className="truncate text-[7px] font-semibold text-slate-700">
                      {customer.name}
                    </p>

                    <p className="mt-0.5 text-[6px] text-slate-400">
                      {customer.id}
                    </p>
                  </div>
                </div>
              </td>

              {/* CONTACT */}
              <td className="px-2 py-2">
                <div>
                  <p className="text-[6px] text-slate-600">{customer.phone}</p>

                  <p className="mt-0.5 max-w-[130px] truncate text-[6px] text-slate-400">
                    {customer.email}
                  </p>
                </div>
              </td>

              {/* LOCATION */}
              <td className="px-2 py-2">
                <p className="max-w-[110px] text-[6px] leading-3 text-slate-600">
                  {customer.location}
                </p>

                <p className="text-[6px] text-slate-400">India</p>
              </td>

              {/* ORDERS */}
              <td className="px-2 py-2 text-center text-[7px] text-slate-700">
                {customer.orders}
              </td>

              {/* SPENT */}
              <td className="px-2 py-2 text-right text-[7px] font-medium text-slate-700">
                {customer.spent}
              </td>

              {/* TYPE */}
              <td className="px-2 py-2 text-center">
                <CustomerType type={customer.type} />
              </td>

              {/* STATUS */}
              <td className="px-2 py-2 text-center">
                <StatusBadge status={customer.status} />
              </td>

              {/* ACTION */}
              <td className="px-3 py-2 text-center">
                <button className="rounded p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700">
                  <FiMoreVertical className="text-[11px]" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

/* =========================================================
   PAGINATION
========================================================= */

const Pagination = () => {
  const [page, setPage] = useState(1);

  return (
    <div className="flex flex-col gap-2 border-t border-slate-100 px-3 py-2.5 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-[6px] text-slate-400">
        Showing 1 to 10 of 8,542 results
      </p>

      <div className="flex items-center gap-1">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          className="flex h-6 w-6 items-center justify-center rounded border border-slate-200 text-[8px] text-slate-500 disabled:opacity-40"
        >
          <FiChevronLeft />
        </button>

        {[1, 2, 3, 4, 5].map((number) => (
          <button
            key={number}
            onClick={() => setPage(number)}
            className={`flex h-6 w-6 items-center justify-center rounded text-[7px] ${
              page === number
                ? "border border-[#d4a04b] bg-[#fffaf2] font-semibold text-[#b47a21]"
                : "text-slate-500 hover:bg-slate-50"
            }`}
          >
            {number}
          </button>
        ))}

        <span className="px-1 text-[7px] text-slate-400">...</span>

        <button
          onClick={() => setPage(855)}
          className={`flex h-6 w-6 items-center justify-center rounded text-[7px] ${
            page === 855
              ? "border border-[#d4a04b] bg-[#fffaf2]"
              : "text-slate-500"
          }`}
        >
          855
        </button>

        <button
          onClick={() => setPage((p) => Math.min(855, p + 1))}
          className="flex h-6 w-6 items-center justify-center rounded border border-slate-200 text-[8px] text-slate-500"
        >
          <FiChevronRight />
        </button>

        <button className="ml-1 flex h-6 items-center gap-1 rounded border border-slate-200 px-2 text-[7px] text-slate-500">
          10 / page
          <FiChevronDown className="text-[8px]" />
        </button>
      </div>
    </div>
  );
};

/* =========================================================
   MAIN PAGE
========================================================= */

const Customers = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const router = useRouter();
  const filteredCustomers = customers.filter((customer) => {
    const matchesSearch =
      customer.name.toLowerCase().includes(search.toLowerCase()) ||
      customer.email.toLowerCase().includes(search.toLowerCase()) ||
      customer.phone.toLowerCase().includes(search.toLowerCase());

    const matchesFilter =
      filter === "All" ||
      customer.type === filter ||
      customer.status === filter;

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-[#fafafa] p-2.5 text-slate-800">
      <div className="mx-auto max-w-[1500px]">
        <PageHeader
          title="Customers"
          description="Manage your customers and their information."
          buttonText="Add Customer"
          onButtonClick={() => router.push("/customers/create")}
        />

        {/* =================================================
            STAT CARDS
        ================================================== */}

        <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
          {stats.map((stat) => (
            <StatCard key={stat.title} {...stat} />
          ))}
        </div>

        {/* =================================================
            CUSTOMER TABLE CARD
        ================================================== */}

        <Card className="mt-2.5 overflow-hidden">
          {/* ===============================================
              TOOLBAR
          ================================================ */}

          <div className="flex flex-col gap-2 border-b border-slate-100 px-3 py-2.5 sm:flex-row sm:items-center sm:justify-between">
            {/* SEARCH */}

            <div className="relative w-full sm:w-[180px]">
              <FiSearch className="absolute left-2 top-1/2 -translate-y-1/2 text-[9px] text-slate-400" />

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search customers..."
                className="h-7 w-full rounded border border-slate-200 bg-white pl-7 pr-2 text-[7px] text-slate-700 outline-none placeholder:text-slate-400 focus:border-[#d4a04b]"
              />
            </div>

            {/* FILTER */}

            <div className="relative">
              <button
                onClick={() =>
                  setFilter(
                    filter === "All"
                      ? "VIP"
                      : filter === "VIP"
                        ? "Regular"
                        : filter === "Regular"
                          ? "New"
                          : "All",
                  )
                }
                className="flex h-7 items-center gap-1.5 rounded border border-slate-200 bg-white px-2.5 text-[7px] text-slate-600 hover:bg-slate-50"
              >
                <FiFilter className="text-[9px]" />
                Filter
                {filter !== "All" && (
                  <span className="font-semibold text-[#c58a2c]">
                    ({filter})
                  </span>
                )}
                <FiChevronDown className="ml-0.5 text-[8px]" />
              </button>
            </div>
          </div>

          {/* ===============================================
              TABLE
          ================================================ */}

          <CustomerTable data={filteredCustomers} />

          {/* ===============================================
              PAGINATION
          ================================================ */}

          <Pagination />
        </Card>
      </div>
    </div>
  );
};

export default Customers;
