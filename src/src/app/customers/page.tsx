"use client";

import PageHeader from "@/components/pageheader/PageHeader";
import StatCard from "@/components/statcard/StatCard";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useMemo, useState } from "react";

import {
  FiChevronDown,
  FiChevronLeft,
  FiChevronRight,
  FiFilter,
  FiMoreVertical,
  FiSearch,
  FiUserPlus,
  FiUserCheck,
  FiEdit2,
  FiEye,
  FiShoppingBag,
  FiTrash2,
  FiCreditCard,
  FiLock,
  FiUnlock,
} from "react-icons/fi";

import { HiOutlineSparkles, HiOutlineUserGroup } from "react-icons/hi2";

type CustomerType = "VIP" | "Regular" | "New";

type CustomerStatus = "pending" | "active" | "inactive" | "blocked";

type Customer = {
  _id: string;

  customerId: string;

  firstName?: string;
  lastName?: string;

  name: string;

  email: string;
  phone?: string;

  profileImage?: string;

  status: CustomerStatus;

  emailVerified: boolean;

  provider: "email" | "google";

  createdAt: string;
  updatedAt: string;
  lastLogin?: string;

  orders: {
    count: number;
    totalAmount: number;

    completed: number;
    pending: number;
    cancelled: number;
  };

  customerType: CustomerType;
};

type CustomerStats = {
  totalCustomers: number;
  newCustomers: number;
  vipCustomers: number;
  activeCustomers: number;
};

type Pagination = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;

  hasNextPage: boolean;
  hasPreviousPage: boolean;
};

type CustomersResponse = {
  success: boolean;

  data: Customer[];

  stats: CustomerStats;

  pagination: Pagination;

  message?: string;
};

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount || 0);
};

const getCustomerName = (customer: Customer) => {
  if (customer.name) {
    return customer.name;
  }

  return (
    [customer.firstName, customer.lastName].filter(Boolean).join(" ") ||
    "Unknown Customer"
  );
};

const CustomerTypeBadge = ({ type }: { type: CustomerType }) => {
  const styles: Record<CustomerType, string> = {
    VIP: "bg-red-50 text-red-500",

    Regular: "border border-slate-200 bg-slate-50 text-slate-500",

    New: "bg-blue-50 text-blue-500",
  };

  return (
    <span
      className={`inline-flex rounded px-1.5 py-[2px] text-[12px] font-medium ${styles[type]}`}
    >
      {type}
    </span>
  );
};

const StatusBadge = ({ status }: { status: CustomerStatus }) => {
  const statusConfig: Record<
    CustomerStatus,
    {
      label: string;
      className: string;
    }
  > = {
    active: {
      label: "Active",
      className: "bg-emerald-50 text-emerald-500",
    },

    inactive: {
      label: "Inactive",
      className: "bg-slate-50 text-slate-500",
    },

    pending: {
      label: "Pending",
      className: "bg-yellow-50 text-yellow-600",
    },

    blocked: {
      label: "Blocked",
      className: "bg-red-50 text-red-500",
    },
  };

  const config = statusConfig[status];

  return (
    <span
      className={`inline-flex rounded px-1.5 py-[2px] text-[12px] font-medium ${config.className}`}
    >
      {config.label}
    </span>
  );
};

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
   CUSTOMER TABLE
========================================================= */

