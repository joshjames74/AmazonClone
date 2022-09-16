import { AddressType } from "../Address";
import { CurrencyCode } from "../Currency";

export type UserInfo = {
  userId: number;
  firstName: string;
  userName: string;
  title?: string;
  addresses: AddressType[];
  countryCode: string;
  currencyCode: CurrencyCode;
  imageURL?: string;
};
