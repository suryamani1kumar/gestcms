"use client";

import React, { useState } from "react";
import {
  FiSave,
  FiBell,
  FiShield,
  FiCreditCard,
  FiLink,
  FiSliders,
  FiDatabase,
  FiInfo,
  FiServer,
  FiCalendar,
  FiUpload,
  FiFolder,
  FiMail,
  FiMessageSquare,
  FiSmartphone,
  FiShoppingBag,
  FiPackage,
  FiUserPlus,
  FiDollarSign,
  FiTruck,
  FiGift,
  FiSun,
  FiMoon,
  FiMonitor,
  FiLock,
  FiUsers,
  FiClock,
  FiRefreshCw,
  FiTrash2,
  FiRotateCcw,
  FiChevronDown,
  FiBarChart2,
  FiSettings,
  FiHardDrive,
} from "react-icons/fi";

/* =========================================================
   TYPES
========================================================= */

type SettingsTab =
  | "General"
  | "Notifications"
  | "Security"
  | "Billing"
  | "Integrations"
  | "Preferences"
  | "Backup";

type ToggleProps = {
  enabled: boolean;
  onChange: () => void;
};

/* =========================================================
   CONSTANTS
========================================================= */

const GOLD = "#c58620";
const GOLD_DARK = "#b87818";

/* =========================================================
   TOGGLE
========================================================= */

const Toggle = ({ enabled, onChange }: ToggleProps) => (
  <button
    type="button"
    onClick={onChange}
    aria-label="Toggle setting"
    className={`relative h-[17px] w-[30px] shrink-0 rounded-full transition-colors ${
      enabled ? "bg-[#c58620]" : "bg-[#d1d5db]"
    }`}
  >
    <span
      className={`absolute top-[2px] h-[13px] w-[13px] rounded-full bg-white shadow-sm transition-all ${
        enabled ? "left-[15px]" : "left-[2px]"
      }`}
    />
  </button>
);

/* =========================================================
   CARD
========================================================= */

const Card = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div
    className={`rounded-[7px] border border-[#e6e7e9] bg-white ${className}`}
  >
    {children}
  </div>
);

/* =========================================================
   SECTION HEADER
========================================================= */

const SectionHeader = ({
  title,
  description,
  className = "",
}: {
  title: string;
  description?: string;
  className?: string;
}) => (
  <div className={`mb-4 ${className}`}>
    <h2 className="text-[11px] font-semibold leading-none text-[#1f2937]">
      {title}
    </h2>

    {description && (
      <p className="mt-[5px] text-[7px] leading-none text-[#667085]">
        {description}
      </p>
    )}
  </div>
);

/* =========================================================
   INPUT
========================================================= */

const Input = ({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange?: (value: string) => void;
}) => (
  <div>
    <label className="mb-[6px] block text-[7px] font-semibold text-[#374151]">
      {label}
    </label>

    <input
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
      className="h-[29px] w-full rounded-[5px] border border-[#dfe2e6] bg-white px-[8px] text-[8px] text-[#374151] outline-none transition focus:border-[#c58620] focus:ring-1 focus:ring-[#c58620]/10"
    />
  </div>
);

/* =========================================================
   SELECT
========================================================= */

const Select = ({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange?: (value: string) => void;
}) => (
  <div>
    <label className="mb-[6px] block text-[7px] font-semibold text-[#374151]">
      {label}
    </label>

    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        className="h-[29px] w-full appearance-none rounded-[5px] border border-[#dfe2e6] bg-white px-[8px] pr-[24px] text-[8px] text-[#374151] outline-none focus:border-[#c58620] focus:ring-1 focus:ring-[#c58620]/10"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>

      <FiChevronDown className="pointer-events-none absolute right-[8px] top-1/2 -translate-y-1/2 text-[9px] text-[#6b7280]" />
    </div>
  </div>
);

/* =========================================================
   NOTIFICATION ITEM
========================================================= */

