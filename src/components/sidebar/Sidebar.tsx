"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import {
  MdDashboard,
  MdShoppingCart,
  MdPeople,
  MdInventory2,
  MdSell,
  MdBusiness,
  MdPayments,
  MdLocalOffer,
  MdBarChart,
  MdWeb,
  MdSettings,
  MdExpandMore,
  MdExpandLess,
  MdCardGiftcard,
  MdDiamond,
  MdGroup,
} from "react-icons/md";

import { FaGem } from "react-icons/fa";

import { useAuth } from "../AuthContext";
import { HiUsers } from "react-icons/hi";

interface SidebarProps {
  isOpen?: boolean;
}

export default function Sidebar({ isOpen = true }: SidebarProps) {
  const pathname = usePathname();
  const { user } = useAuth();

  // Scrollbar visibility
  const [isScrolling, setIsScrolling] = useState(false);

  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);

  // Menu states
  const [productsOpen, setProductsOpen] = useState(true);
  const [gemstoneOpen, setGemstoneOpen] = useState(true);
  const [crmOpen, setCrmOpen] = useState(true);

  const handleScroll = () => {
    setIsScrolling(true);

    if (scrollTimeout.current) {
      clearTimeout(scrollTimeout.current);
    }

    scrollTimeout.current = setTimeout(() => {
      setIsScrolling(false);
    }, 800);
  };

  useEffect(() => {
    return () => {
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
    };
  }, []);

  const isActive = (href: string) => {
    return pathname === href;
  };

  return (
    <aside
      className={`
        fixed
        left-0
        top-0
        z-50
        flex
        h-screen
        flex-col
        overflow-hidden
        border-r
        border-[#1b2430]
        bg-[#080e17]
        text-white
        transition-all
        duration-300
        ease-in-out
        ${isOpen ? "w-[250px]" : "w-[64px]"}
      `}
    >
      {/* =====================================================
          LOGO
      ====================================================== */}

      <div
        className={`
          flex
          h-[64px]
          shrink-0
          items-center
          ${isOpen ? "px-5" : "justify-center"}
        `}
      >
        <div className="flex items-center">
          {/* Diamond Logo */}
          <div className="relative flex h-[38px] w-[38px] items-center justify-center">
            <FaGem className="text-[30px] text-[#d6a847]" />
          </div>

          {/* Brand */}
          {isOpen && (
            <div className="ml-2 leading-none">
              <h1
                className="
                  font-serif
                  text-[19px]
                  font-medium
                  tracking-[2px]
                  text-[#d6a847]
                "
              >
                LUXORA
              </h1>

              <p
                className="
                  mt-[5px]
                  text-[7px]
                  font-semibold
                  tracking-[2.5px]
                  text-[#d6a847]
                "
              >
                JEWELLERY CRM
              </p>
            </div>
          )}
        </div>
      </div>

      {/* =====================================================
          MENU SCROLL AREA
      ====================================================== */}

      <div
        onScroll={handleScroll}
        className={`
          sidebar-scroll
          flex-1
          overflow-y-auto
          px-2
          py-2
          ${isScrolling ? "scrolling" : ""}
        `}
      >
        {/* =================================================
            DASHBOARD
        ================================================== */}

        <SidebarItem
          href="/dashboard"
          icon={<MdDashboard />}
          label="Dashboard"
          active={isActive("/dashboard")}
          isOpen={isOpen}
        />

        {/* =================================================
            ORDERS
        ================================================== */}

        <SidebarItem
          href="/orders"
          icon={<MdShoppingCart />}
          label="Orders"
          active={isActive("/orders")}
          isOpen={isOpen}
        />

        {/* =================================================
            CUSTOMERS
        ================================================== */}

        <SidebarItem
          href="/customers"
          icon={<MdPeople />}
          label="Customers"
          active={isActive("/customers")}
          isOpen={isOpen}
        />

        <SidebarGroup
          label="Users"
          icon={<HiUsers  />}
          isOpen={isOpen}
          expanded={productsOpen}
          onClick={() => setProductsOpen(!productsOpen)}
        >
          <SidebarSubItem
            href="/users"
            label="User"
            active={isActive("/user")}
          />

          <SidebarSubItem
            href="/users/roles"
            label="Roles & Permissions"
            active={isActive("/user/roles")}
          />
        </SidebarGroup>

        {/* =================================================
            PRODUCTS
        ================================================== */}

        <SidebarGroup
          label="Products"
          icon={<MdCardGiftcard />}
          isOpen={isOpen}
          expanded={productsOpen}
          onClick={() => setProductsOpen(!productsOpen)}
        >
          <SidebarSubItem
            href="/products/jewellery"
            label="Jewellery"
            active={isActive("/products/jewellery")}
          />

          <SidebarSubItem
            href="/products/gemstones"
            label="Gemstones"
            active={isActive("/products/gemstones")}
          />

          <SidebarSubItem
            href="/products/collections"
            label="Collections"
            active={isActive("/products/collections")}
          />
        </SidebarGroup>

        {/* =================================================
            INVENTORY
        ================================================== */}

        <SidebarItem
          href="/inventory"
          icon={<MdInventory2 />}
          label="Inventory"
          active={isActive("/inventory")}
          isOpen={isOpen}
          hasArrow
        />

        {/* =================================================
            GEMSTONE MANAGEMENT
        ================================================== */}

        <SidebarGroup
          label="Gemstone Management"
          icon={<MdDiamond />}
          isOpen={isOpen}
          expanded={gemstoneOpen}
          onClick={() => setGemstoneOpen(!gemstoneOpen)}
        >
          <SidebarSubItem
            href="/gemstone-management/loose-stones"
            label="Loose Stones"
            active={isActive("/gemstone-management/loose-stones")}
          />

          <SidebarSubItem
            href="/gemstone-management/certificates"
            label="Certificates"
            active={isActive("/gemstone-management/certificates")}
          />

          <SidebarSubItem
            href="/gemstone-management/inventory"
            label="Stone Inventory"
            active={isActive("/gemstone-management/inventory")}
          />
        </SidebarGroup>

        {/* =================================================
            SALES
        ================================================== */}

        <SidebarItem
          href="/sales"
          icon={<MdSell />}
          label="Sales"
          active={isActive("/sales")}
          isOpen={isOpen}
        />

        {/* =================================================
            CRM
        ================================================== */}

        <SidebarGroup
          label="CRM"
          icon={<MdGroup />}
          isOpen={isOpen}
          expanded={crmOpen}
          onClick={() => setCrmOpen(!crmOpen)}
        >
          <SidebarSubItem
            href="/crm/leads"
            label="Leads"
            active={isActive("/crm/leads")}
          />

          <SidebarSubItem
            href="/crm/follow-ups"
            label="Follow-ups"
            active={isActive("/crm/follow-ups")}
          />

          <SidebarSubItem
            href="/crm/customer-groups"
            label="Customer Groups"
            active={isActive("/crm/customer-groups")}
          />
        </SidebarGroup>

        {/* =================================================
            PAYMENTS
        ================================================== */}

        <SidebarItem
          href="/payments"
          icon={<MdPayments />}
          label="Payments"
          active={isActive("/payments")}
          isOpen={isOpen}
        />

        {/* =================================================
            OFFERS
        ================================================== */}

        <SidebarItem
          href="/offers"
          icon={<MdLocalOffer />}
          label="Offers & Coupons"
          active={isActive("/offers")}
          isOpen={isOpen}
        />

        {/* =================================================
            REPORTS
        ================================================== */}

        <SidebarItem
          href="/reports"
          icon={<MdBarChart />}
          label="Reports & Analytics"
          active={isActive("/reports")}
          isOpen={isOpen}
        />
      </div>

      {/* =====================================================
          PREMIUM COLLECTION CARD
      ====================================================== */}

      {isOpen && (
        <div className="shrink-0 px-2 pb-3">
          <div
            className="
              relative
              overflow-hidden
              rounded-[4px]
              border
              border-[#5c4923]
              bg-[#0b111a]
            "
          >
            {/* Background Image */}
            <div
              className="
                absolute
                inset-0
                bg-cover
                bg-center
                opacity-[0.28]
              "
              style={{
                backgroundImage: "url('/images/diamond-sidebar.jpg')",
              }}
            />

            {/* Dark Overlay */}
            <div
              className="
                absolute
                inset-0
                bg-gradient-to-t
                from-[#080e17]
                via-transparent
                to-transparent
              "
            />

            {/* Card Content */}
            <div className="relative z-10 px-3 py-3">
              <div className="flex items-start justify-between">
                <div>
                  <p
                    className="
                      font-serif
                      text-[17px]
                      italic
                      leading-[18px]
                      text-white
                    "
                  >
                    Premium
                  </p>

                  <p
                    className="
                      font-serif
                      text-[17px]
                      italic
                      leading-[18px]
                      text-white
                    "
                  >
                    Collection
                  </p>
                </div>

                <FaGem className="mt-1 text-[30px] text-white/70" />
              </div>

              <p
                className="
                  mt-5
                  text-[10px]
                  leading-4
                  text-gray-300
                "
              >
                Explore our exclusive
                <br />
                diamond collection
              </p>

              <Link
                href="/products"
                className="
                  mt-3
                  flex
                  h-[29px]
                  items-center
                  justify-center
                  rounded-[3px]
                  border
                  border-[#80672d]
                  bg-[#111923]
                  text-[10px]
                  font-medium
                  text-white
                  transition
                  duration-200
                  hover:bg-[#d6a847]
                  hover:text-[#080e17]
                "
              >
                View Collection
              </Link>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}

/* ============================================================
   SIDEBAR ITEM
============================================================ */

interface SidebarItemProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  isOpen: boolean;
  hasArrow?: boolean;
}

function SidebarItem({
  href,
  icon,
  label,
  active = false,
  isOpen,
  hasArrow = false,
}: SidebarItemProps) {
  return (
    <Link
      href={href}
      title={!isOpen ? label : undefined}
      className={`
        group
        mb-[2px]
        flex
        h-[32px]
        items-center
        rounded-[4px]
        text-[11px]
        transition-all
        duration-200

        ${isOpen ? "gap-3 px-2" : "justify-center"}

        ${
          active
            ? "bg-[#3d3a35] text-white"
            : "text-[#c3c6cb] hover:bg-[#151d28] hover:text-white"
        }
      `}
    >
      {/* Icon */}
      <span
        className={`
          shrink-0
          text-[15px]
          transition-colors

          ${active ? "text-white" : "text-[#b8bdc3] group-hover:text-[#d6a847]"}
        `}
      >
        {icon}
      </span>

      {/* Label */}
      {isOpen && <span className="flex-1 whitespace-nowrap">{label}</span>}

      {/* Arrow */}
      {isOpen && hasArrow && (
        <MdExpandMore className="text-[15px] text-[#aeb4bb]" />
      )}
    </Link>
  );
}

/* ============================================================
   SIDEBAR GROUP
============================================================ */

interface SidebarGroupProps {
  label: string;
  icon: React.ReactNode;
  isOpen: boolean;
  expanded: boolean;
  onClick: () => void;
  children?: React.ReactNode;
}

function SidebarGroup({
  label,
  icon,
  isOpen,
  expanded,
  onClick,
  children,
}: SidebarGroupProps) {
  return (
    <div className="mb-[2px]">
      {/* Group Header */}
      <button
        type="button"
        onClick={onClick}
        title={!isOpen ? label : undefined}
        className={`
          group
          flex
          h-[32px]
          w-full
          items-center
          rounded-[4px]
          text-left
          text-[11px]
          text-[#c3c6cb]
          transition
          hover:bg-[#151d28]
          hover:text-white

          ${isOpen ? "gap-3 px-2" : "justify-center"}
        `}
      >
        {/* Icon */}
        <span
          className="
            shrink-0
            text-[15px]
            text-[#b8bdc3]
            transition-colors
            group-hover:text-[#d6a847]
          "
        >
          {icon}
        </span>

        {isOpen && (
          <>
            {/* Label */}
            <span className="flex-1 whitespace-nowrap">{label}</span>

            {/* Chevron */}
            {expanded ? (
              <MdExpandLess className="text-[15px] text-[#aeb4bb]" />
            ) : (
              <MdExpandMore className="text-[15px] text-[#aeb4bb]" />
            )}
          </>
        )}
      </button>

      {/* Children */}
      {isOpen && expanded && <div className="ml-[28px]">{children}</div>}
    </div>
  );
}

/* ============================================================
   SIDEBAR SUB ITEM
============================================================ */

interface SidebarSubItemProps {
  href: string;
  label: string;
  active?: boolean;
}

function SidebarSubItem({ href, label, active = false }: SidebarSubItemProps) {
  return (
    <Link
      href={href}
      className={`
        flex
        h-[26px]
        items-center
        rounded-[3px]
        pl-1
        text-[10px]
        transition-colors

        ${
          active
            ? "font-medium text-[#d6a847]"
            : "text-[#b7bbc1] hover:text-white"
        }
      `}
    >
      {label}
    </Link>
  );
}
