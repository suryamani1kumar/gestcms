"use client";

import React from "react";
import {
  FaRegCalendarAlt,
  FaRegFileAlt,
  FaShoppingBag,
  FaUser,
  FaPhoneAlt,
  FaEnvelope,
  FaGlobe,
  FaStore,
  FaCreditCard,
  FaClipboardList,
  FaShieldAlt,
  FaGem,
  FaBoxOpen,
  FaLock,
  FaTimes,
} from "react-icons/fa";
import { MdVerified } from "react-icons/md";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Image from "next/image";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialog-paper": {
    width: "100%",
    maxWidth: "1200px",
    margin: theme.spacing(2),

    [theme.breakpoints.down("md")]: {
      maxWidth: "95vw",
      margin: theme.spacing(1),
    },

    [theme.breakpoints.down("sm")]: {
      width: "100%",
      maxWidth: "100%",
      margin: 0,
      borderRadius: 0,
    },
  },

  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),

    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(1),
    },
  },

  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

type InvoiceItem = {
  id: number;
  image: string;
  name: string;
  description1: string;
  description2: string;
  hsn: string;
  qty: number;
  unitPrice: number;
  discount: number;
  tax: number;
  amount: number;
};

const invoiceItems: InvoiceItem[] = [
  {
    id: 1,
    image: "/images/necklace.png",
    name: "22K Gold Necklace",
    description1: "Gross Weight: 18.250 g",
    description2: "Net Weight: 16.750 g",
    hsn: "7113",
    qty: 1,
    unitPrice: 124750,
    discount: 2500,
    tax: 3,
    amount: 122250,
  },
  {
    id: 2,
    image: "/images/earrings.png",
    name: "22K Gold Earrings",
    description1: "Gross Weight: 6.420 g",
    description2: "Net Weight: 5.850 g",
    hsn: "7113",
    qty: 1,
    unitPrice: 45900,
    discount: 900,
    tax: 3,
    amount: 45000,
  },
  {
    id: 3,
    image: "/images/sapphire-ring.png",
    name: "Natural Blue Sapphire Ring",
    description1: "Gross Weight: 4.380 g",
    description2: "Stone Weight: 2.15 Carat",
    hsn: "7114",
    qty: 1,
    unitPrice: 38500,
    discount: 500,
    tax: 3,
    amount: 38000,
  },
];

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);