const NotificationItem = ({
  icon: Icon,
  title,
  description,
  enabled,
  onChange,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  enabled: boolean;
  onChange: () => void;
}) => (
  <div className="flex min-h-[42px] items-center justify-between gap-3">
    <div className="flex min-w-0 items-center gap-[9px]">
      <div className="flex h-[29px] w-[29px] shrink-0 items-center justify-center rounded-full bg-[#fff8ec] text-[12px] text-[#c58620]">
        <Icon />
      </div>

      <div className="min-w-0">
        <p className="text-[8px] font-semibold leading-none text-[#374151]">
          {title}
        </p>

        <p className="mt-[5px] text-[6.5px] leading-none text-[#6b7280]">
          {description}
        </p>
      </div>
    </div>

    <Toggle enabled={enabled} onChange={onChange} />
  </div>
);

/* =========================================================
   STATUS BADGE
========================================================= */

const StatusBadge = ({
  children,
  color = "green",
}: {
  children: React.ReactNode;
  color?: "green" | "orange" | "red";
}) => {
  const styles = {
    green: "bg-[#edf8f0] text-[#4b9a60]",
    orange: "bg-[#fff6e8] text-[#bd7b18]",
    red: "bg-[#fff0f0] text-[#dc4c4c]",
  };

  return (
    <span
      className={`inline-flex whitespace-nowrap rounded-[4px] px-[7px] py-[4px] text-[6px] font-medium ${styles[color]}`}
    >
      {children}
    </span>
  );
};

/* =========================================================
   SECURITY ROW
========================================================= */

const SecurityRow = ({
  icon: Icon,
  title,
  subtitle,
  action,
}: {
  icon: React.ElementType;
  title: string;
  subtitle?: string;
  action: string;
}) => (
  <div className="flex min-h-[43px] items-center justify-between border-b border-[#f0f1f2]">
    <div className="flex items-center gap-[9px]">
      <Icon className="text-[13px] text-[#5f6670]" />

      <div>
        <p className="text-[7px] font-medium leading-none text-[#374151]">
          {title}
        </p>

        {subtitle && (
          <p className="mt-[4px] text-[6px] leading-none text-[#6b7280]">
            {subtitle}
          </p>
        )}
      </div>
    </div>

    <button className="h-[27px] min-w-[58px] rounded-[5px] border border-[#e1e4e8] bg-white px-[8px] text-[6px] text-[#4b5563] hover:bg-[#fafafa]">
      {action}
    </button>
  </div>
);

/* =========================================================
   SYSTEM ROW
========================================================= */

const SystemRow = ({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: React.ReactNode;
}) => (
  <div className="flex min-h-[30px] items-center justify-between gap-2">
    <div className="flex items-center gap-[9px]">
      <Icon className="text-[11px] text-[#68717d]" />

      <span className="text-[7px] text-[#4b5563]">{label}</span>
    </div>

    <div className="text-right text-[7px] font-medium text-[#374151]">
      {value}
    </div>
  </div>
);

/* =========================================================
   STORAGE ROW
========================================================= */

const StorageRow = ({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
}) => (
  <div className="flex items-center justify-between">
    <div className="flex items-center gap-[9px]">
      <Icon className="text-[11px] text-[#68717d]" />
      <span className="text-[7px] text-[#4b5563]">{label}</span>
    </div>

    <span className="text-[7px] font-medium text-[#374151]">{value}</span>
  </div>
);

/* =========================================================
   INTEGRATION ROW
========================================================= */

const IntegrationRow = ({
  icon: Icon,
  label,
}: {
  icon: React.ElementType;
  label: string;
}) => (
  <div className="flex min-h-[25px] items-center justify-between">
    <div className="flex items-center gap-[9px]">
      <Icon className="text-[11px] text-[#68717d]" />

      <span className="text-[7px] text-[#4b5563]">{label}</span>
    </div>

    <StatusBadge>Connected</StatusBadge>
  </div>
);

/* =========================================================
   DANGER ROW
========================================================= */

