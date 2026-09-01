"use client";

import PageHeader from "@/components/pageheader/PageHeader";
import StatCard from "@/components/statcard/StatCard";

import React, { useCallback, useEffect, useMemo, useState } from "react";

import {
  FiSearch,
  FiMoreVertical,
  FiChevronLeft,
  FiChevronRight,
  FiUser,
  FiUserCheck,
  FiUserX,
  FiShield,
  FiUserPlus,
  FiEye,
  FiEdit2,
  FiTrash2,
  FiX,
} from "react-icons/fi";

type User = {
  id: string;
  name: string;
  userName: string;
  email: string;
  role: string;
  isActive: "Active" | "Inactive";
  lastLogin: string | null;
  lastLoginTime: string | null;
  joinedDate: string;
};

type UserStats = {
  totalUsers: number;
  activeUsers: number;
  inactiveUsers: number;
  administrators: number;
  newUsers: number;
};

type Role = {
  name: string;
  count: number;
  color: string;
};

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

const RoleBadge = ({ role }: { role: string }) => {
  const styles: Record<string, string> = {
    superadmin: "bg-[#f1eaff] text-[#7147c9]",

    administrator: "bg-[#fff5e5] text-[#ef9517]",

    agent: "bg-[#eaf3ff] text-[#4385df]",
  };

  return (
    <span
      className={`inline-flex rounded px-2 py-1 text-[12px] font-semibold ${
        styles[role] || "bg-slate-100 text-slate-600"
      }`}
    >
      {role}
    </span>
  );
};

const StatusBadge = ({ status }: { status: "Active" | "Inactive" }) => {
  return (
    <span
      className={`inline-flex rounded px-2 py-1 text-[12px] font-semibold ${
        status === "Active"
          ? "bg-[#eaf8ef] text-[#2d9a5d]"
          : "bg-[#fff0f0] text-[#dc4848]"
      }`}
    >
      {status}
    </span>
  );
};

