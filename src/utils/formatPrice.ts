const formatPrice = (price: number) => {
  return Intl.NumberFormat("pt-br", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price);
};

export default formatPrice;
