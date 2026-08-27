"use client";

import React, { ChangeEvent, useEffect, useState } from "react";

type Option = {
  label: string;
  value: string;
};

const inputClass =
  "w-full h-9 rounded-md border border-[#e5e1da] bg-white px-3 text-[11px] text-slate-700 outline-none placeholder:text-[#96999d] focus:border-[#c9a45c] focus:ring-1 focus:ring-[#c9a45c]/20";

const labelClass = "mb-1.5 block text-[10px] font-semibold text-slate-700";

const selectClass =
  "w-full h-9 appearance-none rounded-md border border-[#e5e1da] bg-white px-3 text-[11px] text-slate-700 outline-none focus:border-[#c9a45c] focus:ring-1 focus:ring-[#c9a45c]/20";

export const textareaClass =
  "w-full resize-none rounded-md border border-[#e5e1da] bg-white px-3 py-2 text-[11px] text-slate-700 outline-none placeholder:text-[#96999d] focus:border-[#c9a45c] focus:ring-1 focus:ring-[#c9a45c]/20";

export const Section = ({
  title,
  children,
  className = "",
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) => (
  <section
    className={`rounded-md border border-slate-200 bg-white p-3 ${className}`}
  >
    <h2 className="mb-3 text-[11px] font-bold text-slate-800">{title}</h2>

    {children}
  </section>
);

export const Field = ({
  label,
  required = false,
  children,
  className = "",
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
  className?: string;
}) => (
  <div className={className}>
    <label className={labelClass}>
      {label}

      {required && <span className="ml-0.5 text-red-500">*</span>}
    </label>

    {children}
  </div>
);

export const Input = ({
  placeholder,
  type = "text",
  value,
  onChange,
  readOnly = false,
  disabled = false,
  min,
  max,
  step,
}: {
  placeholder?: string;
  type?: string;
  value?: string | number;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  readOnly?: boolean;
  disabled?: boolean;
  min?: number;
  max?: number;
  step?: number | string;
}) => (
  <input
    type={type}
    placeholder={placeholder}
    value={value ?? ""}
    onChange={onChange}
    readOnly={readOnly}
    disabled={disabled}
    min={min}
    max={max}
    step={step}
    className={inputClass}
  />
);

export const Select = ({
  options,
  placeholder = "Select",
  value,
  onChange,
  disabled = false,
}: {
  options: Option[];
  placeholder?: string;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLSelectElement>) => void;
  disabled?: boolean;
}) => (
  <div className="relative">
    <select
      className={`${selectClass} ${
        disabled ? "cursor-not-allowed bg-slate-50" : ""
      }`}
      value={value ?? ""}
      onChange={onChange}
      disabled={disabled}
    >
      <option value="" disabled>
        {placeholder}
      </option>

      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>

    <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[9px] text-slate-500">
      ▼
    </span>
  </div>
);

export const Toggle = ({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: () => void;
}) => (
  <button
    type="button"
    onClick={onChange}
    className={`relative h-4 w-8 rounded-full transition ${
      checked ? "bg-slate-800" : "bg-slate-200"
    }`}
  >
    <span
      className={`absolute top-0.5 h-3 w-3 rounded-full bg-white shadow transition ${
        checked ? "left-[18px]" : "left-0.5"
      }`}
    />
  </button>
);

export const EmptyState = ({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) => (
  <div className="flex min-h-[120px] flex-col items-center justify-center text-center">
    <div className="mb-3 text-xl text-slate-400">{icon}</div>

    <p className="text-[11px] font-semibold text-slate-600">{title}</p>

    <p className="mt-1 max-w-[230px] text-[9px] leading-4 text-slate-400">
      {description}
    </p>
  </div>
);
