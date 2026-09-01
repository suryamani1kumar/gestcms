"use client";

import PageHeader from "@/components/pageheader/PageHeader";
import React, { useMemo, useState } from "react";
import {
  FiPlus,
  FiCopy,
  FiCheck,
  FiUsers,
  FiUser,
  FiSettings,
  FiGrid,
  FiShoppingCart,
  FiBox,
  FiPackage,
  FiTruck,
  FiCreditCard,
  FiBarChart2,
  FiShield,
  FiLock,
  FiX,
  FiEdit3,
} from "react-icons/fi";

type PermissionKey =
  | "view"
  | "create"
  | "edit"
  | "delete"
  | "export"
  | "import";

type RoleColor = "orange" | "blue" | "green" | "purple" | "red";

type Role = {
  id: string;
  name: string;
  description: string;
  users: number;
  color: RoleColor;
  icon: React.ElementType;
};

type Permissions = Record<string, Record<string, boolean>>;

const initialRoles: Role[] = [
  {
    id: "administrator",
    name: "Administrator",
    description: "Full system access",
    users: 6,
    color: "orange",
    icon: FiUser,
  },
  {
    id: "manager",
    name: "Manager",
    description: "Manage sales, customers & reports",
    users: 8,
    color: "blue",
    icon: FiUsers,
  },
  {
    id: "sales-executive",
    name: "Sales Executive",
    description: "Manage customers and sales",
    users: 14,
    color: "green",
    icon: FiBarChart2,
  },
  {
    id: "support-agent",
    name: "Support Agent",
    description: "Handle customer support",
    users: 8,
    color: "orange",
    icon: FiUsers,
  },
  {
    id: "accountant",
    name: "Accountant",
    description: "Manage payments and invoices",
    users: 6,
    color: "blue",
    icon: FiCreditCard,
  },
  {
    id: "inventory-manager",
    name: "Inventory Manager",
    description: "Manage inventory and stock",
    users: 6,
    color: "purple",
    icon: FiPackage,
  },
];

const modules = [
  {
    name: "Dashboard",
    icon: FiGrid,
  },
  {
    name: "Customers",
    icon: FiUsers,
  },
  {
    name: "Sales",
    icon: FiShoppingCart,
  },
  {
    name: "Products",
    icon: FiBox,
  },
  {
    name: "Inventory",
    icon: FiPackage,
  },
  {
    name: "Orders",
    icon: FiTruck,
  },
  {
    name: "Payments",
    icon: FiCreditCard,
  },
  {
    name: "Reports",
    icon: FiBarChart2,
  },
  {
    name: "Users & Roles",
    icon: FiUsers,
  },
  {
    name: "Settings",
    icon: FiSettings,
  },
];

const permissionColumns: {
  key: PermissionKey;
  label: string;
}[] = [
  {
    key: "view",
    label: "View",
  },
  {
    key: "create",
    label: "Create",
  },
  {
    key: "edit",
    label: "Edit",
  },
  {
    key: "delete",
    label: "Delete",
  },
  {
    key: "export",
    label: "Export",
  },
  {
    key: "import",
    label: "Import",
  },
];

const createInitialPermissions = (
  roleList: Role[] = initialRoles,
): Permissions => {
  const result: Permissions = {};

  roleList.forEach((role) => {
    result[role.id] = {};

    modules.forEach((module) => {
      permissionColumns.forEach(({ key }) => {
        const permissionKey = `${module.name}:${key}`;

        result[role.id][permissionKey] = role.id === "administrator";
      });
    });
  });

  return result;
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
      className={`rounded-[7px] border border-[#e5e7eb] bg-white ${className}`}
    >
      {children}
    </div>
  );
};

const RoleIcon = ({ role }: { role: Role }) => {
  const colors: Record<RoleColor, string> = {
    orange: "bg-[#fff4df] text-[#c58620]",
    blue: "bg-[#edf5ff] text-[#4d91e8]",
    green: "bg-[#edf9f0] text-[#4aab65]",
    purple: "bg-[#f4efff] text-[#8057dc]",
    red: "bg-[#fff0f0] text-[#df5757]",
  };

  const Icon = role.icon;

  return (
    <div
      className={`flex h-[23px] w-[23px] shrink-0 items-center justify-center rounded-full ${colors[role.color]}`}
    >
      <Icon className="text-[10px]" />
    </div>
  );
};

const PermissionCheckbox = ({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: () => void;
}) => {
  return (
    <button
      type="button"
      onClick={onChange}
      aria-label={checked ? "Disable permission" : "Enable permission"}
      className={`flex h-[11px] w-[11px] items-center justify-center rounded-[2px] border transition ${
        checked
          ? "border-[#c58620] bg-[#c58620] text-white"
          : "border-[#cfd4dc] bg-white hover:border-[#c58620]"
      }`}
    >
      {checked && <FiCheck className="text-[8px] stroke-[3]" />}
    </button>
  );
};

