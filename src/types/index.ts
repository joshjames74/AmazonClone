import { UserType } from "./Auth";
import { CurrencyCode } from "./Currency";
import { AddressType } from "./Address";
import { ProductInfo } from "./ProductInfo";
import { UserInfo } from "./UserInfo";
import {
  Address,
  Basket,
  BasketItem,
  Currency,
  Country,
  Order,
  OrderItem,
  Product,
  Review,
  User,
} from "../api/entities/index";

export {
  UserType,
  CurrencyCode,
  type AddressType,
  type ProductInfo,
  type UserInfo,
};

export type Entity =
  | Address
  | Basket
  | BasketItem
  | Currency
  | Country
  | Order
  | OrderItem
  | Product
  | Review
  | User;
