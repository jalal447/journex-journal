export default function Select({ label, options = [], ...props }) {
  return (
    <label className="mb-3 block">
      {label ? <span className="mb-1 block text-xs text-white/70">{label}</span> : null}
      <select
        className="w-full rounded-xl border border-white/15 bg-black/40 px-3 py-2 text-sm text-white outline-none ring-jx-blue transition focus:ring-2"
        {...props}
      >
        {options.map((opt) => (
          <option className="bg-jx-black" key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </label>
  );
}

