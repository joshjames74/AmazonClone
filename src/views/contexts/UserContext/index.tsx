import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { idToNumber } from "../../../api/utils/queryTransformer";
import {
  getAddressesByUserId,
  getBasketByUserId,
  getBasketViewByUserId,
  getUserById,
} from "../../../api/helpers/requests/user";
import { User, Address, Product, BasketItem } from "../../../api/entities";
import { BasketView } from "../../../api/entities/BasketView";
import Basket from "../../../pages/basket";

export const UserContext = React.createContext<{
  user: User;
  addresses: Address[];
  currentAddressIndex: number;
  currentAddress: Address;
  isLoggedIn: boolean;
  setCurrentAddressIndex: (index: number) => void;
  basketCount: number;
  basket: BasketItem[];
  addToBasket: (value: Product[]) => void;
  loading: boolean;
}>({
  user: new User(),
  addresses: [new Address()],
  currentAddressIndex: 0,
  currentAddress: new Address(),
  isLoggedIn: false,
  setCurrentAddressIndex: null,
  basketCount: 0,
  basket: [new BasketItem()],
  addToBasket: null,
  loading: true,
});

export const UserProvider = (props: { children?: JSX.Element }) => {
  const { children }: any = props;
  const router = useRouter();

  //const { id } = router.query;
  const id = "1";

  const [user, setUser] = useState<User>();
  const [addresses, setAddresses] = useState<Address[]>();
  const [currentAddressIndex, setCurrentAddressIndex] = useState<number>(0);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [currentAddress, setCurrentAddress] = useState<Address>();
  const [basket, setBasket] = useState<BasketItem[]>([] as BasketItem[]);
  const [basketCount, setBasketCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  // useEffect(() => {
  //     setCurrentAddress(userInfo.addresses[currentAddressIndex])
  // }, [currentAddressIndex])

  useEffect(() => {
    if (!id) {
      return;
    }
    const idNumeric = idToNumber(id);

    getUserById(idNumeric).then((value: User) => setUser(value));
    getAddressesByUserId(idNumeric).then((value: Address[]) => {
      setAddresses(value);
    });
    getBasketViewByUserId(idNumeric).then((value: BasketItem[]) => setBasket(value));
    setLoading(false);
    // getBasketByUserId(idNumeric).then((value: Product[]) => setBasket(value));
  }, [id]);

  useEffect(() => {
    setBasketCount(1);
    console.log(basket);
  }, [basket]);

  useEffect(() => {
    console.log(addresses);
  }, [addresses]);

  useEffect(() => {
    if (!addresses?.length || addresses.length <= currentAddressIndex) {
      return;
    }
    setCurrentAddress(addresses[currentAddressIndex]);
  }, [currentAddressIndex, addresses]);

  useEffect(() => {
    setIsLoggedIn(user ? true : false);
  }, [user]);

  const addToBasket = (values: Product[]): void => {
    setBasket(null);
  };

  return (
    <UserContext.Provider
      value={{
        user: user,
        loading: loading,
        addresses: addresses,
        currentAddressIndex: currentAddressIndex,
        currentAddress: currentAddress,
        isLoggedIn: isLoggedIn,
        setCurrentAddressIndex: setCurrentAddressIndex,
        basketCount: basketCount,
        basket: basket,
        addToBasket: addToBasket,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
