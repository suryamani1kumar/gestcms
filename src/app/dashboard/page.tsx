"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

// ─── Mini Bar Chart ───────────────────────────────────────────────────────────
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"];
const VISITS = [42, 68, 55, 80, 63, 91, 74];
const REVENUE = [30, 52, 40, 65, 50, 78, 60];
const MAX_VAL = Math.max(...VISITS);

function BarChart() {
  const [hovered, setHovered] = useState<number | null>(null);
  return (
    <div style={{ padding: "0 22px 22px" }}>
      <div
        style={{
          display: "flex",
          gap: "6px",
          alignItems: "flex-end",
          height: "180px",
        }}
      >
        {MONTHS.map((m, i) => (
          <div
            key={m}
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "8px",
              height: "100%",
            }}
          >
            {/* Tooltip */}
            {hovered === i && (
              <div
                style={{
                  background: "var(--bg-card)",
                  border: "1px solid var(--border)",
                  borderRadius: "6px",
                  padding: "4px 8px",
                  fontSize: "10px",
                  color: "var(--text-primary)",
                  whiteSpace: "nowrap",
                  boxShadow: "var(--shadow-card)",
                  zIndex: 10,
                  position: "absolute",
                  marginTop: "-28px",
                }}
              >
                {VISITS[i]}k visits
              </div>
            )}
            <div
              style={{
                flex: 1,
                width: "100%",
                display: "flex",
                alignItems: "flex-end",
                gap: "2px",
                position: "relative",
              }}
            >
              {/* Revenue bar (back) */}
              <div
                style={{
                  flex: 1,
                  height: `${(REVENUE[i] / MAX_VAL) * 100}%`,
                  background: "linear-gradient(180deg, #10b981, #06b6d4)",
                  borderRadius: "4px 4px 0 0",
                  opacity: hovered === i ? 1 : 0.6,
                  transition:
                    "height 0.7s cubic-bezier(0.34,1.56,0.64,1), opacity 0.2s",
                  animationDelay: `${i * 0.07}s`,
                }}
              />
              {/* Visits bar (front) */}
              <div
                style={{
                  flex: 1,
                  height: `${(VISITS[i] / MAX_VAL) * 100}%`,
                  background: "linear-gradient(180deg, #3b82f6, #8b5cf6)",
                  borderRadius: "4px 4px 0 0",
                  opacity: hovered === i ? 1 : 0.85,
                  transition:
                    "height 0.7s cubic-bezier(0.34,1.56,0.64,1), opacity 0.2s",
                  animationDelay: `${i * 0.07}s`,
                  cursor: "pointer",
                }}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
              />
            </div>
            <div
              style={{
                fontSize: "10px",
                color: "var(--text-muted)",
                flexShrink: 0,
              }}
            >
              {m}
            </div>
          </div>
        ))}
      </div>
      {/* Legend */}
      <div
        style={{
          display: "flex",
          gap: "16px",
          marginTop: "14px",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            fontSize: "11px",
            color: "var(--text-secondary)",
          }}
        >
          <div
            style={{
              width: "10px",
              height: "10px",
              borderRadius: "2px",
              background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
            }}
          />
          Visits
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            fontSize: "11px",
            color: "var(--text-secondary)",
          }}
        >
          <div
            style={{
              width: "10px",
              height: "10px",
              borderRadius: "2px",
              background: "linear-gradient(135deg, #10b981, #06b6d4)",
            }}
          />
          Revenue
        </div>
      </div>
    </div>
  );
}

// ─── Donut Chart ──────────────────────────────────────────────────────────────
const DONUT_DATA = [
  { label: "Direct", value: 38, color: "#3b82f6" },
  { label: "Social", value: 27, color: "#8b5cf6" },
  { label: "Organic", value: 22, color: "#10b981" },
  { label: "Referral", value: 13, color: "#f59e0b" },
];

