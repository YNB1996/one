"use client";

import { useRouter } from "next/navigation";

export default function BackButton({ label = "رجوع للقائمة" }: { label?: string }) {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-blue-700 font-medium transition mb-4"
    >
      <span className="text-lg">←</span>
      {label}
    </button>
  );
}
