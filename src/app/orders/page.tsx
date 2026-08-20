"use client";

import React, { useState } from "react";
import {
  MdAdd,
  MdCalendarToday,
  MdCheckCircle,
  MdClose,
  MdDownload,
  MdFilterList,
  MdInventory2,
  MdLocalShipping,
  MdMoreVert,
  MdOutlineAccessTime,
  MdOutlineCall,
  MdOutlineEmail,
  MdOutlinePrint,
  MdPerson,
  MdSearch,
  MdSettings,
  MdVisibility,
  MdKeyboardArrowDown,
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdPayments,
  MdCancel,
  MdShoppingBag,
  MdDiamond,
} from "react-icons/md";

interface Order {
  id: string;
  customer: string;
  phone: string;
  items: string;
  amount: string;
  payment: "Paid" | "COD";
  paymentMethod: string;
  status: "Processing" | "Shipped" | "Pending" | "Delivered" | "Confirmed";
  date: string;
  time: string;
  channel: "Website" | "Mobile App";
  avatar: string;
}

const orders: Order[] = [
  {
    id: "#ORD12584",
    customer: "Rahul Verma",
    phone: "+91 98765 43210",
    items: "1 Item",
    amount: "₹52,600",
    payment: "Paid",
    paymentMethod: "UPI",
    status: "Processing",
    date: "18 May 2025",
    time: "10:30 AM",
    channel: "Website",
    avatar: "RV",
  },
  {
    id: "#ORD12583",
    customer: "Priya Sharma",
    phone: "+91 87654 32109",
    items: "2 Items",
    amount: "₹38,900",
    payment: "Paid",
    paymentMethod: "UPI",
    status: "Shipped",
    date: "18 May 2025",
    time: "09:15 AM",
    channel: "Mobile App",
    avatar: "PS",
  },
  {
    id: "#ORD12582",
    customer: "Amit Singh",
    phone: "+91 65432 21098",
    items: "1 Item",
    amount: "₹26,500",
    payment: "COD",
    paymentMethod: "",
    status: "Pending",
    date: "18 May 2025",
    time: "08:45 AM",
    channel: "Website",
    avatar: "AS",
  },
  {
    id: "#ORD12581",
    customer: "Neha Kapoor",
    phone: "+91 65432 10987",
    items: "1 Item",
    amount: "₹18,750",
    payment: "Paid",
    paymentMethod: "Card",
    status: "Delivered",
    date: "17 May 2025",
    time: "06:20 PM",
    channel: "Website",
    avatar: "NK",
  },
  {
    id: "#ORD12580",
    customer: "Vikram Joshi",
    phone: "+91 43210 98765",
    items: "2 Items",
    amount: "₹22,400",
    payment: "Paid",
    paymentMethod: "UPI",
    status: "Confirmed",
    date: "17 May 2025",
    time: "04:10 PM",
    channel: "Mobile App",
    avatar: "VJ",
  },
  {
    id: "#ORD12579",
    customer: "Kavya Reddy",
    phone: "+91 43210 98765",
    items: "3 Items",
    amount: "₹74,300",
    payment: "Paid",
    paymentMethod: "Card",
    status: "Shipped",
    date: "17 May 2025",
    time: "03:25 PM",
    channel: "Website",
    avatar: "KR",
  },
  {
    id: "#ORD12578",
    customer: "Sanjay Mehta",
    phone: "+91 32109 87654",
    items: "1 Item",
    amount: "₹15,600",
    payment: "COD",
    paymentMethod: "",
    status: "Pending",
    date: "17 May 2025",
    time: "02:40 PM",
    channel: "Website",
    avatar: "SM",
  },
  {
    id: "#ORD12577",
    customer: "Anjali Desai",
    phone: "+91 21098 76543",
    items: "2 Items",
    amount: "₹31,200",
    payment: "Paid",
    paymentMethod: "UPI",
    status: "Delivered",
    date: "17 May 2025",
    time: "01:15 PM",
    channel: "Mobile App",
    avatar: "AD",
  },
  {
    id: "#ORD12576",
    customer: "Rohit Patel",
    phone: "+91 10987 65432",
    items: "2 Items",
    amount: "₹61,800",
    payment: "Paid",
    paymentMethod: "Card",
    status: "Processing",
    date: "17 May 2025",
    time: "12:50 PM",
    channel: "Website",
    avatar: "RP",
  },
  {
    id: "#ORD12575",
    customer: "Meera Iyer",
    phone: "+91 09876 54321",
    items: "1 Item",
    amount: "₹27,450",
    payment: "Paid",
    paymentMethod: "UPI",
    status: "Confirmed",
    date: "17 May 2025",
    time: "11:30 AM",
    channel: "Website",
    avatar: "MI",
  },
];

