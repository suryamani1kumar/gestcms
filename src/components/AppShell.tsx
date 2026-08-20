"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";

import Header from "@/components/header/Header";
import Sidebar from "@/components/sidebar/Sidebar";

interface AppShellProps {
  children: React.ReactNode;
}

export default function AppShell({ children }: AppShellProps) {
  const pathname = usePathname();

  const isHidden = ["/login"].some(
    (route) => route === pathname
  );

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  if (isHidden) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-[#f8f7f4]">
      {/* =====================================================
          SIDEBAR
      ====================================================== */}

      <Sidebar isOpen={isSidebarOpen} />

      {/* =====================================================
          MAIN APPLICATION AREA
      ====================================================== */}

      <div
        className={`
          min-h-screen
          transition-all
          duration-300
          ease-in-out
          ${isSidebarOpen ? "ml-[250px]" : "ml-[64px]"}
        `}
      >
        {/* =================================================
            HEADER
        ================================================== */}

        <Header
          onToggleSidebar={toggleSidebar}
          isSidebarOpen={isSidebarOpen}
        />

        {/* =================================================
            PAGE CONTENT
        ================================================== */}

        <main className="min-h-[calc(100vh-52px)] bg-[#f8f7f4]">
          {children}
        </main>
      </div>
    </div>
  );
}