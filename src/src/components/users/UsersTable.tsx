import React from "react";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { deleteAgent } from "@/services/agent";
import { User } from "@/types";

interface UsersTableProps {
  loading: boolean;
  users: User[];
  toggleActiveStatus: (id: string | number) => void;
  openModal: (user?: User | null) => void;
}

const getRoleBadgeColor = (role: string) => {
  switch (role) {
    case "superadmin":
      return "bg-purple-100 text-purple-700 border-purple-200";
    case "admin":
      return "bg-blue-100 text-blue-700 border-blue-200";
    case "agent":
    default:
      return "bg-gray-100 text-gray-700 border-gray-200";
  }
};

export default function UsersTable({
  loading,
  users,
  toggleActiveStatus,
  openModal,
}: UsersTableProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-neutral-100 overflow-hidden">
      <div className="overflow-x-auto">
        <div className="w-full text-left text-sm flex flex-col">
          <div className="grid grid-cols-5 bg-neutral-50 border-b border-neutral-100 font-semibold text-neutral-500 uppercase tracking-wider text-[10px] md:text-xs">
            <div className="px-3 py-2">Agent</div>
            <div className="px-3 py-2 text-center">User Name</div>
            <div className="px-3 py-2 text-center">Status</div>
            <div className="px-3 py-2">Role</div>
            <div className="px-3 py-2 text-right">Actions</div>
          </div>
          <div className="flex flex-col divide-y divide-neutral-100">
            {loading ? (
              <div className="px-3 py-6 text-center text-neutral-500">
                Loading...
              </div>
            ) : users.length === 0 ? (
              <div className="px-3 py-6 text-center text-neutral-500">
                No agents found. Click "Add New Agent" to create one.
              </div>
            ) : (
              users.map((user) => (
                <div
                  key={user.id}
                  className="grid grid-cols-5 items-center hover:bg-neutral-50/50 transition-colors group"
                >
                  <div className="px-3 py-2">
                    <div className="flex items-center gap-2">
                      <div className="h-6 w-6 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center text-indigo-700 font-bold uppercase shadow-sm text-xs border border-indigo-200">
                        {user.name ? user.name.charAt(0) : "U"}
                      </div>
                      <div className="min-w-0">
                        <div className="font-medium text-neutral-900 truncate">
                          {user.name}
                        </div>
                        <div className="text-[10px] md:text-xs text-neutral-500 flex items-center gap-1 truncate">
                          <span className="truncate">{user.email}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="px-3 py-2 text-center">
                    <span
                      className={`inline-block px-1.5 py-0.5 text-[10px] font-semibold rounded border ${getRoleBadgeColor(user.role)}`}
                    >
                      {user.userName}
                    </span>
                  </div>
                  <div className="px-3 py-2 text-center">
                    <button
                      onClick={() => toggleActiveStatus(user.id)}
                      className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wide cursor-pointer transition-all border ${
                        user.isActive
                          ? "bg-emerald-50 text-emerald-700 border-emerald-100 hover:bg-emerald-100"
                          : "bg-rose-50 text-rose-700 border-rose-100 hover:bg-rose-100"
                      }`}
                    >
                      {user.isActive ? (
                        <>
                          <span className="h-1 w-1 rounded-full bg-emerald-500"></span>{" "}
                          Active
                        </>
                      ) : (
                        <>
                          <span className="h-1 w-1 rounded-full bg-rose-500"></span>{" "}
                          Inactive
                        </>
                      )}
                    </button>
                  </div>
                  <div className="px-3 py-2">
                    <span
                      className={`inline-block px-1.5 py-0.5 text-[10px] font-semibold rounded border ${getRoleBadgeColor(user.role)}`}
                    >
                      {user.role}
                    </span>
                  </div>
                  <div className="px-3 py-2 text-right">
                    <div className="flex items-center justify-end gap-1 transition-opacity">
                      <button
                        onClick={() => openModal(user)}
                        className="cursor-pointer p-1 text-neutral-400 hover:text-indigo-600 hover:bg-indigo-50 rounded transition-colors"
                        title="Edit"
                      >
                        <FiEdit2 className="text-sm" />
                      </button>
                      <button
                        onClick={() => deleteAgent(user.id)}
                        className="p-1 cursor-pointer text-neutral-400 hover:text-rose-600 hover:bg-rose-50 rounded transition-colors"
                        title="Delete"
                      >
                        <FiTrash2 className="text-sm" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