const DangerRow = ({
  icon: Icon,
  title,
  action,
}: {
  icon: React.ElementType;
  title: string;
  action: string;
}) => (
  <div className="flex min-h-[32px] items-center justify-between gap-2">
    <div className="flex items-center gap-[8px] text-[#dc4c4c]">
      <Icon className="text-[11px]" />
      <span className="text-[7px]">{title}</span>
    </div>

    <button className="h-[24px] min-w-[65px] rounded-[5px] border border-[#f3cccc] px-[8px] text-[6px] text-[#d85555] hover:bg-[#fff7f7]">
      {action}
    </button>
  </div>
);

/* =========================================================
   MAIN COMPONENT
========================================================= */

const Settings = () => {
  const [activeTab, setActiveTab] = useState<SettingsTab>("General");

  const [companyName, setCompanyName] =
    useState("Luxora Jewellery CRM");

  const [dateFormat, setDateFormat] =
    useState("DD MMM YYYY (17 May 2025)");

  const [currency, setCurrency] =
    useState("INR (₹) - Indian Rupee");

  const [timezone, setTimezone] =
    useState("(GMT+05:30) Asia/Kolkata");

  const [language, setLanguage] = useState("English");

  const [fiscalYear, setFiscalYear] = useState("April");

  const [notifications, setNotifications] = useState({
    newOrder: true,
    lowStock: true,
    newCustomer: true,
    paymentReceived: true,
    orderUpdates: true,
    systemUpdates: true,
    weeklyReports: false,
    marketingOffers: false,
  });

  const [theme, setTheme] =
    useState<"Light" | "Dark" | "System">("Light");

  const [primaryColor, setPrimaryColor] = useState("gold");

  const [defaultDashboard, setDefaultDashboard] =
    useState("Overview");

  const [itemsPerPage, setItemsPerPage] = useState("10");

  const [defaultView, setDefaultView] =
    useState("List View");

  const [helpTips, setHelpTips] = useState(true);

  const toggleNotification = (
    key: keyof typeof notifications
  ) => {
    setNotifications((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleSave = () => {
    console.log("Settings saved", {
      companyName,
      dateFormat,
      currency,
      timezone,
      language,
      fiscalYear,
      notifications,
      theme,
      primaryColor,
      defaultDashboard,
      itemsPerPage,
      defaultView,
      helpTips,
    });
  };

  return (
    <div className="min-h-screen bg-[#fafafa] text-[#344054]">
      <main className="w-full">
        {/* =====================================================
            HEADER
        ====================================================== */}

        <header className="flex h-[76px] items-center justify-between px-[30px]">
          <div>
            <h1 className="text-[20px] font-bold leading-none text-[#17202a]">
              Settings
            </h1>

            <p className="mt-[8px] text-[8px] leading-none text-[#667085]">
              Manage your system preferences and configurations.
            </p>
          </div>

          <button
            type="button"
            onClick={handleSave}
            className="flex h-[34px] items-center gap-[7px] rounded-[6px] bg-[#bd7d19] px-[15px] text-[8px] font-semibold text-white shadow-sm transition hover:bg-[#a96d12]"
          >
            <FiSave className="text-[11px]" />
            Save Changes
          </button>
        </header>

        {/* =====================================================
            TABS
        ====================================================== */}

        <div className="border-b border-[#e6e7e9] px-[15px]">
          <div className="flex h-[39px] items-end gap-[0px]">
            {(
              [
                "General",
                "Notifications",
                "Security",
                "Billing",
                "Integrations",
                "Preferences",
                "Backup",
              ] as SettingsTab[]
            ).map((tab) => {
              const active = activeTab === tab;

              return (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={`relative h-[39px] px-[15px] text-[8px] font-medium transition ${
                    active
                      ? "text-[#b87818]"
                      : "text-[#4b5563] hover:text-[#17202a]"
                  }`}
                >
                  {tab}

                  {active && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#c58620]" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* =====================================================
            CONTENT
        ====================================================== */}

        <div className="px-[15px] py-[15px]">
          {activeTab === "General" ? (
            <div className="grid grid-cols-1 gap-[13px] xl:grid-cols-[minmax(0,3fr)_285px]">
              {/* =================================================
                  LEFT COLUMN
              ================================================== */}

              <div className="min-w-0 space-y-[13px]">
                {/* GENERAL SETTINGS */}

                <Card className="p-[14px]">
                  <SectionHeader
                    title="General Settings"
                    description="Manage your general system preferences."
                  />

                  <div className="grid grid-cols-1 gap-x-[21px] gap-y-[14px] md:grid-cols-[1fr_1fr_240px]">
                    <Input
                      label="Company Name"
                      value={companyName}
                      onChange={setCompanyName}
                    />

                    <Select
                      label="Date Format"
                      value={dateFormat}
                      options={[
                        "DD MMM YYYY (17 May 2025)",
                        "DD/MM/YYYY",
                        "MM/DD/YYYY",
                        "YYYY-MM-DD",
                      ]}
                      onChange={setDateFormat}
                    />

                    {/* LOGO */}
                    <div className="row-span-3 md:col-start-3 md:row-start-1">
                      <label className="mb-[6px] block text-[7px] font-semibold text-[#374151]">
                        Business Logo
                      </label>

                      <div className="flex h-[86px] items-center justify-center rounded-[5px] border border-[#dfe2e6] bg-white">
                        <div className="flex items-center gap-[11px]">
                          <div className="relative flex h-[37px] w-[37px] items-center justify-center">
                            <div className="absolute h-[28px] w-[16px] rotate-45 rounded-[7px] border-[2px] border-[#c58620]" />
                            <div className="absolute h-[28px] w-[16px] -rotate-45 rounded-[7px] border-[2px] border-[#c58620]" />
                            <div className="absolute h-[6px] w-[6px] rounded-full bg-[#c58620]" />
                          </div>

                          <div>
                            <p className="text-[13px] font-medium tracking-[3px] leading-none text-[#202832]">
                              LUXORA
                            </p>

                            <p className="mt-[6px] text-[6px] tracking-[1.6px] leading-none text-[#667085]">
                              JEWELLERY CRM
                            </p>
                          </div>
                        </div>
                      </div>

                      <button
                        type="button"
                        className="mt-[7px] flex h-[27px] w-full items-center justify-center gap-[5px] rounded-[5px] border border-[#d1d5db] text-[7px] font-medium text-[#b87818] hover:bg-[#fffaf2]"
                      >
                        <FiUpload className="text-[10px]" />
                        Upload New Logo
                      </button>

                      <p className="mt-[4px] text-[6px] text-[#98a2b3]">
                        PNG, JPG or SVG. Max size 2MB.
                      </p>
                    </div>

                    <Select
                      label="Currency"
                      value={currency}
                      options={[
                        "INR (₹) - Indian Rupee",
                        "USD ($) - US Dollar",
                        "EUR (€) - Euro",
                        "GBP (£) - British Pound",
                      ]}
                      onChange={setCurrency}
                    />

                    <Select
                      label="Time Zone"
                      value={timezone}
                      options={[
                        "(GMT+05:30) Asia/Kolkata",
                        "(GMT+00:00) Europe/London",
                        "(GMT-05:00) America/New_York",
                        "(GMT-08:00) America/Los_Angeles",
                      ]}
                      onChange={setTimezone}
                    />

                    <Select
                      label="Language"
                      value={language}
                      options={[
                        "English",
                        "Hindi",
                        "French",
                        "Spanish",
                      ]}
                      onChange={setLanguage}
                    />

                    <Select
                      label="Fiscal Year Start"
                      value={fiscalYear}
                      options={[
                        "April",
                        "January",
                        "July",
                        "October",
                      ]}
                      onChange={setFiscalYear}
                    />
                  </div>
                </Card>

                {/* EMAIL NOTIFICATIONS */}

                <Card className="p-[14px]">
                  <SectionHeader
                    title="Email Notifications"
                    description="Choose what notifications you want to receive."
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2">
                    <div className="pr-[20px]">
                      <NotificationItem
                        icon={FiShoppingBag}
                        title="New Order"
                        description="Get notified for new orders"
                        enabled={notifications.newOrder}
                        onChange={() =>
                          toggleNotification("newOrder")
                        }
                      />

                      <NotificationItem
                        icon={FiPackage}
                        title="Low Stock Alert"
                        description="Get notified for low stock items"
                        enabled={notifications.lowStock}
                        onChange={() =>
                          toggleNotification("lowStock")
                        }
                      />

                      <NotificationItem
                        icon={FiUserPlus}
                        title="New Customer"
                        description="Get notified for new customer registration"
                        enabled={notifications.newCustomer}
                        onChange={() =>
                          toggleNotification("newCustomer")
                        }
                      />

                      <NotificationItem
                        icon={FiDollarSign}
                        title="Payment Received"
                        description="Get notified for payments"
                        enabled={notifications.paymentReceived}
                        onChange={() =>
                          toggleNotification("paymentReceived")
                        }
                      />
                    </div>

                    <div className="border-l border-[#edf0f2] pl-[20px]">
                      <NotificationItem
                        icon={FiTruck}
                        title="Order Updates"
                        description="Get notified for order status changes"
                        enabled={notifications.orderUpdates}
                        onChange={() =>
                          toggleNotification("orderUpdates")
                        }
                      />

                      <NotificationItem
                        icon={FiSettings}
                        title="System Updates"
                        description="Important system updates and alerts"
                        enabled={notifications.systemUpdates}
                        onChange={() =>
                          toggleNotification("systemUpdates")
                        }
                      />

                      <NotificationItem
                        icon={FiBarChart2}
                        title="Weekly Reports"
                        description="Receive weekly business reports"
                        enabled={notifications.weeklyReports}
                        onChange={() =>
                          toggleNotification("weeklyReports")
                        }
                      />

                      <NotificationItem
                        icon={FiGift}
                        title="Marketing & Offers"
                        description="Receive marketing emails and offers"
                        enabled={notifications.marketingOffers}
                        onChange={() =>
                          toggleNotification("marketingOffers")
                        }
                      />
                    </div>
                  </div>
                </Card>

                {/* =================================================
                    BOTTOM THREE CARDS
                ================================================== */}

                <div className="grid grid-cols-1 gap-[13px] lg:grid-cols-3">
                  {/* APPEARANCE */}

                  <Card className="p-[14px]">
                    <SectionHeader
                      title="Appearance"
                      description="Customize the look and feel of your dashboard."
                    />

                    <p className="mb-[8px] text-[7px] font-semibold text-[#374151]">
                      Theme
                    </p>

                    <div className="grid grid-cols-3 gap-[7px]">
                      {[
                        {
                          name: "Light" as const,
                          icon: FiSun,
                        },
                        {
                          name: "Dark" as const,
                          icon: FiMoon,
                        },
                        {
                          name: "System" as const,
                          icon: FiMonitor,
                        },
                      ].map(({ name, icon: Icon }) => {
                        const selected = theme === name;

                        return (
                          <button
                            key={name}
                            type="button"
                            onClick={() => setTheme(name)}
                            className={`flex h-[55px] flex-col items-center justify-center gap-[5px] rounded-[5px] border text-[7px] ${
                              selected
                                ? "border-[#c58620] bg-[#fffaf2] text-[#b87818]"
                                : "border-[#e1e4e8] text-[#4b5563]"
                            }`}
                          >
                            <Icon className="text-[14px]" />
                            {name}
                          </button>
                        );
                      })}
                    </div>

                    <p className="mb-[8px] mt-[15px] text-[7px] font-semibold text-[#374151]">
                      Primary Color
                    </p>

                    <div className="flex items-center gap-[10px]">
                      {[
                        ["gold", "bg-[#c58620]"],
                        ["purple", "bg-[#7950d7]"],
                        ["blue", "bg-[#3987e8]"],
                        ["green", "bg-[#4caf68]"],
                        ["red", "bg-[#e33d3d]"],
                        ["pink", "bg-[#ed4c91]"],
                      ].map(([name, color]) => (
                        <button
                          key={name}
                          type="button"
                          onClick={() => setPrimaryColor(name)}
                          className={`flex h-[23px] w-[23px] items-center justify-center rounded-full ${
                            primaryColor === name
                              ? "ring-1 ring-[#c58620] ring-offset-2"
                              : ""
                          }`}
                        >
                          <span
                            className={`h-[17px] w-[17px] rounded-full ${color}`}
                          />
                        </button>
                      ))}
                    </div>
                  </Card>

                  {/* PREFERENCES */}

                  <Card className="p-[14px]">
                    <SectionHeader
                      title="Preferences"
                      description="Set your default preferences."
                    />

                    <div className="space-y-[12px]">
                      <Select
                        label="Default Dashboard"
                        value={defaultDashboard}
                        options={[
                          "Overview",
                          "Sales",
                          "Customers",
                          "Reports",
                        ]}
                        onChange={setDefaultDashboard}
                      />

                      <Select
                        label="Items Per Page"
                        value={itemsPerPage}
                        options={["10", "20", "50", "100"]}
                        onChange={setItemsPerPage}
                      />

                      <Select
                        label="Default View"
                        value={defaultView}
                        options={[
                          "List View",
                          "Grid View",
                          "Compact View",
                        ]}
                        onChange={setDefaultView}
                      />

                      <label className="flex items-center gap-[7px] pt-[2px]">
                        <input
                          type="checkbox"
                          checked={helpTips}
                          onChange={() => setHelpTips(!helpTips)}
                          className="h-[11px] w-[11px] accent-[#c58620]"
                        />

                        <span className="text-[7px] text-[#4b5563]">
                          Show helpful tips and suggestions
                        </span>
                      </label>
                    </div>
                  </Card>

                  {/* SECURITY */}

                  <Card className="p-[14px]">
                    <SectionHeader
                      title="Security Settings"
                      description="Manage your security preferences."
                    />

                    <div>
                      <SecurityRow
                        icon={FiLock}
                        title="Change Password"
                        action="Change"
                      />

                      <div className="flex min-h-[43px] items-center justify-between border-b border-[#f0f1f2]">
                        <div className="flex items-center gap-[9px]">
                          <FiShield className="text-[13px] text-[#5f6670]" />

                          <div>
                            <p className="text-[7px] font-medium leading-none text-[#374151]">
                              Two-Factor Authentication
                            </p>

                            <p className="mt-[4px] text-[6px] leading-none text-[#4b9a60]">
                              Enabled
                            </p>
                          </div>
                        </div>

                        <button className="h-[27px] min-w-[58px] rounded-[5px] border border-[#e1e4e8] text-[6px] text-[#4b5563]">
                          Manage
                        </button>
                      </div>

                      <SecurityRow
                        icon={FiMonitor}
                        title="Active Sessions"
                        subtitle="3 active sessions"
                        action="View"
                      />

                      <SecurityRow
                        icon={FiClock}
                        title="Login History"
                        action="View"
                      />
                    </div>
                  </Card>
                </div>
              </div>

              {/* =================================================
                  RIGHT COLUMN
              ================================================== */}

              <aside className="min-w-0 space-y-[13px]">
                {/* SYSTEM INFORMATION */}

                <Card className="p-[14px]">
                  <SectionHeader title="System Information" />

                  <div>
                    <SystemRow
                      icon={FiInfo}
                      label="Version"
                      value="v2.4.1"
                    />

                    <SystemRow
                      icon={FiServer}
                      label="Environment"
                      value="Production"
                    />

                    <SystemRow
                      icon={FiCalendar}
                      label="Last Updated"
                      value="17 May 2025"
                    />

                    <SystemRow
                      icon={FiShield}
                      label="System Status"
                      value={
                        <StatusBadge>
                          All Systems Operational
                        </StatusBadge>
                      }
                    />

                    <SystemRow
                      icon={FiDatabase}
                      label="Database Status"
                      value={<StatusBadge>Connected</StatusBadge>}
                    />
                  </div>
                </Card>

                {/* DATA & STORAGE */}

                <Card className="p-[14px]">
                  <SectionHeader title="Data & Storage" />

                  <div className="flex items-center justify-between">
                    <p className="text-[7px] text-[#4b5563]">
                      Total Storage Used
                    </p>

                    <p className="text-[7px] font-medium text-[#374151]">
                      128.6 GB / 500 GB
                    </p>
                  </div>

                  <div className="mt-[7px] h-[5px] overflow-hidden rounded-full bg-[#e5e7eb]">
                    <div
                      className="h-full rounded-full bg-[#c58620]"
                      style={{ width: "25.7%" }}
                    />
                  </div>

                  <p className="mt-[4px] text-right text-[6px] text-[#98a2b3]">
                    25.7%
                  </p>

                  <div className="mt-[13px] space-y-[12px]">
                    <StorageRow
                      icon={FiDatabase}
                      label="Database Size"
                      value="85.3 GB"
                    />

                    <StorageRow
                      icon={FiFolder}
                      label="Media Files"
                      value="32.1 GB"
                    />

                    <StorageRow
                      icon={FiHardDrive}
                      label="Backup Size"
                      value="11.2 GB"
                    />
                  </div>

                  <button className="mt-[14px] flex h-[28px] w-full items-center justify-center gap-[6px] rounded-[5px] border border-[#d1d5db] text-[7px] font-medium text-[#b87818] hover:bg-[#fffaf2]">
                    <FiFolder className="text-[10px]" />
                    Manage Storage
                  </button>
                </Card>

                {/* INTEGRATIONS */}

                <Card className="p-[14px]">
                  <SectionHeader title="Integrations" />

                  <div className="space-y-[7px]">
                    <IntegrationRow
                      icon={FiMail}
                      label="Email Service"
                    />

                    <IntegrationRow
                      icon={FiMessageSquare}
                      label="SMS Service"
                    />

                    <IntegrationRow
                      icon={FiCreditCard}
                      label="Payment Gateway"
                    />

                    <IntegrationRow
                      icon={FiSmartphone}
                      label="WhatsApp API"
                    />
                  </div>

                  <button className="mt-[12px] flex h-[28px] w-full items-center justify-center gap-[6px] rounded-[5px] border border-[#d1d5db] text-[7px] font-medium text-[#b87818] hover:bg-[#fffaf2]">
                    <FiSettings className="text-[10px]" />
                    Manage Integrations
                  </button>
                </Card>

                {/* DANGER ZONE */}

                <Card className="border-[#f1d2d2] p-[14px]">
                  <h2 className="text-[10px] font-semibold leading-none text-[#d74444]">
                    Danger Zone
                  </h2>

                  <div className="mt-[9px] space-y-[2px]">
                    <DangerRow
                      icon={FiRefreshCw}
                      title="Reset System Cache"
                      action="Clear Cache"
                    />

                    <DangerRow
                      icon={FiRotateCcw}
                      title="Reset All Settings"
                      action="Reset"
                    />

                    <DangerRow
                      icon={FiTrash2}
                      title="Delete Account"
                      action="Delete"
                    />
                  </div>
                </Card>
              </aside>
            </div>
          ) : (
            <Card className="flex min-h-[400px] items-center justify-center">
              <div className="text-center">
                <div className="mx-auto flex h-[45px] w-[45px] items-center justify-center rounded-full bg-[#fff7eb] text-[18px] text-[#c58620]">
                  {activeTab === "Notifications" && <FiBell />}
                  {activeTab === "Security" && <FiShield />}
                  {activeTab === "Billing" && <FiCreditCard />}
                  {activeTab === "Integrations" && <FiLink />}
                  {activeTab === "Preferences" && <FiSliders />}
                  {activeTab === "Backup" && <FiDatabase />}
                </div>

                <h2 className="mt-[12px] text-[13px] font-semibold text-[#1f2937]">
                  {activeTab} Settings
                </h2>

                <p className="mt-[6px] text-[8px] text-[#667085]">
                  Configure your {activeTab.toLowerCase()} preferences
                  and options here.
                </p>
              </div>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
};

export default Settings;