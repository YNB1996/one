"use client";

import { useEffect, useState } from "react";

export default function SalesPage() {
  const [lang, setLang] = useState<"ar" | "fa">("ar");
  const [customer, setCustomer] = useState("");
  const [product, setProduct] = useState("");
  const [quantity, setQuantity] = useState("1");

  useEffect(() => {
    const l = localStorage.getItem("lang") as "ar" | "fa" | null;
    if (l) setLang(l);
  }, []);

  const t = (ar: string, fa: string) => (lang === "ar" ? ar : fa);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    alert(t("تم حفظ الفاتورة", "فاکتور ذخیره شد"));
    setCustomer(""); setProduct(""); setQuantity("1");
  };

  return (
    <div className="max-w-3xl space-y-6">
      <h2 className="text-2xl font-bold">{t("فواتير البيع", "فاکتور فروش")}</h2>

      <div className="bg-white p-6 rounded-2xl border">
        <h3 className="font-semibold mb-4">{t("فاتورة جديدة", "فاکتور جدید")}</h3>
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-sm mb-1">{t("اسم العميل", "نام مشتری")}</label>
            <input value={customer} onChange={e => setCustomer(e.target.value)} className="w-full border rounded-xl px-4 py-2" required />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm mb-1">{t("المنتج", "محصول")}</label>
              <input value={product} onChange={e => setProduct(e.target.value)} className="w-full border rounded-xl px-4 py-2" required />
            </div>
            <div>
              <label className="block text-sm mb-1">{t("الكمية", "تعداد")}</label>
              <input type="number" value={quantity} onChange={e => setQuantity(e.target.value)} className="w-full border rounded-xl px-4 py-2" min="1" />
            </div>
          </div>
          <button type="submit" className="bg-blue-700 text-white px-6 py-2 rounded-xl">
            {t("حفظ الفاتورة", "ذخیره فاکتور")}
          </button>
        </form>
      </div>
    </div>
  );
}
