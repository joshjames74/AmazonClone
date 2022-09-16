import { AddressType } from "../../../../../types";

export type DeliveryButtonType = {
  name: string;
  loggedIn: boolean;
  addresses?: AddressType[];
  countryCode: string;
};
