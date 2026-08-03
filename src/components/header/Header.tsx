"use client";

import React from "react";
import { MdMenu, MdMenuOpen, MdSearch } from "react-icons/md";
import { useAuth } from "../AuthContext";

interface HeaderProps {
  onToggleSidebar: () => void;
  isSidebarOpen: boolean;
}

export default function Header({ onToggleSidebar, isSidebarOpen }: HeaderProps) {
  const { user } = useAuth();

  return (
    <header className="border-b border-slate-200 bg-white px-4 py-3 shadow-sm">
      <div className="flex items-center justify-between gap-4">
        <div className="flex flex-1 items-center gap-4">
          <button
            onClick={onToggleSidebar}
            className="rounded-md p-2 text-slate-600 hover:bg-slate-100 lg:hidden"
            aria-label={`${isSidebarOpen ? "Close" : "Open"} sidebar`}
          >
            <MdMenu size={24} />
          </button>
          <div className="hidden lg:flex lg:items-center lg:gap-2">
            <button
              onClick={onToggleSidebar}
              className="rounded-md p-2 text-slate-600 hover:bg-slate-100"
              aria-label={`${isSidebarOpen ? "Hide" : "Show"} sidebar`}
            >
              {isSidebarOpen ? <MdMenuOpen size={20} /> : <MdMenu size={20} />}
            </button>
          </div>
          <div className="flex flex-1 items-center">
            <label className="relative w-full">
              <input
                className="w-full rounded-full border border-slate-200 px-4 py-2 text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                placeholder="Search leads, deals or customers..."
              />
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg">
                <MdSearch />
              </span>
            </label>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-slate-200" />
              <div className="text-sm">
                <div className="font-medium text-slate-800">{user?.name}</div>
                <div className="text-xs text-slate-500">{user?.email}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