export default function Invoice({
  showInvoice,
  setShowInvoice,
}: {
  showInvoice: boolean;
  setShowInvoice: (value: boolean) => void;
}) {
  const handleClose = () => {
    setShowInvoice(false);
  };

  const subTotal = 205250;
  const discount = 3900;
  const taxableAmount = 201350;
  const cgst = 3020.25;
  const sgst = 3020.25;
  const grandTotal = 207390.5;

  return (
    <BootstrapDialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={showInvoice}
    >
      <div className="relative">
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Invoice
        </DialogTitle>

        <button
          type="button"
          onClick={handleClose}
          aria-label="Close invoice"
          className="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 cursor-pointer items-center justify-center rounded-md text-[#777] transition hover:bg-[#f5f5f5] hover:text-[#333]"
        >
          <FaTimes className="text-[13px]" />
        </button>
      </div>

      <DialogContent dividers>
        <div
          id="invoice"
          className=" overflow-hidden rounded-md border border-[#cda66b] bg-white shadow-sm"
        >
          {/* ================= HEADER ================= */}

          <div className="px-4 pt-5 sm:px-6 sm:pt-6 lg:px-8 lg:pt-7">
            <div className="grid grid-cols-1 items-start gap-6 md:grid-cols-2 md:gap-8">
              {/* BRAND / LOGO */}
              <div className="flex items-start justify-center md:justify-start">
                <Image
                  src="/logo.png"
                  width={200}
                  height={60}
                  alt="Company Logo"
                  className="h-auto w-[160px] object-contain sm:w-[180px] lg:w-[200px]"
                  priority
                />
              </div>

              {/* INVOICE META */}
              <div className="w-full">
                {/* INVOICE TITLE */}

                <p className="font-serif text-xl font-bold tracking-wide sm:text-1xl lg:text-2xl">
                  INVOICE
                </p>

                {/* INVOICE DETAILS */}
                <div className="mt-5 rounded-xl border border-[#d8b982] p-3 sm:mt-6 sm:p-4">
                  <InvoiceMeta
                    icon={<FaRegFileAlt />}
                    label="Invoice No."
                    value="INV-2025-000123"
                  />

                  <InvoiceMeta
                    icon={<FaRegCalendarAlt />}
                    label="Invoice Date"
                    value="31 Aug 2025"
                  />

                  <InvoiceMeta
                    icon={<FaShoppingBag />}
                    label="Order No."
                    value="ORD-2025-000456"
                    last
                  />
                </div>
              </div>
            </div>
          </div>

          {/* ================= BILLING DETAILS ================= */}
          <div className="px-8 py-8">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <BillingCard
                title="BILL FROM"
                icon={<FaStore />}
                name="LUXORA"
                address={
                  <>
                    123, Diamond Square, M.I. Road,
                    <br />
                    Jaipur, Rajasthan - 302001, India
                  </>
                }
                phone="+91 98765 43210"
                email="hello@luxora.in"
                website="www.luxora.in"
                extra={
                  <span>
                    GSTIN: <strong>08ABCDE1234F1Z5</strong>
                  </span>
                }
              />

              <BillingCard
                title="BILL TO (CUSTOMER)"
                icon={<FaUser />}
                name="Neha Sharma"
                address={
                  <>
                    14, Shyam Nagar,
                    <br />
                    Jaipur, Rajasthan - 302019, India
                  </>
                }
                phone="+91 87654 32109"
                email="neha.sharma@gmail.com"
              />
            </div>
          </div>
          {/* ================= ITEMS TABLE ================= */}
          <div className="px-4 sm:px-8">
            <div className="overflow-hidden rounded-xl border border-[#decba8]">
              <div className="grid grid-cols-[45px_1fr_95px_60px_110px_105px_75px_125px] bg-[#071a41] text-xs font-semibold text-white">
                <TableHeader>SL.</TableHeader>
                <TableHeader>ITEM DETAILS</TableHeader>
                <TableHeader>HSN / SAC</TableHeader>
                <TableHeader>QTY.</TableHeader>
                <TableHeader>UNIT PRICE</TableHeader>
                <TableHeader>DISCOUNT</TableHeader>
                <TableHeader>TAX (%)</TableHeader>
                <TableHeader>AMOUNT (₹)</TableHeader>
              </div>

              {invoiceItems.map((item) => (
                <div
                  key={item.id}
                  className="grid min-h-[145px] grid-cols-[45px_1fr_95px_60px_110px_105px_75px_125px] border-t border-[#e4dccd] text-sm"
                >
                  <TableCell center>{item.id}</TableCell>

                  <div className="flex items-center gap-4 px-3 py-4">
                    <div className="flex h-[100px] w-[100px] shrink-0 items-center justify-center overflow-hidden rounded-lg border border-[#e5ddd1] bg-[#fafafa]">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-contain"
                      />
                    </div>

                    <div>
                      <p className="font-semibold text-[#071a41]">
                        {item.name}
                      </p>
                      <p className="mt-2 text-xs">{item.description1}</p>
                      <p className="mt-1 text-xs">{item.description2}</p>
                    </div>
                  </div>

                  <TableCell center>{item.hsn}</TableCell>
                  <TableCell center>{item.qty}</TableCell>
                  <TableCell center>{formatCurrency(item.unitPrice)}</TableCell>
                  <TableCell center>{formatCurrency(item.discount)}</TableCell>
                  <TableCell center>{item.tax}%</TableCell>
                  <TableCell center>{formatCurrency(item.amount)}</TableCell>
                </div>
              ))}
            </div>
          </div>
          {/* ================= BOTTOM ================= */}
          <div className="grid grid-cols-1 gap-5 px-8 py-5 md:grid-cols-2">
            {/* PAYMENT INFORMATION */}
            <div className="rounded-xl border border-[#decba8] p-4">
              <SectionTitle
                icon={<FaCreditCard />}
                title="PAYMENT INFORMATION"
              />

              <InfoRow label="Payment Method" value="Bank Transfer" />
              <InfoRow label="Bank Name" value="HDFC Bank" />
              <InfoRow label="A/C No." value="50200012345678" />
              <InfoRow label="IFSC Code" value="HDFC0001234" />
              <InfoRow label="UPI ID" value="luxora@upi" />
            </div>

            {/* TOTAL */}
            <div className="overflow-hidden rounded-xl border border-[#decba8]">
              <div className="p-5">
                <TotalRow
                  label="Sub Total"
                  value={`₹ ${formatCurrency(subTotal)}`}
                />

                <TotalRow
                  label="Discount"
                  value={`₹ ${formatCurrency(discount)}`}
                />

                <div className="my-3 border-t border-gray-300" />

                <TotalRow
                  label="Taxable Amount"
                  value={`₹ ${formatCurrency(taxableAmount)}`}
                />

                <TotalRow
                  label="CGST (1.5%)"
                  value={`₹ ${formatCurrency(cgst)}`}
                />

                <TotalRow
                  label="SGST (1.5%)"
                  value={`₹ ${formatCurrency(sgst)}`}
                />
              </div>

              {/* GRAND TOTAL */}
              <div className="flex items-center justify-between bg-[#071a41] px-5 py-3 text-white">
                <span className="text-lg font-bold">GRAND TOTAL</span>

                <span className="text-2xl font-bold text-[#e4a52c]">
                  ₹ {formatCurrency(grandTotal)}
                </span>
              </div>

              {/* AMOUNT IN WORDS */}
              <div className="p-5">
                <p className="font-semibold">Amount In Words</p>

                <p className="mt-2 text-sm leading-6">
                  Rupees Two Lakh Seven Thousand Three Hundred Ninety and Fifty
                  Paise Only
                </p>
              </div>
            </div>
          </div>

          {/* TERMS + THANK YOU */}
          <div className="px-8 py-5">
            <div className="rounded-xl border border-[#decba8] p-4">
              <SectionTitle
                icon={<FaClipboardList />}
                title="TERMS & CONDITIONS"
              />

              <ul className="list-disc space-y-2 pl-5 text-xs leading-relaxed">
                <li>Goods once sold will not be taken back.</li>
                <li>Exchange within 7 days only with original bill.</li>
                <li>
                  Damages or missing items must be reported within 24 hours.
                </li>
                <li>Subject to Jaipur Jurisdiction.</li>
              </ul>
            </div>
          </div>
          {/* ================= FEATURES ================= */}
          <div className="mx-8 border-t border-[#decba8] py-5">
            <div className="grid grid-cols-2 gap-5 md:grid-cols-4">
              <Feature
                icon={<FaGem />}
                title="100%"
                text="BIS Hallmarked Jewellery"
              />

              <Feature
                icon={<MdVerified />}
                title="Certified"
                text="Gemstones"
              />

              <Feature icon={<FaShieldAlt />} title="Lifetime" text="Buyback" />

              <Feature icon={<FaBoxOpen />} title="Secure" text="Packaging" />
            </div>
          </div>
          {/* SIGNATURE */}
          <div className="flex items-center justify-end border-t border-[#decba8] px-10 py-3">
            <div className="text-right">
              <p className="font-serif text-2xl italic">For LUXORA</p>
            </div>
          </div>
          {/* ================= FOOTER ================= */}
          <div className="bg-[#071a41] py-4 text-center text-white">
            <div className="flex items-center justify-center gap-4">
              <span className="text-[#d69a32]">❧</span>
              <p className="text-sm font-medium tracking-wide">
                LUXORA – CRAFTING ELEGANCE, DELIVERING TRUST
              </p>
              <span className="text-[#d69a32]">❧</span>
            </div>
          </div>
        </div>
      </DialogContent>
      <DialogActions>
        <button
          autoFocus
          type="button"
          onClick={handleClose}
          className="cursor-pointer flex h-[30px] items-center gap-1.5 rounded-[4px] bg-[#111923] px-3 text-[11px] font-medium text-white shadow-sm transition hover:bg-[#202b39]"
        >
          Save changes
        </button>
      </DialogActions>
    </BootstrapDialog>
  );
}