const PermissionLevel = ({
  type,
  title,
  description,
}: {
  type: "full" | "read" | "limited" | "none";
  title: string;
  description: string;
}) => {
  const styles = {
    full: {
      wrapper: "bg-[#edf9f0] text-[#4aa464]",
      icon: FiCheck,
    },
    read: {
      wrapper: "bg-[#edf5ff] text-[#4b91e8]",
      icon: FiLock,
    },
    limited: {
      wrapper: "bg-[#fff6e7] text-[#c58620]",
      icon: FiEdit3,
    },
    none: {
      wrapper: "bg-[#fff0f0] text-[#df5757]",
      icon: FiX,
    },
  };

  const style = styles[type];
  const Icon = style.icon;

  return (
    <div className="flex items-start gap-[8px]">
      <div
        className={`mt-[1px] flex h-[25px] w-[25px] shrink-0 items-center justify-center rounded-full ${style.wrapper}`}
      >
        <Icon className="text-[14px]" />
      </div>

      <div>
        <p className="text-[10px] font-semibold leading-none text-[#344054]">
          {title}
        </p>

        <p className="mt-[4px] text-[9px] leading-none text-[#667085]">
          {description}
        </p>
      </div>
    </div>
  );
};

const InfoRow = ({ label, value }: { label: string; value: string }) => {
  return (
    <div className="grid grid-cols-[82px_1fr] gap-[8px]">
      <span className="text-[10px] font-medium text-[#667085]">{label}</span>

      <span className="text-[10px] font-medium leading-[1.3] text-[#344054]">
        {value}
      </span>
    </div>
  );
};