const RoleSummary = ({ stats }: { stats: UserStats }) => {
  const roles: Role[] = [
    {
      name: "Super Admin",
      count: stats.administrators,
      color: "#7650d8",
    },
    {
      name: "Administrators",
      count: stats.administrators,
      color: "#ef9517",
    },
    {
      name: "Agents",
      count: Math.max(stats.totalUsers - stats.administrators, 0),
      color: "#4388e8",
    },
  ];

  const total = stats.totalUsers || 1;

  return (
    <Card className="p-3">
      <h3 className="text-[12px] font-bold text-[#222]">Role Summary</h3>

      {/* DONUT */}

      <div className="mt-3 flex justify-center">
        <div className="relative h-[105px] w-[105px]">
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background:
                "conic-gradient(#7650d8 0deg 60deg, #ef9517 60deg 120deg, #4388e8 120deg 360deg)",
            }}
          />

          <div className="absolute inset-[17px] flex flex-col items-center justify-center rounded-full bg-white">
            <span className="text-[14px] font-semibold text-[#222]">
              {stats.totalUsers}
            </span>

            <span className="text-[12px] text-[#777]">Users</span>
          </div>
        </div>
      </div>

      {/* ROLE LIST */}

      <div className="mt-2 space-y-1.5">
        {roles.map((role) => (
          <div key={role.name} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{
                  backgroundColor: role.color,
                }}
              />

              <span className="text-[12px] text-[#555]">{role.name}</span>
            </div>

            <span className="text-[12px] text-[#555]">
              {role.count} ({((role.count / total) * 100).toFixed(1)}
              %)
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
};

const RecentActivities = ({ users }: { users: User[] }) => {
  const activities = users
    .filter((user) => user.lastLogin)
    .sort(
      (a, b) =>
        new Date(b.lastLogin || 0).getTime() -
        new Date(a.lastLogin || 0).getTime(),
    )
    .slice(0, 4);

  return (
    <Card className="p-3">
      <div className="flex items-center justify-between">
        <h3 className="text-[12px] font-bold text-[#222]">Recent Activities</h3>

        <button className="text-[10px] font-medium text-[#bd7f1d]">
          View All
        </button>
      </div>

      <div className="mt-3 grid grid-cols-1 gap-3">
        {activities.length === 0 ? (
          <p className="py-4 text-center text-[10px] text-[#999]">
            No recent activities
          </p>
        ) : (
          activities.map((user) => (
            <div key={user.id} className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#f1eaff] text-[10px] font-semibold text-[#7650d8]">
                {user.name.charAt(0).toUpperCase()}
              </div>

              <div className="min-w-0">
                <p className="truncate text-[12px] text-[#555]">
                  <span className="font-semibold text-[#333]">{user.name}</span>{" "}
                  logged in
                </p>

                <p className="mt-0.5 text-[10px] text-[#999]">
                  {formatDateTime(user.lastLogin)}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </Card>
  );
};

const formatDate = (date: string | null) => {
  if (!date) {
    return "Never";
  }

  return new Date(date).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const formatTime = (date: string | null) => {
  if (!date) {
    return "";
  }

  return new Date(date).toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

const formatDateTime = (date: string | null) => {
  if (!date) {
    return "Never";
  }

  return new Date(date).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

type addUser = {
  _id: string;
  name: string;
  userName: string;
  email: string;
  role: string;
  isActive: boolean;
};

type UserFormData = {
  name: string;
  userName: string;
  email: string;
  role: string;
  isActive: boolean;
};

const emptyUserForm: UserFormData = {
  name: "",
  userName: "",
  email: "",
  role: "agent",
  isActive: true,
};

const Users = () => {
  const [activeTab, setActiveTab] = useState("All Users");

  const [search, setSearch] = useState("");

  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);

  const [page, setPage] = useState(1);

  const [limit, setLimit] = useState(10);

  const [users, setUsers] = useState<User[]>([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [totalUsers, setTotalUsers] = useState(0);

  const [totalPages, setTotalPages] = useState(1);

  const [openActionId, setOpenActionId] = useState<string | null>(null);

  console.log("users", users);
  const [statsData, setStatsData] = useState<UserStats>({
    totalUsers: 0,
    activeUsers: 0,
    inactiveUsers: 0,
    administrators: 0,
    newUsers: 0,
  });

  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [userModalMode, setUserModalMode] = useState<"add" | "edit">("add");
  const [selectedUser, setSelectedUser] = useState<addUser | null>(null);
  const [userForm, setUserForm] = useState<UserFormData>(emptyUserForm);

  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const params = new URLSearchParams();

      params.set("page", String(page));

      params.set("limit", String(limit));

      if (search.trim()) {
        params.set("search", search.trim());
      }

      // STATUS FILTER

      if (activeTab === "Active") {
        params.set("status", "Active");
      }

      if (activeTab === "Inactive") {
        params.set("status", "Inactive");
      }

      // ADMIN FILTER

      if (activeTab === "Administrators") {
        params.set("role", "admin");
      }

      const response = await fetch(`/api/users?${params.toString()}`, {
        method: "GET",
        cache: "no-store",
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to fetch users");
      }

      setUsers(result.data || []);

      setTotalUsers(result.pagination?.total || 0);

      setTotalPages(result.pagination?.totalPages || 1);
    } catch (err) {
      console.error("Fetch users error:", err);

      setError(err instanceof Error ? err.message : "Failed to fetch users");

      setUsers([]);
    } finally {
      setLoading(false);
    }
  }, [page, limit, search, activeTab]);

  const fetchStats = useCallback(async () => {
    try {
      const response = await fetch("/api/users/stats", {
        method: "GET",
        cache: "no-store",
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to fetch statistics");
      }

      setStatsData(result.data);
    } catch (err) {
      console.error("Fetch stats error:", err);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setPage(1);
    }, 400);

    return () => clearTimeout(timer);
  }, [search]);

  const tabs = useMemo(
    () => [
      {
        name: "All Users",
        count: statsData.totalUsers,
      },

      {
        name: "Active",
        count: statsData.activeUsers,
      },

      {
        name: "Inactive",
        count: statsData.inactiveUsers,
      },

      {
        name: "Administrators",
        count: statsData.administrators,
      },
    ],
    [statsData],
  );

  const stats = useMemo(
    () => [
      {
        title: "Total Users",

        value: statsData.totalUsers.toLocaleString("en-IN"),

        change: "",

        positive: true,

        icon: <FiUser />,

        iconBg: "bg-[#f5efff]",

        iconColor: "text-[#8150e5]",
      },

      {
        title: "Active Users",

        value: statsData.activeUsers.toLocaleString("en-IN"),

        change: "",

        positive: true,

        icon: <FiUserCheck />,

        iconBg: "bg-[#ecfaf2]",

        iconColor: "text-[#16a05a]",
      },

      {
        title: "Administrators",

        value: statsData.administrators.toLocaleString("en-IN"),

        change: "",

        positive: true,

        icon: <FiShield />,

        iconBg: "bg-[#fff5e5]",

        iconColor: "text-[#ef9517]",
      },

      {
        title: "Inactive Users",

        value: statsData.inactiveUsers.toLocaleString("en-IN"),

        change: "",

        positive: false,

        icon: <FiUserX />,

        iconBg: "bg-[#fff0f1]",

        iconColor: "text-[#ef4148]",
      },

      {
        title: "New Users",

        value: statsData.newUsers.toLocaleString("en-IN"),

        change: "",

        positive: true,

        icon: <FiUserPlus />,

        iconBg: "bg-[#edf5ff]",

        iconColor: "text-[#4285df]",
      },
    ],
    [statsData],
  );

  const toggleUser = (id: string) => {
    setSelectedUsers((current) =>
      current.includes(id)
        ? current.filter((userId) => userId !== id)
        : [...current, id],
    );
  };

  const toggleAll = () => {
    if (selectedUsers.length === users.length && users.length > 0) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(users.map((user) => user.id));
    }
  };

  const changePage = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) {
      return;
    }

    setPage(newPage);

    setSelectedUsers([]);
  };

  const paginationNumbers = useMemo(() => {
    const pages: number[] = [];

    const start = Math.max(1, page - 2);

    const end = Math.min(totalPages, page + 2);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  }, [page, totalPages]);

  const startResult = totalUsers === 0 ? 0 : (page - 1) * limit + 1;

  const endResult = Math.min(page * limit, totalUsers);

  return (
    <main className="min-h-screen bg-[#fafafa] p-3 font-sans text-[#292d32]">
      <div className="space-y-3">
        <PageHeader
          title="Users"
          description="Manage system users and their access permissions."
          buttonText="Add User"
          onButtonClick={() => {
            setUserModalMode("add");
            setSelectedUser(null);
            setUserForm(emptyUserForm);
            setIsUserModalOpen(true);
          }}
        />

        <div className="grid grid-cols-2 gap-2 lg:grid-cols-3 xl:grid-cols-5">
          {stats.map((stat) => (
            <StatCard key={stat.title} {...stat} />
          ))}
        </div>

        <div className="grid grid-cols-12 gap-3">
          <Card className="col-span-12 overflow-hidden xl:col-span-9">
            <div className="flex items-center justify-between border-b border-[#ededed] px-3">
              {/* TABS */}

              <div className="flex items-center gap-5">
                {tabs.map((tab) => {
                  const active = activeTab === tab.name;

                  return (
                    <button
                      key={tab.name}
                      onClick={() => {
                        setActiveTab(tab.name);

                        setPage(1);

                        setSelectedUsers([]);
                      }}
                      className={`relative cursor-pointer py-3 text-[12px] font-medium ${
                        active ? "text-[#bd7f1d]" : "text-[#555]"
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

              {/* SEARCH */}

              <div className="relative hidden sm:block">
                <FiSearch className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[12px] text-[#999]" />

                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search users..."
                  className="h-8 w-[250px] rounded border border-[#e2e2e2] pl-7 pr-7 text-[12px] outline-none focus:border-[#bd7f1d]"
                />

                {search && (
                  <button
                    onClick={() => setSearch("")}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-[12px] text-[#999]"
                  >
                    ×
                  </button>
                )}
              </div>
            </div>

            {/* ============================================== */}
            {/* ERROR */}
            {/* ============================================== */}

            {error && (
              <div className="border-b border-red-100 bg-red-50 px-3 py-2">
                <p className="text-[11px] text-red-600">{error}</p>
              </div>
            )}

            <div className="overflow-x-auto">
              <table className="w-full min-w-[850px] border-collapse">
                <thead>
                  <tr className="border-b border-[#ededed] bg-[#fcfcfc]">
                    {/* CHECKBOX */}

                    <th className="w-[34px] px-3 py-2.5 text-left">
                      <input
                        type="checkbox"
                        checked={
                          selectedUsers.length === users.length &&
                          users.length > 0
                        }
                        onChange={toggleAll}
                        className="h-3 w-3 accent-[#bd7f1d]"
                      />
                    </th>

                    {/* USER */}

                    <th className="px-2 py-2.5 text-left text-[12px] font-semibold text-[#555]">
                      User
                    </th>

                    {/* EMAIL */}

                    <th className="px-2 py-2.5 text-left text-[12px] font-semibold text-[#555]">
                      Email
                    </th>

                    {/* ROLE */}

                    <th className="px-2 py-2.5 text-left text-[12px] font-semibold text-[#555]">
                      Role
                    </th>

                    {/* STATUS */}

                    <th className="px-2 py-2.5 text-left text-[12px] font-semibold text-[#555]">
                      Status
                    </th>

                    {/* LAST LOGIN */}

                    <th className="px-2 py-2.5 text-left text-[12px] font-semibold text-[#555]">
                      Last Login
                    </th>

                    {/* JOINED */}

                    <th className="px-2 py-2.5 text-left text-[12px] font-semibold text-[#555]">
                      Joined Date
                    </th>

                    {/* ACTION */}

                    <th className="w-[45px] px-2 py-2.5 text-center text-[12px] font-semibold text-[#555]">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan={8} className="py-12 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <div className="h-4 w-4 animate-spin rounded-full border-2 border-[#e5e5e5] border-t-[#bd7f1d]" />

                          <span className="text-[11px] text-[#777]">
                            Loading users...
                          </span>
                        </div>
                      </td>
                    </tr>
                  ) : users.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="py-12 text-center">
                        <FiUser className="mx-auto text-[24px] text-[#ccc]" />

                        <p className="mt-2 text-[11px] text-[#777]">
                          No users found.
                        </p>
                      </td>
                    </tr>
                  ) : (
                    users.map((user) => (
                      <tr
                        key={user.id}
                        className="border-b border-[#eeeeee] hover:bg-[#fffdf9]"
                      >
                        {/* CHECKBOX */}

                        <td className="px-3 py-2.5">
                          <input
                            type="checkbox"
                            checked={selectedUsers.includes(user.id)}
                            onChange={() => toggleUser(user.id)}
                            className="h-3 w-3 accent-[#bd7f1d]"
                          />
                        </td>

                        {/* USER */}

                        <td className="px-2 py-2.5">
                          <div className="flex items-center gap-2">
                            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#f1eaff] text-[12px] font-semibold text-[#7650d8]">
                              {user.name.charAt(0).toUpperCase()}
                            </div>

                            <div className="min-w-0">
                              <p className="truncate text-[13px] font-semibold text-[#333]">
                                {user.name}
                              </p>

                              <p className="mt-0.5 text-[10px] text-[#888]">
                                {user.userName}
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* EMAIL */}

                        <td className="px-2 py-2.5 text-[12px] text-[#666]">
                          {user.email}
                        </td>

                        {/* ROLE */}

                        <td className="px-2 py-2.5">
                          <RoleBadge role={user.role} />
                        </td>

                        {/* STATUS */}

                        <td className="px-2 py-2.5">
                          <StatusBadge status={user.isActive} />
                        </td>

                        {/* LAST LOGIN */}

                        <td className="px-2 py-2.5">
                          <p className="text-[12px] text-[#555]">
                            {formatDate(user.lastLogin)}
                          </p>

                          <p className="mt-0.5 text-[10px] text-[#888]">
                            {formatTime(user.lastLoginTime)}
                          </p>
                        </td>

                        {/* JOINED DATE */}

                        <td className="px-2 py-2.5 text-[12px] text-[#555]">
                          {formatDate(user.joinedDate)}
                        </td>

                        {/* ACTION */}

                        <td className="px-2 py-2.5 text-center relative inline-block">
                          <button
                            type="button"
                            onClick={() =>
                              setOpenActionId(
                                openActionId === user.id ? null : user.id,
                              )
                            }
                            className="text-[#555] transition hover:text-[#bd7f1d]"
                            title="Actions"
                          >
                            <FiMoreVertical className="text-[14px]" />
                          </button>

                          {openActionId === user.id && (
                            <div className="absolute right-0 top-full z-50 mt-0 w-28 overflow-hidden rounded-lg border border-gray-200 bg-white py-1 shadow-lg">
                              {/* View */}
                              <button
                                type="button"
                                onClick={() => {
                                  console.log("View user:", user);
                                  setOpenActionId(null);
                                }}
                                className="flex w-full items-center gap-3 px-2 py-1.5 text-left text-sm text-gray-700 border-b border-[#eeeeee] hover:bg-[#fffdf9]"
                              >
                                <FiEye className="text-gray-500" />
                                <span>View</span>
                              </button>
                              {/* Edit */}
                              <button
                                type="button"
                                onClick={() => {
                                  setUserModalMode("edit");
                                  setSelectedUser({
                                    _id: user.id,
                                    name: user.name,
                                    userName: user.userName,
                                    email: user.email,
                                    role: user.role,
                                    isActive: user.isActive ? true : false,
                                  });
                                  setUserForm({
                                    name: user.name,
                                    userName: user.userName,
                                    email: user.email,
                                    role: user.role,
                                    isActive: user.isActive ? true : false,
                                  });

                                  setIsUserModalOpen(true);
                                  setOpenActionId(null);
                                }}
                                className="flex w-full items-center gap-3 px-2 py-1.5 text-left text-sm text-gray-700 border-b border-[#eeeeee] hover:bg-[#fffdf9]"
                              >
                                <FiEdit2 className="text-[#bd7f1d]" />
                                <span>Edit</span>
                              </button>

                              {/* Delete */}
                              <button
                                type="button"
                                onClick={() => {
                                  console.log("Delete user:", user);
                                  setOpenActionId(null);
                                }}
                                className="flex w-full items-center gap-3 px-2 py-1.5 text-left text-sm text-red-600 hover:bg-[#fffdf9]"
                              >
                                <FiTrash2 />
                                <span>Delete</span>
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            <div className="flex items-center justify-between border-t border-[#ededed] px-3 py-3">
              {/* RESULT COUNT */}

              <p className="text-[12px] text-[#666]">
                Showing {startResult} to {endResult} of {totalUsers} results
              </p>

              {/* PAGINATION */}

              <div className="flex items-center gap-1">
                {/* PREVIOUS */}

                <button
                  disabled={page === 1 || loading}
                  onClick={() => changePage(page - 1)}
                  className="flex h-7 w-7 items-center justify-center rounded border border-[#e2e2e2] text-[#777] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <FiChevronLeft className="text-[14px]" />
                </button>

                {/* FIRST PAGE */}

                {paginationNumbers[0] > 1 && (
                  <>
                    <button
                      onClick={() => changePage(1)}
                      className="flex h-7 w-7 items-center justify-center rounded border border-transparent text-[12px] text-[#555]"
                    >
                      1
                    </button>

                    <span className="px-1 text-[7px] text-[#777]">...</span>
                  </>
                )}

                {/* PAGES */}

                {paginationNumbers.map((number) => (
                  <button
                    key={number}
                    onClick={() => changePage(number)}
                    className={`flex h-7 w-7 items-center justify-center rounded border text-[12px] ${
                      page === number
                        ? "border-[#bd7f1d] text-[#bd7f1d]"
                        : "border-transparent text-[#555]"
                    }`}
                  >
                    {number}
                  </button>
                ))}

                {/* LAST PAGE */}

                {paginationNumbers[paginationNumbers.length - 1] <
                  totalPages && (
                  <>
                    <span className="px-1 text-[7px] text-[#777]">...</span>

                    <button
                      onClick={() => changePage(totalPages)}
                      className="flex h-7 w-7 items-center justify-center rounded border border-transparent text-[12px] text-[#555]"
                    >
                      {totalPages}
                    </button>
                  </>
                )}

                {/* NEXT */}

                <button
                  disabled={page === totalPages || loading}
                  onClick={() => changePage(page + 1)}
                  className="flex h-7 w-7 items-center justify-center rounded border border-[#e2e2e2] text-[#777] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <FiChevronRight className="text-[14px]" />
                </button>

                {/* PER PAGE */}

                <select
                  value={limit}
                  onChange={(event) => {
                    setLimit(Number(event.target.value));

                    setPage(1);
                  }}
                  className="h-7 rounded border border-[#dedede] bg-white px-1 text-[12px] text-[#555] outline-none"
                >
                  <option value={10}>5 / page</option>

                  <option value={20}>10 / page</option>

                  <option value={30}>20 / page</option>

                  <option value={40}>30 / page</option>
                </select>
              </div>
            </div>
          </Card>

          <div className="col-span-12 space-y-3 xl:col-span-3">
            <RoleSummary stats={statsData} />

            <RecentActivities users={users} />
          </div>
          {isUserModalOpen && (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
              onClick={() => setIsUserModalOpen(false)}
            >
              <div
                className="w-full max-w-lg rounded-xl bg-white shadow-xl"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Header */}
                <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
                  <div>
                    <h2 className="text-lg font-semibold text-[#222]">
                      {userModalMode === "add" ? "Add User" : "Edit User"}
                    </h2>

                    <p className="mt-1 text-xs text-gray-500">
                      {userModalMode === "add"
                        ? "Create a new user account"
                        : "Update user information"}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setIsUserModalOpen(false)}
                    className="flex h-8 w-8 items-center justify-center rounded-full text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
                  >
                    <FiX size={18} />
                  </button>
                </div>

                {/* Form */}
                <form
                  onSubmit={(e) => {
                    e.preventDefault();

                    if (userModalMode === "add") {
                      console.log("Add User:", userForm);
                    } else {
                      console.log("Update User:", selectedUser?._id, userForm);
                    }

                    setIsUserModalOpen(false);
                  }}
                >
                  <div className="space-y-4 px-6 py-5">
                    {/* Name */}
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-gray-700">
                        Name
                      </label>

                      <input
                        type="text"
                        value={userForm.name}
                        onChange={(e) =>
                          setUserForm({
                            ...userForm,
                            name: e.target.value,
                          })
                        }
                        placeholder="Enter full name"
                        required
                        className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none transition focus:border-[#bd7f1d] focus:ring-1 focus:ring-[#bd7f1d]"
                      />
                    </div>

                    {/* Username */}
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-gray-700">
                        Username
                      </label>

                      <input
                        type="text"
                        value={userForm.userName}
                        onChange={(e) =>
                          setUserForm({
                            ...userForm,
                            userName: e.target.value,
                          })
                        }
                        placeholder="Enter username"
                        required
                        className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none transition focus:border-[#bd7f1d] focus:ring-1 focus:ring-[#bd7f1d]"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-gray-700">
                        Email
                      </label>

                      <input
                        type="email"
                        value={userForm.email}
                        onChange={(e) =>
                          setUserForm({
                            ...userForm,
                            email: e.target.value,
                          })
                        }
                        placeholder="Enter email address"
                        required
                        className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none transition focus:border-[#bd7f1d] focus:ring-1 focus:ring-[#bd7f1d]"
                      />
                    </div>

                    {/* Role */}
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-gray-700">
                        Role
                      </label>

                      <select
                        value={userForm.role}
                        onChange={(e) =>
                          setUserForm({
                            ...userForm,
                            role: e.target.value as "admin" | "agent",
                          })
                        }
                        className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-[#bd7f1d] focus:ring-1 focus:ring-[#bd7f1d]"
                      >
                        <option value="agent">Agent</option>
                        <option value="admin">Admin</option>
                      </select>
                    </div>

                    {/* Status */}
                    <div className="flex items-center justify-between rounded-lg border border-gray-200 p-3">
                      <div>
                        <p className="text-sm font-medium text-gray-700">
                          Active User
                        </p>

                        <p className="text-xs text-gray-500">
                          Allow this user to login
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() =>
                          setUserForm({
                            ...userForm,
                            isActive: !userForm.isActive,
                          })
                        }
                        className={`relative h-6 w-11 rounded-full transition ${
                          userForm.isActive ? "bg-[#bd7f1d]" : "bg-gray-300"
                        }`}
                      >
                        <span
                          className={`absolute top-1 h-4 w-4 rounded-full bg-white transition ${
                            userForm.isActive ? "left-6" : "left-1"
                          }`}
                        />
                      </button>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="flex justify-end gap-3 border-t border-gray-200 px-6 py-4">
                    <button
                      type="button"
                      onClick={() => setIsUserModalOpen(false)}
                      className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                    >
                      Cancel
                    </button>

                    <button
                      type="submit"
                      className="rounded-lg bg-[#bd7f1d] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#a96f17]"
                    >
                      {userModalMode === "add" ? "Add User" : "Save Changes"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default Users;
