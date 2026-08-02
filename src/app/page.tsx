"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("admin@gestcms.com");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPass, setShowPass] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!email.trim()) {
      setError("Please enter your email address.");
      return;
    }
    if (!password) {
      setError("Please enter your password.");
      return;
    }

    setLoading(true);
    // Simulate auth check
    await new Promise((r) => setTimeout(r, 1000));
    setLoading(false);

    router.push("/dashboard");
  }

  return (
    <div className="login-page">
      {/* Dynamic ambient glowing background orbs */}
      <div className="login-bg-orb login-bg-orb-1" />
      <div className="login-bg-orb login-bg-orb-2" />
      <div className="login-bg-orb login-bg-orb-3" />

      <div className="login-card">
        <h1 className="login-title text-center ">Welcome back</h1>
        <p className="login-subtitle text-center">
          Sign in to access your CMS admin panel
        </p>

        <form onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label className="form-label" htmlFor="email">
              Email address
            </label>
            <div className="form-input-wrapper">
              <span className="form-input-icon">✉️</span>
              <input
                id="email"
                type="email"
                className="form-input has-icon"
                placeholder="admin@gestcms.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                disabled={loading}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="password">
              Password
            </label>
            <div className="form-input-wrapper">
              <span className="form-input-icon">🔒</span>
              <input
                id="password"
                type={showPass ? "text" : "password"}
                className="form-input has-icon"
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                disabled={loading}
                style={{ paddingRight: "44px" }}
              />
              <button
                type="button"
                onClick={() => setShowPass((v) => !v)}
                style={{
                  position: "absolute",
                  right: "12px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "14px",
                  color: "var(--text-muted)",
                  padding: "0",
                }}
                title={showPass ? "Hide password" : "Show password"}
              >
                {showPass ? "🙈" : "👁️"}
              </button>
            </div>
          </div>

          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? (
              <>
                <span className="btn-spinner" />
                Authenticating...
              </>
            ) : (
              "Sign in"
            )}
          </button>

          {error && (
            <div
              style={{
                background: "rgba(239, 68, 68, 0.1)",
                border: "1px solid rgba(239, 68, 68, 0.3)",
                borderRadius: "8px",
                padding: "12px 14px",
                marginTop: "18px",
                fontSize: "13px",
                color: "#f87171",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <span>⚠️</span> {error}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
