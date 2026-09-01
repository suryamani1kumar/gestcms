"use client";

import React, { useState } from "react";
import {
  FiEdit2,
  FiMail,
  FiPhone,
  FiMapPin,
  FiCalendar,
  FiCamera,
  FiShoppingBag,
  FiUsers,
  FiCheckCircle,
  FiStar,
  FiUser,
  FiBriefcase,
  FiLock,
  FiShield,
  FiMonitor,
  FiSettings,
  FiFileText,
} from "react-icons/fi";

/* =========================================================
   TYPES
========================================================= */

type ProfileData = {
  fullName: string;
  email: string;
  phone: string;
  employeeId: string;
  department: string;
  designation: string;
  dateOfBirth: string;
  location: string;
  gender: string;
  joiningDate: string;
  role: string;
  reportsTo: string;
  workEmail: string;
  officeTime: string;
  bio: string;
};

/* =========================================================
   CONSTANTS
========================================================= */

const GOLD = "#C68B25";

const tabs = [
  "Personal Information",
  "Security",
  "Preferences",
  "Notifications",
  "Activity Log",
];

/* =========================================================
   CARD
========================================================= */

const Card = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={`rounded-[7px] border border-[#e7e7e7] bg-white ${className}`}
    >
      {children}
    </div>
  );
};

/* =========================================================
   STAT CARD
========================================================= */

const StatCard = ({
  icon: Icon,
  title,
  value,
  percentage,
  iconBg,
  iconColor,
}: {
  icon: React.ElementType;
  title: string;
  value: string;
  percentage: string;
  iconBg: string;
  iconColor: string;
}) => {
  return (
    <div className="rounded-[7px] border border-[#e8e8e8] bg-white px-4 py-4">
      <div
        className={`flex h-10 w-10 items-center justify-center rounded-full ${iconBg}`}
      >
        <Icon className={`text-[18px] ${iconColor}`} />
      </div>

      <p className="mt-3 text-[8px] font-medium text-[#555]">{title}</p>

      <p className="mt-0.5 text-[18px] font-semibold leading-5 text-[#151515]">
        {value}
      </p>

      <div className="mt-2 flex items-center gap-1.5">
        <span className="text-[7px] font-semibold text-[#1b9b57]">
          ↑ {percentage}
        </span>

        <span className="text-[7px] text-[#999]">vs last month</span>
      </div>
    </div>
  );
};

/* =========================================================
   DETAIL ITEM
========================================================= */

const DetailItem = ({
  label,
  value,
}: {
  label: string;
  value: string;
}) => {
  return (
    <div>
      <p className="text-[8px] font-medium text-[#555]">{label}</p>

      <p className="mt-1 text-[9px] leading-4 text-[#333]">{value}</p>
    </div>
  );
};

/* =========================================================
   EDITABLE DETAIL
========================================================= */

