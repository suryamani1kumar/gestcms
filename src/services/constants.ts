import { TopAirline } from "@/types";

export const getStatusColor = (status: string): string => {
  switch (status?.toUpperCase()) {
    case "CONFIRMED":
    case "SUCCESS":
      return "#10B981";
    case "PENDING":
    case "AWAITING":
      return "#F59E0B";
    case "CANCELLED":
    case "FAILED":
      return "#EF4444";
    case "REFUNDED":
      return "#3B82F6";
    default:
      return "#6B7280";
  }
};

export const mergeAirlines = (airlines: TopAirline[]): TopAirline[] => {
  const defaultColors = [
    "#378ADD",
    "#10B981",
    "#F59E0B",
    "#EF4444",
    "#8B5CF6",
    "#EC4899",
  ];
  return (airlines || []).map((item, idx) => ({
    ...item,
    color: item.color || defaultColors[idx % defaultColors.length],
  }));
};

export const formatDate = (date: Date): string => {
  if (!date || isNaN(date.getTime())) return "";
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const now = new Date();
export const oneMonthLater = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
