"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

export interface NavItem {
  icon: string;
  label: string;
  href: string;
  badge?: string | null;
  badgeColor?: string;
}

export interface NavSection {
  label: string;
  items: NavItem[];
}

export const NAV_SECTIONS: NavSection[] = [
  {
    label: "Main",
    items: [
      { icon: "⊞", label: "Dashboard", href: "/dashboard", badge: null },
      {
        icon: "📊",
        label: "Analytics",
        href: "/dashboard/analytics",
        badge: null,
      },
    ],
  },
  {
    label: "Content",
    items: [
      { icon: "📝", label: "Posts", href: "/dashboard/posts", badge: "12" },
      { icon: "📄", label: "Pages", href: "/dashboard/pages", badge: null },
      {
        icon: "🗂️",
        label: "Categories",
        href: "/dashboard/categories",
        badge: null,
      },
      { icon: "🏷️", label: "Tags", href: "/dashboard/tags", badge: null },
      {
        icon: "🖼️",
        label: "Media",
        href: "/dashboard/media",
        badge: "new",
        badgeColor: "green",
      },
    ],
  },
  {
    label: "Management",
    items: [
      {
        icon: "👥",
        label: "Users",
        href: "/dashboard/users",
        badge: "3",
        badgeColor: "orange",
      },
      {
        icon: "💬",
        label: "Comments",
        href: "/dashboard/comments",
        badge: "7",
      },
      { icon: "🛒", label: "Orders", href: "/dashboard/orders", badge: null },
      { icon: "🔌", label: "Plugins", href: "/dashboard/plugins", badge: null },
    ],
  },
  {
    label: "System",
    items: [
      { icon: "⚙️", label: "Settings", href: "/dashboard/settings", badge: null },
      { icon: "🔒", label: "Security", href: "/dashboard/security", badge: null },
    ],
  },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  sections?: NavSection[];
}