const stats = [
  {
    title: "Total Orders",
    value: "1,284",
    subtitle: "All Time",
    icon: MdShoppingBag,
    bg: "bg-[#f0edff]",
    iconColor: "text-[#8169d5]",
  },
  {
    title: "Pending",
    value: "46",
    subtitle: "3.6% of total",
    icon: MdOutlineAccessTime,
    bg: "bg-[#fff5df]",
    iconColor: "text-[#e0a12c]",
  },
  {
    title: "Processing",
    value: "312",
    subtitle: "24.3% of total",
    icon: MdSettings,
    bg: "bg-[#eaf3ff]",
    iconColor: "text-[#5586d8]",
  },
  {
    title: "Shipped",
    value: "428",
    subtitle: "33.3% of total",
    icon: MdLocalShipping,
    bg: "bg-[#f0eaff]",
    iconColor: "text-[#8d6ad2]",
  },
  {
    title: "Delivered",
    value: "892",
    subtitle: "69.5% of total",
    icon: MdCheckCircle,
    bg: "bg-[#e9f8eb]",
    iconColor: "text-[#42a761]",
  },
  {
    title: "Cancelled",
    value: "68",
    subtitle: "5.3% of total",
    icon: MdCancel,
    bg: "bg-[#ffecef]",
    iconColor: "text-[#df6178]",
  },
];

