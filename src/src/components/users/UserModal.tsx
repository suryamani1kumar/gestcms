import React, { useState } from "react";
import { FiUser, FiTag, FiMail, FiLock, FiX } from "react-icons/fi";
import { AgentFormData, User } from "@/types";

interface UserModalProps {
  isModalOpen: boolean;
  closeModal: () => void;
  editingUser: User | null;
  formData: AgentFormData;
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  handleSubmit: (e: React.FormEvent) => void;
  setFormData: React.Dispatch<React.SetStateAction<AgentFormData>>;
}

export default function UserModal({
  isModalOpen,
  closeModal,
  editingUser,
  formData,
  handleInputChange,
  handleSubmit,
  setFormData,
}: UserModalProps) {
  const [showPassword, setShowPassword] = useState(false);
  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-neutral-900/40 backdrop-blur-sm transition-opacity"
        onClick={closeModal}
      ></div>

      {/* Modal Content */}
      <div className="relative w-full max-w-md bg-white rounded-lg shadow-2xl overflow-hidden transform transition-all animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between px-4 py-2 border-b border-neutral-100 bg-neutral-50/50">
          <h2 className="text-base font-bold text-neutral-900">
            {editingUser ? "Edit Agent" : "Add New Agent"}
          </h2>
          <button
            onClick={closeModal}
            className="cursor-pointer p-1 text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 rounded transition-colors"
          >
            <FiX className="text-lg" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-3">
          {/* Name & Username Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-medium text-neutral-700 flex items-center gap-1">
                <FiUser className="text-neutral-400" /> Full Name
              </label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-2 py-1.5 text-sm bg-neutral-50 border border-neutral-200 rounded focus:ring-1 focus:ring-neutral-900 focus:border-transparent transition-all outline-none"
                placeholder="John Doe"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-neutral-700 flex items-center gap-1">
                <FiTag className="text-neutral-400" /> Username
              </label>
              <input
                type="text"
                name="userName"
                required
                value={formData.userName}
                onChange={handleInputChange}
                className="w-full px-2 py-1.5 text-sm bg-neutral-50 border border-neutral-200 rounded focus:ring-1 focus:ring-neutral-900 focus:border-transparent transition-all outline-none"
                placeholder="johndoe"
              />
            </div>
          </div>

          {/* Email */}
          <div className="space-y-1">
            <label className="text-xs font-medium text-neutral-700 flex items-center gap-1">
              <FiMail className="text-neutral-400" /> Email Address
            </label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-2 py-1.5 text-sm bg-neutral-50 border border-neutral-200 rounded focus:ring-1 focus:ring-neutral-900 focus:border-transparent transition-all outline-none"
              placeholder="john@example.com"
              disabled={Boolean(editingUser?.email)}
            />
          </div>

          {/* Password */}
          <div className="space-y-1 mb-0 relative">
            <label className="text-xs font-medium text-neutral-700 flex items-center gap-1">
              <FiLock className="text-neutral-400" /> Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                required
                value={formData.password}
                onChange={handleInputChange}
                className="w-full px-2 py-1.5 text-sm bg-neutral-50 border border-neutral-200 rounded focus:ring-1 focus:ring-neutral-900 focus:border-transparent transition-all outline-none pr-24"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="cursor-pointer absolute right-2 top-1/2 -translate-y-1/2 text-xs text-neutral-600"
              >
                {showPassword ? "Hide password" : "Show password"}
              </button>
            </div>

            {!editingUser && (
              <p className="text-[10px] text-neutral-500 mt-0.5">
                Must be at least 8 chars.
              </p>
            )}
          </div>

          {/* Role & Active Toggle */}
          <div className="flex items-center justify-between pt-1">
            <div className="w-1/2 pr-3 space-y-1">
              <label className="text-xs font-medium text-neutral-700">
                Role
              </label>
              <select
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                className="w-full px-2 py-1.5 text-sm bg-neutral-50 border border-neutral-200 rounded focus:ring-1 focus:ring-neutral-900 focus:border-transparent transition-all outline-none appearance-none font-medium"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                  backgroundPosition: "right 0.25rem center",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "1.25em 1.25em",
                }}
              >
                <option value="superadmin">Super Admin</option>
                <option value="admin">Admin</option>
                <option value="agent">Agent</option>
              </select>
            </div>

            <div className="flex items-center gap-2 mt-4">
              <label
                className="text-xs font-medium text-neutral-700 cursor-pointer"
                htmlFor="activeToggle"
              >
                Active
              </label>
              <button
                type="button"
                id="activeToggle"
                onClick={() =>
                  setFormData({ ...formData, isActive: !formData.isActive })
                }
                className={`cursor-pointer relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:outline-none focus:ring-1 focus:ring-neutral-900 focus:ring-offset-1 ${formData.isActive ? "bg-emerald-500" : "bg-neutral-200"}`}
              >
                <span
                  className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${formData.isActive ? "translate-x-4" : "translate-x-1"}`}
                />
              </button>
            </div>
          </div>

          {/* Form Actions */}
          <div className="pt-3 flex gap-2">
            <button
              type="button"
              onClick={closeModal}
              className="cursor-pointer flex-1 px-3 py-1.5 text-sm bg-white border border-neutral-200 text-neutral-700 font-medium rounded hover:bg-neutral-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="cursor-pointer flex-1 px-3 py-1.5 text-sm bg-neutral-900 text-white font-medium rounded hover:bg-neutral-800 transition-colors shadow-sm"
            >
              {editingUser ? "Save" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
