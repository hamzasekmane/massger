export function formatPrice(
  amount: number | string,
  currency: string = "USD",
  locale: string = "en-US"
): string {
  const value = typeof amount === "string" ? parseFloat(amount) : amount;
  if (Number.isNaN(value)) return "—";
  try {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency,
      maximumFractionDigits: value % 1 === 0 ? 0 : 2,
    }).format(value);
  } catch {
    return `$${value.toFixed(2)}`;
  }
}

export function discountPercent(price: number, compareAt: number): number {
  if (!compareAt || compareAt <= price) return 0;
  return Math.round(((compareAt - price) / compareAt) * 100);
}
