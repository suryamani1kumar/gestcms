"use client";

import React, { useState } from "react";
import {
  MdMenu,
  MdMenuOpen,
  MdSearch,
  MdNotificationsNone,
  MdMailOutline,
  MdKeyboardArrowDown,
  MdAdd,
  MdLogout,
} from "react-icons/md";

import { useAuth } from "../AuthContext";
import { useRouter } from "next/navigation";

interface HeaderProps {
  onToggleSidebar: () => void;
  isSidebarOpen: boolean;
}

export default function Header({
  onToggleSidebar,
  isSidebarOpen,
}: HeaderProps) {
  const { user } = useAuth();

  const [profileOpen, setProfileOpen] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch(`/api/auth/logout`, {
        method: "GET",
        credentials: "include",
      });
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      router.push("/login");
    }
  };

  return (
    <header
      className="
        sticky
        top-0
        z-40
        h-[52px]
        border-b
        border-[#e8e5df]
        bg-white
      "
    >
      <div className="flex h-full items-center justify-between px-3">
        <div className="flex min-w-0 flex-1 items-center gap-3">
          {/* Sidebar Toggle */}
          <button
            type="button"
            onClick={onToggleSidebar}
            className="
              flex
              h-[32px]
              w-[32px]
              shrink-0
              items-center
              justify-center
              rounded-[4px]
              text-[#555b62]
              transition
              hover:bg-[#f5f3ef]
              hover:text-[#222]
            "
            aria-label={isSidebarOpen ? "Hide sidebar" : "Show sidebar"}
          >
            {isSidebarOpen ? (
              <MdMenuOpen className="text-[20px]" />
            ) : (
              <MdMenu className="text-[20px]" />
            )}
          </button>

          {/* Search */}
          <div className="relative w-full max-w-[385px]">
            <input
              type="text"
              placeholder="Search customers, orders, products..."
              className="
                h-[31px]
                w-full
                rounded-[4px]
                border
                border-[#e5e1da]
                bg-white
                px-3
                pr-9
                text-[10px]
                text-[#333]
                outline-none
                placeholder:text-[#96999d]
                focus:border-[#c9a45c]
                focus:ring-1
                focus:ring-[#c9a45c]/20
              "
            />

            <MdSearch
              className="
                pointer-events-none
                absolute
                right-2.5
                top-1/2
                -translate-y-1/2
                text-[17px]
                text-[#85898d]
              "
            />
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-4">
          {/* Notifications */}
          <button
            type="button"
            className="
              relative
              flex
              h-[32px]
              w-[32px]
              items-center
              justify-center
              rounded-[4px]
              text-[#444a50]
              hover:bg-[#f5f3ef]
            "
          >
            <MdNotificationsNone className="text-[20px]" />

            <span
              className="
                absolute
                right-[1px]
                top-[1px]
                flex
                h-[13px]
                min-w-[13px]
                items-center
                justify-center
                rounded-full
                bg-[#17202b]
                px-[3px]
                text-[7px]
                font-semibold
                text-white
              "
            >
              6
            </span>
          </button>

          {/* Messages */}
          <button
            type="button"
            className="
              relative
              flex
              h-[32px]
              w-[32px]
              items-center
              justify-center
              rounded-[4px]
              text-[#444a50]
              hover:bg-[#f5f3ef]
            "
          >
            <MdMailOutline className="text-[19px]" />

            <span
              className="
                absolute
                right-[1px]
                top-[1px]
                flex
                h-[13px]
                min-w-[13px]
                items-center
                justify-center
                rounded-full
                bg-[#17202b]
                px-[3px]
                text-[7px]
                font-semibold
                text-white
              "
            >
              3
            </span>
          </button>

          <div className="relative ml-1">
            <button
              type="button"
              onClick={() => setProfileOpen(!profileOpen)}
              className="
                flex
                h-[36px]
                items-center
                gap-2
                rounded-[4px]
                px-1.5
                hover:bg-[#f7f5f1]
              "
            >
              {/* Avatar */}
              <div
                className="
                  flex
                  h-[30px]
                  w-[30px]
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  bg-[#ded8cc]
                  text-[11px]
                  font-semibold
                  text-[#514c44]
                "
              >
                {user?.name ? user.name.charAt(0).toUpperCase() : "S"}
              </div>

              {/* User */}
              <div className="hidden text-left sm:block">
                <div
                  className="
                    text-[10px]
                    font-semibold
                    leading-[12px]
                    text-[#292d32]
                  "
                >
                  {user?.name || "Super Admin"}
                </div>

                <div
                  className="
                    text-[8px]
                    leading-[11px]
                    text-[#85898d]
                  "
                >
                  {user?.role
                    ? user.role.charAt(0).toUpperCase() + user.role.slice(1)
                    : "Superadmin"}
                </div>
              </div>

              <MdKeyboardArrowDown
                className={`
                  text-[15px]
                  text-[#555]
                  transition-transform
                  ${profileOpen ? "rotate-180" : ""}
                `}
              />
            </button>

            {/* Profile Dropdown */}
            {profileOpen && (
              <div
                className="
    absolute
    right-0
    top-[41px]
    z-50
    w-[180px]
    rounded-[5px]
    border
    border-[#e5e1da]
    bg-white
    py-1
    shadow-lg
  "
              >
                {/* User Info */}
                <div
                  className="
      border-b
      border-[#eeeae4]
      px-3
      py-2
    "
                >
                  <p className="text-[10px] font-semibold text-[#333]">
                    {user?.name || "Super Admin"}
                  </p>

                  <p className="mt-0.5 truncate text-[8px] text-[#888]">
                    {user?.email || "admin@luxora.com"}
                  </p>
                </div>

                {/* My Profile */}
                <button
                  type="button"
                  onClick={() => {
                    setProfileOpen(false);
                    router.push("/profile");
                  }}
                  className="
      flex
      w-full
      px-3
      py-2
      text-left
      text-[10px]
      text-[#444]
      hover:bg-[#f7f4ee]
    "
                >
                  My Profile
                </button>

                {/* Account Settings */}
                <button
                  type="button"
                  onClick={() => {
                    setProfileOpen(false);
                    router.push("/settings");
                  }}
                  className="
      flex
      w-full
      px-3
      py-2
      text-left
      text-[10px]
      text-[#444]
      hover:bg-[#f7f4ee]
    "
                >
                  Account Settings
                </button>

                {/* Logout */}
                <div className="my-1 border-t border-[#eeeae4]" />

                <button
                  type="button"
                  onClick={handleLogout}
                  className="
      flex
      w-full
      items-center
      gap-2
      px-3
      py-2
      text-left
      text-[10px]
      font-medium
      text-red-500
      hover:bg-red-50
    "
                >
                  <MdLogout className="text-[14px]" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
