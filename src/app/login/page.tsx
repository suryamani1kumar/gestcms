"use client";

import React, { useState } from "react";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
        body: JSON.stringify({ email, password }),
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
      <div className="w-full max-w-3xl max-h-[640px] bg-white shadow-xl rounded-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-2">
        <section className="relative hidden lg:block bg-gradient-to-br from-indigo-700 via-indigo-800 to-black text-white p-8">
          <div className="absolute inset-0 bg-[url('/banner.png')] bg-cover bg-center" />
        </section>

        <section className="p-6 sm:p-10">
          <div className="max-w-sm mx-auto">
            <h4 className="text-3xl font-bold mb-4">Booking CRM</h4>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-slate-700"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  autoComplete="email"
                  className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-indigo-500 focus:ring-indigo-500"
                  placeholder="alex@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-slate-700"
                >
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-indigo-500 focus:ring-indigo-500"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="inline-flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-indigo-600 border-slate-300"
                  />
                  <span className="text-slate-600">Remember me</span>
                </label>
              </div>

              <button
                type="submit"
                className="w-full rounded-xl bg-indigo-600 text-white py-2.5 font-semibold hover:bg-indigo-700 transition"
              >
                {loading ? "Logging in..." : "Login"}
              </button>
              {error && <p className="text-red-500 text-sm">{error}</p>}
            </form>
          </div>
        </section>
      </div>
    </main>
  );
};

export default LoginPage;
