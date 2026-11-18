"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Temporary demo users (will be replaced with real auth later)
  const demoUsers = [
    { username: "admin", password: "123456", role: "admin", name: "المدير" },
    { username: "accountant", password: "123456", role: "accountant", name: "المحاسب" },
    { username: "sales", password: "123456", role: "sales", name: "المبيعات" },
    { username: "warehouse", password: "123456", role: "warehouse", name: "عامل المستودع" },
  ];

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const user = demoUsers.find(
      (u) => u.username === username && u.password === password
    );

    if (user) {
      // Store in localStorage for demo (later will use proper auth)
      localStorage.setItem(
        "user",
        JSON.stringify({
          username: user.username,
          role: user.role,
          name: user.name,
        })
      );
      router.push("/dashboard");
    } else {
      setError("اسم المستخدم أو كلمة المرور غير صحيحة");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 to-blue-50 p-4">
      <div className="w-full max-w-md">
        {/* Logo / Title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-700 text-white text-2xl font-bold mb-4 shadow-lg">
            BVC
          </div>
          <h1 className="text-2xl font-bold text-slate-800">نظام محاسبة المصنع</h1>
          <p className="text-slate-500 mt-1 text-sm">سیستم حسابداری کارخانه</p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-8">
          <h2 className="text-xl font-semibold text-slate-800 mb-6 text-center">
            تسجيل الدخول / ورود
          </h2>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                اسم المستخدم / نام کاربری
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                placeholder="admin"
                required
                dir="ltr"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                كلمة المرور / رمز عبور
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                placeholder="••••••"
                required
                dir="ltr"
              />
            </div>

            {error && (
              <div className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-700 hover:bg-blue-800 text-white font-medium py-2.5 rounded-xl transition shadow-md disabled:opacity-60"
            >
              {loading ? "جاري الدخول..." : "دخول / ورود"}
            </button>
          </form>

          {/* Demo credentials */}
          <div className="mt-6 pt-5 border-t border-slate-100">
            <p className="text-xs text-slate-500 text-center mb-2">
              حسابات تجريبية للاختبار:
            </p>
            <div className="text-xs text-slate-600 space-y-1 text-center">
              <div>
                <span className="font-medium">admin</span> / 123456 (مدير)
              </div>
              <div>
                <span className="font-medium">accountant</span> / 123456 (محاسب)
              </div>
              <div>
                <span className="font-medium">sales</span> / 123456 (مبيعات)
              </div>
              <div>
                <span className="font-medium">warehouse</span> / 123456 (عامل المستودع)
              </div>
            </div>
          </div>
        </div>

        <p className="text-center text-xs text-slate-400 mt-6">
          © 2026 نظام محاسبة المصنع - عربي / فارسي
        </p>
      </div>
    </div>
  );
}
