"use client";

import React, { useState } from "react";
import {
  MdMenu,
  MdMenuOpen,
  MdSearch,
  MdNotificationsNone,
  MdMailOutline,
  MdKeyboardArrowDown,
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
        h-[55px]
        w-full
        border-b
        border-[#e8e5df]
        bg-white
      "
    >
      <div
        className="
          flex
          h-full
          w-full
          items-center
          justify-between
          gap-2
          px-2
          sm:px-3
        "
      >
        <div
          className="
            flex
            min-w-0
            flex-1
            items-center
            gap-2
            sm:gap-3
          "
        >
          <button
            type="button"
            onClick={onToggleSidebar}
            className="
              flex
              h-[32px]
              w-[32px]
              shrink-0
              cursor-pointer
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

          <div
            className="
              relative
              hidden
              min-w-0
              flex-1
              sm:block
              sm:max-w-[385px]
            "
          >
            <input
              type="text"
              placeholder="Search customers, orders, products..."
              className="
                h-[35px]
                w-full
                rounded-[4px]
                border
                border-[#e5e1da]
                bg-white
                px-3
                pr-9
                text-[12px]
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

          {/* Mobile Search Button */}

          <button
            type="button"
            className="
              flex
              h-[32px]
              w-[32px]
              shrink-0
              items-center
              justify-center
              rounded-[4px]
              text-[#444a50]
              hover:bg-[#f5f3ef]
              sm:hidden
            "
            aria-label="Search"
          >
            <MdSearch className="text-[20px]" />
          </button>
        </div>

        <div
          className="
            flex
            shrink-0
            items-center
            gap-1
            sm:gap-2
            md:gap-4
          "
        >
          <button
            type="button"
            className="
    relative
    flex
    h-[32px]
    w-[32px]
    shrink-0
    items-center
    justify-center
    rounded-[4px]
    text-[#444a50]
    hover:bg-[#f5f3ef]
  "
            aria-label="Notifications"
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
      text-[8px]
      font-semibold
      text-white
    "
            >
              6
            </span>
          </button>

          <button
            type="button"
            className="
    relative
    flex
    h-[32px]
    w-[32px]
    shrink-0
    items-center
    justify-center
    rounded-[4px]
    text-[#444a50]
    hover:bg-[#f5f3ef]
  "
            aria-label="Messages"
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
      text-[8px]
      font-semibold
      text-white
    "
            >
              3
            </span>
          </button>

          <div className="relative ml-0 sm:ml-1">
            <button
              type="button"
              onClick={() => setProfileOpen(!profileOpen)}
              className="
                flex
                h-[36px]
                cursor-pointer
                items-center
                gap-1.5
                rounded-[4px]
                px-1
                hover:bg-[#f7f5f1]
                sm:gap-2
                sm:px-1.5
              "
              aria-expanded={profileOpen}
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
                  text-[18px]
                  font-semibold
                  text-[#514c44]
                "
              >
                {user?.name ? user.name.charAt(0).toUpperCase() : "S"}
              </div>

              {/* User Information */}

              <div className="hidden text-left sm:block">
                <div
                  className="
                    max-w-[100px]
                    truncate
                    text-[12px]
                    font-semibold
                    leading-[12px]
                    text-[#292d32]
                    md:max-w-[140px]
                  "
                >
                  {user?.name || "Super Admin"}
                </div>

                <div
                  className="
                    text-[10px]
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

            {profileOpen && (
              <div
                className="
                  absolute
                  right-0
                  top-[41px]
                  z-50
                  w-[180px]
                  overflow-hidden
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
                  <p
                    className="
                      truncate
                      text-[13px]
                      font-semibold
                      text-[#333]
                    "
                  >
                    {user?.name || "Super Admin"}
                  </p>

                  <p
                    className="
                      mt-0.5
                      truncate
                      text-[12px]
                      text-[#888]
                    "
                  >
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
                    cursor-pointer
                    px-3
                    py-1
                    text-left
                    text-[12px]
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
                    cursor-pointer
                    px-3
                    py-1
                    text-left
                    text-[12px]
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
                    cursor-pointer
                    items-center
                    gap-2
                    px-3
                    py-1
                    text-left
                    text-[12px]
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
