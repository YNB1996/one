"use client";

import { useEffect, useState } from "react";

export default function DashboardPage() {
  const [lang, setLang] = useState<"ar" | "fa">("ar");
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const u = localStorage.getItem("user");
    if (u) setUser(JSON.parse(u));
    const l = localStorage.getItem("lang") as "ar" | "fa" | null;
    if (l) setLang(l);
  }, []);

  const t = (ar: string, fa: string) => (lang === "ar" ? ar : fa);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">
          {t("مرحباً", "خوش آمدید")}
          {user ? `، ${user.name}` : ""}
        </h2>
        <p className="text-slate-500 mt-1">
          {t("لوحة التحكم الرئيسية لنظام محاسبة المصنع", "داشبورد اصلی سیستم حسابداری کارخانه")}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5">
          <div className="text-sm text-blue-700">{t("إجمالي المبيعات", "مجموع فروش")}</div>
          <div className="text-2xl font-bold mt-2">$ 0</div>
        </div>
        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5">
          <div className="text-sm text-emerald-700">{t("إجمالي المشتريات", "مجموع خرید")}</div>
          <div className="text-2xl font-bold mt-2">$ 0</div>
        </div>
        <div className="bg-violet-50 border border-violet-200 rounded-2xl p-5">
          <div className="text-sm text-violet-700">{t("فواتير اليوم", "فاکتورهای امروز")}</div>
          <div className="text-2xl font-bold mt-2">0</div>
        </div>
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
          <div className="text-sm text-amber-700">{t("منتجات منخفضة", "محصولات کم")}</div>
          <div className="text-2xl font-bold mt-2">0</div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border p-6">
        <h3 className="font-semibold mb-4">{t("إجراءات سريعة", "اقدامات سریع")}</h3>
        <div className="flex flex-wrap gap-3">
          <a href="/sales" className="bg-blue-700 text-white px-5 py-2.5 rounded-xl text-sm">
            {t("+ فاتورة بيع", "+ فاکتور فروش")}
          </a>
          <a href="/purchases" className="bg-emerald-600 text-white px-5 py-2.5 rounded-xl text-sm">
            {t("+ فاتورة شراء", "+ فاکتور خرید")}
          </a>
          <a href="/products" className="bg-slate-100 px-5 py-2.5 rounded-xl text-sm">
            {t("إدارة المنتجات", "مدیریت محصولات")}
          </a>
        </div>
      </div>
    </div>
  );
}
