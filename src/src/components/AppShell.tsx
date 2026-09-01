"use client";

import React, { useCallback, useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import Header from "@/components/header/Header";
import Sidebar from "@/components/sidebar/Sidebar";

interface AppShellProps {
  children: React.ReactNode;
}

export default function AppShell({ children }: AppShellProps) {
  const pathname = usePathname();

  const isHidden = pathname === "/login";

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;

      setIsMobile(mobile);
      if (mobile) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const closeSidebar = useCallback(() => {
    if (window.innerWidth < 768) {
      setIsSidebarOpen(false);
    }
  }, []);

  if (isHidden) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-[#f8f7f4]">
      <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />

      <div
        className={` min-h-screen min-w-0 transition-all duration-300 ease-in-out ${isMobile ? "ml-0" : isSidebarOpen ? "ml-[250px]" : "ml-[64px]"} `}
      >
        <Header onToggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />

        <main className=" min-h-[calc(100vh-52px)] w-full min-w-0 overflow-x-hidden bg-[#f8f7f4]">
          {children}
        </main>
      </div>
    </div>
  );
}
