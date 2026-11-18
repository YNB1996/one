"use client";

import { useEffect, useState } from "react";

export default function SellersPage() {
  const [lang, setLang] = useState<"ar" | "fa">("ar");
  const [sellers, setSellers] = useState<any[]>([]);
  const [name, setName] = useState("");

  useEffect(() => {
    const s = localStorage.getItem("sellers");
    if (s) setSellers(JSON.parse(s));
    const l = localStorage.getItem("lang") as "ar" | "fa" | null;
    if (l) setLang(l);
  }, []);

  const t = (ar: string, fa: string) => (lang === "ar" ? ar : fa);

  const add = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return;
    const updated = [{ id: Date.now().toString(), name }, ...sellers];
    setSellers(updated);
    localStorage.setItem("sellers", JSON.stringify(updated));
    setName("");
  };

  return (
    <div className="max-w-3xl space-y-6">
      <h2 className="text-2xl font-bold">{t("البائعين", "فروشندگان")}</h2>
      <div className="bg-white p-6 rounded-2xl border">
        <form onSubmit={add} className="flex gap-3">
          <input value={name} onChange={e => setName(e.target.value)} placeholder={t("اسم البائع", "نام فروشنده")} className="flex-1 border rounded-xl px-4 py-2" required />
          <button type="submit" className="bg-blue-700 text-white px-6 py-2 rounded-xl">{t("إضافة", "افزودن")}</button>
        </form>
      </div>
      <div className="bg-white rounded-2xl border">
        <div className="p-4 border-b font-semibold">{t("القائمة", "لیست")} ({sellers.length})</div>
        {sellers.length === 0 ? <div className="p-10 text-center text-slate-400">{t("لا يوجد بائعين", "فروشنده‌ای نیست")}</div> : (
          <div className="divide-y">{sellers.map(s => <div key={s.id} className="p-4 font-medium">{s.name}</div>)}</div>
        )}
      </div>
    </div>
  );
}
