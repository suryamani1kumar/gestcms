"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  MdDashboard,
  MdPeople,
  MdLogout,
  MdOutlineBrightnessHigh,
} from "react-icons/md";
import { FaRegGem } from "react-icons/fa";
import { useAuth } from "../AuthContext";

interface SidebarProps {
  isOpen?: boolean;
}

export default function Sidebar({ isOpen = true }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { user } = useAuth();

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

  const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: MdDashboard },
    { name: "Create Agent", href: "/agent", icon: MdPeople },
    { name: "Products", href: "/products", icon: MdOutlineBrightnessHigh },
  ];

  const widthClass = isOpen ? "w-50" : "w-15";

  return (
    <>
      <aside
        className={`fixed left-0 top-0 h-screen ${widthClass} border-r border-slate-200 bg-slate-900 text-white overflow-y-auto pb-3 transition-all duration-300 ease-in-out flex flex-col justify-between`}
      >
        <div>
          <div className="px-3 py-4">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded bg-indigo-500 flex items-center justify-center text-sm font-bold">
                B
              </div>
              {isOpen && user && (
                <div>
                  <h2 className="text-lg font-bold">Gemstone Crm</h2>
                  <p className="text-xs text-slate-400">
                    {user.name}
                    <br />
                    {user.role
                      ? user.role.charAt(0).toUpperCase() + user.role.slice(1)
                      : ""}
                  </p>
                </div>
              )}
            </div>
          </div>

          <nav className="space-y-2 px-2 py-6">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              if (user?.role === "agent" && item.name === "Create Agent") {
                return null;
              }
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center ${isOpen ? "justify-start" : "justify-center"} gap-3 rounded-lg px-2 py-2 text-sm font-medium transition ${
                    isActive
                      ? "bg-indigo-600 text-white border-l-4 border-indigo-400" +
                        (isOpen ? " pl-3" : "")
                      : "text-slate-300 hover:bg-slate-800"
                  }`}
                >
                  {item.icon && <item.icon className="text-lg" />}
                  {isOpen && <span>{item.name}</span>}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="px-2">
          <button
            onClick={handleLogout}
            className={`w-full flex items-center ${
              isOpen ? "justify-start" : "justify-center"
            } gap-3 rounded-lg px-2 py-2 text-sm font-medium text-slate-300 hover:bg-slate-800 transition`}
          >
            <MdLogout className="text-lg" />
            {isOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>
    </>
  );
}
