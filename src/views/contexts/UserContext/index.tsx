import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { idToNumber } from "../../../api/utils/queryTransformer";
import {
  getAddressesByUserId,
  getBasketViewByUserId,
  getUserById,
} from "../../../api/helpers/requests/user";
import {
  User,
  Address,
  Product,
  BasketItem,
  OrderItem,
  Order,
} from "../../../api/entities";
import { OrderView } from "../../../api/entities/OrderView";
import { getOrderViewByUserId } from "../../../api/helpers/requests/order";

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
  orders: {order: Order, orderItems: OrderItem[]}[];
  loading: boolean;
  reload: () => void;
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
  orders: null,
  loading: true,
  reload: null,
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
  const [orders, setOrders] = useState<{order: Order, orderItems: OrderItem[]}[]>();

  const fetchData = () => {
    if (!id) {
      return;
    }
    const idNumeric = idToNumber(id);

    getUserById(idNumeric).then((value: User) => setUser(value));
    getAddressesByUserId(idNumeric).then((value: Address[]) => {
      setAddresses(value);
    });
    getBasketViewByUserId(idNumeric).then((value: BasketItem[]) =>
      setBasket(value)
    );
    getOrderViewByUserId(idNumeric).then((value) => {
      setOrders(value)
    });
    setLoading(false);  
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  useEffect(() => {
    if (!basket.length) {
      return;
    }
    setBasketCount(basket.length);
  }, [basket]);

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
        orders: orders,
        reload: fetchData,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
