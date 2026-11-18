export default function PlaceholderPage({ title }: { title: string }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-10 text-center">
      <div className="text-4xl mb-4">🚧</div>
      <h2 className="text-xl font-semibold text-slate-800 mb-2">{title}</h2>
      <p className="text-slate-500">
        هذه الصفحة قيد التطوير وسيتم بناؤها في الخطوات القادمة.
      </p>
      <p className="text-slate-400 text-sm mt-2">
        این صفحه در حال توسعه است و در مراحل بعدی ساخته خواهد شد.
      </p>
    </div>
  );
}
