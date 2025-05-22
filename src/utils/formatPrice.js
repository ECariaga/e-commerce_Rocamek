//Funcion para formatear el precio en pesos chilenos
const formatPrice = (price) => {
  return new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    minimumFractionDigits: 0, //Para no usar decimales
  }).format(price);
};

export default formatPrice;
