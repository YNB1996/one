"use client";

import { useEffect, useState } from "react";
import BackButton from "@/components/BackButton";

interface ProductionRecord {
  id: string;
  productName: string;
  quantity: number;
  unit: string;
  notes: string;
  worker: string;
  date: string;
  time: string;
}

export default function ProductionPage() {
  const [records, setRecords] = useState<ProductionRecord[]>([]);
  const [productName, setProductName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [unit, setUnit] = useState("قطعة");
  const [notes, setNotes] = useState("");
  const [user, setUser] = useState<{ name: string; role: string } | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));

    const stored = localStorage.getItem("productionRecords");
    if (stored) setRecords(JSON.parse(stored));
  }, []);

  const saveRecords = (newRecords: ProductionRecord[]) => {
    setRecords(newRecords);
    localStorage.setItem("productionRecords", JSON.stringify(newRecords));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!productName || !quantity) return;

    const now = new Date();
    const newRecord: ProductionRecord = {
      id: Date.now().toString(),
      productName,
      quantity: Number(quantity),
      unit,
      notes,
      worker: user?.name || "عامل",
      date: now.toLocaleDateString("ar-EG"),
      time: now.toLocaleTimeString("ar-EG", { hour: "2-digit", minute: "2-digit" }),
    };

    saveRecords([newRecord, ...records]);
    setProductName("");
    setQuantity("");
    setNotes("");
  };

  const isWarehouse = user?.role === "warehouse";
  const isAdmin = user?.role === "admin";

  return (
    <div className="space-y-6">
      <BackButton label="رجوع للقائمة" />

      <div>
        <h2 className="text-2xl font-bold text-slate-800">تسجيل الإنتاج</h2>
        <p className="text-slate-500 mt-1">
          {isWarehouse
            ? "سجل المنتجات التي تم تصنيعها اليوم"
            : "سجل الإنتاج المسجل من قبل عمال المستودع"}
        </p>
      </div>

      {/* Form - only for warehouse workers */}
      {isWarehouse && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6">
          <h3 className="font-semibold text-slate-800 mb-4">إضافة إنتاج جديد</h3>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">اسم المنتج</label>
              <input
                type="text"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500"
                placeholder="مثال: أنبوب BVC 50mm"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">الكمية</label>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500"
                placeholder="0"
                min="1"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">الوحدة</label>
              <select
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500"
              >
                <option value="قطعة">قطعة</option>
                <option value="كرتون">كرتون</option>
                <option value="كيلو">كيلو</option>
                <option value="متر">متر</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-1">ملاحظات (اختياري)</label>
              <input
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500"
                placeholder="أي ملاحظات إضافية..."
              />
            </div>
            <div className="md:col-span-2">
              <button
                type="submit"
                className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-2.5 rounded-xl font-medium transition"
              >
                تسجيل الإنتاج
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Records Table */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200">
          <h3 className="font-semibold text-slate-800">
            {isWarehouse ? "سجلاتي اليوم" : "كل سجلات الإنتاج"}
          </h3>
        </div>
        {records.length === 0 ? (
          <div className="text-center py-12 text-slate-400">
            لا توجد سجلات إنتاج حتى الآن
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 text-slate-600">
                <tr>
                  <th className="px-4 py-3 text-right font-medium">التاريخ</th>
                  <th className="px-4 py-3 text-right font-medium">الوقت</th>
                  <th className="px-4 py-3 text-right font-medium">المنتج</th>
                  <th className="px-4 py-3 text-right font-medium">الكمية</th>
                  <th className="px-4 py-3 text-right font-medium">العامل</th>
                  <th className="px-4 py-3 text-right font-medium">ملاحظات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {records.map((r) => (
                  <tr key={r.id} className="hover:bg-slate-50">
                    <td className="px-4 py-3">{r.date}</td>
                    <td className="px-4 py-3">{r.time}</td>
                    <td className="px-4 py-3 font-medium">{r.productName}</td>
                    <td className="px-4 py-3">
                      {r.quantity} {r.unit}
                    </td>
                    <td className="px-4 py-3">{r.worker}</td>
                    <td className="px-4 py-3 text-slate-500">{r.notes || "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
