export interface User {
  id: string | number;
  name: string;
  userName: string;
  email: string;
  role: "superadmin" | "admin" | "agent" | string;
  isActive: boolean;
  password?: string;
}

export interface AgentFormData {
  name: string;
  userName: string;
  email: string;
  password?: string;
  role: string;
  isActive: boolean;
}

export interface AuthUser {
  id?: string | number;
  name?: string;
  email?: string;
  role?: string;
  [key: string]: any;
}

export interface AuthContextType {
  user: AuthUser | null;
}

