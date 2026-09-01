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

export interface BookingStatusItem {
  bookingStatus: string;
  count: number;
  color?: string;
}

export interface TopAirline {
  name: string;
  bookings: number;
  color?: string;
}

export interface QuickStats {
  todaysBookings?: number | string;
  multiPaxPercentage?: number | string;
  economySplit?: number | string;
  businessSplit?: number | string;
}

export interface AgentPerformance {
  userName: string;
  totalBookings: number;
  confirmedBookings: number;
  totalRevenue: number;
}

export interface BookingOverviewData {
  totalBookings?: number;
  totalRevenue?: number;
  awaitingAmount?: number;
  cancelledAmount?: number;
  refundedAmount?: number;
  bookingStatus?: BookingStatusItem[];
  topAirlines?: TopAirline[];
  quickStats?: QuickStats;
  topAgents?: AgentPerformance[];
  [key: string]: any;
}

export interface RevenueData {
  month: string;
  amount: number;
}

export interface DonutSegment {
  count: number;
  color?: string;
  [key: string]: any;
}

export interface IpData {
  ip: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
  customerName?: string;
}

export interface AcknowledgementFormData {
  id: string | null;
  ipAddress: string;
  location: string;
  acknowledgementDate: Date;
  signDate: Date;
  bookingRef: string | null;
}
