"use client";

import { useEffect, useState } from "react";

export default function PayrollPage() {
  const [lang, setLang] = useState<"ar" | "fa">("ar");
  const [employee, setEmployee] = useState("");
  const [amount, setAmount] = useState("");

  useEffect(() => {
    const l = localStorage.getItem("lang") as "ar" | "fa" | null;
    if (l) setLang(l);
  }, []);

  const t = (ar: string, fa: string) => (lang === "ar" ? ar : fa);

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    alert(t("تم صرف الراتب", "حقوق پرداخت شد"));
    setEmployee(""); setAmount("");
  };

  return (
    <div className="max-w-3xl space-y-6">
      <h2 className="text-2xl font-bold">{t("الرواتب", "حقوق")}</h2>
      <div className="bg-white p-6 rounded-2xl border">
        <h3 className="font-semibold mb-4">{t("صرف راتب", "پرداخت حقوق")}</h3>
        <form onSubmit={handlePay} className="space-y-4">
          <div>
            <label className="block text-sm mb-1">{t("اسم الموظف", "نام کارمند")}</label>
            <input value={employee} onChange={e => setEmployee(e.target.value)} className="w-full border rounded-xl px-4 py-2" required />
          </div>
          <div>
            <label className="block text-sm mb-1">{t("المبلغ", "مبلغ")}</label>
            <input type="number" value={amount} onChange={e => setAmount(e.target.value)} className="w-full border rounded-xl px-4 py-2" required />
          </div>
          <button type="submit" className="bg-emerald-600 text-white px-6 py-2 rounded-xl">{t("صرف", "پرداخت")}</button>
        </form>
      </div>
    </div>
  );
}
