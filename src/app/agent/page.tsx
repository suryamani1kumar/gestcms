"use client";

import React, { useEffect, useState } from "react";
import { FiPlus } from "react-icons/fi";
import UsersTable from "@/components/users/UsersTable";
import UserModal from "@/components/users/UserModal";
import { getAllAgents, registerAgent, updateAgent } from "@/services/agent";
import { User, AgentFormData } from "@/types";

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState<AgentFormData>({
    name: "",
    userName: "",
    email: "",
    password: "",
    role: "agent",
    isActive: true,
  });

  const openModal = (user: User | null = null) => {
    if (user) {
      setEditingUser(user);
      setFormData({
        name: user.name,
        userName: user.userName,
        email: user.email,
        password: user.password || "",
        role: user.role,
        isActive: user.isActive,
      });
    } else {
      setEditingUser(null);
      setFormData({
        name: "",
        userName: "",
        email: "",
        password: "",
        role: "agent",
        isActive: true,
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingUser(null);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const target = e.target as HTMLInputElement;
    const { name, value, type, checked } = target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let resp;
    if (editingUser) {
      const { email, ...rest } = formData;
      resp = await updateAgent(rest, editingUser.id);
    } else {
      resp = await registerAgent(formData);
    }
    if (resp?.success) {
      closeModal();
    }
  };

  const toggleActiveStatus = (id: string | number) => {
    setUsers(
      users.map((u) => (u.id === id ? { ...u, isActive: !u.isActive } : u)),
    );
  };

  useEffect(() => {
    getAllAgents()
      .then((data) => {
        if (data?.data) {
          setUsers(data.data);
        }
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <>
      <div className="min-h-screen bg-neutral-50 p-2 md:p-4 font-sans text-neutral-900">
        <div className="mx-auto space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-lg font-semibold text-neutral-800">
                Agent Management
              </h1>
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => openModal()}
                className="cursor-pointer flex items-center gap-1.5 px-3 py-1.5 bg-neutral-900 text-white text-sm font-medium rounded-lg hover:bg-neutral-800 transition-all shadow-sm isActive:scale-95"
              >
                <FiPlus className="text-base" />
                <span>Add Agent</span>
              </button>
            </div>
          </div>

          {/* Table Component */}
          <UsersTable
            loading={loading}
            users={users}
            toggleActiveStatus={toggleActiveStatus}
            openModal={openModal}
          />
        </div>
        {/* Modal Component */}
        <UserModal
          isModalOpen={isModalOpen}
          closeModal={closeModal}
          editingUser={editingUser}
          formData={formData}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          setFormData={setFormData}
        />
      </div>
    </>
  );
}
