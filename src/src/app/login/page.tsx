"use client";

import React, { useState } from "react";
import { IoDiamond } from "react-icons/io5";
import { MdOutlineMailOutline } from "react-icons/md";
import { CiLock } from "react-icons/ci";
import { GoShieldCheck } from "react-icons/go";

const EyeIcon = ({ open }: { open: boolean }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    className="h-4.5 w-4.5"
  >
    {open ? (
      <>
        <path d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z" />
        <circle cx="12" cy="12" r="2.5" />
      </>
    ) : (
      <>
        <path d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z" />
        <circle cx="12" cy="12" r="2.5" />
        <path d="m4 4 16 16" />
      </>
    )}
  </svg>
);

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          email,
          password,
          rememberMe,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Login failed");
      }

      if (data.success) {
        window.location.href = "/dashboard";
        return;
      }

      setError(data.message || "Invalid credentials");
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Network error. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen h-screen overflow-y-auto text-slate-900 flex items-center justify-center p-4">
      <div className="mx-auto flex max-h-[640px] w-full max-w-4xl overflow-hidden bg-white shadow-2xl lg:rounded-[2px]">
        <section className="relative hidden w-[48%] overflow-hidden bg-[#020a15] text-white lg:block">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: "url('/banner.png')",
            }}
          />

          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(1,8,18,0.30),rgba(1,8,18,0.72))]" />

          <div className="absolute -left-20 top-0 h-64 w-64 rounded-full bg-blue-500/10 blur-[90px]" />

          <div className="relative z-10 flex h-full flex-col px-8 py-8">
            <div className="flex flex-col items-center justify-center">
              <IoDiamond size={70} color="#D99A36" />

              <h1 className="mt-0 font-serif text-[30px] tracking-[0.16em] text-[#d99a36]">
                LUXORA
              </h1>

              <p className="mt-0 text-[12px] font-medium tracking-[0.24em] text-[#e0a445]">
                JEWELLERY CRM
              </p>
            </div>

            {/* Welcome */}
            <div className="mt-auto mb-[48%] flex flex-col items-center justify-center">
              <h2 className="font-serif text-[25px] leading-tight text-white">
                Welcome to Luxora CRM
              </h2>

              <p className="mt-2 max-w-[330px] text-[14px] leading-6 text-white/75">
                Manage your jewellery business with elegance
                <br />
                and efficiency.
              </p>
            </div>

            {/* Security Card */}
            <div className="absolute bottom-7 left-8 right-8 rounded-lg border border-[#c68a2e] bg-[#06101e]/75 px-4 py-3 backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <div className="shrink-0 text-[#d99a36]">
                  <GoShieldCheck size={20} />
                </div>

                <div>
                  <p className="text-[13px] leading-5 text-white">
                    Secure. Reliable.{" "}
                    <span className="text-[#d99a36]">
                      Designed for your growth.
                    </span>
                  </p>

                  <p className="mt-0.5 text-xs text-white/70">
                    Your data is safe with us.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="flex flex-1 items-center justify-center bg-[#fafafa] px-4 py-5 sm:px-6 lg:px-8">
          <div className="w-full max-w-[500px]">
            <div className="rounded-xl border border-[#e8e8e8] bg-white px-6 py-7 shadow-[0_6px_24px_rgba(0,0,0,0.05)] sm:px-8 sm:py-8">
              <div className="text-center">
                <h2 className="font-serif text-[30px] font-semibold text-[#080808] sm:text-[32px]">
                  Welcome Back
                </h2>

                <p className="mt-1 text-[14px] text-[#7c8088]">
                  Sign in to continue to your account
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-[13px] font-medium text-[#292929]"
                  >
                    Email Address
                  </label>

                  <div className="relative">
                    <div className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#737984]">
                      <MdOutlineMailOutline size={20} />
                    </div>

                    <input
                      id="email"
                      type="email"
                      required
                      autoComplete="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="h-[46px] w-full rounded-lg border border-[#dedfe2] bg-white pl-11 pr-4 text-[14px] text-[#222] outline-none transition placeholder:text-[#969aa2] focus:border-[#c58b32] focus:ring-2 focus:ring-[#c58b32]/10"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="mb-2 block text-[13px] font-medium text-[#292929]"
                  >
                    Password
                  </label>

                  <div className="relative">
                    <div className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#737984]">
                      <CiLock size={20} />
                    </div>

                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      required
                      autoComplete="current-password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="h-[46px] w-full rounded-lg border border-[#dedfe2] bg-white pl-11 pr-11 text-[14px] text-[#222] outline-none transition placeholder:text-[#969aa2] focus:border-[#c58b32] focus:ring-2 focus:ring-[#c58b32]/10"
                    />

                    <button
                      type="button"
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#737984] transition hover:text-[#bd822d]"
                    >
                      <EyeIcon open={showPassword} />
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-3">
                  <label className="flex cursor-pointer items-center gap-2">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="h-4 w-4 cursor-pointer appearance-none rounded border border-[#bfc1c5] bg-white checked:border-[#c58b32] checked:bg-[#c58b32] focus:ring-2 focus:ring-[#c58b32]/20"
                    />

                    <span className="text-[13px] text-[#6d7076]">
                      Remember me
                    </span>
                  </label>

                  <button
                    type="button"
                    className="text-[13px] font-medium text-[#bd822d] transition hover:text-[#94621e]"
                    onClick={() => {
                      // Add forgot password navigation here
                    }}
                  >
                    Forgot Password?
                  </button>
                </div>

                {error && (
                  <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-600">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="h-[48px] w-full cursor-pointer rounded-lg bg-gradient-to-r from-[#c78b32] to-[#b97c24] text-[15px] font-semibold text-white shadow-[0_5px_15px_rgba(180,120,35,0.18)] transition duration-200 hover:from-[#b97b24] hover:to-[#a86d1c] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {loading ? "Signing In..." : "Sign In"}
                </button>
              </form>
            </div>

            <div className="mt-4 flex items-center justify-center gap-2 text-center text-[11px] text-[#777b82]">
              <span className="text-[#bd822d]">
                <GoShieldCheck size={20} />
              </span>

              <span>
                © {new Date().getFullYear()} Luxora Jewellery CRM. All rights
                reserved.
              </span>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default LoginPage;
