export const toCurrency = (input: number) => {
  const currency = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "PHP",
    minimumFractionDigits: 2,
  })
    .format(input)
    .replace("₱", "Php ");

  return currency;
};

export const convertToNextNearesttHundred = (num: number) => {
  const remainder = num % 100;
  return remainder === 0 ? num : num + (100 - remainder);
};
