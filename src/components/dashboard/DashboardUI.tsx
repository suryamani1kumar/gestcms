import React from "react";
import { IconType } from "react-icons";
import { FiTrendingUp, FiTrendingDown } from "react-icons/fi";

interface StatusConfigItem {
  bg: string;
  text: string;
  border: string;
  dot: string;
}

const STATUS_CONFIG: Record<string, StatusConfigItem> = {
  CONFIRMED: { bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200", dot: "bg-emerald-500" },
  PENDING: { bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-200", dot: "bg-amber-500" },
  CANCELLED: { bg: "bg-rose-50", text: "text-rose-700", border: "border-rose-200", dot: "bg-rose-500" },
  REFUNDED: { bg: "bg-blue-50", text: "text-blue-700", border: "border-blue-200", dot: "bg-blue-500" },
  SUCCESS: { bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200", dot: "bg-emerald-500" },
  FAILED: { bg: "bg-rose-50", text: "text-rose-700", border: "border-rose-200", dot: "bg-rose-500" },
};

export const StatusBadge = ({ status }: { status: string }) => {
  const c = STATUS_CONFIG[status?.toUpperCase()] || { bg: "bg-neutral-100", text: "text-neutral-600", border: "border-neutral-200", dot: "bg-neutral-400" };
  return (
    <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[10px] font-bold border ${c.bg} ${c.text} ${c.border}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${c.dot}`} />
      {status}
    </span>
  );
};

const AVATAR_COLORS = [
  "bg-teal-100 text-teal-700",
  "bg-amber-100 text-amber-700",
  "bg-rose-100 text-rose-700",
  "bg-blue-100 text-blue-700",
  "bg-violet-100 text-violet-700",
  "bg-emerald-100 text-emerald-700",
];

export const Avatar = ({ initials, index = 0 }: { initials: string; index?: number }) => (
  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0 ${AVATAR_COLORS[index % AVATAR_COLORS.length]}`}>
    {initials}
  </div>
);

interface MetricCardProps {
  label: string;
  value: string | number;
  sub?: string;
  trend?: "up" | "down";
  icon: IconType;
  accent?: string;
}

export const MetricCard = ({ label, value, sub, trend, icon: Icon, accent }: MetricCardProps) => (
  <div className="bg-white rounded-xl border border-neutral-100 shadow-sm p-3 flex flex-col gap-2">
    <div className="flex items-center justify-between">
      <span className="text-[10px] font-semibold text-neutral-400 uppercase tracking-wider">{label}</span>
      <div className={`w-6 h-6 rounded-full flex items-center justify-center ${accent}`}>
        <Icon className="text-[10px]" />
      </div>
    </div>
    <div>
      <div className="text-lg font-bold text-neutral-900">{value}</div>
      {sub && (
        <div className={`flex items-center gap-1 mt-0.5 text-[10px] font-medium ${trend === "up" ? "text-emerald-600" : trend === "down" ? "text-rose-600" : "text-neutral-400"}`}>
          {trend === "up" ? <FiTrendingUp className="text-[10px]" /> : trend === "down" ? <FiTrendingDown className="text-[10px]" /> : null}
          {sub}
        </div>
      )}
    </div>
  </div>
);

interface CardProps {
  title?: string;
  icon?: IconType;
  children: React.ReactNode;
  className?: string;
}

export const Card = ({ title, icon: Icon, children, className = "" }: CardProps) => (
  <div className={`bg-white rounded-xl border border-neutral-100 shadow-sm p-3 flex flex-col gap-3 ${className}`}>
    {title && (
      <div className="flex items-center gap-1.5">
        {Icon && <Icon className="text-neutral-400 text-xs" />}
        <h3 className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">{title}</h3>
      </div>
    )}
    {children}
  </div>
);