function DonutChart() {
  const total = DONUT_DATA.reduce((a, b) => a + b.value, 0);
  const r = 52;
  const cx = 60;
  const cy = 60;
  const circumference = 2 * Math.PI * r;

  let offset = 0;
  const segments = DONUT_DATA.map((d) => {
    const dash = (d.value / total) * circumference;
    const seg = { ...d, dashOffset: circumference - offset, dash };
    offset += dash;
    return seg;
  });

  return (
    <div style={{ padding: "0 22px 22px" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "24px",
          flexWrap: "wrap",
        }}
      >
        <div
          style={{
            position: "relative",
            width: "120px",
            height: "120px",
            flexShrink: 0,
          }}
        >
          <svg
            width="120"
            height="120"
            viewBox="0 0 120 120"
            style={{ transform: "rotate(-90deg)" }}
          >
            <circle
              cx={cx}
              cy={cy}
              r={r}
              fill="none"
              stroke="var(--border-subtle)"
              strokeWidth="14"
            />
            {segments.map((seg, i) => (
              <circle
                key={i}
                cx={cx}
                cy={cy}
                r={r}
                fill="none"
                stroke={seg.color}
                strokeWidth="14"
                strokeDasharray={`${seg.dash} ${circumference - seg.dash}`}
                strokeDashoffset={seg.dashOffset}
                strokeLinecap="round"
                style={{
                  transition: "stroke-dasharray 0.7s ease",
                  opacity: 0.9,
                }}
              />
            ))}
          </svg>
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontSize: "20px",
                fontWeight: "800",
                color: "var(--text-primary)",
                lineHeight: 1,
              }}
            >
              100%
            </div>
            <div
              style={{
                fontSize: "9px",
                color: "var(--text-muted)",
                marginTop: "3px",
              }}
            >
              Traffic
            </div>
          </div>
        </div>
        <ul style={{ listStyle: "none", flex: 1 }}>
          {DONUT_DATA.map((d) => (
            <li
              key={d.label}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "6px 0",
                fontSize: "12px",
              }}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <div
                  style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    background: d.color,
                    flexShrink: 0,
                  }}
                />
                <span style={{ color: "var(--text-secondary)" }}>
                  {d.label}
                </span>
              </div>
              <span style={{ color: "var(--text-primary)", fontWeight: "600" }}>
                {d.value}%
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// ─── Recent Posts Table ───────────────────────────────────────────────────────
const POSTS = [
  {
    title: "Getting Started with Next.js 16",
    author: "Admin",
    status: "published",
    views: "4.2k",
    date: "Aug 1",
  },
  {
    title: "Top 10 CSS Tricks in 2025",
    author: "Jane D.",
    status: "published",
    views: "3.8k",
    date: "Jul 30",
  },
  {
    title: "Understanding TypeScript Generics",
    author: "Mark S.",
    status: "draft",
    views: "1.1k",
    date: "Jul 28",
  },
  {
    title: "Building a REST API with Node.js",
    author: "Admin",
    status: "published",
    views: "6.7k",
    date: "Jul 25",
  },
  {
    title: "Docker for Beginners",
    author: "Lisa P.",
    status: "pending",
    views: "890",
    date: "Jul 22",
  },
];

