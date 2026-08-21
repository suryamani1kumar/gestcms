"use client";

import React, { useMemo, useState } from "react";
import {
  FiPlus,
  FiFilter,
  FiDownload,
  FiSearch,
  FiMoreVertical,
  FiChevronLeft,
  FiChevronRight,
  FiUser,
  FiUserCheck,
  FiUserX,
  FiShield,
  FiUserPlus,
  FiSettings,
  FiUpload,
  FiActivity,
  FiCheck,
  FiUsers,
} from "react-icons/fi";

/* =========================================================
   TYPES
========================================================= */

type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  role: string;
  department: string;
  status: "Active" | "Inactive";
  lastLogin: string;
  lastLoginTime: string;
  joinedDate: string;
  avatar: string;
};

type Role = {
  name: string;
  count: number;
  color: string;
};

/* =========================================================
   DATA
========================================================= */

const users: User[] = [
  {
    id: 1,
    name: "Neha Kapoor",
    username: "@nehakapoor",
    email: "neha.kapoor@luxora.com",
    role: "Administrator",
    department: "IT Department",
    status: "Active",
    lastLogin: "17 May 2025",
    lastLoginTime: "10:30 AM",
    joinedDate: "15 Jan 2024",
    avatar: "https://i.pravatar.cc/80?img=47",
  },
  {
    id: 2,
    name: "Rahul Verma",
    username: "@rahulverma",
    email: "rahul.verma@luxora.com",
    role: "Manager",
    department: "Sales Department",
    status: "Active",
    lastLogin: "17 May 2025",
    lastLoginTime: "09:15 AM",
    joinedDate: "10 Feb 2024",
    avatar: "https://i.pravatar.cc/80?img=12",
  },
  {
    id: 3,
    name: "Priya Sharma",
    username: "@priyasharma",
    email: "priya.sharma@luxora.com",
    role: "Sales Executive",
    department: "Sales Department",
    status: "Active",
    lastLogin: "17 May 2025",
    lastLoginTime: "08:45 AM",
    joinedDate: "12 Mar 2024",
    avatar: "https://i.pravatar.cc/80?img=44",
  },
  {
    id: 4,
    name: "Amit Singh",
    username: "@amitsingh",
    email: "amit.singh@luxora.com",
    role: "Support Agent",
    department: "Support Department",
    status: "Active",
    lastLogin: "16 May 2025",
    lastLoginTime: "05:30 PM",
    joinedDate: "18 Apr 2024",
    avatar: "https://i.pravatar.cc/80?img=11",
  },
  {
    id: 5,
    name: "Kavya Patel",
    username: "@kavyapatel",
    email: "kavya.patel@luxora.com",
    role: "Accountant",
    department: "Finance Department",
    status: "Active",
    lastLogin: "16 May 2025",
    lastLoginTime: "04:20 PM",
    joinedDate: "22 May 2024",
    avatar: "https://i.pravatar.cc/80?img=32",
  },
  {
    id: 6,
    name: "Arjun Mehta",
    username: "@arjunmehta",
    email: "arjun.mehta@luxora.com",
    role: "Manager",
    department: "Operations",
    status: "Active",
    lastLogin: "16 May 2025",
    lastLoginTime: "02:15 PM",
    joinedDate: "05 Jun 2024",
    avatar: "https://i.pravatar.cc/80?img=13",
  },
  {
    id: 7,
    name: "Ananya Rao",
    username: "@ananyarao",
    email: "ananya.rao@luxora.com",
    role: "Sales Executive",
    department: "Sales Department",
    status: "Inactive",
    lastLogin: "14 May 2025",
    lastLoginTime: "11:10 AM",
    joinedDate: "15 Jun 2024",
    avatar: "https://i.pravatar.cc/80?img=48",
  },
];

/* =========================================================
   ROLE DATA
========================================================= */

const roles: Role[] = [
  {
    name: "Administrators",
    count: 6,
    color: "#7650d8",
  },
  {
    name: "Managers",
    count: 8,
    color: "#4388e8",
  },
  {
    name: "Sales Executives",
    count: 14,
    color: "#4caf76",
  },
  {
    name: "Support Agents",
    count: 8,
    color: "#f29a2e",
  },
  {
    name: "Accountants",
    count: 6,
    color: "#68b8e8",
  },
  {
    name: "Others",
    count: 6,
    color: "#b8b8b8",
  },
];

/* =========================================================
   CARD
========================================================= */

const Card = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={`rounded-[7px] border border-[#e8e8e8] bg-white ${className}`}
    >
      {children}
    </div>
  );
};

/* =========================================================
   STAT CARD
========================================================= */

