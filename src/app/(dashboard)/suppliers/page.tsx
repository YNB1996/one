"use client";

import { useEffect, useState } from "react";

export default function SuppliersPage() {
  const [lang, setLang] = useState<"ar" | "fa">("ar");
  const [items, setItems] = useState<any[]>([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    const s = localStorage.getItem("suppliers");
    if (s) setItems(JSON.parse(s));
    const l = localStorage.getItem("lang") as "ar" | "fa" | null;
    if (l) setLang(l);
  }, []);

  const t = (ar: string, fa: string) => (lang === "ar" ? ar : fa);

  const add = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return;
    const updated = [{ id: Date.now().toString(), name, phone }, ...items];
    setItems(updated);
    localStorage.setItem("suppliers", JSON.stringify(updated));
    setName(""); setPhone("");
  };

  return (
    <div className="max-w-3xl space-y-6">
      <h2 className="text-2xl font-bold">{t("الموردين", "تأمین‌کنندگان")}</h2>
      <div className="bg-white p-6 rounded-2xl border">
        <h3 className="font-semibold mb-4">{t("إضافة مورد", "افزودن تأمین‌کننده")}</h3>
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
        <div className="p-4 border-b font-semibold">{t("القائمة", "لیست")} ({items.length})</div>
        {items.length === 0 ? <div className="p-10 text-center text-slate-400">{t("لا يوجد موردين", "تأمین‌کننده‌ای نیست")}</div> : (
          <div className="divide-y">{items.map(i => <div key={i.id} className="p-4 flex justify-between"><span className="font-medium">{i.name}</span><span>{i.phone || "-"}</span></div>)}</div>
        )}
      </div>
    </div>
  );
}
