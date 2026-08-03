"use client";

import React, { useEffect, useState } from "react";
import {
  FiBarChart2,
  FiClock,
  FiDollarSign,
  FiSearch,
  FiXCircle,
} from "react-icons/fi";
import { formatDate, oneMonthLater } from "@/services/constants";
import { Card, MetricCard } from "@/components/dashboard/DashboardUI";
import { BookingsOverview } from "@/services/api";
import { useAuth } from "@/components/AuthContext";
import { BookingOverviewData } from "@/types";

export default function DashboardPage() {
  const { user } = useAuth();

  const [bookingOverview, setBookingOverview] = useState<BookingOverviewData>(
    {},
  );
  const [loading, setLoading] = useState(true);
  const [startDate, setStartDate] = useState(formatDate(oneMonthLater));
  const [endDate, setEndDate] = useState(formatDate(new Date()));

  const submitDate = async () => {
    try {
      const res = await BookingsOverview({ startDate, endDate });
      if (res?.data) {
        setBookingOverview(res.data);
      }
    } catch (err) {
      console.error("error", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    submitDate();
  }, []);

  const fmt = (n: number) =>
    new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(n);

  return (
    <div className="bg-neutral-50 min-h-screen p-1 md:p-2 font-sans">
      <div className="w-full space-y-3">
        {/* ── Header ── */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h1 className="text-xl font-bold text-neutral-900">Dashboard</h1>
            <p className="text-xs text-neutral-400 mt-0.5">
              Flight Booking Overview
            </p>
          </div>
          {user?.role === "superadmin" && (
            <div className="flex gap-2 sm:flex-row sm:items-center">
              <div>
                <p className="text-xs text-neutral-400 mt-0.5">Start Date</p>
                <input
                  type="date"
                  name="startdate"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="px-3 py-1.5 border border-neutral-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition w-full sm:w-auto"
                />
              </div>
              <div>
                <p className="text-xs text-neutral-400 mt-0.5">End Date</p>
                <input
                  type="date"
                  name="enddate"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="px-3 py-1.5 border border-neutral-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition w-full sm:w-auto"
                />
              </div>
              <button
                onClick={submitDate}
                className="relative top-[8px] flex items-center gap-1.5 px-3 py-1.5 bg-neutral-100 text-neutral-600 rounded-lg text-[10px] font-bold uppercase tracking-wider hover:bg-neutral-200 transition-colors"
              >
                <FiSearch className="text-xs" /> Submit
              </button>
            </div>
          )}
        </div>

        {loading ? (
          <div className="text-center my-4">Loading...</div>
        ) : (
          <>
            {user?.role === "superadmin" && (
              <>
                {/* ── KPI Row ── */}
                <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-3">
                  <MetricCard
                    label="Total Bookings"
                    value={fmt(bookingOverview.totalBookings || 0)}
                    icon={FiBarChart2}
                    accent="bg-blue-50 text-blue-500"
                  />
                  <MetricCard
                    label="Total Revenue"
                    value={`$${fmt(bookingOverview.totalRevenue || 0)}`}
                    icon={FiDollarSign}
                    accent="bg-teal-50 text-teal-600"
                  />
                  <MetricCard
                    label="Awaiting Amount"
                    value={`$${fmt(bookingOverview.awaitingAmount || 0)}`}
                    icon={FiClock}
                    accent="bg-amber-50 text-amber-500"
                  />
                  <MetricCard
                    label="Cancelled Amount"
                    value={`$${fmt(bookingOverview.cancelledAmount || 0)}`}
                    icon={FiXCircle}
                    accent="bg-rose-50 text-rose-500"
                  />
                  <MetricCard
                    label="Refunded Amount"
                    value={`$${fmt(bookingOverview.refundedAmount || 0)}`}
                    icon={FiClock}
                    accent="bg-amber-50 text-amber-500"
                  />
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
