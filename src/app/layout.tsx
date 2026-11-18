import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "نظام محاسبة المصنع | سیستم حسابداری کارخانه",
  description: "نظام محاسبة متكامل لمصنع التصنيع - عربي / فارسي",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl" className="h-full">
      <body className="min-h-full bg-[var(--background)] text-[var(--foreground)] antialiased">
        {children}
      </body>
    </html>
  );
}
