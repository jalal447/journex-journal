import { classNames } from "../../utils/format";

export default function Button({ children, className, variant = "primary", ...props }) {
  const styles = {
    primary: "bg-jx-blue text-jx-white hover:shadow-neon",
    success: "bg-jx-green text-jx-black hover:shadow-neon",
    danger: "bg-jx-red text-jx-white hover:shadow-neon",
    ghost: "bg-white/10 text-jx-white hover:bg-white/20",
  };
  return (
    <button
      className={classNames(
        "rounded-xl px-4 py-2 text-sm font-semibold transition-all duration-200",
        styles[variant],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

