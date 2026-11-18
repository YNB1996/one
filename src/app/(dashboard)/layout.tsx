"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";

const menu = [
  { href: "/dashboard", ar: "اللوحة الرئيسية", fa: "داشبورد", icon: "📊", roles: ["admin","accountant","sales","warehouse"] },
  { href: "/products", ar: "المنتجات", fa: "محصولات", icon: "📦", roles: ["admin","accountant"] },
  { href: "/warehouse", ar: "المستودع", fa: "انبار", icon: "🏭", roles: ["admin","accountant","warehouse"] },
  { href: "/production", ar: "تسجيل الإنتاج", fa: "ثبت تولید", icon: "⚙️", roles: ["warehouse","admin"] },
  { href: "/sales", ar: "فواتير البيع", fa: "فاکتور فروش", icon: "🧾", roles: ["admin","accountant","sales"] },
  { href: "/returns", ar: "ترجيع المبيعات", fa: "مرجوعی", icon: "↩️", roles: ["admin","accountant","sales"] },
  { href: "/purchases", ar: "فواتير الشراء", fa: "فاکتور خرید", icon: "🛒", roles: ["admin","accountant"] },
  { href: "/customers", ar: "العملاء", fa: "مشتریان", icon: "👥", roles: ["admin","accountant","sales"] },
  { href: "/suppliers", ar: "الموردين", fa: "تأمین‌کنندگان", icon: "🏢", roles: ["admin","accountant"] },
  { href: "/sellers", ar: "البائعين", fa: "فروشندگان", icon: "🧑‍💼", roles: ["admin","accountant","sales"] },
  { href: "/employees", ar: "الموظفين", fa: "کارمندان", icon: "👷", roles: ["admin","accountant"] },
  { href: "/payroll", ar: "الرواتب", fa: "حقوق", icon: "💰", roles: ["admin","accountant"] },
  { href: "/reports", ar: "التقارير", fa: "گزارش‌ها", icon: "📈", roles: ["admin","accountant"] },
  { href: "/settings", ar: "الإعدادات", fa: "تنظیمات", icon: "⚙️", roles: ["admin"] },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<any>(null);
  const [lang, setLang] = useState<"ar" | "fa">("ar");

  useEffect(() => {
    const u = localStorage.getItem("user");
    if (!u) { router.push("/login"); return; }
    setUser(JSON.parse(u));
    const l = localStorage.getItem("lang") as "ar" | "fa" | null;
    if (l) setLang(l);
  }, [router]);

  const changeLang = (l: "ar" | "fa") => {
    setLang(l);
    localStorage.setItem("lang", l);
    window.location.reload();
  };

  if (!user) return <div className="min-h-screen flex items-center justify-center">جاري التحميل...</div>;

  return (
    <div className="min-h-screen flex bg-slate-50" dir="rtl">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col fixed h-full">
        <div className="p-4 text-xl font-bold border-b border-slate-700">BVC Factory</div>
        <nav className="flex-1 overflow-y-auto p-3 space-y-1">
          {menu.filter(m => m.roles.includes(user.role)).map(item => (
            <Link key={item.href} href={item.href}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm ${pathname === item.href ? "bg-blue-600" : "hover:bg-slate-800"}`}>
              <span>{item.icon}</span>
              <span>{lang === "ar" ? item.ar : item.fa}</span>
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-slate-700">
          <div className="text-sm mb-2">{user.name}</div>
          <button onClick={() => { localStorage.removeItem("user"); router.push("/login"); }}
            className="w-full bg-red-600 py-2 rounded-lg text-sm">
            {lang === "ar" ? "تسجيل الخروج" : "خروج"}
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 mr-64">
        <header className="h-16 bg-white border-b flex items-center justify-between px-6 sticky top-0 z-10">
          <h1 className="font-semibold text-lg">
            {lang === "ar" ? "نظام محاسبة المصنع" : "سیستم حسابداری کارخانه"}
          </h1>
          <div className="flex gap-1 bg-slate-100 p-1 rounded-lg">
            <button onClick={() => changeLang("ar")}
              className={`px-4 py-1.5 rounded-md text-sm ${lang === "ar" ? "bg-white shadow font-medium" : ""}`}>
              عربي
            </button>
            <button onClick={() => changeLang("fa")}
              className={`px-4 py-1.5 rounded-md text-sm ${lang === "fa" ? "bg-white shadow font-medium" : ""}`}>
              فارسی
            </button>
          </div>
        </header>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}
