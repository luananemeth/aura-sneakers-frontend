const formatPrice = (price: number) => {
  return Intl.NumberFormat("pt-br", {
    style: "currency",
    currency: "BRL",
  }).format(price);
};

export default formatPrice;
