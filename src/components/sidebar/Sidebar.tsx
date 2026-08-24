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
  MdPayments,
  MdLocalOffer,
  MdBarChart,
  MdExpandMore,
  MdExpandLess,
  MdCardGiftcard,
  MdDiamond,
  MdGroup,
  MdClose,
} from "react-icons/md";

import { FaGem } from "react-icons/fa";
import { HiUsers } from "react-icons/hi";

import { useAuth } from "../AuthContext";

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export default function Sidebar({ isOpen = true, onClose }: SidebarProps) {
  const pathname = usePathname();
  const { user } = useAuth();

  const [isScrolling, setIsScrolling] = useState(false);

  const [productsOpen, setProductsOpen] = useState(true);
  const [gemstoneOpen, setGemstoneOpen] = useState(true);
  const [crmOpen, setCrmOpen] = useState(true);
  const [usersOpen, setUsersOpen] = useState(true);

  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);

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

  // Close mobile sidebar when route changes
  useEffect(() => {
    if (window.innerWidth < 768) {
      onClose?.();
    }
  }, [pathname, onClose]);

  const isActive = (href: string) => {
    return pathname === href;
  };

  return (
    <>
      {isOpen && (
        <div
          onClick={onClose}
          className="
            fixed
            inset-0
            z-40
            bg-black/60
            backdrop-blur-[1px]
            md:hidden
          "
        />
      )}

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

          /* Desktop */
          ${isOpen ? "md:w-[250px]" : "md:w-[64px]"}

          /* Mobile */
          w-[250px]

          ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        <div
          className={`
            flex
            h-[64px]
            shrink-0
            items-center
            border-b
            border-[#1b2430]

            ${isOpen ? "px-5" : "justify-center md:px-0"}
          `}
        >
          <div className="flex items-center">
            {/* Logo */}
            <div className="relative flex h-[38px] w-[38px] shrink-0 items-center justify-center">
              <FaGem className="text-[30px] text-[#d6a847]" />
            </div>

            {/* Brand */}
            <div
              className={`
                ml-2
                leading-none
                ${isOpen ? "block" : "md:hidden"}
              `}
            >
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
                  text-[9px]
                  font-semibold
                  tracking-[2.5px]
                  text-[#d6a847]
                "
              >
                JEWELLERY CRM
              </p>
            </div>
          </div>

          {/* Mobile Close */}
          <button
            type="button"
            onClick={onClose}
            className="
              ml-auto
              flex
              h-8
              w-8
              items-center
              justify-center
              rounded-md
              text-[#b8bdc3]
              hover:bg-[#151d28]
              hover:text-white
              md:hidden
            "
          >
            <MdClose className="text-[20px]" />
          </button>
        </div>

        <div
          onScroll={handleScroll}
          className={`
            sidebar-scroll
            flex-1
            overflow-y-auto
            overflow-x-hidden
            px-2
            py-2

            ${isScrolling ? "scrolling" : ""}
          `}
        >
          {/* Dashboard */}

          <SidebarItem
            href="/dashboard"
            icon={<MdDashboard />}
            label="Dashboard"
            active={isActive("/dashboard")}
            isOpen={isOpen}
            onNavigate={onClose}
          />

          {/* Orders */}

          <SidebarItem
            href="/orders"
            icon={<MdShoppingCart />}
            label="Orders"
            active={isActive("/orders")}
            isOpen={isOpen}
            onNavigate={onClose}
          />

          {/* Customers */}

          <SidebarItem
            href="/customers"
            icon={<MdPeople />}
            label="Customers"
            active={isActive("/customers")}
            isOpen={isOpen}
            onNavigate={onClose}
          />

          <SidebarGroup
            label="Users Management"
            icon={<HiUsers />}
            isOpen={isOpen}
            expanded={usersOpen}
            onClick={() => setUsersOpen(!usersOpen)}
          >
            <SidebarSubItem
              href="/users"
              label="User"
              active={isActive("/users")}
              onNavigate={onClose}
            />

            <SidebarSubItem
              href="/users/roles"
              label="Roles & Permissions"
              active={isActive("/users/roles")}
              onNavigate={onClose}
            />
          </SidebarGroup>

          <SidebarGroup
            label="Products Management"
            icon={<MdCardGiftcard />}
            isOpen={isOpen}
            expanded={productsOpen}
            onClick={() => setProductsOpen(!productsOpen)}
          >
            <SidebarSubItem
              href="/categories"
              label="Categories"
              active={isActive("/categories")}
              onNavigate={onClose}
            />
            <SidebarSubItem
              href="/products"
              label="Products"
              active={isActive("/products")}
              onNavigate={onClose}
            />
          </SidebarGroup>

          {/* Inventory */}

          <SidebarItem
            href="/inventory"
            icon={<MdInventory2 />}
            label="Inventory"
            active={isActive("/inventory")}
            isOpen={isOpen}
            hasArrow
            onNavigate={onClose}
          />

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
              onNavigate={onClose}
            />

            <SidebarSubItem
              href="/gemstone-management/certificates"
              label="Certificates"
              active={isActive("/gemstone-management/certificates")}
              onNavigate={onClose}
            />

            <SidebarSubItem
              href="/gemstone-management/inventory"
              label="Stone Inventory"
              active={isActive("/gemstone-management/inventory")}
              onNavigate={onClose}
            />
          </SidebarGroup>

          {/* Sales */}

          <SidebarItem
            href="/sales"
            icon={<MdSell />}
            label="Sales"
            active={isActive("/sales")}
            isOpen={isOpen}
            onNavigate={onClose}
          />

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
              onNavigate={onClose}
            />

            <SidebarSubItem
              href="/crm/follow-ups"
              label="Follow-ups"
              active={isActive("/crm/follow-ups")}
              onNavigate={onClose}
            />

            <SidebarSubItem
              href="/crm/customer-groups"
              label="Customer Groups"
              active={isActive("/crm/customer-groups")}
              onNavigate={onClose}
            />
          </SidebarGroup>

          {/* Payments */}

          <SidebarItem
            href="/payments"
            icon={<MdPayments />}
            label="Payments"
            active={isActive("/payments")}
            isOpen={isOpen}
            onNavigate={onClose}
          />

          {/* Offers */}

          <SidebarItem
            href="/offers"
            icon={<MdLocalOffer />}
            label="Offers & Coupons"
            active={isActive("/offers")}
            isOpen={isOpen}
            onNavigate={onClose}
          />

          {/* Reports */}

          <SidebarItem
            href="/reports"
            icon={<MdBarChart />}
            label="Reports & Analytics"
            active={isActive("/reports")}
            isOpen={isOpen}
            onNavigate={onClose}
          />
        </div>
      </aside>
    </>
  );
}

interface SidebarItemProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  isOpen: boolean;
  hasArrow?: boolean;
  onNavigate?: () => void;
}

function SidebarItem({
  href,
  icon,
  label,
  active = false,
  isOpen,
  hasArrow = false,
  onNavigate,
}: SidebarItemProps) {
  return (
    <Link
      href={href}
      title={!isOpen ? label : undefined}
      onClick={onNavigate}
      className={`
        group
        mb-[2px]
        flex
        h-[34px]
        w-full
        items-center
        rounded-[4px]
        text-[13px]
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

      {isOpen && (
        <span className="min-w-0 flex-1 truncate whitespace-nowrap">
          {label}
        </span>
      )}

      {isOpen && hasArrow && (
        <MdExpandMore className="shrink-0 text-[15px] text-[#aeb4bb]" />
      )}
    </Link>
  );
}

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
      <button
        type="button"
        onClick={onClick}
        title={!isOpen ? label : undefined}
        className={`
          group
          flex
          h-[34px]
          w-full
          items-center
          rounded-[4px]
          text-left
          text-[13px]
          text-[#c3c6cb]
          transition

          hover:bg-[#151d28]
          hover:text-white

          ${isOpen ? "gap-3 px-2" : "justify-center"}
        `}
      >
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
            <span className="min-w-0 flex-1 truncate whitespace-nowrap">
              {label}
            </span>

            {expanded ? (
              <MdExpandLess className="shrink-0 text-[15px] text-[#aeb4bb]" />
            ) : (
              <MdExpandMore className="shrink-0 text-[15px] text-[#aeb4bb]" />
            )}
          </>
        )}
      </button>

      {isOpen && expanded && <div className="ml-[28px]">{children}</div>}
    </div>
  );
}

interface SidebarSubItemProps {
  href: string;
  label: string;
  active?: boolean;
  onNavigate?: () => void;
}

function SidebarSubItem({
  href,
  label,
  active = false,
  onNavigate,
}: SidebarSubItemProps) {
  return (
    <Link
      href={href}
      onClick={onNavigate}
      className={`
        flex
        min-h-[28px]
        items-center
        rounded-[3px]
        pl-1
         text-[12px]
        transition-colors

        ${
          active
            ? "font-medium text-[#d6a847]"
            : "text-[#b7bbc1] hover:text-white"
        }
      `}
    >
      <span className="truncate">{label}</span>
    </Link>
  );
}