/* =====================================================
   COMPONENTS
===================================================== */

function InvoiceMeta({
  icon,
  label,
  value,
  last = false,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  last?: boolean;
}) {
  return (
    <div
      className={`flex items-center gap-3 py-2.5 ${
        !last ? "border-b border-[#e4dccd]" : ""
      }`}
    >
      <span className="text-lg text-[#c68117]">{icon}</span>

      <span className="w-[130px] font-semibold">{label}</span>

      <span className="flex-1">{value}</span>
    </div>
  );
}

function BillingCard({
  title,
  icon,
  name,
  address,
  phone,
  email,
  website,
  extra,
}: {
  title: string;
  icon: React.ReactNode;
  name: string;
  address: React.ReactNode;
  phone: string;
  email: string;
  website?: string;
  extra?: React.ReactNode;
}) {
  return (
    <div className="relative">
      <div className="mb-5 inline-block rounded-md bg-[#071a41] px-4 py-2 text-sm font-bold text-white">
        {title}
      </div>

      <div className="flex gap-5">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-[#d8b982] text-2xl text-[#b87916]">
          {icon}
        </div>

        <div className="text-sm leading-7">
          <h3 className="text-xl font-bold">{name}</h3>

          <div className="mt-1">{address}</div>

          <div className="mt-2 flex items-center gap-3">
            <FaPhoneAlt className="text-xs" />
            {phone}
          </div>

          <div className="flex items-center gap-3">
            <FaEnvelope className="text-xs" />
            {email}
          </div>

          {website && (
            <div className="flex items-center gap-3">
              <FaGlobe className="text-xs" />
              {website}
            </div>
          )}

          {extra && <div className="mt-2 font-medium">{extra}</div>}
        </div>
      </div>
    </div>
  );
}

function SectionTitle({
  icon,
  title,
}: {
  icon: React.ReactNode;
  title: string;
}) {
  return (
    <div className="mb-4">
      <div className="flex items-center gap-3">
        <span className="text-xl text-[#b87916]">{icon}</span>
        <h3 className="font-semibold">{title}</h3>
      </div>

      <div className="mt-3 h-px bg-[#ddd5c7]" />
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4 py-2 text-xs">
      <span className="font-semibold">{label}</span>
      <span>{value}</span>
    </div>
  );
}

function TotalRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-5 py-1.5">
      <span>{label}</span>
      <span>{value}</span>
    </div>
  );
}

function TableHeader({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-center border-r border-white/10 px-2 py-4 text-center last:border-r-0">
      {children}
    </div>
  );
}

function TableCell({
  children,
  center = false,
}: {
  children: React.ReactNode;
  center?: boolean;
}) {
  return (
    <div
      className={`flex items-center border-r border-[#e4dccd] px-2 py-4 ${
        center ? "justify-center text-center" : ""
      }`}
    >
      {children}
    </div>
  );
}

function Feature({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="flex items-center justify-center gap-3 border-r border-[#decba8] last:border-r-0">
      <span className="text-3xl text-[#b87916]">{icon}</span>

      <div className="text-sm">
        <p className="font-semibold">{title}</p>
        <p>{text}</p>
      </div>
    </div>
  );
}
