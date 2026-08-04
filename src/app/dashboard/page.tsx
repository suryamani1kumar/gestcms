"use client";

import { useAuth } from "@/components/AuthContext";

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <div className="bg-neutral-50 min-h-screen p-1 md:p-2 font-sans">
      <div className="w-full space-y-3">
        {/* ── Header ── */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h1 className="text-xl font-bold text-neutral-900">Dashboard</h1>
            <p className="text-xs text-neutral-400 mt-0.5">Booking Overview</p>
          </div>
        </div>
      </div>
    </div>
  );
}
