export type OrderItemType = {
  productId: number;
  price: number;
  quantity: number;
};

export type OrderInfo = {
  orderId: number;
  userId: number;
  addressId: number;
  currencyId: number;
  date: Date;
  items: OrderItemType[];
};
