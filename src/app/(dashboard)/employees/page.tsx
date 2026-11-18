"use client";

import { useEffect, useState } from "react";

export default function EmployeesPage() {
  const [lang, setLang] = useState<"ar" | "fa">("ar");
  const [employees, setEmployees] = useState<any[]>([]);
  const [name, setName] = useState("");
  const [salary, setSalary] = useState("");

  useEffect(() => {
    const s = localStorage.getItem("employees");
    if (s) setEmployees(JSON.parse(s));
    const l = localStorage.getItem("lang") as "ar" | "fa" | null;
    if (l) setLang(l);
  }, []);

  const t = (ar: string, fa: string) => (lang === "ar" ? ar : fa);

  const add = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return;
    const updated = [{ id: Date.now().toString(), name, salary: Number(salary) || 0 }, ...employees];
    setEmployees(updated);
    localStorage.setItem("employees", JSON.stringify(updated));
    setName(""); setSalary("");
  };

  return (
    <div className="max-w-3xl space-y-6">
      <h2 className="text-2xl font-bold">{t("الموظفين", "کارمندان")}</h2>
      <div className="bg-white p-6 rounded-2xl border">
        <h3 className="font-semibold mb-4">{t("إضافة موظف", "افزودن کارمند")}</h3>
        <form onSubmit={add} className="space-y-4">
          <div>
            <label className="block text-sm mb-1">{t("الاسم", "نام")}</label>
            <input value={name} onChange={e => setName(e.target.value)} className="w-full border rounded-xl px-4 py-2" required />
          </div>
          <div>
            <label className="block text-sm mb-1">{t("الراتب", "حقوق")}</label>
            <input type="number" value={salary} onChange={e => setSalary(e.target.value)} className="w-full border rounded-xl px-4 py-2" />
          </div>
          <button type="submit" className="bg-blue-700 text-white px-6 py-2 rounded-xl">{t("إضافة", "افزودن")}</button>
        </form>
      </div>
      <div className="bg-white rounded-2xl border">
        <div className="p-4 border-b font-semibold">{t("القائمة", "لیست")} ({employees.length})</div>
        {employees.length === 0 ? <div className="p-10 text-center text-slate-400">{t("لا يوجد موظفين", "کارمندی نیست")}</div> : (
          <div className="divide-y">{employees.map(e => <div key={e.id} className="p-4 flex justify-between"><span className="font-medium">{e.name}</span><span>{e.salary}</span></div>)}</div>
        )}
      </div>
    </div>
  );
}
