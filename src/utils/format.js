export function formatCurrency(value = 0) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(Number(value));
}

export function formatPercent(value = 0) {
  return `${Number(value).toFixed(2)}%`;
}

export function classNames(...vals) {
  return vals.filter(Boolean).join(" ");
}

