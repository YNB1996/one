"use client";

import { useEffect, useState } from "react";

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [lang, setLang] = useState<"ar" | "fa">("ar");

  useEffect(() => {
    const s = localStorage.getItem("products");
    if (s) setProducts(JSON.parse(s));
    const l = localStorage.getItem("lang") as "ar" | "fa" | null;
    if (l) setLang(l);
  }, []);

  const t = (ar: string, fa: string) => (lang === "ar" ? ar : fa);

  const addProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return;
    const newProduct = { id: Date.now().toString(), name, price: Number(price) || 0 };
    const updated = [newProduct, ...products];
    setProducts(updated);
    localStorage.setItem("products", JSON.stringify(updated));
    setName("");
    setPrice("");
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <h2 className="text-2xl font-bold">{t("المنتجات", "محصولات")}</h2>

      <div className="bg-white p-6 rounded-2xl border">
        <h3 className="font-semibold mb-4">{t("إضافة منتج جديد", "افزودن محصول جدید")}</h3>
        <form onSubmit={addProduct} className="space-y-4">
          <div>
            <label className="block text-sm mb-1">{t("اسم المنتج", "نام محصول")}</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border rounded-xl px-4 py-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm mb-1">{t("سعر البيع", "قیمت فروش")}</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full border rounded-xl px-4 py-2"
            />
          </div>
          <button type="submit" className="bg-blue-700 text-white px-6 py-2 rounded-xl">
            {t("إضافة", "افزودن")}
          </button>
        </form>
      </div>

      <div className="bg-white rounded-2xl border">
        <div className="p-4 border-b font-semibold">
          {t("قائمة المنتجات", "لیست محصولات")} ({products.length})
        </div>
        {products.length === 0 ? (
          <div className="p-10 text-center text-slate-400">
            {t("لا توجد منتجات بعد", "هنوز محصولی وجود ندارد")}
          </div>
        ) : (
          <div className="divide-y">
            {products.map((p) => (
              <div key={p.id} className="p-4 flex justify-between items-center">
                <span className="font-medium">{p.name}</span>
                <span className="text-slate-600">{p.price}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
