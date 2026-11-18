"use client";

import { useEffect, useState } from "react";

export default function ReportsPage() {
  const [lang, setLang] = useState<"ar" | "fa">("ar");

  useEffect(() => {
    const l = localStorage.getItem("lang") as "ar" | "fa" | null;
    if (l) setLang(l);
  }, []);

  const t = (ar: string, fa: string) => (lang === "ar" ? ar : fa);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">{t("التقارير", "گزارش‌ها")}</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-blue-50 border rounded-2xl p-5">
          <div className="text-sm">{t("المنتجات", "محصولات")}</div>
          <div className="text-2xl font-bold mt-2">0</div>
        </div>
        <div className="bg-emerald-50 border rounded-2xl p-5">
          <div className="text-sm">{t("العملاء", "مشتریان")}</div>
          <div className="text-2xl font-bold mt-2">0</div>
        </div>
        <div className="bg-violet-50 border rounded-2xl p-5">
          <div className="text-sm">{t("الفواتير", "فاکتورها")}</div>
          <div className="text-2xl font-bold mt-2">0</div>
        </div>
        <div className="bg-amber-50 border rounded-2xl p-5">
          <div className="text-sm">{t("الموظفين", "کارمندان")}</div>
          <div className="text-2xl font-bold mt-2">0</div>
        </div>
      </div>
    </div>
  );
}
