"use client";

import { useAuth } from "@/components/AuthContext";
import {
  MdAdd,
  MdArrowForward,
  MdCalendarToday,
  MdDiamond,
  MdKeyboardArrowDown,
  MdMoreHoriz,
  MdPeople,
  MdShoppingBag,
  MdVisibility,
  MdWatchLater,
} from "react-icons/md";
import {
  FaGem,
  FaRupeeSign,
  FaUserPlus,
  FaBoxOpen,
} from "react-icons/fa";

export default function DashboardPage() {
  const { user } = useAuth();

  const stats = [
    {
      title: "Total Sales",
      value: "₹24,85,600",
      change: "18.6%",
      positive: true,
      icon: <FaRupeeSign />,
      iconBg: "bg-[#fff4d9]",
      iconColor: "text-[#d49d24]",
    },
    {
      title: "Orders",
      value: "1,284",
      change: "12.4%",
      positive: true,
      icon: <MdShoppingBag />,
      iconBg: "bg-[#f0eaff]",
      iconColor: "text-[#8c6dd7]",
    },
    {
      title: "Customers",
      value: "8,542",
      change: "15.3%",
      positive: true,
      icon: <MdPeople />,
      iconBg: "bg-[#e8f8ec]",
      iconColor: "text-[#3eae68]",
    },
    {
      title: "Products",
      value: "3,842",
      change: "8.7%",
      positive: true,
      icon: <FaGem />,
      iconBg: "bg-[#fff3d5]",
      iconColor: "text-[#d5a332]",
    },
    {
      title: "Low Stock",
      value: "28",
      change: "5",
      positive: false,
      icon: <FaBoxOpen />,
      iconBg: "bg-[#ffe8e2]",
      iconColor: "text-[#ee806b]",
    },
    {
      title: "Pending Orders",
      value: "46",
      change: "8",
      positive: false,
      icon: <MdWatchLater />,
      iconBg: "bg-[#ffe8ed]",
      iconColor: "text-[#e66b87]",
    },
  ];

  const products = [
    {
      no: 1,
      name: "Gold Diamond Necklace",
      sku: "JWN1001",
      category: "Necklace",
      sold: 128,
      revenue: "₹12,45,600",
      stock: 12,
      type: "necklace",
    },
    {
      no: 2,
      name: "Emerald Ring",
      sku: "RNG2003",
      category: "Rings",
      sold: 98,
      revenue: "₹8,75,200",
      stock: 8,
      type: "ring",
    },
    {
      no: 3,
      name: "Diamond Earrings",
      sku: "ERN3002",
      category: "Earrings",
      sold: 86,
      revenue: "₹6,35,400",
      stock: 15,
      type: "earring",
    },
    {
      no: 4,
      name: "Ruby Pendant",
      sku: "PEN4001",
      category: "Pendant",
      sold: 65,
      revenue: "₹4,85,000",
      stock: 6,
      type: "pendant",
    },
    {
      no: 5,
      name: "Gold Bracelet",
      sku: "BRC5002",
      category: "Bracelets",
      sold: 54,
      revenue: "₹3,45,600",
      stock: 10,
      type: "bracelet",
    },
  ];

  const gemstones = [
    {
      name: "Diamond",
      total: 342,
      available: 290,
      value: "₹1,25,40,000",
      color: "bg-gray-200",
    },
    {
      name: "Ruby",
      total: 128,
      available: 98,
      value: "₹45,60,000",
      color: "bg-red-500",
    },
    {
      name: "Emerald",
      total: 94,
      available: 72,
      value: "₹38,75,000",
      color: "bg-emerald-500",
    },
    {
      name: "Sapphire",
      total: 156,
      available: 120,
      value: "₹32,40,000",
      color: "bg-blue-600",
    },
    {
      name: "Pearl",
      total: 312,
      available: 280,
      value: "₹18,60,000",
      color: "bg-gray-100",
    },
    {
      name: "Others",
      total: 210,
      available: 150,
      value: "₹12,30,000",
      color: "bg-red-900",
    },
  ];

  const activities = [
    {
      title: "New Customers",
      value: "84",
      change: "12.5%",
      positive: true,
      icon: <FaUserPlus />,
      bg: "bg-[#f0eaff]",
      color: "text-[#8369cf]",
    },
    {
      title: "Returning Customers",
      value: "176",
      change: "8.3%",
      positive: true,
      icon: <MdPeople />,
      bg: "bg-[#e9f9ed]",
      color: "text-[#4baa68]",
    },
    {
      title: "VIP Customers",
      value: "21",
      change: "5.1%",
      positive: true,
      icon: <FaGem />,
      bg: "bg-[#fff3d9]",
      color: "text-[#d6a52f]",
    },
    {
      title: "Leads",
      value: "56",
      change: "11.2%",
      positive: true,
      icon: <MdPeople />,
      bg: "bg-[#ffe8eb]",
      color: "text-[#e16c7c]",
    },
    {
      title: "Follow-ups Today",
      value: "16",
      change: "2.1%",
      positive: false,
      icon: <MdWatchLater />,
      bg: "bg-[#e7f6f8]",
      color: "text-[#4ba4ac]",
    },
    {
      title: "Birthday/Anniversary",
      value: "7",
      change: "",
      positive: true,
      icon: <MdCalendarToday />,
      bg: "bg-[#ffe8ed]",
      color: "text-[#e26c86]",
    },
  ];

  const orders = [
    {
      id: "#ORD12584",
      customer: "Rahul Verma",
      product: "Gold Diamond Necklace",
      amount: "₹52,600",
      payment: "Paid",
      status: "Processing",
      date: "18 May 2025, 10:30 AM",
    },
    {
      id: "#ORD12583",
      customer: "Priya Sharma",
      product: "Emerald Ring",
      amount: "₹38,900",
      payment: "Paid",
      status: "Shipped",
      date: "18 May 2025, 09:15 AM",
    },
    {
      id: "#ORD12582",
      customer: "Amit Singh",
      product: "Diamond Earrings",
      amount: "₹26,500",
      payment: "COD",
      status: "Pending",
      date: "18 May 2025, 08:45 AM",
    },
    {
      id: "#ORD12581",
      customer: "Neha Kapoor",
      product: "Ruby Pendant",
      amount: "₹18,750",
      payment: "Paid",
      status: "Delivered",
      date: "17 May 2025, 06:20 PM",
    },
    {
      id: "#ORD12580",
      customer: "Vikram Joshi",
      product: "Gold Bracelet",
      amount: "₹22,400",
      payment: "Paid",
      status: "Confirmed",
      date: "17 May 2025, 04:10 PM",
    },
  ];

  const reminders = [
    {
      name: "Rahul Verma",
      text: "Anniversary on 20 May",
      image: "RV",
    },
    {
      name: "Priya Sharma",
      text: "Birthday on 22 May",
      image: "PS",
    },
    {
      name: "Amit Singh",
      text: "Follow-up on 19 May",
      image: "AS",
    },
  ];

  return (
    <div className="min-h-screen bg-[#fafafa] p-3 font-sans text-[#292d32]">
      <div className="mx-auto w-full max-w-[1600px] space-y-3">
        {/* =====================================================
            PAGE HEADER
        ====================================================== */}

        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-[16px] font-bold leading-5 text-[#25282c]">
              Good Morning, {user?.name || "Admin"}! 👋
            </h1>

            <p className="mt-0.5 text-[9px] text-[#85898d]">
              Here&apos;s what&apos;s happening with your store today.
            </p>
          </div>

          <button
            type="button"
            className="
              flex
              h-[30px]
              items-center
              gap-1.5
              rounded-[4px]
              bg-[#111923]
              px-3
              text-[9px]
              font-medium
              text-white
              shadow-sm
              transition
              hover:bg-[#202b39]
            "
          >
            <MdAdd className="text-[14px]" />
            Add Order
          </button>
        </div>

        {/* =====================================================
            STAT CARDS
        ====================================================== */}

        <div className="grid grid-cols-2 gap-2 lg:grid-cols-3 xl:grid-cols-6">
          {stats.map((stat) => (
            <StatCard key={stat.title} {...stat} />
          ))}
        </div>

        {/* =====================================================
            SALES + ORDER STATUS
        ====================================================== */}

        <div className="grid grid-cols-1 gap-2 xl:grid-cols-[1.05fr_1fr]">
          <SalesOverview />

          <OrderStatus />
        </div>

        {/* =====================================================
            PRODUCTS / GEMSTONE / CUSTOMER ACTIVITY
        ====================================================== */}

        <div className="grid grid-cols-1 gap-2 xl:grid-cols-[1.25fr_1fr_0.75fr]">
          <TopProducts products={products} />

          <GemstoneInventory gemstones={gemstones} />

          <CustomerActivity activities={activities} />
        </div>

        {/* =====================================================
            RECENT ORDERS + REMINDERS
        ====================================================== */}

        <div className="grid grid-cols-1 gap-2 xl:grid-cols-[3fr_1fr]">
          <RecentOrders orders={orders} />

          <UpcomingReminders reminders={reminders} />
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   STAT CARD
============================================================ */

function StatCard({
  title,
  value,
  change,
  positive,
  icon,
  iconBg,
  iconColor,
}: {
  title: string;
  value: string;
  change: string;
  positive: boolean;
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
}) {
  return (
    <div
      className="
        rounded-[7px]
        border
        border-[#e8e5df]
        bg-white
        px-3
        py-2.5
        shadow-[0_1px_2px_rgba(0,0,0,0.02)]
      "
    >
      <div className="flex items-center gap-2.5">
        <div
          className={`
            flex
            h-[36px]
            w-[36px]
            shrink-0
            items-center
            justify-center
            rounded-full
            ${iconBg}
            ${iconColor}
            text-[17px]
          `}
        >
          {icon}
        </div>

        <div className="min-w-0">
          <p className="text-[8px] font-medium text-[#666b70]">
            {title}
          </p>

          <p className="mt-0.5 text-[15px] font-semibold leading-4 text-[#282c30]">
            {value}
          </p>

          <p className="mt-1 text-[7px] text-[#9a9da1]">
            <span
              className={
                positive
                  ? "font-medium text-[#42a76a]"
                  : "font-medium text-[#e05d62]"
              }
            >
              {positive ? "↑" : "↓"} {change}
            </span>{" "}
            vs last month
          </p>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   CARD WRAPPER
============================================================ */

function DashboardCard({
  title,
  children,
  className = "",
  action,
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
  action?: React.ReactNode;
}) {
  return (
    <div
      className={`
        overflow-hidden
        rounded-[7px]
        border
        border-[#e8e5df]
        bg-white
        ${className}
      `}
    >
      <div className="flex items-center justify-between px-3 py-2">
        <h2 className="text-[10px] font-semibold text-[#292d32]">
          {title}
        </h2>

        {action}
      </div>

      {children}
    </div>
  );
}

/* ============================================================
   SALES OVERVIEW
============================================================ */

function SalesOverview() {
  return (
    <DashboardCard
      title="Sales Overview"
      action={
        <div className="flex overflow-hidden rounded-[4px] border border-[#e8e5df]">
          {["Daily", "Weekly", "Monthly", "Yearly"].map(
            (item) => (
              <button
                key={item}
                type="button"
                className={`
                  h-[20px]
                  px-2
                  text-[7px]
                  ${
                    item === "Weekly"
                      ? "bg-[#fff8e9] text-[#c28e28] ring-1 ring-[#d7ae60]"
                      : "text-[#666] hover:bg-[#faf8f4]"
                  }
                `}
              >
                {item}
              </button>
            )
          )}
        </div>
      }
    >
      <div className="grid grid-cols-1 border-t border-[#f0eee9] md:grid-cols-2">
        <Chart
          title="Revenue"
          value="₹24,85,600"
          change="18.6%"
          purple={false}
        />

        <Chart
          title="Orders"
          value="1,284"
          change="12.4%"
          purple
        />
      </div>

      <div className="grid grid-cols-3 gap-2 border-t border-[#f0eee9] p-2">
        <MiniMetric
          title="Average Order Value"
          value="₹19,352"
          change="14.2%"
        />

        <MiniMetric
          title="Conversion Rate"
          value="2.35%"
          change="5.6%"
        />

        <MiniMetric
          title="Refunds"
          value="₹45,210"
          change="3.2%"
          negative
        />
      </div>
    </DashboardCard>
  );
}

/* ============================================================
   CHART
============================================================ */

function Chart({
  title,
  value,
  change,
  purple = false,
}: {
  title: string;
  value: string;
  change: string;
  purple?: boolean;
}) {
  const points = purple
    ? "5,77 40,49 75,65 110,28 145,50 180,36 215,43 250,14"
    : "5,69 40,54 75,52 110,30 145,39 180,22 215,27 250,8";

  return (
    <div className="border-b border-[#f0eee9] p-2 md:border-b-0 md:border-r">
      <div className="flex items-end gap-1">
        <span className="text-[7px] text-[#777]">{title}</span>

        <span className="text-[13px] font-medium text-[#444]">
          {value}
        </span>

        <span className="mb-[1px] text-[7px] text-[#49a86b]">
          ↑ {change}
        </span>
      </div>

      <div className="relative mt-2 h-[85px]">
        <div className="absolute inset-0 flex flex-col justify-between">
          {[40, 30, 20, 10, 0].map((num) => (
            <div
              key={num}
              className="flex items-center gap-1"
            >
              <span className="w-[20px] text-[6px] text-[#a5a8ab]">
                {num}K
              </span>

              <div className="h-px flex-1 bg-[#f1efeb]" />
            </div>
          ))}
        </div>

        <svg
          viewBox="0 0 255 85"
          className="absolute left-[22px] top-0 h-[75px] w-[calc(100%-22px)] overflow-visible"
          preserveAspectRatio="none"
        >
          <polyline
            points={points}
            fill="none"
            stroke={purple ? "#9a7bd4" : "#d8a743"}
            strokeWidth="1.6"
          />

          {points.split(" ").map((point, index) => {
            const [x, y] = point.split(",");

            return (
              <circle
                key={index}
                cx={x}
                cy={y}
                r="2"
                fill={purple ? "#9a7bd4" : "#d8a743"}
              />
            );
          })}
        </svg>

        <div className="absolute bottom-[-1px] left-[24px] right-0 flex justify-between text-[5px] text-[#999]">
          <span>12 May</span>
          <span>13 May</span>
          <span>14 May</span>
          <span>15 May</span>
          <span>16 May</span>
          <span>17 May</span>
          <span>18 May</span>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   MINI METRIC
============================================================ */

function MiniMetric({
  title,
  value,
  change,
  negative = false,
}: {
  title: string;
  value: string;
  change: string;
  negative?: boolean;
}) {
  return (
    <div className="rounded-[4px] border border-[#eeeae4] bg-[#fcfcfb] px-2 py-1.5">
      <p className="text-[7px] text-[#777]">{title}</p>

      <div className="mt-0.5 flex items-center gap-1">
        <span className="text-[10px] font-semibold text-[#333]">
          {value}
        </span>

        <span
          className={`text-[6px] ${
            negative
              ? "text-[#e36363]"
              : "text-[#4ba66a]"
          }`}
        >
          {negative ? "↓" : "↑"} {change}
        </span>
      </div>
    </div>
  );
}

/* ============================================================
   ORDER STATUS
============================================================ */

function OrderStatus() {
  const statuses = [
    {
      name: "Pending",
      value: 46,
      percent: "3.6%",
      color: "#e9b546",
    },
    {
      name: "Confirmed",
      value: 138,
      percent: "10.7%",
      color: "#72b6d7",
    },
    {
      name: "Processing",
      value: 312,
      percent: "24.3%",
      color: "#9b7bd0",
    },
    {
      name: "Shipped",
      value: 428,
      percent: "33.3%",
      color: "#8ab928",
    },
    {
      name: "Delivered",
      value: 892,
      percent: "69.5%",
      color: "#5fae72",
    },
    {
      name: "Cancelled",
      value: 68,
      percent: "5.3%",
      color: "#d95568",
    },
  ];

  return (
    <DashboardCard title="Order Status">
      <div className="flex min-h-[205px] items-center border-t border-[#f0eee9] px-3 py-3">
        {/* Donut */}
        <div className="relative flex w-[48%] justify-center">
          <div
            className="relative h-[125px] w-[125px] rounded-full"
            style={{
              background:
                "conic-gradient(#e9b546 0deg 13deg, #72b6d7 13deg 52deg, #9b7bd0 52deg 139deg, #8ab928 139deg 259deg, #5fae72 259deg 341deg, #d95568 341deg 360deg)",
            }}
          >
            <div className="absolute inset-[25px] flex flex-col items-center justify-center rounded-full bg-white">
              <span className="text-[16px] font-semibold text-[#333]">
                1,284
              </span>

              <span className="text-[7px] text-[#777]">
                Total Orders
              </span>
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="w-[52%] space-y-2">
          {statuses.map((status) => (
            <div
              key={status.name}
              className="flex items-center gap-2"
            >
              <span
                className="h-[6px] w-[6px] rounded-[1px]"
                style={{
                  backgroundColor: status.color,
                }}
              />

              <span className="flex-1 text-[7px] text-[#555]">
                {status.name}
              </span>

              <span className="text-[7px] font-medium text-[#444]">
                {status.value}
              </span>

              <span className="w-[28px] text-right text-[6px] text-[#999]">
                ({status.percent})
              </span>
            </div>
          ))}
        </div>
      </div>
    </DashboardCard>
  );
}

/* ============================================================
   TOP PRODUCTS
============================================================ */

function TopProducts({
  products,
}: {
  products: {
    no: number;
    name: string;
    sku: string;
    category: string;
    sold: number;
    revenue: string;
    stock: number;
    type: string;
  }[];
}) {
  return (
    <DashboardCard title="Top Selling Products">
      <div className="overflow-x-auto border-t border-[#f0eee9]">
        <table className="w-full min-w-[600px] border-collapse">
          <thead>
            <tr className="text-[7px] text-[#777]">
              <th className="px-2 py-1.5 text-left font-medium">
                #
              </th>
              <th className="px-1 py-1.5 text-left font-medium">
                Product
              </th>
              <th className="px-1 py-1.5 text-left font-medium">
                SKU
              </th>
              <th className="px-1 py-1.5 text-left font-medium">
                Category
              </th>
              <th className="px-1 py-1.5 text-right font-medium">
                Sold
              </th>
              <th className="px-1 py-1.5 text-right font-medium">
                Revenue
              </th>
              <th className="px-2 py-1.5 text-right font-medium">
                Stock
              </th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => (
              <tr
                key={product.sku}
                className="border-t border-[#f3f1ed]"
              >
                <td className="px-2 py-1 text-[7px] text-[#555]">
                  {product.no}
                </td>

                <td className="px-1 py-1">
                  <div className="flex items-center gap-1.5">
                    <ProductIcon type={product.type} />

                    <span className="whitespace-nowrap text-[7px] text-[#444]">
                      {product.name}
                    </span>
                  </div>
                </td>

                <td className="px-1 py-1 text-[7px] text-[#777]">
                  {product.sku}
                </td>

                <td className="px-1 py-1 text-[7px] text-[#555]">
                  {product.category}
                </td>

                <td className="px-1 py-1 text-right text-[7px] text-[#444]">
                  {product.sold}
                </td>

                <td className="px-1 py-1 text-right text-[7px] text-[#444]">
                  {product.revenue}
                </td>

                <td className="px-2 py-1 text-right">
                  <span
                    className={`
                      inline-flex
                      min-w-[20px]
                      justify-center
                      rounded-[3px]
                      px-1
                      py-0.5
                      text-[6px]
                      ${
                        product.stock <= 8
                          ? "bg-[#ffe1e1] text-[#dc5c5c]"
                          : product.stock <= 12
                            ? "bg-[#fff0d1] text-[#d39a29]"
                            : "bg-[#fff0d1] text-[#d39a29]"
                      }
                    `}
                  >
                    {product.stock}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ViewAll text="View All Products" />
    </DashboardCard>
  );
}

/* ============================================================
   PRODUCT ICON
============================================================ */

function ProductIcon({ type }: { type: string }) {
  return (
    <div
      className={`
        flex
        h-[21px]
        w-[21px]
        shrink-0
        items-center
        justify-center
        rounded-[3px]
        ${
          type === "ring"
            ? "bg-emerald-100"
            : type === "pendant"
              ? "bg-red-100"
              : "bg-[#f5eee0]"
        }
      `}
    >
      <FaGem className="text-[9px] text-[#b79242]" />
    </div>
  );
}

/* ============================================================
   GEMSTONE INVENTORY
============================================================ */

function GemstoneInventory({
  gemstones,
}: {
  gemstones: {
    name: string;
    total: number;
    available: number;
    value: string;
    color: string;
  }[];
}) {
  return (
    <DashboardCard title="Gemstone Inventory">
      <div className="border-t border-[#f0eee9]">
        <div className="grid grid-cols-[1.5fr_0.8fr_0.8fr_1.2fr] px-2 py-1.5 text-[7px] text-[#777]">
          <span>Gemstone</span>
          <span>Total Stones</span>
          <span>Available</span>
          <span className="text-right">Total Value</span>
        </div>

        {gemstones.map((stone) => (
          <div
            key={stone.name}
            className="grid grid-cols-[1.5fr_0.8fr_0.8fr_1.2fr] items-center border-t border-[#f3f1ed] px-2 py-[5px]"
          >
            <div className="flex items-center gap-2">
              <span
                className={`
                  h-[13px]
                  w-[13px]
                  rounded-full
                  border
                  border-[#ddd]
                  ${stone.color}
                `}
              />

              <span className="text-[7px] text-[#444]">
                {stone.name}
              </span>
            </div>

            <span className="text-[7px] text-[#555]">
              {stone.total}
            </span>

            <span className="text-[7px] text-[#555]">
              {stone.available}
            </span>

            <span className="text-right text-[7px] text-[#444]">
              {stone.value}
            </span>
          </div>
        ))}
      </div>

      <ViewAll text="View All Gemstones" />
    </DashboardCard>
  );
}

/* ============================================================
   CUSTOMER ACTIVITY
============================================================ */

function CustomerActivity({
  activities,
}: {
  activities: {
    title: string;
    value: string;
    change: string;
    positive: boolean;
    icon: React.ReactNode;
    bg: string;
    color: string;
  }[];
}) {
  return (
    <DashboardCard title="Customer Activity">
      <div className="border-t border-[#f0eee9] px-2 py-1">
        {activities.map((activity) => (
          <div
            key={activity.title}
            className="flex items-center gap-2 border-b border-[#f5f3ef] py-[5px] last:border-b-0"
          >
            <div
              className={`
                flex
                h-[23px]
                w-[23px]
                items-center
                justify-center
                rounded-[4px]
                ${activity.bg}
                ${activity.color}
                text-[10px]
              `}
            >
              {activity.icon}
            </div>

            <span className="flex-1 text-[7px] text-[#555]">
              {activity.title}
            </span>

            <span className="text-[8px] font-medium text-[#444]">
              {activity.value}
            </span>

            {activity.change && (
              <span
                className={`
                  text-[6px]
                  ${
                    activity.positive
                      ? "text-[#4ba66a]"
                      : "text-[#e36363]"
                  }
                `}
              >
                {activity.positive ? "↑" : "↓"}{" "}
                {activity.change}
              </span>
            )}
          </div>
        ))}
      </div>

      <ViewAll text="View All Activity" />
    </DashboardCard>
  );
}

/* ============================================================
   RECENT ORDERS
============================================================ */

function RecentOrders({
  orders,
}: {
  orders: {
    id: string;
    customer: string;
    product: string;
    amount: string;
    payment: string;
    status: string;
    date: string;
  }[];
}) {
  return (
    <DashboardCard title="Recent Orders">
      <div className="overflow-x-auto border-t border-[#f0eee9]">
        <table className="w-full min-w-[780px] border-collapse">
          <thead>
            <tr className="text-[7px] text-[#777]">
              <th className="px-2 py-1.5 text-left font-medium">
                Order ID
              </th>
              <th className="px-1 py-1.5 text-left font-medium">
                Customer
              </th>
              <th className="px-1 py-1.5 text-left font-medium">
                Product
              </th>
              <th className="px-1 py-1.5 text-left font-medium">
                Amount
              </th>
              <th className="px-1 py-1.5 text-left font-medium">
                Payment
              </th>
              <th className="px-1 py-1.5 text-left font-medium">
                Status
              </th>
              <th className="px-1 py-1.5 text-left font-medium">
                Date
              </th>
              <th className="px-2 py-1.5 text-right font-medium">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr
                key={order.id}
                className="border-t border-[#f3f1ed]"
              >
                <td className="px-2 py-1.5 text-[7px] text-[#555]">
                  {order.id}
                </td>

                <td className="px-1 py-1.5 text-[7px] text-[#444]">
                  {order.customer}
                </td>

                <td className="px-1 py-1.5">
                  <div className="flex items-center gap-1">
                    <ProductIcon type="ring" />

                    <span className="text-[7px] text-[#555]">
                      {order.product}
                    </span>
                  </div>
                </td>

                <td className="px-1 py-1.5 text-[7px] text-[#444]">
                  {order.amount}
                </td>

                <td className="px-1 py-1.5">
                  <StatusBadge
                    text={order.payment}
                    type={
                      order.payment === "COD"
                        ? "yellow"
                        : "green"
                    }
                  />
                </td>

                <td className="px-1 py-1.5">
                  <StatusBadge
                    text={order.status}
                    type={getStatusType(order.status)}
                  />
                </td>

                <td className="px-1 py-1.5 text-[7px] text-[#555]">
                  {order.date}
                </td>

                <td className="px-2 py-1.5 text-right">
                  <button
                    type="button"
                    className="text-[#777] hover:text-[#c49a4b]"
                  >
                    <MdVisibility className="text-[13px]" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ViewAll text="View All Orders" />
    </DashboardCard>
  );
}

/* ============================================================
   STATUS BADGE
============================================================ */

function getStatusType(status: string) {
  switch (status) {
    case "Processing":
      return "purple";
    case "Shipped":
      return "blue";
    case "Pending":
      return "yellow";
    case "Delivered":
      return "green";
    case "Confirmed":
      return "cyan";
    default:
      return "gray";
  }
}

function StatusBadge({
  text,
  type,
}: {
  text: string;
  type:
    | "green"
    | "yellow"
    | "purple"
    | "blue"
    | "cyan"
    | "gray";
}) {
  const styles = {
    green: "bg-[#e5f6e8] text-[#42a15f]",
    yellow: "bg-[#fff1d5] text-[#d09222]",
    purple: "bg-[#eee7fb] text-[#8465c6]",
    blue: "bg-[#e5f3fb] text-[#4192bf]",
    cyan: "bg-[#e4f6f7] text-[#3e969c]",
    gray: "bg-[#f0f0f0] text-[#777]",
  };

  return (
    <span
      className={`
        inline-flex
        rounded-[3px]
        px-1.5
        py-[2px]
        text-[6px]
        font-medium
        ${styles[type]}
      `}
    >
      {text}
    </span>
  );
}

/* ============================================================
   UPCOMING REMINDERS
============================================================ */

function UpcomingReminders({
  reminders,
}: {
  reminders: {
    name: string;
    text: string;
    image: string;
  }[];
}) {
  return (
    <DashboardCard
      title="Upcoming Reminders"
      action={
        <button
          type="button"
          className="text-[7px] text-[#c19445] hover:underline"
        >
          View All
        </button>
      }
    >
      <div className="border-t border-[#f0eee9] px-2 py-1.5">
        {reminders.map((reminder, index) => (
          <div
            key={reminder.name}
            className="flex items-center gap-2 border-b border-[#f4f2ee] py-2 last:border-b-0"
          >
            <div
              className="
                flex
                h-[26px]
                w-[26px]
                shrink-0
                items-center
                justify-center
                rounded-full
                bg-[#ddd7cb]
                text-[7px]
                font-semibold
                text-[#555]
              "
            >
              {reminder.image}
            </div>

            <div className="min-w-0 flex-1">
              <p className="truncate text-[7px] font-medium text-[#444]">
                {reminder.name}
              </p>

              <p className="mt-0.5 truncate text-[6px] text-[#777]">
                {reminder.text}
              </p>
            </div>

            <div className="text-[#888]">
              {index === 0 ? (
                <MdCalendarToday className="text-[11px]" />
              ) : index === 1 ? (
                <MdCalendarToday className="text-[11px]" />
              ) : (
                <MdWatchLater className="text-[12px]" />
              )}
            </div>
          </div>
        ))}
      </div>
    </DashboardCard>
  );
}

/* ============================================================
   VIEW ALL
============================================================ */

function ViewAll({ text }: { text: string }) {
  return (
    <div className="border-t border-[#f0eee9] px-2 py-1.5 text-center">
      <button
        type="button"
        className="
          inline-flex
          items-center
          gap-1
          text-[7px]
          font-medium
          text-[#c39442]
          hover:text-[#9e752c]
        "
      >
        {text}

        <MdArrowForward className="text-[10px]" />
      </button>
    </div>
  );
}