function PostsTable() {
  return (
    <div style={{ overflowX: "auto" }}>
      <table className="data-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Status</th>
            <th>Views</th>
            <th>Date</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {POSTS.map((p, i) => (
            <tr key={i}>
              <td>
                <div
                  style={{
                    fontWeight: 500,
                    color: "var(--text-primary)",
                    fontSize: "13px",
                    maxWidth: "220px",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {p.title}
                </div>
              </td>
              <td>{p.author}</td>
              <td>
                <span className={`badge ${p.status}`}>{p.status}</span>
              </td>
              <td style={{ color: "var(--text-primary)", fontWeight: 500 }}>
                {p.views}
              </td>
              <td>{p.date}</td>
              <td>
                <div style={{ display: "flex", gap: "6px" }}>
                  <button
                    style={{
                      padding: "4px 10px",
                      fontSize: "11px",
                      background: "rgba(59,130,246,0.08)",
                      border: "1px solid rgba(59,130,246,0.2)",
                      borderRadius: "5px",
                      color: "var(--accent-blue)",
                      cursor: "pointer",
                      fontFamily: "inherit",
                    }}
                  >
                    Edit
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ─── Activity Feed ────────────────────────────────────────────────────────────
const ACTIVITIES = [
  {
    icon: "💬",
    color: "blue",
    text: 'New comment on "Hello World"',
    meta: "2 minutes ago · by johndoe",
  },
  {
    icon: "👤",
    color: "green",
    text: "New user registered: sarah.m@mail.com",
    meta: "1 hour ago",
  },
  {
    icon: "📝",
    color: "purple",
    text: 'Post "Guide 2025" was published',
    meta: "3 hours ago · by admin",
  },
  {
    icon: "⚙️",
    color: "orange",
    text: 'Plugin "SEO Pro" updated to v3.1',
    meta: "5 hours ago",
  },
  {
    icon: "🔒",
    color: "pink",
    text: "Failed login attempt blocked",
    meta: "Yesterday · IP: 192.168.1.45",
  },
];

// ─── Quick Action Cards ───────────────────────────────────────────────────────
const QUICK_ACTIONS = [
  {
    icon: "📝",
    label: "New Post",
    color: "#3b82f6",
    bg: "rgba(59,130,246,0.1)",
    href: "/dashboard/posts",
  },
  {
    icon: "👤",
    label: "Add User",
    color: "#8b5cf6",
    bg: "rgba(139,92,246,0.1)",
    href: "/dashboard/users",
  },
  {
    icon: "📄",
    label: "New Page",
    color: "#10b981",
    bg: "rgba(16,185,129,0.1)",
    href: "/dashboard/pages",
  },
  {
    icon: "⚙️",
    label: "Settings",
    color: "#f59e0b",
    bg: "rgba(245,158,11,0.1)",
    href: "/dashboard/settings",
  },
];

// ─── Main Dashboard ───────────────────────────────────────────────────────────
export default function DashboardPage() {
  const router = useRouter();

  const stats = [
    {
      label: "Total Posts",
      value: "1,284",
      icon: "📝",
      iconClass: "blue",
      change: "+12%",
      trend: "up",
      desc: "vs last month",
    },
    {
      label: "Total Users",
      value: "8,492",
      icon: "👥",
      iconClass: "purple",
      change: "+5.3%",
      trend: "up",
      desc: "vs last month",
    },
    {
      label: "Monthly Views",
      value: "94.6k",
      icon: "👁️",
      iconClass: "green",
      change: "+18.7%",
      trend: "up",
      desc: "vs last month",
    },
    {
      label: "Revenue",
      value: "$12,840",
      icon: "💰",
      iconClass: "orange",
      change: "-2.1%",
      trend: "down",
      desc: "vs last month",
    },
  ];

  return (
    <div className="dashboard-content">
      {/* Page header */}
      <div className="page-header-row">
        <div className="page-header" style={{ margin: 0 }}>
          <h1 className="page-title">Dashboard</h1>
          <p className="page-subtitle">
            Welcome back, Admin! Here&apos;s what&apos;s happening today.
          </p>
        </div>
        <div className="header-actions">
          <button className="btn-outline" id="export-btn">
            <span>⬇</span> Export
          </button>
          <button
            className="btn-sm"
            id="new-post-btn"
            onClick={() => router.push("/dashboard/posts")}
          >
            <span>+</span> New Post
          </button>
        </div>
      </div>

      {/* Date range pill */}
      <div style={{ marginBottom: "24px", marginTop: "16px" }}>
        <div
          style={{
            display: "inline-flex",
            background: "var(--bg-card)",
            border: "1px solid var(--border)",
            borderRadius: "10px",
            padding: "4px",
            gap: "2px",
            fontSize: "12px",
          }}
        >
          {["Today", "7 Days", "30 Days", "3 Months"].map((label, i) => (
            <button
              key={label}
              style={{
                padding: "6px 14px",
                borderRadius: "7px",
                border: "none",
                background: i === 2 ? "var(--gradient-primary)" : "transparent",
                color: i === 2 ? "white" : "var(--text-muted)",
                cursor: "pointer",
                fontFamily: "inherit",
                fontWeight: i === 2 ? "600" : "400",
                fontSize: "12px",
                transition: "all 0.18s",
              }}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="stats-grid">
        {stats.map((s, i) => (
          <div className="stat-card" key={i}>
            <div className="stat-header">
              <div className="stat-label">{s.label}</div>
              <div className={`stat-icon ${s.iconClass}`}>{s.icon}</div>
            </div>
            <div className="stat-value">{s.value}</div>
            <div className={`stat-change ${s.trend}`}>
              <span>{s.trend === "up" ? "↑" : "↓"}</span>
              <span>{s.change}</span>
              <span className="stat-change-text">{s.desc}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Charts row */}
      <div className="grid-3">
        {/* Bar Chart */}
        <div className="card">
          <div className="card-header">
            <div>
              <div className="card-title">Traffic Overview</div>
              <div className="card-subtitle">Monthly visits & revenue</div>
            </div>
            <button className="card-action">View report →</button>
          </div>
          <BarChart />
        </div>

        {/* Donut */}
        <div className="card">
          <div className="card-header">
            <div>
              <div className="card-title">Traffic Sources</div>
              <div className="card-subtitle">This month</div>
            </div>
          </div>
          <DonutChart />
        </div>
      </div>

      {/* Quick Actions */}
      <div style={{ marginBottom: "24px" }}>
        <div
          style={{
            fontSize: "13px",
            fontWeight: "600",
            color: "var(--text-secondary)",
            marginBottom: "12px",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
          }}
        >
          Quick Actions
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "12px",
          }}
        >
          {QUICK_ACTIONS.map((qa) => (
            <button
              key={qa.label}
              id={`quick-${qa.label.toLowerCase().replace(" ", "-")}`}
              onClick={() => router.push(qa.href)}
              style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border-subtle)",
                borderRadius: "var(--radius)",
                padding: "18px 16px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "8px",
                cursor: "pointer",
                transition: "all 0.2s",
                fontFamily: "inherit",
                textAlign: "center",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-3px)";
                e.currentTarget.style.borderColor = qa.color;
                e.currentTarget.style.boxShadow = `0 8px 24px ${qa.bg}`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.borderColor = "var(--border-subtle)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <div
                style={{
                  width: "42px",
                  height: "42px",
                  borderRadius: "11px",
                  background: qa.bg,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "20px",
                  border: `1px solid ${qa.color}30`,
                }}
              >
                {qa.icon}
              </div>
              <span
                style={{
                  fontSize: "13px",
                  fontWeight: "600",
                  color: "var(--text-primary)",
                }}
              >
                {qa.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Bottom row: Posts table + Activity */}
      <div className="grid-2">
        {/* Posts table */}
        <div className="card">
          <div className="card-header">
            <div>
              <div className="card-title">Recent Posts</div>
              <div className="card-subtitle">Latest content updates</div>
            </div>
            <button
              className="card-action"
              onClick={() => router.push("/dashboard/posts")}
            >
              View all →
            </button>
          </div>
          <PostsTable />
        </div>

        {/* Activity */}
        <div className="card">
          <div className="card-header">
            <div>
              <div className="card-title">Recent Activity</div>
              <div className="card-subtitle">System events & updates</div>
            </div>
            <button className="card-action">See all →</button>
          </div>
          <div className="card-body">
            <ul className="activity-list">
              {ACTIVITIES.map((a, i) => (
                <li key={i} className="activity-item">
                  <div className={`activity-dot ${a.color}`}>{a.icon}</div>
                  <div className="activity-content">
                    <div className="activity-text">{a.text}</div>
                    <div className="activity-meta">{a.meta}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* System status bar */}
      <div
        style={{
          background: "var(--bg-card)",
          border: "1px solid var(--border-subtle)",
          borderRadius: "var(--radius)",
          padding: "18px 22px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "16px",
          flexWrap: "wrap",
          animation: "fadeIn 0.5s ease 0.3s both",
        }}
      >
        <div
          style={{
            fontSize: "13px",
            fontWeight: "600",
            color: "var(--text-primary)",
          }}
        >
          System Status
        </div>
        <div style={{ display: "flex", gap: "24px", flexWrap: "wrap" }}>
          {[
            { label: "CPU", value: 23, color: "#10b981" },
            { label: "Memory", value: 61, color: "#3b82f6" },
            { label: "Storage", value: 47, color: "#8b5cf6" },
            { label: "Bandwidth", value: 38, color: "#f59e0b" },
          ].map((s) => (
            <div
              key={s.label}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "6px",
                minWidth: "100px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: "11px",
                }}
              >
                <span style={{ color: "var(--text-muted)" }}>{s.label}</span>
                <span style={{ color: s.color, fontWeight: "600" }}>
                  {s.value}%
                </span>
              </div>
              <div
                style={{
                  height: "4px",
                  background: "var(--border)",
                  borderRadius: "2px",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    width: `${s.value}%`,
                    height: "100%",
                    background: s.color,
                    borderRadius: "2px",
                    transition: "width 1s ease",
                  }}
                />
              </div>
            </div>
          ))}
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "7px",
            fontSize: "12px",
            color: "var(--accent-green)",
          }}
        >
          <span
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              background: "var(--accent-green)",
              display: "inline-block",
              boxShadow: "0 0 0 3px rgba(16,185,129,0.2)",
            }}
          />
          All systems operational
        </div>
      </div>
    </div>
  );
}
