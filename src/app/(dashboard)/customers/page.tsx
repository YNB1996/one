"use client";

import { useEffect, useState } from "react";

export default function CustomersPage() {
  const [lang, setLang] = useState<"ar" | "fa">("ar");
  const [customers, setCustomers] = useState<any[]>([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    const s = localStorage.getItem("customers");
    if (s) setCustomers(JSON.parse(s));
    const l = localStorage.getItem("lang") as "ar" | "fa" | null;
    if (l) setLang(l);
  }, []);

  const t = (ar: string, fa: string) => (lang === "ar" ? ar : fa);

  const add = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return;
    const updated = [{ id: Date.now().toString(), name, phone }, ...customers];
    setCustomers(updated);
    localStorage.setItem("customers", JSON.stringify(updated));
    setName(""); setPhone("");
  };

  return (
    <div className="max-w-3xl space-y-6">
      <h2 className="text-2xl font-bold">{t("العملاء", "مشتریان")}</h2>
      <div className="bg-white p-6 rounded-2xl border">
        <h3 className="font-semibold mb-4">{t("إضافة عميل", "افزودن مشتری")}</h3>
        <form onSubmit={add} className="space-y-4">
          <div>
            <label className="block text-sm mb-1">{t("الاسم", "نام")}</label>
            <input value={name} onChange={e => setName(e.target.value)} className="w-full border rounded-xl px-4 py-2" required />
          </div>
          <div>
            <label className="block text-sm mb-1">{t("الهاتف", "تلفن")}</label>
            <input value={phone} onChange={e => setPhone(e.target.value)} className="w-full border rounded-xl px-4 py-2" />
          </div>
          <button type="submit" className="bg-blue-700 text-white px-6 py-2 rounded-xl">{t("إضافة", "افزودن")}</button>
        </form>
      </div>
      <div className="bg-white rounded-2xl border">
        <div className="p-4 border-b font-semibold">{t("قائمة العملاء", "لیست مشتریان")} ({customers.length})</div>
        {customers.length === 0 ? (
          <div className="p-10 text-center text-slate-400">{t("لا يوجد عملاء", "مشتری وجود ندارد")}</div>
        ) : (
          <div className="divide-y">
            {customers.map(c => (
              <div key={c.id} className="p-4 flex justify-between">
                <span className="font-medium">{c.name}</span>
                <span className="text-slate-500">{c.phone || "-"}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
