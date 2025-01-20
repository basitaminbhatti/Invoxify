interface iAppProps {
  amount: number;
  currency: "USD" | "PKR";
}

export function formatCurrency({ amount, currency }: iAppProps) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 0, // Ensures no trailing zeros
    maximumFractionDigits: 2, // Allows up to two decimal places if needed
  }).format(amount);
}
