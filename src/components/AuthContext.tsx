"use client";

import React, { createContext, useContext, useState } from "react";
import { AuthUser, AuthContextType } from "@/types";

const AuthContext = createContext<AuthContextType>({ user: null });

export const AuthProvider = ({
  children,
  token,
}: {
  children: React.ReactNode;
  token?: string;
}) => {
  const [user] = useState<AuthUser | null>(() => {
    if (token) {
      try {
        return JSON.parse(atob(token.split(".")[1]));
      } catch {
        return null;
      }
    }
    return null;
  });

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