const CustomerTable = ({
  data,
  loading,
  onView,
  onEdit,
  onDelete,
  onOrders,
  onPayments,
  onToggleStatus,
}: {
  data: Customer[];
  loading: boolean;

  onView: (customer: Customer) => void;
  onEdit: (customer: Customer) => void;
  onDelete: (customer: Customer) => void;
  onOrders: (customer: Customer) => void;
  onPayments: (customer: Customer) => void;
  onToggleStatus: (customer: Customer) => void;
}) => {
  /* =====================================================
     ACTION MENU STATE
  ===================================================== */

  const [openActionId, setOpenActionId] = useState<string | null>(null);

  /* =====================================================
     CLOSE ACTION MENU
  ===================================================== */

  useEffect(() => {
    const handleClickOutside = () => {
      setOpenActionId(null);
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative w-full">
      {/* IMPORTANT:
          overflow-x-auto can clip absolute dropdowns.
          Keep horizontal scrolling on a wrapper and
          make the action menu fixed-position if needed.
      */}

      <div className="overflow-x-auto">
        <table className="w-full min-w-[1100px]">
          {/* =================================================
              TABLE HEADER
          ================================================= */}

          <thead>
            <tr className="border-y border-slate-100 bg-[#fcfcfc]">
              <th className="w-8 px-3 py-2 text-center text-[12px] font-semibold text-[#666]">
                #
              </th>

              <th className="px-2 py-2 text-left text-[12px] font-semibold text-[#666]">
                Customer
              </th>

              <th className="px-2 py-2 text-left text-[12px] font-semibold text-[#666]">
                Contact
              </th>

              <th className="px-2 py-2 text-left text-[12px] font-semibold text-[#666]">
                LOCATION
              </th>

              <th className="px-2 py-2 text-left text-[12px] font-semibold text-[#666]">
                Orders
              </th>

              <th className="px-2 py-2 text-right text-[12px] font-semibold text-[#666]">
                Total Spent
              </th>

              <th className="px-2 py-2 text-center text-[12px] font-semibold text-[#666]">
                Customer Type
              </th>

              <th className="px-2 py-2 text-center text-[12px] font-semibold text-[#666]">
                Status
              </th>

              <th className="px-3 py-2 text-center text-[12px] font-semibold text-[#666]">
                Action
              </th>
            </tr>
          </thead>

          {/* =================================================
              TABLE BODY
          ================================================= */}

          <tbody>
            {loading ? (
              <tr>
                <td colSpan={9} className="py-12 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-[#e5e5e5] border-t-[#bd7f1d]" />

                    <span className="text-[11px] text-[#777]">
                      Loading Customers...
                    </span>
                  </div>
                </td>
              </tr>
            ) : data.length === 0 ? (
              <tr>
                <td colSpan={9} className="px-4 py-12 text-center">
                  <div className="text-sm font-medium text-slate-500">
                    No customers found
                  </div>

                  <p className="mt-1 text-xs text-slate-400">
                    Try changing your search or filter.
                  </p>
                </td>
              </tr>
            ) : (
              data.map((customer, index) => {
                const customerName = getCustomerName(customer);

                /*
                 * Check whether THIS customer's
                 * action menu is open.
                 */
                const actionOpen = openActionId === customer._id;

                return (
                  <tr
                    key={customer._id}
                    className="border-b border-[#eeeeee] transition hover:bg-[#fffdf9]"
                  >
                    {/* =================================================
                        NUMBER
                    ================================================= */}

                    <td className="px-3 py-2 text-center text-[10px] text-slate-500">
                      {index + 1}
                    </td>

                    {/* =================================================
                        CUSTOMER
                    ================================================= */}

                    <td className="px-2 py-2">
                      <div className="flex items-center gap-2">
                        {customer.profileImage ? (
                          <img
                            src={customer.profileImage}
                            alt={customerName}
                            className="h-7 w-7 shrink-0 rounded-full object-cover"
                          />
                        ) : (
                          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#fff7ed] text-[12px] font-semibold text-[#ff6900]">
                            {customerName.charAt(0).toUpperCase()}
                          </div>
                        )}

                        <div className="min-w-0">
                          <p className="truncate text-[12px] font-semibold text-slate-700">
                            {customerName}
                          </p>

                          <p className="mt-0.5 text-[10px] text-slate-400">
                            {customer.customerId}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* =================================================
                        CONTACT
                    ================================================= */}

                    <td className="px-2 py-2">
                      <div>
                        <p className="text-[12px] text-slate-600">
                          {customer.phone || "-"}
                        </p>

                        <p className="mt-0.5 max-w-[190px] truncate text-[12px] text-slate-400">
                          {customer.email}
                        </p>
                      </div>
                    </td>

                    {/* =================================================
                        LOCATION
                    ================================================= */}

                    <td className="px-2 py-2 text-left">
                      <div>
                        <p className="text-[12px] font-semibold text-slate-700">
                          khora , up
                        </p>

                        <p className="mt-0.5 max-w-[190px] truncate text-[12px] text-slate-400">
                          India
                        </p>
                      </div>
                    </td>

                    {/* =================================================
                        ORDERS
                    ================================================= */}

                    <td className="px-2 py-2">
                      <div>
                        <p className="text-[12px] font-semibold text-slate-700">
                          {customer.orders.count}
                        </p>

                        <p className="mt-0.5 text-[10px] text-slate-400">
                          {formatCurrency(customer.orders.totalAmount)}
                        </p>
                      </div>
                    </td>

                    {/* =================================================
                        TOTAL SPENT
                    ================================================= */}

                    <td className="px-2 py-2 text-right">
                      <p className="text-[12px] font-bold text-slate-700">
                        {formatCurrency(customer.orders.totalAmount)}
                      </p>
                    </td>

                    {/* =================================================
                        TYPE
                    ================================================= */}

                    <td className="px-2 py-2 text-center">
                      <CustomerTypeBadge type={customer.customerType} />
                    </td>

                    {/* =================================================
                        STATUS
                    ================================================= */}

                    <td className="px-2 py-2 text-center">
                      <StatusBadge status={customer.status} />
                    </td>

                    {/* =================================================
                        ACTION
                    ================================================= */}

                    <td className="relative px-3 py-2 text-center">
                      <button
                        type="button"
                        title="Actions"
                        onClick={(e) => {
                          e.stopPropagation();

                          setOpenActionId(actionOpen ? null : customer._id);
                        }}
                        className={`rounded-md p-1.5 transition ${
                          actionOpen
                            ? "bg-[#fff7ed] text-[#bd7f1d]"
                            : "text-slate-400 hover:bg-slate-100 hover:text-[#bd7f1d]"
                        }`}
                      >
                        <FiMoreVertical className="text-[14px]" />
                      </button>

                      {/* =================================================
                          ACTION MENU
                      ================================================= */}

                      {actionOpen && (
                        <div
                          onClick={(e) => e.stopPropagation()}
                          className="absolute right-3 top-full z-[9999] mt-1 w-[160px] overflow-hidden rounded-lg border border-slate-200 bg-white py-1 text-left shadow-xl"
                        >
                          {/* VIEW */}

                          <button
                            type="button"
                            onClick={() => {
                              setOpenActionId(null);

                              onView(customer);
                            }}
                            className="flex w-full items-center gap-2 px-3 py-2 text-[12px] text-slate-600 transition hover:bg-slate-50 hover:text-[#bd7f1d]"
                          >
                            <FiEye className="text-[14px]" />

                            <span>View</span>
                          </button>

                          {/* EDIT */}

                          <button
                            type="button"
                            onClick={() => {
                              setOpenActionId(null);

                              onEdit(customer);
                            }}
                            className="flex w-full items-center gap-2 px-3 py-2 text-[12px] text-slate-600 transition hover:bg-slate-50 hover:text-[#bd7f1d]"
                          >
                            <FiEdit2 className="text-[14px]" />

                            <span>Edit</span>
                          </button>

                          {/* ORDERS */}

                          <button
                            type="button"
                            onClick={() => {
                              setOpenActionId(null);

                              onOrders(customer);
                            }}
                            className="flex w-full items-center gap-2 px-3 py-2 text-[12px] text-slate-600 transition hover:bg-slate-50 hover:text-[#bd7f1d]"
                          >
                            <FiShoppingBag className="text-[14px]" />

                            <span>Orders</span>
                          </button>

                          {/* PAYMENTS */}

                          <button
                            type="button"
                            onClick={() => {
                              setOpenActionId(null);

                              onPayments(customer);
                            }}
                            className="flex w-full items-center gap-2 px-3 py-2 text-[12px] text-slate-600 transition hover:bg-slate-50 hover:text-[#bd7f1d]"
                          >
                            <FiCreditCard className="text-[14px]" />

                            <span>Payments</span>
                          </button>

                          {/* DIVIDER */}

                          <div className="my-1 border-t border-slate-100" />

                          {/* BLOCK / ACTIVATE */}

                          <button
                            type="button"
                            onClick={() => {
                              setOpenActionId(null);

                              onToggleStatus(customer);
                            }}
                            className="flex w-full items-center gap-2 px-3 py-2 text-[12px] text-slate-600 transition hover:bg-slate-50 hover:text-[#bd7f1d]"
                          >
                            <FiLock className="text-[14px]" />

                            <span>
                              {customer.status === "active"
                                ? "Block"
                                : "Activate"}
                            </span>
                          </button>

                          {/* DELETE */}

                          <button
                            type="button"
                            onClick={() => {
                              setOpenActionId(null);

                              onDelete(customer);
                            }}
                            className="flex w-full items-center gap-2 px-3 py-2 text-[12px] text-red-500 transition hover:bg-red-50"
                          >
                            <FiTrash2 className="text-[14px]" />

                            <span>Delete</span>
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
/* =========================================================
   PAGINATION
========================================================= */

const Pagination = ({
  pagination,
  onPageChange,
  onLimitChange,
}: {
  pagination: Pagination;
  onPageChange: (page: number) => void;
  onLimitChange: (limit: number) => void;
}) => {
  const { page, limit, total, totalPages, hasNextPage, hasPreviousPage } =
    pagination;

  const visiblePages = useMemo(() => {
    const pages: number[] = [];

    const start = Math.max(1, page - 2);
    const end = Math.min(totalPages, page + 2);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  }, [page, totalPages]);

  const from = total === 0 ? 0 : (page - 1) * limit + 1;

  const to = Math.min(page * limit, total);

  return (
    <div className="flex flex-col gap-2 border-t border-slate-100 px-3 py-2.5 sm:flex-row sm:items-center sm:justify-between">
      {/* RESULT COUNT */}

      <p className="text-[12px] text-slate-400">
        Showing {from} to {to} of {total.toLocaleString("en-IN")} results
      </p>

      {/* PAGINATION */}

      <div className="flex items-center gap-1">
        {/* PREVIOUS */}

        <button
          type="button"
          disabled={!hasPreviousPage}
          onClick={() => onPageChange(page - 1)}
          className="flex h-6 w-6 items-center justify-center rounded border border-slate-200 text-[12px] text-slate-500 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <FiChevronLeft />
        </button>

        {/* FIRST PAGE */}

        {page > 3 && (
          <>
            <button
              type="button"
              onClick={() => onPageChange(1)}
              className="flex h-6 w-6 items-center justify-center rounded text-[12px] text-slate-500 hover:bg-slate-50"
            >
              1
            </button>

            <span className="px-1 text-[8px] text-slate-400">...</span>
          </>
        )}

        {/* PAGES */}

        {visiblePages.map((number) => (
          <button
            key={number}
            type="button"
            onClick={() => onPageChange(number)}
            className={`flex h-6 w-6 items-center justify-center rounded text-[12px] ${
              page === number
                ? "border border-[#d4a04b] bg-[#fffaf2] font-semibold text-[#b47a21]"
                : "text-slate-500 hover:bg-slate-50"
            }`}
          >
            {number}
          </button>
        ))}

        {/* LAST PAGE */}

        {page < totalPages - 2 && (
          <>
            <span className="px-1 text-[8px] text-slate-400">...</span>

            <button
              type="button"
              onClick={() => onPageChange(totalPages)}
              className="flex h-6 w-6 items-center justify-center rounded text-[12px] text-slate-500 hover:bg-slate-50"
            >
              {totalPages}
            </button>
          </>
        )}

        {/* NEXT */}

        <button
          type="button"
          disabled={!hasNextPage}
          onClick={() => onPageChange(page + 1)}
          className="flex h-6 w-6 items-center justify-center rounded border border-slate-200 text-[12px] text-slate-500 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <FiChevronRight />
        </button>

        {/* LIMIT */}

        <select
          value={limit}
          onChange={(e) => onLimitChange(Number(e.target.value))}
          className="ml-1 h-6 rounded border border-slate-200 bg-white px-1 text-[11px] text-slate-500 outline-none"
        >
          <option value={10}>10 / page</option>
          <option value={20}>20 / page</option>
          <option value={50}>50 / page</option>
          <option value={100}>100 / page</option>
        </select>
      </div>
    </div>
  );
};

/* =========================================================
   MAIN PAGE
========================================================= */

const Customers = () => {
  const router = useRouter();

  /* -----------------------------
     STATE
  ----------------------------- */

  const [customers, setCustomers] = useState<Customer[]>([]);

  const [statsData, setStatsData] = useState<CustomerStats>({
    totalCustomers: 0,
    newCustomers: 0,
    vipCustomers: 0,
    activeCustomers: 0,
  });

  const [pagination, setPagination] = useState<Pagination>({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
    hasNextPage: false,
    hasPreviousPage: false,
  });

  const [search, setSearch] = useState("");

  const [filter, setFilter] = useState("All");

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  /* =========================================================
     FETCH CUSTOMERS
  ========================================================= */

  const fetchCustomers = useCallback(
    async (
      currentPage = pagination.page,
      currentLimit = pagination.limit,
      currentSearch = search,
      currentFilter = filter,
    ) => {
      try {
        setLoading(true);
        setError("");

        const params = new URLSearchParams();

        params.set("page", String(currentPage));
        params.set("limit", String(currentLimit));

        if (currentSearch.trim()) {
          params.set("search", currentSearch.trim());
        }

        if (currentFilter !== "All") {
          params.set("filter", currentFilter);
        }

        const response = await fetch(`/api/customers?${params.toString()}`, {
          method: "GET",
          cache: "no-store",
        });

        const result: CustomersResponse = await response.json();

        if (!response.ok || !result.success) {
          throw new Error(result.message || "Failed to fetch customers");
        }

        setCustomers(result.data);

        setStatsData(result.stats);

        setPagination(result.pagination);
      } catch (error) {
        console.error("CUSTOMERS FETCH ERROR:", error);

        setError(
          error instanceof Error ? error.message : "Failed to fetch customers",
        );

        setCustomers([]);
      } finally {
        setLoading(false);
      }
    },
    [pagination.page, pagination.limit, search, filter],
  );

  /* =========================================================
     INITIAL LOAD
  ========================================================= */

  useEffect(() => {
    fetchCustomers(1, 10, "", "All");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* =========================================================
     SEARCH
  ========================================================= */

  const handleSearch = (value: string) => {
    setSearch(value);

    /*
     * Search is sent to the API.
     *
     * Reset pagination whenever search changes.
     */

    if (!value.trim()) {
      fetchCustomers(1, pagination.limit, "", filter);

      return;
    }

    fetchCustomers(1, pagination.limit, value, filter);
  };

  /* =========================================================
     FILTER
  ========================================================= */

  const handleFilter = (newFilter: string) => {
    setFilter(newFilter);

    fetchCustomers(1, pagination.limit, search, newFilter);
  };

  /* =========================================================
     PAGE
  ========================================================= */

  const handlePageChange = (newPage: number) => {
    if (newPage < 1) return;

    if (pagination.totalPages && newPage > pagination.totalPages) {
      return;
    }

    fetchCustomers(newPage, pagination.limit, search, filter);
  };

  /* =========================================================
     LIMIT
  ========================================================= */

  const handleLimitChange = (newLimit: number) => {
    fetchCustomers(1, newLimit, search, filter);
  };

  /* =========================================================
     CUSTOMER ACTION
  ========================================================= */

  const handleCustomerAction = (customer: Customer) => {
    /*
     * Later you can open your action modal here:
     *
     * View
     * Edit
     * Orders
     * Payments
     * Delete
     */

    console.log("Customer action:", customer);
  };

  /* =========================================================
     STATS
  ========================================================= */

  const stats = [
    {
      title: "Total Customers",

      value: statsData.totalCustomers.toLocaleString("en-IN"),

      change: "15.3%",

      icon: <HiOutlineUserGroup />,

      iconBg: "bg-orange-50",

      iconColor: "text-orange-500",

      positive: true,
    },

    {
      title: "New Customers",

      value: statsData.newCustomers.toLocaleString("en-IN"),

      change: "12.5%",

      icon: <FiUserPlus />,

      iconBg: "bg-cyan-50",

      iconColor: "text-cyan-500",

      positive: true,
    },

    {
      title: "VIP Customers",

      value: statsData.vipCustomers.toLocaleString("en-IN"),

      change: "8.7%",

      icon: <HiOutlineSparkles />,

      iconBg: "bg-orange-50",

      iconColor: "text-orange-500",

      positive: true,
    },

    {
      title: "Active Customers",

      value: statsData.activeCustomers.toLocaleString("en-IN"),

      change: "16.2%",

      icon: <FiUserCheck />,

      iconBg: "bg-emerald-50",

      iconColor: "text-emerald-500",

      positive: true,
    },
  ];

  return (
    <div className="min-h-screen bg-[#fafafa] p-2.5 text-slate-800">
      <div className="mx-auto max-w-[1500px]">
        {/* HEADER */}

        <PageHeader
          title="Customers"
          description="Manage your customers, orders and payments."
          buttonText="Add Customer"
          onButtonClick={() => router.push("/customers/create")}
        />

        {/* STATS */}

        <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
          {stats.map((stat) => (
            <StatCard key={stat.title} {...stat} />
          ))}
        </div>

        {/* MAIN CARD */}

        <Card className="mt-2.5 overflow-hidden">
          {/* TOOLBAR */}

          <div className="flex flex-col gap-2 border-b border-slate-100 px-3 py-2.5 sm:flex-row sm:items-center sm:justify-between">
            {/* SEARCH */}

            <div className="relative w-full sm:w-[300px]">
              <FiSearch className="absolute left-2 top-1/2 -translate-y-1/2 text-[14px] text-slate-400" />

              <input
                type="text"
                value={search}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="Search customers..."
                className="h-9 w-full rounded border border-slate-200 bg-white pl-7 pr-2 text-[12px] text-slate-700 outline-none placeholder:text-slate-400 focus:border-[#d4a04b]"
              />
            </div>

            {/* FILTER */}

            <div className="relative">
              <select
                value={filter}
                onChange={(e) => handleFilter(e.target.value)}
                className="flex h-9 appearance-none items-center rounded border border-slate-200 bg-white pl-8 pr-8 text-[12px] text-slate-600 outline-none hover:bg-slate-50 focus:border-[#d4a04b]"
              >
                <option value="All">All Customers</option>

                <option value="VIP">VIP</option>

                <option value="Regular">Regular</option>

                <option value="New">New</option>

                <option value="Active">Active</option>

                <option value="Inactive">Inactive</option>

                <option value="blocked">Blocked</option>

                <option value="pending">Pending</option>
              </select>

              <FiFilter className="pointer-events-none absolute left-2 top-1/2 -translate-y-1/2 text-[14px] text-slate-500" />

              <FiChevronDown className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-[14px] text-slate-500" />
            </div>
          </div>

          {/* ERROR */}

          {error && (
            <div className="border-b border-red-100 bg-red-50 px-3 py-2">
              <p className="text-[12px] text-red-500">{error}</p>
            </div>
          )}

          {/* TABLE */}

          <CustomerTable
            data={customers}
            loading={loading}
            onView={(customer) => {
              router.push(`/customers/${customer._id}`);
            }}
            onEdit={(customer) => {
              router.push(`/customers/${customer._id}/edit`);
            }}
            onOrders={(customer) => {
              router.push(`/customers/${customer._id}/orders`);
            }}
            onPayments={(customer) => {
              router.push(`/customers/${customer._id}/payments`);
            }}
            onToggleStatus={(customer) => {
              console.log("Toggle status:", customer);

              // Later:
              // PATCH /api/customers/:id
            }}
            onDelete={(customer) => {
              console.log("Delete customer:", customer);

              // Later:
              // DELETE /api/customers/:id
            }}
          />

          {/* PAGINATION */}

          <Pagination
            pagination={pagination}
            onPageChange={handlePageChange}
            onLimitChange={handleLimitChange}
          />
        </Card>
      </div>
    </div>
  );
};

export default Customers;
