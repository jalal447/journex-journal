export default function Input({ label, error, ...props }) {
  return (
    <label className="mb-3 block">
      {label ? <span className="mb-1 block text-xs text-white/70">{label}</span> : null}
      <input
        className="w-full rounded-xl border border-white/15 bg-black/40 px-3 py-2 text-sm text-white outline-none ring-jx-blue transition focus:ring-2"
        {...props}
      />
      {error ? <span className="mt-1 block text-xs text-jx-red">{error}</span> : null}
    </label>
  );
}