const EditableDetail = ({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) => {
  return (
    <div>
      <label className="text-[8px] font-medium text-[#555]">{label}</label>

      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 h-7 w-full rounded border border-[#ddd] px-2 text-[9px] text-[#333] outline-none focus:border-[#C68B25] focus:ring-1 focus:ring-[#C68B25]/10"
      />
    </div>
  );
};

/* =========================================================
   ACTIVITY ITEM
========================================================= */

const ActivityItem = ({
  icon: Icon,
  bg,
  color,
  title,
  description,
  date,
  time,
}: {
  icon: React.ElementType;
  bg: string;
  color: string;
  title: string;
  description: string;
  date: string;
  time: string;
}) => {
  return (
    <div className="flex gap-3">
      <div
        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${bg}`}
      >
        <Icon className={`text-[13px] ${color}`} />
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <p className="text-[8px] font-semibold text-[#333]">{title}</p>

            <p className="mt-0.5 text-[7px] text-[#777]">{description}</p>
          </div>

          <div className="shrink-0 text-right">
            <p className="text-[6.5px] text-[#777]">{date}</p>
            <p className="mt-0.5 text-[6.5px] text-[#999]">{time}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

/* =========================================================
   SECURITY ROW
========================================================= */

const SecurityRow = ({
  icon: Icon,
  title,
  children,
  action,
}: {
  icon: React.ElementType;
  title: string;
  children: React.ReactNode;
  action?: string;
}) => {
  return (
    <div className="flex items-center gap-3 py-2">
      <Icon className="shrink-0 text-[14px] text-[#555]" />

      <div className="min-w-0 flex-1">
        <p className="text-[8px] font-semibold text-[#444]">{title}</p>

        <div className="mt-0.5 text-[7px] text-[#777]">{children}</div>
      </div>

      {action && (
        <button className="h-7 min-w-[66px] rounded-md border border-[#e1e1e1] px-2 text-[7px] font-medium text-[#555]">
          {action}
        </button>
      )}
    </div>
  );
};

/* =========================================================
   WORK ROW
========================================================= */

const WorkRow = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => {
  return (
    <div className="grid grid-cols-[95px_1fr] items-center gap-2">
      <span className="text-[8px] font-medium text-[#555]">{label}</span>

      <span className="text-[8px] text-[#444]">{children}</span>
    </div>
  );
};

/* =========================================================
   PROFILE
========================================================= */

const Profile = () => {
  const [editing, setEditing] = useState(false);

  const [activeTab, setActiveTab] = useState("Personal Information");

  const [profile, setProfile] = useState<ProfileData>({
    fullName: "Neha Kapoor",
    email: "neha.kapoor@luxora.com",
    phone: "+91 98765 43210",
    employeeId: "EMP1001",
    department: "IT Department",
    designation: "System Administrator",
    dateOfBirth: "12 Feb 1990",
    location: "Mumbai, Maharashtra, India",
    gender: "Female",
    joiningDate: "15 Jan 2024",
    role: "Administrator",
    reportsTo: "System Owner",
    workEmail: "neha.kapoor@luxora.com",
    officeTime: "9:00 AM - 6:00 PM (IST)",
    bio: "Dedicated administrator with 6+ years of experience in managing CRM systems, user management, and process automation. Passionate about improving business workflows and data security.",
  });

  const updateProfile = (
    field: keyof ProfileData,
    value: string
  ) => {
    setProfile((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  const handleEdit = () => {
    if (editing) {
      setEditing(false);
    } else {
      setEditing(true);
    }
  };

  return (
    <main className="min-h-screen bg-[#fafafa]">
      {/* =====================================================
          PAGE HEADER
      ====================================================== */}

      <div className="px-[10px] pt-[10px] sm:px-4 lg:px-[13px]">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-[17px] font-bold leading-5 text-[#171717]">
              My Profile
            </h1>

            <p className="mt-1 text-[8px] text-[#777]">
              Manage your account settings and preferences.
            </p>

            <div className="mt-3 flex items-center gap-2 text-[8px]">
              <span className="text-[#555]">Dashboard</span>

              <span className="text-[#999]">›</span>

              <span className="text-[#333]">Profile</span>
            </div>
          </div>

          <button
            onClick={handleEdit}
            className="flex h-[34px] items-center gap-2 rounded-md bg-[#bd7f1d] px-4 text-[8px] font-semibold text-white shadow-sm hover:bg-[#aa7017]"
          >
            <FiEdit2 className="text-[11px]" />

            {editing ? "Save Profile" : "Edit Profile"}
          </button>
        </div>
      </div>

      {/* =====================================================
          CONTENT
      ====================================================== */}

      <div className="space-y-3 px-[10px] pb-5 pt-4 sm:px-4 lg:px-[13px]">
        {/* ===================================================
            PROFILE HERO
        ==================================================== */}

        <Card className="p-4">
          <div className="grid gap-5 xl:grid-cols-[390px_1fr]">
            {/* PROFILE INFO */}

            <div className="flex items-center gap-5">
              <div className="relative shrink-0">
                <img
                  src="https://i.pravatar.cc/180?img=47"
                  alt="Neha Kapoor"
                  className="h-[112px] w-[112px] rounded-full object-cover"
                />
              </div>

              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-[16px] font-bold text-[#171717]">
                    {profile.fullName}
                  </h2>

                  <span className="rounded bg-[#f1e9ff] px-2 py-1 text-[7px] font-medium text-[#7046c8]">
                    Administrator
                  </span>
                </div>

                <p className="mt-1 text-[8px] text-[#555]">
                  Administrator
                  <span className="mx-1.5 text-[#aaa]">•</span>
                  Full Access
                </p>

                <div className="mt-3 space-y-1.5">
                  <div className="flex items-center gap-2 text-[8px] text-[#555]">
                    <FiMail className="text-[10px] text-[#555]" />
                    {profile.email}
                  </div>

                  <div className="flex items-center gap-2 text-[8px] text-[#555]">
                    <FiPhone className="text-[10px] text-[#555]" />
                    {profile.phone}
                  </div>

                  <div className="flex items-center gap-2 text-[8px] text-[#555]">
                    <FiMapPin className="text-[10px] text-[#555]" />
                    {profile.location}
                  </div>

                  <div className="flex items-center gap-2 text-[8px] text-[#555]">
                    <FiCalendar className="text-[10px] text-[#555]" />
                    Member since 15 Jan 2024
                  </div>
                </div>
              </div>
            </div>

            {/* STATISTICS */}

            <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
              <StatCard
                icon={FiShoppingBag}
                title="Total Orders"
                value="156"
                percentage="18.2%"
                iconBg="bg-[#fff6e8]"
                iconColor="text-[#ef9417]"
              />

              <StatCard
                icon={FiUsers}
                title="Managed Users"
                value="24"
                percentage="12.5%"
                iconBg="bg-[#f5efff]"
                iconColor="text-[#8150e5]"
              />

              <StatCard
                icon={FiCheckCircle}
                title="Tasks Completed"
                value="89"
                percentage="15.3%"
                iconBg="bg-[#ecfaf2]"
                iconColor="text-[#16a05a]"
              />

              <StatCard
                icon={FiStar}
                title="Performance Score"
                value="4.8 / 5"
                percentage="8.7%"
                iconBg="bg-[#fff0f1]"
                iconColor="text-[#ef4148]"
              />
            </div>
          </div>
        </Card>

        {/* ===================================================
            TABS
        ==================================================== */}

        <div className="border-b border-[#e5e5e5]">
          <div className="flex gap-6 overflow-x-auto">
            {tabs.map((tab) => {
              const active = activeTab === tab;

              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`relative whitespace-nowrap pb-3 pt-1 text-[8px] font-medium ${
                    active
                      ? "text-[#bd7f1d]"
                      : "text-[#555] hover:text-[#222]"
                  }`}
                >
                  {tab}

                  {active && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#bd7f1d]" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* ===================================================
            PERSONAL INFORMATION
        ==================================================== */}

        {activeTab === "Personal Information" && (
          <div className="grid grid-cols-12 gap-3">
            {/* ===============================================
                LEFT COLUMN
            ================================================ */}

            <div className="col-span-12 space-y-3 xl:col-span-8">
              {/* PERSONAL DETAILS + PHOTO */}

              <div className="grid grid-cols-12 gap-3">
                {/* PERSONAL DETAILS */}

                <Card className="col-span-12 p-4 lg:col-span-8">
                  <div className="mb-5 flex items-center justify-between">
                    <h3 className="text-[10px] font-bold text-[#222]">
                      Personal Details
                    </h3>

                    <button
                      onClick={() => setEditing(true)}
                      className="flex h-7 items-center gap-1.5 rounded-md border border-[#e2e2e2] px-3 text-[7px] font-medium text-[#555]"
                    >
                      <FiEdit2 className="text-[9px]" />
                      Edit
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-x-8 gap-y-5">
                    {editing ? (
                      <>
                        <EditableDetail
                          label="Full Name"
                          value={profile.fullName}
                          onChange={(value) =>
                            updateProfile("fullName", value)
                          }
                        />

                        <DetailItem
                          label="Employee ID"
                          value={profile.employeeId}
                        />

                        <EditableDetail
                          label="Email Address"
                          value={profile.email}
                          onChange={(value) =>
                            updateProfile("email", value)
                          }
                        />

                        <EditableDetail
                          label="Department"
                          value={profile.department}
                          onChange={(value) =>
                            updateProfile("department", value)
                          }
                        />

                        <EditableDetail
                          label="Phone Number"
                          value={profile.phone}
                          onChange={(value) =>
                            updateProfile("phone", value)
                          }
                        />

                        <EditableDetail
                          label="Designation"
                          value={profile.designation}
                          onChange={(value) =>
                            updateProfile(
                              "designation",
                              value
                            )
                          }
                        />

                        <EditableDetail
                          label="Date of Birth"
                          value={profile.dateOfBirth}
                          onChange={(value) =>
                            updateProfile(
                              "dateOfBirth",
                              value
                            )
                          }
                        />

                        <DetailItem
                          label="Location"
                          value={profile.location}
                        />

                        <DetailItem
                          label="Gender"
                          value={profile.gender}
                        />

                        <DetailItem
                          label="Joining Date"
                          value={profile.joiningDate}
                        />
                      </>
                    ) : (
                      <>
                        <DetailItem
                          label="Full Name"
                          value={profile.fullName}
                        />

                        <DetailItem
                          label="Employee ID"
                          value={profile.employeeId}
                        />

                        <DetailItem
                          label="Email Address"
                          value={profile.email}
                        />

                        <DetailItem
                          label="Department"
                          value={profile.department}
                        />

                        <DetailItem
                          label="Phone Number"
                          value={profile.phone}
                        />

                        <DetailItem
                          label="Designation"
                          value={profile.designation}
                        />

                        <DetailItem
                          label="Date of Birth"
                          value={profile.dateOfBirth}
                        />

                        <DetailItem
                          label="Location"
                          value={profile.location}
                        />

                        <DetailItem
                          label="Gender"
                          value={profile.gender}
                        />

                        <DetailItem
                          label="Joining Date"
                          value={profile.joiningDate}
                        />
                      </>
                    )}
                  </div>
                </Card>

                {/* PROFILE PHOTO */}

                <Card className="col-span-12 p-4 lg:col-span-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-[10px] font-bold text-[#222]">
                      Profile Photo
                    </h3>

                    <button className="flex h-7 w-7 items-center justify-center rounded-md border border-[#e2e2e2] text-[#555]">
                      <FiEdit2 className="text-[9px]" />
                    </button>
                  </div>

                  <div className="mt-5 flex flex-col items-center">
                    <div className="relative">
                      <img
                        src="https://i.pravatar.cc/180?img=47"
                        alt="Neha Kapoor"
                        className="h-[118px] w-[118px] rounded-full object-cover"
                      />

                      <button className="absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-full border border-[#ddd] bg-white text-[#555] shadow-sm">
                        <FiCamera className="text-[11px]" />
                      </button>
                    </div>

                    <p className="mt-4 text-center text-[7px] text-[#777]">
                      JPG, PNG or GIF. Max size 2MB.
                    </p>

                    <button className="mt-4 flex h-8 w-full items-center justify-center gap-2 rounded-md border border-[#bd7f1d] text-[7px] font-semibold text-[#bd7f1d]">
                      <FiCamera className="text-[10px]" />
                      Change Photo
                    </button>
                  </div>
                </Card>
              </div>

              {/* ABOUT ME + WORK INFORMATION */}

              <div className="grid grid-cols-12 gap-3">
                {/* ABOUT ME */}

                <Card className="col-span-12 p-4 lg:col-span-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-[10px] font-bold text-[#222]">
                      About Me
                    </h3>

                    <button
                      onClick={() => setEditing(true)}
                      className="flex h-7 w-7 items-center justify-center rounded-md border border-[#e2e2e2] text-[#555]"
                    >
                      <FiEdit2 className="text-[9px]" />
                    </button>
                  </div>

                  {editing ? (
                    <textarea
                      value={profile.bio}
                      onChange={(e) =>
                        updateProfile("bio", e.target.value)
                      }
                      rows={5}
                      className="mt-4 w-full resize-none rounded-md border border-[#ddd] p-2 text-[8px] leading-4 outline-none focus:border-[#C68B25]"
                    />
                  ) : (
                    <p className="mt-4 text-[8px] leading-4 text-[#555]">
                      {profile.bio}
                    </p>
                  )}
                </Card>

                {/* WORK INFORMATION */}

                <Card className="col-span-12 p-4 lg:col-span-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-[10px] font-bold text-[#222]">
                      Work Information
                    </h3>

                    <button
                      onClick={() => setEditing(true)}
                      className="flex h-7 w-7 items-center justify-center rounded-md border border-[#e2e2e2] text-[#555]"
                    >
                      <FiEdit2 className="text-[9px]" />
                    </button>
                  </div>

                  <div className="mt-4 space-y-3">
                    <WorkRow label="Role">
                      <span className="rounded bg-[#f2ebff] px-2 py-1 text-[7px] font-medium text-[#7046c8]">
                        {profile.role}
                      </span>
                    </WorkRow>

                    <WorkRow label="Reports To">
                      {profile.reportsTo}
                    </WorkRow>

                    <WorkRow label="Work Email">
                      {profile.workEmail}
                    </WorkRow>

                    <WorkRow label="Office Time">
                      {profile.officeTime}
                    </WorkRow>
                  </div>
                </Card>
              </div>
            </div>

            {/* ===============================================
                RIGHT COLUMN
            ================================================ */}

            <div className="col-span-12 space-y-3 xl:col-span-4">
              {/* RECENT ACTIVITY */}

              <Card className="p-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-[10px] font-bold text-[#222]">
                    Recent Activity
                  </h3>

                  <button className="text-[7px] font-medium text-[#bd7f1d]">
                    View All
                  </button>
                </div>

                <div className="mt-4 space-y-4">
                  <ActivityItem
                    icon={FiMonitor}
                    bg="bg-[#ecfaf2]"
                    color="text-[#1b9b57]"
                    title="Logged in"
                    description="Successful login from Chrome"
                    date="17 May 2025"
                    time="10:30 AM"
                  />

                  <ActivityItem
                    icon={FiUsers}
                    bg="bg-[#eef6ff]"
                    color="text-[#3b82f6]"
                    title="Updated user role"
                    description="Changed role for Rahul Verma"
                    date="17 May 2025"
                    time="09:45 AM"
                  />

                  <ActivityItem
                    icon={FiSettings}
                    bg="bg-[#fff6e8]"
                    color="text-[#ef9417]"
                    title="System settings updated"
                    description="Notification preferences changed"
                    date="16 May 2025"
                    time="04:20 PM"
                  />

                  <ActivityItem
                    icon={FiLock}
                    bg="bg-[#f5efff]"
                    color="text-[#8150e5]"
                    title="Password changed"
                    description="Password updated successfully"
                    date="15 May 2025"
                    time="11:15 AM"
                  />

                  <ActivityItem
                    icon={FiFileText}
                    bg="bg-[#fff0f1]"
                    color="text-[#ef4148]"
                    title="Generated report"
                    description="Sales report generated"
                    date="14 May 2025"
                    time="03:30 AM"
                  />
                </div>
              </Card>

              {/* SECURITY INFORMATION */}

              <Card className="p-4">
                <h3 className="text-[10px] font-bold text-[#222]">
                  Security Information
                </h3>

                <div className="mt-3 divide-y divide-[#f0f0f0]">
                  <SecurityRow
                    icon={FiLock}
                    title="Password"
                    action="Change"
                  >
                    •••••••••
                  </SecurityRow>

                  <SecurityRow
                    icon={FiShield}
                    title="Two-Factor Authentication"
                    action="Manage"
                  >
                    <span className="rounded bg-[#ecfaf2] px-1.5 py-0.5 text-[7px] font-semibold text-[#1b9b57]">
                      Enabled
                    </span>
                  </SecurityRow>

                  <SecurityRow
                    icon={FiMonitor}
                    title="Active Sessions"
                    action="View"
                  >
                    3 active sessions
                  </SecurityRow>

                  <SecurityRow
                    icon={FiCalendar}
                    title="Last Password Change"
                  >
                    15 May 2025, 11:15 AM
                  </SecurityRow>

                  <SecurityRow
                    icon={FiMonitor}
                    title="Login Device"
                  >
                    Windows
                    <span className="mx-1">•</span>
                    Chrome
                    <span className="mx-1">•</span>
                    Mumbai, India
                  </SecurityRow>
                </div>
              </Card>
            </div>
          </div>
        )}

        {/* ===================================================
            OTHER TABS
        ==================================================== */}

        {activeTab !== "Personal Information" && (
          <Card className="flex min-h-[300px] items-center justify-center">
            <div className="text-center">
              <h2 className="text-[13px] font-semibold text-[#222]">
                {activeTab}
              </h2>

              <p className="mt-2 text-[8px] text-[#777]">
                {activeTab} content goes here.
              </p>
            </div>
          </Card>
        )}
      </div>
    </main>
  );
};

export default Profile;