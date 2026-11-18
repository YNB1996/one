"use client";

import { useEffect, useState } from "react";

export default function ReturnsPage() {
  const [lang, setLang] = useState<"ar" | "fa">("ar");
  const [product, setProduct] = useState("");
  const [quantity, setQuantity] = useState("1");
  const [customer, setCustomer] = useState("");

  useEffect(() => {
    const l = localStorage.getItem("lang") as "ar" | "fa" | null;
    if (l) setLang(l);
  }, []);

  const t = (ar: string, fa: string) => (lang === "ar" ? ar : fa);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    alert(t("تم تسجيل الترجيع", "مرجوعی ثبت شد"));
    setProduct(""); setQuantity("1"); setCustomer("");
  };

  return (
    <div className="max-w-3xl space-y-6">
      <h2 className="text-2xl font-bold">{t("ترجيع المبيعات", "مرجوعی فروش")}</h2>
      <div className="bg-white p-6 rounded-2xl border">
        <h3 className="font-semibold mb-4">{t("تسجيل ترجيع", "ثبت مرجوعی")}</h3>
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-sm mb-1">{t("اسم المنتج", "نام محصول")}</label>
            <input value={product} onChange={e => setProduct(e.target.value)} className="w-full border rounded-xl px-4 py-2" required />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm mb-1">{t("الكمية", "تعداد")}</label>
              <input type="number" value={quantity} onChange={e => setQuantity(e.target.value)} className="w-full border rounded-xl px-4 py-2" min="1" />
            </div>
            <div>
              <label className="block text-sm mb-1">{t("اسم العميل", "نام مشتری")}</label>
              <input value={customer} onChange={e => setCustomer(e.target.value)} className="w-full border rounded-xl px-4 py-2" />
            </div>
          </div>
          <button type="submit" className="bg-orange-500 text-white px-6 py-2 rounded-xl">{t("تسجيل", "ثبت")}</button>
        </form>
      </div>
    </div>
  );
}
