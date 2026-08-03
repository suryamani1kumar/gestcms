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
  const ishidden = ["/login"].some((route) => route === pathname);

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  if (ishidden) {
    return <>{children}</>;
  }

  return (
    <>
      <Sidebar isOpen={isSidebarOpen} />

      <div
        className={`content-wrapper flex flex-col min-h-screen transition-all duration-300 ${
          isSidebarOpen ? "lg:ml-50" : "lg:ml-15"
        }`}
      >
        <Header onToggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />

        <main className="flex-1 bg-slate-50 overflow-auto">{children}</main>
      </div>
    </>
  );
}