export function Sidebar({ isOpen, onClose, sections = NAV_SECTIONS }: SidebarProps) {
  const router = useRouter();
  const pathname = usePathname();

  function navigate(href: string) {
    router.push(href);
    onClose();
  }

  return (
    <>
      <div
        className={`sidebar-overlay ${isOpen ? "open" : ""}`}
        onClick={onClose}
      />
      <aside className={`sidebar ${isOpen ? "open" : ""}`}>
        {/* Brand Header */}
        <div className="sidebar-brand">
          <div className="brand-icon">🚀</div>
          <div>
            <div className="brand-name">GestCMS</div>
            <div className="brand-version">v2.5.0</div>
          </div>
        </div>

        {/* Navigation Sections */}
        <nav className="sidebar-nav">
          {sections.map((section) => (
            <div key={section.label}>
              <div className="nav-section-label">{section.label}</div>
              {section.items.map((item) => {
                const isActive =
                  pathname === item.href ||
                  (item.href !== "/dashboard" &&
                    pathname.startsWith(item.href));
                return (
                  <button
                    key={item.href}
                    className={`nav-item ${isActive ? "active" : ""}`}
                    onClick={() => navigate(item.href)}
                    style={{
                      width: "100%",
                      background: isActive ? undefined : "none",
                      border: isActive ? undefined : "none",
                    }}
                  >
                    <span className="nav-icon">{item.icon}</span>
                    <span style={{ flex: 1, textAlign: "left" }}>
                      {item.label}
                    </span>
                    {item.badge && (
                      <span
                        className={`nav-badge ${item.badgeColor || ""}`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          ))}
        </nav>

        {/* User Profile Footer */}
        <div className="sidebar-footer">
          <div className="user-card">
            <div className="user-avatar">AD</div>
            <div>
              <div className="user-name">Admin User</div>
              <div className="user-role">Super Administrator</div>
            </div>
            <span className="user-more">⋯</span>
          </div>
        </div>
      </aside>
    </>
  );
}

interface NavbarProps {
  onMenuClick: () => void;
  title: string;
  subtitle?: string;
}

export function Navbar({ onMenuClick, title, subtitle }: NavbarProps) {
  const router = useRouter();
  const [notifOpen, setNotifOpen] = useState(false);

  return (
    <header className="navbar">
      <button className="menu-btn" onClick={onMenuClick}>
        ☰
      </button>

      <div className="navbar-breadcrumb">
        <span style={{ color: "var(--text-muted)" }}>CMS</span>
        <span className="navbar-breadcrumb-sep">›</span>
        <span>{title}</span>
        {subtitle && (
          <>
            <span className="navbar-breadcrumb-sep">›</span>
            <span style={{ color: "var(--text-muted)" }}>{subtitle}</span>
          </>
        )}
      </div>

      <div className="navbar-search">
        <span className="navbar-search-icon">🔍</span>
        <input
          type="search"
          placeholder="Search content, users, pages…"
          id="navbar-search"
        />
      </div>

      <div className="navbar-actions">
        {/* Help */}
        <button className="navbar-btn" title="Help" id="navbar-help-btn">
          <span style={{ fontSize: "15px" }}>❓</span>
        </button>

        {/* Notifications */}
        <button
          className="navbar-btn"
          title="Notifications"
          id="navbar-notif-btn"
          onClick={() => setNotifOpen((v) => !v)}
          style={{ position: "relative" }}
        >
          <span style={{ fontSize: "15px" }}>🔔</span>
          <span className="notification-dot" />
          {notifOpen && (
            <div
              style={{
                position: "absolute",
                top: "46px",
                right: 0,
                width: "300px",
                background: "var(--bg-card)",
                border: "1px solid var(--border)",
                borderRadius: "12px",
                boxShadow: "var(--shadow-card)",
                zIndex: 200,
                padding: "12px 0",
                animation: "fadeIn 0.2s ease",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div
                style={{
                  padding: "0 16px 10px",
                  borderBottom: "1px solid var(--border-subtle)",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span
                  style={{
                    fontSize: "13px",
                    fontWeight: "600",
                    color: "var(--text-primary)",
                  }}
                >
                  Notifications
                </span>
                <span
                  style={{
                    fontSize: "11px",
                    color: "var(--accent-blue)",
                    cursor: "pointer",
                  }}
                >
                  Mark all read
                </span>
              </div>
              {[
                {
                  icon: "💬",
                  text: 'New comment on "Hello World"',
                  time: "2m ago",
                  dot: true,
                },
                {
                  icon: "👤",
                  text: "User John Doe registered",
                  time: "1h ago",
                  dot: true,
                },
                {
                  icon: "📝",
                  text: 'Post "Guide 2025" published',
                  time: "3h ago",
                  dot: false,
                },
              ].map((n, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    gap: "10px",
                    padding: "10px 16px",
                    transition: "background 0.15s",
                    cursor: "pointer",
                    background: n.dot ? "rgba(59,130,246,0.04)" : "transparent",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background =
                      "rgba(255,255,255,0.03)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = n.dot
                      ? "rgba(59,130,246,0.04)"
                      : "transparent")
                  }
                >
                  <span style={{ fontSize: "20px" }}>{n.icon}</span>
                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        fontSize: "12px",
                        color: "var(--text-primary)",
                        fontWeight: "500",
                      }}
                    >
                      {n.text}
                    </div>
                    <div
                      style={{
                        fontSize: "11px",
                        color: "var(--text-muted)",
                        marginTop: "2px",
                      }}
                    >
                      {n.time}
                    </div>
                  </div>
                  {n.dot && (
                    <span
                      style={{
                        width: "7px",
                        height: "7px",
                        background: "var(--accent-blue)",
                        borderRadius: "50%",
                        flexShrink: 0,
                        marginTop: "4px",
                      }}
                    />
                  )}
                </div>
              ))}
            </div>
          )}
        </button>

        {/* Avatar / Logout */}
        <button
          className="navbar-avatar"
          id="navbar-avatar-btn"
          onClick={() => router.push("/")}
          title="Logout"
        >
          AD
        </button>
      </div>
    </header>
  );
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  // Determine page title from pathname
  const getTitle = () => {
    const segments = pathname.split("/").filter(Boolean);
    if (segments.length <= 1) return "Dashboard";
    return (
      segments[segments.length - 1].charAt(0).toUpperCase() +
      segments[segments.length - 1].slice(1)
    );
  };

  // Close sidebar on route change
  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  // Handle escape key to close mobile sidebar
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSidebarOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="cms-layout">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="cms-main">
        <Navbar
          onMenuClick={() => setSidebarOpen((v) => !v)}
          title={getTitle()}
        />
        {children}
      </div>
    </div>
  );
}