const StatCard = ({
  icon: Icon,
  title,
  value,
  percentage,
  iconBg,
  iconColor,
  negative = false,
}: {
  icon: React.ElementType;
  title: string;
  value: string;
  percentage: string;
  iconBg: string;
  iconColor: string;
  negative?: boolean;
}) => {
  return (
    <div className="rounded-[7px] border border-[#e8e8e8] bg-white px-4 py-3.5">
      <div className="flex items-center gap-3">
        <div
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${iconBg}`}
        >
          <Icon className={`text-[16px] ${iconColor}`} />
        </div>

        <div className="min-w-0">
          <p className="text-[7px] font-medium text-[#555]">{title}</p>

          <p className="mt-0.5 text-[15px] font-semibold leading-4 text-[#222]">
            {value}
          </p>

          <div className="mt-1 flex items-center gap-1">
            <span
              className={`text-[6.5px] font-semibold ${
                negative ? "text-red-500" : "text-[#1ca05a]"
              }`}
            >
              {negative ? "↓" : "↑"} {percentage}
            </span>

            <span className="text-[6px] text-[#999]">
              vs last month
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

/* =========================================================
   ROLE BADGE
========================================================= */

const RoleBadge = ({ role }: { role: string }) => {
  const styles: Record<string, string> = {
    Administrator:
      "bg-[#f1eaff] text-[#7147c9]",
    Manager:
      "bg-[#eaf3ff] text-[#4385df]",
    "Sales Executive":
      "bg-[#e9f8ef] text-[#2f9b61]",
    "Support Agent":
      "bg-[#fff3df] text-[#dc8b20]",
    Accountant:
      "bg-[#edf5ff] text-[#3d83d7]",
  };

  return (
    <span
      className={`inline-flex rounded px-2 py-1 text-[6.5px] font-semibold ${
        styles[role] || "bg-slate-100 text-slate-600"
      }`}
    >
      {role}
    </span>
  );
};

/* =========================================================
   STATUS BADGE
========================================================= */

const StatusBadge = ({
  status,
}: {
  status: "Active" | "Inactive";
}) => {
  return (
    <span
      className={`inline-flex rounded px-2 py-1 text-[6.5px] font-semibold ${
        status === "Active"
          ? "bg-[#eaf8ef] text-[#2d9a5d]"
          : "bg-[#fff0f0] text-[#dc4848]"
      }`}
    >
      {status}
    </span>
  );
};

/* =========================================================
   ROLE SUMMARY
========================================================= */

const RoleSummary = () => {
  return (
    <Card className="p-3">
      <h3 className="text-[9px] font-bold text-[#222]">
        Role Summary
      </h3>

      <div className="mt-3 flex justify-center">
        <div className="relative h-[105px] w-[105px]">
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background:
                "conic-gradient(#7650d8 0deg 45deg, #4388e8 45deg 105deg, #4caf76 105deg 210deg, #f29a2e 210deg 270deg, #68b8e8 270deg 315deg, #b8b8b8 315deg 360deg)",
            }}
          />

          <div className="absolute inset-[17px] flex flex-col items-center justify-center rounded-full bg-white">
            <span className="text-[14px] font-semibold text-[#222]">
              48
            </span>

            <span className="text-[7px] text-[#777]">
              Users
            </span>
          </div>
        </div>
      </div>

      <div className="mt-2 space-y-1.5">
        {roles.map((role) => (
          <div
            key={role.name}
            className="flex items-center justify-between"
          >
            <div className="flex items-center gap-2">
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{
                  backgroundColor: role.color,
                }}
              />

              <span className="text-[6.5px] text-[#555]">
                {role.name}
              </span>
            </div>

            <span className="text-[6.5px] text-[#555]">
              {role.count} (
              {((role.count / 48) * 100).toFixed(1)}%)
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
};

/* =========================================================
   QUICK ACTIONS
========================================================= */

const QuickActions = () => {
  const actions = [
    {
      icon: FiUserPlus,
      title: "Add New User",
      description: "Create a new system user",
      bg: "bg-[#eaf8ef]",
      color: "text-[#2d9a5d]",
    },
    {
      icon: FiUsers,
      title: "Manage Roles",
      description: "View and edit user roles",
      bg: "bg-[#edf5ff]",
      color: "text-[#4285df]",
    },
    {
      icon: FiShield,
      title: "Permission Settings",
      description: "Manage system permissions",
      bg: "bg-[#fff4df]",
      color: "text-[#e39425]",
    },
    {
      icon: FiUpload,
      title: "Bulk Import Users",
      description: "Import users from CSV",
      bg: "bg-[#edf5ff]",
      color: "text-[#4285df]",
    },
    {
      icon: FiActivity,
      title: "Activity Log",
      description: "View user activity logs",
      bg: "bg-[#fff0f1]",
      color: "text-[#e7474d]",
    },
  ];

  return (
    <Card className="p-3">
      <h3 className="text-[9px] font-bold text-[#222]">
        Quick Actions
      </h3>

      <div className="mt-3 space-y-3">
        {actions.map((action) => (
          <button
            key={action.title}
            className="flex w-full items-center gap-2.5 text-left"
          >
            <div
              className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-md ${action.bg}`}
            >
              <action.icon
                className={`text-[11px] ${action.color}`}
              />
            </div>

            <div>
              <p className="text-[7px] font-semibold text-[#444]">
                {action.title}
              </p>

              <p className="mt-0.5 text-[6px] text-[#888]">
                {action.description}
              </p>
            </div>
          </button>
        ))}
      </div>
    </Card>
  );
};

