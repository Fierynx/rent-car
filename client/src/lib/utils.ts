export const formatToRupiah = (amount?: number | string) => {
  const formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  });

  if (!amount) return undefined;

  return formatter.format(
    typeof amount === "string" ? parseFloat(amount.replace(/\./g, "")) : amount
  );
};