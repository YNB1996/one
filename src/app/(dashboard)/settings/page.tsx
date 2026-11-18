"use client";

import { useEffect, useState } from "react";

export default function SettingsPage() {
  const [lang, setLang] = useState<"ar" | "fa">("ar");
  const [companyName, setCompanyName] = useState("BVC Factory");

  useEffect(() => {
    const l = localStorage.getItem("lang") as "ar" | "fa" | null;
    if (l) setLang(l);
    const s = localStorage.getItem("companyName");
    if (s) setCompanyName(s);
  }, []);

  const t = (ar: string, fa: string) => (lang === "ar" ? ar : fa);

  const save = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("companyName", companyName);
    alert(t("تم الحفظ", "ذخیره شد"));
  };

  return (
    <div className="max-w-xl space-y-6">
      <h2 className="text-2xl font-bold">{t("الإعدادات", "تنظیمات")}</h2>
      <div className="bg-white p-6 rounded-2xl border">
        <form onSubmit={save} className="space-y-4">
          <div>
            <label className="block text-sm mb-1">{t("اسم الشركة", "نام شرکت")}</label>
            <input value={companyName} onChange={e => setCompanyName(e.target.value)} className="w-full border rounded-xl px-4 py-2" />
          </div>
          <button type="submit" className="bg-blue-700 text-white px-6 py-2 rounded-xl">{t("حفظ", "ذخیره")}</button>
        </form>
      </div>
    </div>
  );
}
