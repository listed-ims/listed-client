export const toCurrency = (input: number) => {
  const currency = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "PHP",
    minimumFractionDigits: 2,
  }).format(input).replace("₱", "Php ");

  return currency;
};