/* =========================================================
   RECENT ACTIVITIES
========================================================= */

const RecentActivities = () => {
  const activities = [
    {
      avatar: "https://i.pravatar.cc/50?img=47",
      name: "Neha Kapoor",
      action: "logged in",
      date: "17 May 2025, 10:30 AM",
    },
    {
      avatar: "https://i.pravatar.cc/50?img=12",
      name: "Rahul Verma",
      action: "updated user role",
      date: "17 May 2025, 09:45 AM",
    },
    {
      avatar: "https://i.pravatar.cc/50?img=44",
      name: "Priya Sharma",
      action: "added new user",
      date: "17 May 2025, 08:50 AM",
    },
    {
      avatar: "https://i.pravatar.cc/50?img=11",
      name: "Amit Singh",
      action: "updated permissions",
      date: "16 May 2025, 05:20 PM",
    },
  ];

  return (
    <Card className="p-3">
      <div className="flex items-center justify-between">
        <h3 className="text-[9px] font-bold text-[#222]">
          Recent Activities
        </h3>

        <button className="text-[7px] font-medium text-[#bd7f1d]">
          View All
        </button>
      </div>

      <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {activities.map((activity) => (
          <div
            key={`${activity.name}-${activity.action}`}
            className="flex items-center gap-2"
          >
            <img
              src={activity.avatar}
              alt=""
              className="h-7 w-7 rounded-full object-cover"
            />

            <div className="min-w-0">
              <p className="truncate text-[6.5px] text-[#555]">
                <span className="font-semibold text-[#333]">
                  {activity.name}
                </span>{" "}
                {activity.action}
              </p>

              <p className="mt-0.5 text-[5.5px] text-[#999]">
                {activity.date}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

/* =========================================================
   USERS PAGE
========================================================= */

const Users = () => {
  const [activeTab, setActiveTab] = useState("All Users");

  const [search, setSearch] = useState("");

  const [selectedUsers, setSelectedUsers] = useState<number[]>(
    []
  );

  const [page, setPage] = useState(1);

  const tabs = [
    {
      name: "All Users",
      count: 48,
    },
    {
      name: "Active",
      count: 42,
    },
    {
      name: "Inactive",
      count: 6,
    },
    {
      name: "Administrators",
      count: 6,
    },
  ];

  /* =======================================================
     FILTER USERS
  ======================================================= */

  const filteredUsers = useMemo(() => {
    let result = [...users];

    if (activeTab === "Active") {
      result = result.filter(
        (user) => user.status === "Active"
      );
    }

    if (activeTab === "Inactive") {
      result = result.filter(
        (user) => user.status === "Inactive"
      );
    }

    if (activeTab === "Administrators") {
      result = result.filter(
        (user) => user.role === "Administrator"
      );
    }

    if (search.trim()) {
      const query = search.toLowerCase();

      result = result.filter(
        (user) =>
          user.name.toLowerCase().includes(query) ||
          user.email.toLowerCase().includes(query) ||
          user.department.toLowerCase().includes(query) ||
          user.role.toLowerCase().includes(query)
      );
    }

    return result;
  }, [activeTab, search]);

  /* =======================================================
     SELECTION
  ======================================================= */

  const toggleUser = (id: number) => {
    setSelectedUsers((current) =>
      current.includes(id)
        ? current.filter((userId) => userId !== id)
        : [...current, id]
    );
  };

  const toggleAll = () => {
    if (
      selectedUsers.length === filteredUsers.length &&
      filteredUsers.length > 0
    ) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(
        filteredUsers.map((user) => user.id)
      );
    }
  };

  return (
    <main className="min-h-screen bg-[#fafafa]">
      {/* ===================================================
          HEADER
      ==================================================== */}

      <header className="flex items-start justify-between px-4 pb-4 pt-3">
        <div>
          <h1 className="text-[17px] font-bold leading-5 text-[#171717]">
            Users
          </h1>

          <p className="mt-1 text-[8px] text-[#777]">
            Manage system users and their access permissions.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button className="flex h-8 items-center gap-2 rounded-md bg-[#bd7f1d] px-3.5 text-[7px] font-semibold text-white shadow-sm hover:bg-[#a97017]">
            <FiPlus className="text-[10px]" />
            Add User
          </button>

          <button className="flex h-8 items-center gap-2 rounded-md border border-[#dedede] bg-white px-3 text-[7px] font-medium text-[#555]">
            <FiFilter className="text-[9px]" />
            Filters
          </button>

          <button className="flex h-8 items-center gap-2 rounded-md border border-[#dedede] bg-white px-3 text-[7px] font-medium text-[#555]">
            <FiDownload className="text-[9px]" />
            Export
          </button>
        </div>
      </header>

      <div className="space-y-3 px-3 pb-5">
        {/* =================================================
            STATISTICS
        ================================================== */}

        <div className="grid grid-cols-2 gap-3 xl:grid-cols-5">
          <StatCard
            icon={FiUser}
            title="Total Users"
            value="48"
            percentage="12.5%"
            iconBg="bg-[#f5efff]"
            iconColor="text-[#8150e5]"
          />

          <StatCard
            icon={FiUserCheck}
            title="Active Users"
            value="42"
            percentage="10.3%"
            iconBg="bg-[#ecfaf2]"
            iconColor="text-[#16a05a]"
          />

          <StatCard
            icon={FiShield}
            title="Administrators"
            value="6"
            percentage="0%"
            iconBg="bg-[#fff5e5]"
            iconColor="text-[#ef9517]"
          />

          <StatCard
            icon={FiUserX}
            title="Inactive Users"
            value="6"
            percentage="14.3%"
            negative
            iconBg="bg-[#fff0f1]"
            iconColor="text-[#ef4148]"
          />

          <StatCard
            icon={FiUserPlus}
            title="New Users"
            value="8"
            percentage="33.3%"
            iconBg="bg-[#edf5ff]"
            iconColor="text-[#4285df]"
          />
        </div>

        {/* =================================================
            MAIN GRID
        ================================================== */}

        <div className="grid grid-cols-12 gap-3">
          {/* ===============================================
              USER TABLE
          ================================================ */}

          <Card className="col-span-12 overflow-hidden xl:col-span-8">
            {/* TABS + SEARCH */}

            <div className="flex items-center justify-between border-b border-[#ededed] px-3">
              <div className="flex items-center gap-5">
                {tabs.map((tab) => {
                  const active = activeTab === tab.name;

                  return (
                    <button
                      key={tab.name}
                      onClick={() => {
                        setActiveTab(tab.name);
                        setPage(1);
                      }}
                      className={`relative py-3 text-[7px] font-medium ${
                        active
                          ? "text-[#bd7f1d]"
                          : "text-[#555]"
                      }`}
                    >
                      {tab.name} ({tab.count})

                      {active && (
                        <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#bd7f1d]" />
                      )}
                    </button>
                  );
                })}
              </div>

              <div className="relative hidden sm:block">
                <FiSearch className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[9px] text-[#999]" />

                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search users..."
                  className="h-7 w-[180px] rounded border border-[#e2e2e2] pl-7 pr-7 text-[7px] outline-none focus:border-[#bd7f1d]"
                />

                {search && (
                  <button
                    onClick={() => setSearch("")}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-[8px] text-[#999]"
                  >
                    ×
                  </button>
                )}
              </div>
            </div>

            {/* TABLE */}

            <div className="overflow-x-auto">
              <table className="w-full min-w-[850px] border-collapse">
                <thead>
                  <tr className="border-b border-[#ededed] bg-[#fcfcfc]">
                    <th className="w-[34px] px-3 py-2.5 text-left">
                      <input
                        type="checkbox"
                        checked={
                          selectedUsers.length ===
                            filteredUsers.length &&
                          filteredUsers.length > 0
                        }
                        onChange={toggleAll}
                        className="h-3 w-3 accent-[#bd7f1d]"
                      />
                    </th>

                    <th className="px-2 py-2.5 text-left text-[6.5px] font-semibold text-[#555]">
                      User
                    </th>

                    <th className="px-2 py-2.5 text-left text-[6.5px] font-semibold text-[#555]">
                      Email
                    </th>

                    <th className="px-2 py-2.5 text-left text-[6.5px] font-semibold text-[#555]">
                      Role
                    </th>

                    <th className="px-2 py-2.5 text-left text-[6.5px] font-semibold text-[#555]">
                      Department
                    </th>

                    <th className="px-2 py-2.5 text-left text-[6.5px] font-semibold text-[#555]">
                      Status
                    </th>

                    <th className="px-2 py-2.5 text-left text-[6.5px] font-semibold text-[#555]">
                      Last Login
                    </th>

                    <th className="px-2 py-2.5 text-left text-[6.5px] font-semibold text-[#555]">
                      Joined Date
                    </th>

                    <th className="w-[45px] px-2 py-2.5 text-center text-[6.5px] font-semibold text-[#555]">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {filteredUsers.map((user) => (
                    <tr
                      key={user.id}
                      className="border-b border-[#eeeeee] hover:bg-[#fffdf9]"
                    >
                      <td className="px-3 py-2.5">
                        <input
                          type="checkbox"
                          checked={selectedUsers.includes(
                            user.id
                          )}
                          onChange={() =>
                            toggleUser(user.id)
                          }
                          className="h-3 w-3 accent-[#bd7f1d]"
                        />
                      </td>

                      <td className="px-2 py-2.5">
                        <div className="flex items-center gap-2">
                          <img
                            src={user.avatar}
                            alt=""
                            className="h-7 w-7 shrink-0 rounded-full object-cover"
                          />

                          <div className="min-w-0">
                            <p className="truncate text-[7px] font-semibold text-[#333]">
                              {user.name}
                            </p>

                            <p className="mt-0.5 text-[6px] text-[#888]">
                              {user.username}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-2 py-2.5 text-[6.5px] text-[#666]">
                        {user.email}
                      </td>

                      <td className="px-2 py-2.5">
                        <RoleBadge role={user.role} />
                      </td>

                      <td className="px-2 py-2.5 text-[6.5px] text-[#666]">
                        {user.department}
                      </td>

                      <td className="px-2 py-2.5">
                        <StatusBadge status={user.status} />
                      </td>

                      <td className="px-2 py-2.5">
                        <p className="text-[6.5px] text-[#555]">
                          {user.lastLogin}
                        </p>

                        <p className="mt-0.5 text-[6px] text-[#888]">
                          {user.lastLoginTime}
                        </p>
                      </td>

                      <td className="px-2 py-2.5 text-[6.5px] text-[#555]">
                        {user.joinedDate}
                      </td>

                      <td className="px-2 py-2.5 text-center">
                        <button className="text-[#555]">
                          <FiMoreVertical className="text-[11px]" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {filteredUsers.length === 0 && (
                <div className="py-12 text-center">
                  <p className="text-[9px] text-[#777]">
                    No users found.
                  </p>
                </div>
              )}
            </div>

            {/* PAGINATION */}

            <div className="flex items-center justify-between border-t border-[#ededed] px-3 py-3">
              <p className="text-[6.5px] text-[#666]">
                Showing 1 to 10 of 48 results
              </p>

              <div className="flex items-center gap-1">
                <button
                  onClick={() =>
                    setPage(Math.max(1, page - 1))
                  }
                  className="flex h-7 w-7 items-center justify-center rounded border border-[#e2e2e2] text-[#777]"
                >
                  <FiChevronLeft className="text-[9px]" />
                </button>

                {[1, 2, 3, 4, 5].map((number) => (
                  <button
                    key={number}
                    onClick={() => setPage(number)}
                    className={`flex h-7 w-7 items-center justify-center rounded border text-[7px] ${
                      page === number
                        ? "border-[#bd7f1d] text-[#bd7f1d]"
                        : "border-transparent text-[#555]"
                    }`}
                  >
                    {number}
                  </button>
                ))}

                <span className="px-1 text-[7px] text-[#777]">
                  ...
                </span>

                <button className="flex h-7 w-7 items-center justify-center rounded border border-[#e2e2e2] text-[#777]">
                  <FiChevronRight className="text-[9px]" />
                </button>

                <button className="ml-2 flex h-7 items-center gap-2 rounded border border-[#e2e2e2] px-2 text-[6.5px] text-[#555]">
                  10 / page
                  <span>⌄</span>
                </button>
              </div>
            </div>
          </Card>

          {/* ===============================================
              RIGHT SIDEBAR
          ================================================ */}

          <div className="col-span-12 space-y-3 xl:col-span-4">
            <RoleSummary />

            <QuickActions />

            <RecentActivities />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Users;