export default function OrdersPage() {
  const [selectedOrder, setSelectedOrder] = useState<Order>(orders[0]);

  return (
    <div className="min-h-screen bg-[#fafafa] p-3 font-sans text-[#292d32]">
      <div className="w-full space-y-3">
        {/* =====================================================
            PAGE HEADER
        ====================================================== */}

        <div>
          <h1 className="text-[16px] font-semibold text-[#24282d]">Orders</h1>

          <div className="mt-0.5 flex items-center gap-1 text-[8px] text-[#8b8e92]">
            <span>Dashboard</span>
            <span>›</span>
            <span>Orders</span>
          </div>
        </div>

        {/* =====================================================
            ORDER STATS
        ====================================================== */}

        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 xl:grid-cols-6">
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.title}
                className="
                  flex
                  items-center
                  gap-3
                  rounded-[7px]
                  border
                  border-[#e9e5df]
                  bg-white
                  px-3
                  py-2.5
                "
              >
                <div
                  className={`
                    flex
                    h-[36px]
                    w-[36px]
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    ${stat.bg}
                    ${stat.iconColor}
                  `}
                >
                  <Icon className="text-[18px]" />
                </div>

                <div>
                  <p className="text-[8px] font-medium text-[#65696e]">
                    {stat.title}
                  </p>

                  <p className="mt-0.5 text-[16px] font-semibold leading-4 text-[#282c31]">
                    {stat.value}
                  </p>

                  <p className="mt-1 text-[7px] text-[#96999d]">
                    {stat.subtitle}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* =====================================================
            MAIN ORDERS AREA
        ====================================================== */}

        <div className="grid grid-cols-1 gap-2 xl:grid-cols-[minmax(0,1fr)_235px]">
          {/* LEFT */}
          <div
            className="
              min-w-0
              overflow-hidden
              rounded-[7px]
              border
              border-[#e9e5df]
              bg-white
            "
          >
            {/* Filters */}
            <OrderFilters />

            {/* Table */}
            <OrdersTable
              orders={orders}
              selectedOrder={selectedOrder}
              onSelectOrder={setSelectedOrder}
            />

            {/* Pagination */}
            <Pagination />
          </div>

          {/* RIGHT */}
          <OrderDetails order={selectedOrder} />
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   FILTERS
============================================================ */

function OrderFilters() {
  return (
    <div className="border-b border-[#eeeae4] p-2.5">
      <div className="flex flex-col gap-2 xl:flex-row">
        {/* Search */}
        <div className="relative min-w-0 flex-1">
          <MdSearch
            className="
              pointer-events-none
              absolute
              left-2.5
              top-1/2
              -translate-y-1/2
              text-[14px]
              text-[#969ba0]
            "
          />

          <input
            type="text"
            placeholder="Search by Order ID, Customer, Phone, Email..."
            className="
              h-[30px]
              w-full
              rounded-[4px]
              border
              border-[#e4e1dc]
              bg-white
              pl-8
              pr-2
              text-[8px]
              text-[#444]
              outline-none
              placeholder:text-[#9a9da1]
              focus:border-[#c69a45]
            "
          />
        </div>

        {/* Date */}
        <FilterButton
          text="01 May 2025 - 18 May 2025"
          icon={<MdCalendarToday />}
          wide
        />

        <FilterButton text="All Status" />

        <FilterButton text="All Payment Status" />

        <FilterButton text="All Channels" />

        <button
          type="button"
          className="
            flex
            h-[30px]
            shrink-0
            items-center
            justify-center
            gap-1
            rounded-[4px]
            border
            border-[#e2c48f]
            bg-white
            px-3
            text-[8px]
            font-medium
            text-[#c08d35]
            hover:bg-[#fff9ee]
          "
        >
          <MdFilterList className="text-[13px]" />
          Filters
        </button>

        <button
          type="button"
          className="
            h-[30px]
            shrink-0
            px-1
            text-[8px]
            text-[#c29343]
          "
        >
          Reset
        </button>
      </div>
    </div>
  );
}

/* ============================================================
   FILTER BUTTON
============================================================ */

function FilterButton({
  text,
  icon,
  wide = false,
}: {
  text: string;
  icon?: React.ReactNode;
  wide?: boolean;
}) {
  return (
    <button
      type="button"
      className={`
        flex
        h-[30px]
        shrink-0
        items-center
        justify-between
        gap-2
        rounded-[4px]
        border
        border-[#e4e1dc]
        bg-white
        px-2.5
        text-[8px]
        text-[#5f6368]
        hover:bg-[#faf9f6]
        ${wide ? "min-w-[145px]" : "min-w-[100px]"}
      `}
    >
      <span className="flex items-center gap-1.5">
        {icon && <span className="text-[12px] text-[#7d8185]">{icon}</span>}

        {text}
      </span>

      {!icon && <MdKeyboardArrowDown className="text-[13px] text-[#8a8d91]" />}
    </button>
  );
}

/* ============================================================
   TABLE
============================================================ */

function OrdersTable({
  orders,
  selectedOrder,
  onSelectOrder,
}: {
  orders: Order[];
  selectedOrder: Order;
  onSelectOrder: (order: Order) => void;
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[900px] border-collapse">
        <thead>
          <tr className="border-b border-[#eeeae4] bg-[#fdfcfb]">
            <th className="w-[35px] px-2 py-2 text-center">
              <input
                type="checkbox"
                className="h-[11px] w-[11px] accent-[#c49643]"
              />
            </th>

            <TableHead text="Order ID" />
            <TableHead text="Customer" />
            <TableHead text="Amount" />
            <TableHead text="Payment" />
            <TableHead text="Status" />
            <TableHead text="Date" />
            <TableHead text="Channel" />
            <TableHead text="Action" right />
          </tr>
        </thead>

        <tbody>
          {orders.map((order) => {
            const selected = selectedOrder.id === order.id;

            return (
              <tr
                key={order.id}
                onClick={() => onSelectOrder(order)}
                className={`
                  cursor-pointer
                  border-b
                  border-[#f0ede8]
                  transition
                  hover:bg-[#fcfaf6]
                  ${selected ? "bg-[#fffaf0]" : "bg-white"}
                `}
              >
                <td
                  className="px-2 py-2 text-center"
                  onClick={(e) => e.stopPropagation()}
                >
                  <input
                    type="checkbox"
                    className="h-[11px] w-[11px] accent-[#c49643]"
                  />
                </td>

                <td className="px-1 py-2">
                  <span className="text-[8px] font-medium text-[#444]">
                    {order.id}
                  </span>
                </td>

                {/* Customer */}
                <td className="px-1 py-2">
                  <div className="flex items-center gap-2">
                    <Avatar text={order.avatar} />

                    <div>
                      <p className="whitespace-nowrap text-[8px] font-medium text-[#363a3f]">
                        {order.customer}
                      </p>

                      <p className="mt-0.5 whitespace-nowrap text-[7px] text-[#777c81]">
                        {order.phone}
                      </p>
                    </div>
                  </div>
                </td>

                {/* Amount */}
                <td className="px-1 py-2">
                  <p className="text-[8px] font-medium text-[#3d4146]">
                    {order.amount}
                  </p>

                  <p className="mt-0.5 text-[7px] text-[#777]">{order.items}</p>
                </td>

                {/* Payment */}
                <td className="px-1 py-2">
                  <PaymentBadge payment={order.payment} />

                  {order.paymentMethod && (
                    <p className="mt-1 text-[7px] text-[#777]">
                      {order.paymentMethod}
                    </p>
                  )}
                </td>

                {/* Status */}
                <td className="px-1 py-2">
                  <OrderStatusBadge status={order.status} />
                </td>

                {/* Date */}
                <td className="px-1 py-2">
                  <p className="whitespace-nowrap text-[7px] text-[#4d5156]">
                    {order.date}
                  </p>

                  <p className="mt-0.5 text-[7px] text-[#777]">{order.time}</p>
                </td>

                {/* Channel */}
                <td className="px-1 py-2">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[11px] text-[#676c71]">
                      {order.channel === "Website" ? "◉" : "▯"}
                    </span>

                    <span className="text-[7px] text-[#555]">
                      {order.channel}
                    </span>
                  </div>
                </td>

                {/* Action */}
                <td
                  className="px-2 py-2 text-right"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-center justify-end gap-2">
                    <button
                      type="button"
                      className="text-[#6e7277] hover:text-[#c39442]"
                    >
                      <MdVisibility className="text-[13px]" />
                    </button>

                    <button
                      type="button"
                      className="text-[#6e7277] hover:text-[#c39442]"
                    >
                      <MdMoreVert className="text-[14px]" />
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

/* ============================================================
   TABLE HEAD
============================================================ */

function TableHead({ text, right = false }: { text: string; right?: boolean }) {
  return (
    <th
      className={`
        px-1
        py-2
        text-[7px]
        font-semibold
        text-[#555a5f]
        ${right ? "text-right" : "text-left"}
      `}
    >
      {text}
    </th>
  );
}

/* ============================================================
   AVATAR
============================================================ */

function Avatar({ text }: { text: string }) {
  return (
    <div
      className="
        flex
        h-[28px]
        w-[28px]
        shrink-0
        items-center
        justify-center
        rounded-full
        bg-gradient-to-br
        from-[#d6c8ae]
        to-[#756d61]
        text-[7px]
        font-semibold
        text-white
      "
    >
      {text}
    </div>
  );
}

/* ============================================================
   PAYMENT BADGE
============================================================ */

function PaymentBadge({ payment }: { payment: "Paid" | "COD" }) {
  return (
    <span
      className={`
        inline-flex
        rounded-[3px]
        px-1.5
        py-0.5
        text-[7px]
        font-medium
        ${payment === "Paid"
          ? "bg-[#e5f6e7] text-[#43a25d]"
          : "bg-[#fff0d4] text-[#d09328]"
        }
      `}
    >
      {payment}
    </span>
  );
}

/* ============================================================
   ORDER STATUS BADGE
============================================================ */

function OrderStatusBadge({ status }: { status: Order["status"] }) {
  const styles: Record<Order["status"], string> = {
    Processing: "bg-[#eee9ff] text-[#7059c5]",
    Shipped: "bg-[#e8f3ff] text-[#3785c0]",
    Pending: "bg-[#fff1d8] text-[#d29225]",
    Delivered: "bg-[#e7f7e9] text-[#46a361]",
    Confirmed: "bg-[#e6f5f8] text-[#348d9d]",
  };

  return (
    <span
      className={`
        inline-flex
        rounded-[3px]
        px-2
        py-1
        text-[7px]
        font-medium
        ${styles[status]}
      `}
    >
      {status}
    </span>
  );
}

/* ============================================================
   PAGINATION
============================================================ */

function Pagination() {
  return (
    <div className="flex items-center justify-between border-t border-[#eeeae4] px-3 py-2">
      <p className="text-[7px] text-[#777c80]">
        Showing 1 to 10 of 1,284 orders
      </p>

      <div className="flex items-center gap-1">
        <PageButton>
          <MdKeyboardArrowLeft />
        </PageButton>

        <PageButton active>1</PageButton>
        <PageButton>2</PageButton>
        <PageButton>3</PageButton>
        <PageButton>4</PageButton>
        <PageButton>5</PageButton>

        <span className="px-1 text-[8px] text-[#888]">...</span>

        <PageButton>129</PageButton>

        <PageButton>
          <MdKeyboardArrowRight />
        </PageButton>

        <button
          type="button"
          className="
            ml-2
            flex
            h-[25px]
            items-center
            gap-2
            rounded-[4px]
            border
            border-[#e5e2dd]
            px-2
            text-[7px]
            text-[#555]
          "
        >
          10 / page
          <MdKeyboardArrowDown className="text-[12px]" />
        </button>
      </div>
    </div>
  );
}

function PageButton({
  children,
  active = false,
}: {
  children: React.ReactNode;
  active?: boolean;
}) {
  return (
    <button
      type="button"
      className={`
        flex
        h-[25px]
        min-w-[25px]
        items-center
        justify-center
        rounded-[4px]
        border
        text-[8px]
        ${active
          ? "border-[#c29443] bg-[#c29443] text-white"
          : "border-[#e5e2dd] bg-white text-[#555] hover:bg-[#faf8f3]"
        }
      `}
    >
      {children}
    </button>
  );
}

/* ============================================================
   ORDER DETAILS
============================================================ */

function OrderDetails({ order }: { order: Order }) {
  return (
    <aside
      className="
        overflow-hidden
        rounded-[7px]
        border
        border-[#e9e5df]
        bg-white
      "
    >
      {/* Header */}
      <div className="border-b border-[#eeeae4] px-3 py-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="text-[10px] font-semibold text-[#292d32]">
              Order {order.id}
            </h2>

            <OrderStatusBadge status={order.status} />
          </div>

          <button type="button" className="text-[#777] hover:text-[#333]">
            <MdClose className="text-[14px]" />
          </button>
        </div>

        <div className="mt-2 flex items-center justify-between">
          <p className="text-[6.5px] text-[#85898d]">
            Order Placed on 18 May 2025, 10:30 AM
          </p>

          <div className="flex gap-2 text-[#72767a]">
            <button type="button">
              <MdOutlinePrint className="text-[12px]" />
            </button>

            <button type="button">
              <MdDownload className="text-[12px]" />
            </button>
          </div>
        </div>
      </div>

      {/* Customer */}
      <DetailsSection title="Customer">
        <div className="flex items-center gap-2">
          <Avatar text={order.avatar} />

          <div className="flex-1">
            <div className="flex items-center justify-between">
              <p className="text-[8px] font-semibold text-[#34383d]">
                {order.customer}
              </p>

              <MdOutlineCall className="text-[13px] text-[#c18e35]" />
            </div>

            <p className="mt-1 text-[7px] text-[#777]">{order.phone}</p>

            <p className="mt-1 text-[7px] text-[#777]">rahul.verma@email.com</p>
          </div>
        </div>

        <button
          type="button"
          className="
            mt-2
            rounded-[4px]
            border
            border-[#e2c48e]
            px-2
            py-1
            text-[7px]
            font-medium
            text-[#bf8e38]
          "
        >
          View Profile
        </button>
      </DetailsSection>

      {/* Order Summary */}
      <DetailsSection title="Order Summary">
        <SummaryRow label="Items Total (1 Item)" value="₹45,000" />

        <SummaryRow label="Making Charges" value="₹4,500" />

        <SummaryRow label="Discount" value="-₹1,800" green />

        <SummaryRow label="Subtotal" value="₹47,700" />

        <SummaryRow label="GST (3%)" value="₹1,431" />

        <div className="mt-2 border-t border-[#eeeae4] pt-2">
          <SummaryRow label="Total Amount" value="₹52,600" bold />
        </div>
      </DetailsSection>

      {/* Payment */}
      <DetailsSection title="Payment Information">
        <SummaryRow label="Method" value="UPI" />
        <SummaryRow label="Transaction ID" value="TXN512345678901" />

        <div className="flex justify-between py-1">
          <span className="text-[7px] text-[#777]">Payment Status</span>

          <PaymentBadge payment="Paid" />
        </div>

        <SummaryRow label="Paid On" value="18 May 2025, 10:31 AM" />
      </DetailsSection>

      {/* Shipping */}
      <DetailsSection title="Shipping Information">
        <p className="text-[7px] font-medium text-[#444]">{order.customer}</p>

        <p className="mt-2 text-[7px] leading-3.5 text-[#777]">
          123, Park Street, Bandra West,
          <br />
          Mumbai, Maharashtra - 400050
          <br />
          +91 98765 43210
        </p>

        <div className="mt-2 flex justify-end">
          <button
            type="button"
            className="
              rounded-[4px]
              border
              border-[#e3c791]
              px-2
              py-1
              text-[7px]
              text-[#bf8e38]
            "
          >
            Change
          </button>
        </div>
      </DetailsSection>

      {/* Order Items */}
      <DetailsSection title="Order Items">
        <div className="flex gap-2">
          <div
            className="
              flex
              h-[48px]
              w-[42px]
              shrink-0
              items-center
              justify-center
              rounded-[4px]
              bg-[#f7f5f0]
            "
          >
            <MdDiamond className="text-[26px] text-[#cda95d]" />
          </div>

          <div className="min-w-0 flex-1">
            <p className="text-[7px] font-medium text-[#444]">
              22K Gold Diamond Necklace
            </p>

            <p className="mt-1 text-[6px] text-[#888]">SKU: GDNK00123</p>

            <p className="mt-1 text-[6px] text-[#888]">Qty: 1</p>
          </div>

          <span className="self-end text-[8px] font-semibold text-[#444]">
            ₹45,000
          </span>
        </div>
      </DetailsSection>

      {/* Bottom Button */}
      <div className="p-2.5">
        <button
          type="button"
          className="
            flex
            h-[29px]
            w-full
            items-center
            justify-center
            rounded-[4px]
            bg-[#c89943]
            text-[8px]
            font-medium
            text-white
            shadow-sm
            transition
            hover:bg-[#b68938]
          "
        >
          View Order Details
        </button>
      </div>
    </aside>
  );
}

/* ============================================================
   DETAILS SECTION
============================================================ */

function DetailsSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-b border-[#eeeae4] px-3 py-2.5">
      <h3 className="mb-2 text-[9px] font-semibold text-[#363a3e]">{title}</h3>

      {children}
    </section>
  );
}

/* ============================================================
   SUMMARY ROW
============================================================ */

function SummaryRow({
  label,
  value,
  green = false,
  bold = false,
}: {
  label: string;
  value: string;
  green?: boolean;
  bold?: boolean;
}) {
  return (
    <div className="flex items-center justify-between py-[3px]">
      <span
        className={`
          text-[7px]
          ${bold ? "font-semibold text-[#3a3e43]" : "text-[#777]"}
        `}
      >
        {label}
      </span>

      <span
        className={`
          text-[7px]
          ${green
            ? "text-[#43a66a]"
            : bold
              ? "font-semibold text-[#333]"
              : "text-[#555]"
          }
        `}
      >
        {value}
      </span>
    </div>
  );
}
