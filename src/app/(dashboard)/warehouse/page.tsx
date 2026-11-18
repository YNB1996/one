"use client";

import { useEffect, useState } from "react";

export default function WarehousePage() {
  const [lang, setLang] = useState<"ar" | "fa">("ar");
  const [productName, setProductName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [type, setType] = useState("in");

  useEffect(() => {
    const l = localStorage.getItem("lang") as "ar" | "fa" | null;
    if (l) setLang(l);
  }, []);

  const t = (ar: string, fa: string) => (lang === "ar" ? ar : fa);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    alert(t("تم تسجيل الحركة", "حرکت ثبت شد"));
    setProductName("");
    setQuantity("");
  };

  return (
    <div className="max-w-3xl space-y-6">
      <h2 className="text-2xl font-bold">{t("المستودع", "انبار")}</h2>
      <p className="text-slate-500">{t("تسجيل حركة المخزون", "ثبت حرکت موجودی")}</p>

      <div className="bg-white p-6 rounded-2xl border">
        <h3 className="font-semibold mb-4">{t("حركة جديدة", "حرکت جدید")}</h3>
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-sm mb-1">{t("اسم المنتج", "نام محصول")}</label>
            <input value={productName} onChange={e => setProductName(e.target.value)} className="w-full border rounded-xl px-4 py-2" required />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm mb-1">{t("النوع", "نوع")}</label>
              <select value={type} onChange={e => setType(e.target.value)} className="w-full border rounded-xl px-4 py-2">
                <option value="in">{t("وارد", "ورود")}</option>
                <option value="out">{t("صادر", "خروج")}</option>
              </select>
            </div>
            <div>
              <label className="block text-sm mb-1">{t("الكمية", "تعداد")}</label>
              <input type="number" value={quantity} onChange={e => setQuantity(e.target.value)} className="w-full border rounded-xl px-4 py-2" required />
            </div>
          </div>
          <button type="submit" className="bg-emerald-600 text-white px-6 py-2 rounded-xl">
            {t("تسجيل", "ثبت")}
          </button>
        </form>
      </div>
    </div>
  );
}
