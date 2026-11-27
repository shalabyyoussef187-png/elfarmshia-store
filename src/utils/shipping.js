// Free delivery inside Port Said for orders of 300 EGP or more.
export const FREE_SHIPPING_MIN = 300;
export const FREE_SHIPPING_CITY = "Port Said";
export const isFreeShipping = (city, subtotal) =>
  city === FREE_SHIPPING_CITY && Number(subtotal) >= FREE_SHIPPING_MIN;
