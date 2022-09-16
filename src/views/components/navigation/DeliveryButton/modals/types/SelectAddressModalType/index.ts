import { AddressType } from "../../../../../../../types";

export type SelectAddressModalType = {
    hidden: boolean;
    addresses: AddressType[]
    currentAddressIndex: number;
}