const RolePermissions = () => {
  const [selectedRole, setSelectedRole] = useState<string>("administrator");

  const [rolesList, setRolesList] = useState<Role[]>(initialRoles);

  const [permissions, setPermissions] = useState<Permissions>(() =>
    createInitialPermissions(initialRoles),
  );

  const selectedRoleData = useMemo(() => {
    return rolesList.find((role) => role.id === selectedRole) ?? rolesList[0];
  }, [rolesList, selectedRole]);

  const togglePermission = (moduleName: string, permission: PermissionKey) => {
    if (!selectedRoleData) return;

    const key = `${moduleName}:${permission}`;

    setPermissions((prev) => ({
      ...prev,
      [selectedRoleData.id]: {
        ...(prev[selectedRoleData.id] ?? {}),
        [key]: !(prev[selectedRoleData.id]?.[key] ?? false),
      },
    }));
  };

  const handleAddRole = () => {
    const newRole: Role = {
      id: `new-role-${Date.now()}`,
      name: "New Role",
      description: "Custom role",
      users: 0,
      color: "blue",
      icon: FiShield,
    };

    setRolesList((prev) => [...prev, newRole]);

    /*
     * Create all permissions as false for the new role.
     */
    const newPermissions: Record<string, boolean> = {};

    modules.forEach((module) => {
      permissionColumns.forEach(({ key }) => {
        newPermissions[`${module.name}:${key}`] = false;
      });
    });

    setPermissions((prev) => ({
      ...prev,
      [newRole.id]: newPermissions,
    }));

    setSelectedRole(newRole.id);
  };

  const handleCloneRole = () => {
    if (!selectedRoleData) return;

    const clonedRole: Role = {
      ...selectedRoleData,
      id: `${selectedRoleData.id}-copy-${Date.now()}`,
      name: `${selectedRoleData.name} Copy`,
      users: 0,
    };

    setRolesList((prev) => [...prev, clonedRole]);

    setPermissions((prev) => ({
      ...prev,
      [clonedRole.id]: {
        ...(prev[selectedRoleData.id] ?? {}),
      },
    }));

    setSelectedRole(clonedRole.id);
  };

  if (!selectedRoleData) {
    return (
      <div className="min-h-screen bg-[#fafafa] p-[20px] text-[#344054]">
        <p className="text-sm">No roles available.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen  p-6 bg-[#fafafa] text-[#344054]">
      <div className="space-y-3">
        <PageHeader
          title="Role Based Access & Permissions"
          description="Manage roles and configure permissions for system modules."
          showButton={false}
        />

        <div className="grid grid-cols-1 gap-3 pb-3 pt-1 xl:grid-cols-[360px_minmax(0,1fr)]">
          <Card className="min-w-0">
            <div className="flex h-10 items-center justify-between border-b border-[#edf0f2] px-3">
              <h2 className="text-sm font-semibold text-[#344054]">Roles</h2>

              <button
                type="button"
                onClick={handleAddRole}
                className="flex h-7 items-center gap-1.5 rounded-md border border-[#e0e3e7] px-2.5 text-xs font-medium text-[#667085] hover:bg-[#fafafa]"
              >
                <FiPlus className="text-sm" />
                Add Role
              </button>
            </div>

            <div className="space-y-1.5 p-2">
              {rolesList.map((role) => {
                const active = selectedRole === role.id;

                return (
                  <button
                    key={role.id}
                    type="button"
                    onClick={() => setSelectedRole(role.id)}
                    className={`flex w-full items-center gap-2 rounded-md border px-2.5 py-2 text-left transition ${
                      active
                        ? "border-[#edc984] bg-[#fffaf1]"
                        : "border-transparent hover:border-[#edf0f2] hover:bg-[#fafafa]"
                    }`}
                  >
                    <RoleIcon role={role} />

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <p className="truncate text-xs font-semibold leading-none text-[#344054]">
                          {role.name}
                        </p>

                        <span className="shrink-0 text-[11px] font-medium text-[#667085]">
                          {role.users} users
                        </span>
                      </div>

                      <p className="mt-1.5 truncate text-[11px] leading-none text-[#667085]">
                        {role.description}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </Card>

          <Card className="min-w-0 overflow-hidden">
            <div className="flex h-10 items-center justify-between border-b border-[#edf0f2] px-3">
              <div className="flex min-w-0 items-center gap-2">
                <h2 className="truncate text-sm font-semibold text-[#344054]">
                  Permissions for {selectedRoleData.name}
                </h2>

                <span className="shrink-0 rounded-md bg-[#f1eaff] px-2 py-1 text-[10px] font-medium text-[#7956c9]">
                  {selectedRoleData.name}
                </span>
              </div>

              <button
                type="button"
                onClick={handleCloneRole}
                className="ml-2 flex h-7 shrink-0 items-center gap-1.5 rounded-md border border-[#e0e3e7] px-2.5 text-xs font-medium text-[#667085] hover:bg-[#fafafa]"
              >
                <FiCopy className="text-sm" />
                Clone Role
              </button>
            </div>

            {/* TABLE */}
            <div className="overflow-x-auto">
              <div className="min-w-[650px]">
                {/* TABLE HEADER */}
                <div className="grid grid-cols-[minmax(180px,1fr)_80px_80px_80px_80px_80px_80px] border-b border-[#edf0f2] bg-[#fcfcfd] px-3">
                  <div className="flex h-9 items-center text-xs font-semibold text-[#667085]">
                    Module
                  </div>

                  {permissionColumns.map((permission) => (
                    <div
                      key={permission.key}
                      className="flex h-9 items-center justify-center text-xs font-semibold text-[#667085]"
                    >
                      {permission.label}
                    </div>
                  ))}
                </div>

                {/* TABLE ROWS */}
                <div>
                  {modules.map((module) => {
                    const Icon = module.icon;

                    return (
                      <div
                        key={module.name}
                        className="grid min-h-9 grid-cols-[minmax(180px,1fr)_80px_80px_80px_80px_80px_80px] border-b border-[#f1f2f4] px-3 last:border-b-0"
                      >
                        <div className="flex items-center gap-2">
                          <Icon className="text-sm text-[#667085]" />

                          <span className="text-xs font-medium text-[#475467]">
                            {module.name}
                          </span>
                        </div>

                        {permissionColumns.map((permission) => {
                          const key = `${module.name}:${permission.key}`;

                          const checked =
                            permissions[selectedRoleData.id]?.[key] ?? false;

                          return (
                            <div
                              key={permission.key}
                              className="flex items-center justify-center"
                            >
                              <PermissionCheckbox
                                checked={checked}
                                onChange={() =>
                                  togglePermission(module.name, permission.key)
                                }
                              />
                            </div>
                          );
                        })}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </Card>

          <div className="grid min-w-0 grid-cols-1 gap-3 xl:col-span-2 xl:grid-cols-2">
            <Card className="min-w-0 p-4">
              <h2 className="mb-4 text-sm font-semibold text-[#344054]">
                Role Information
              </h2>

              <div className="space-y-3">
                <InfoRow label="Role Name" value={selectedRoleData.name} />

                <InfoRow
                  label="Description"
                  value={
                    selectedRoleData.name === "Administrator"
                      ? "Full system access with all permissions"
                      : selectedRoleData.description
                  }
                />

                <InfoRow
                  label="Total Users"
                  value={selectedRoleData.users.toString()}
                />

                <InfoRow label="Created By" value="Neha Kapoor" />

                <InfoRow label="Created Date" value="15 Jan 2025, 11:20 AM" />

                <InfoRow label="Last Updated" value="17 May 2025, 09:30 AM" />
              </div>
            </Card>

            <Card className="min-w-0 p-4">
              <h2 className="mb-4 text-sm font-semibold text-[#344054]">
                Permission Levels
              </h2>

              <div className="space-y-4">
                <PermissionLevel
                  type="full"
                  title="Full Access"
                  description="View, Create, Edit, Delete, Export, Import"
                />

                <PermissionLevel
                  type="read"
                  title="Read Only"
                  description="View and Export only"
                />

                <PermissionLevel
                  type="limited"
                  title="Limited Access"
                  description="View, Create and Edit only"
                />

                <PermissionLevel
                  type="none"
                  title="No Access"
                  description="No permissions"
                />
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RolePermissions;
