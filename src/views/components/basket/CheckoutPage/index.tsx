import { useContext, useState } from "react";
import { ThemeContext, UserContext } from "../../../contexts";
import { Box, Select, Button, Text } from "@chakra-ui/react";
import Navigation from "../../navigation";
import { Address } from "../../../../data-source";
import { BasketItem, Order, OrderItem } from "../../../../api/entities";
import { postOrder } from "../../../../api/helpers/requests/order";
import { emptyBasket } from "../../../../api/helpers/requests/basket";
import { useRouter } from "next/router";

interface DeliveryOptionType {
  id: number;
  name: string;
  speed: string;
  price: number;
}

export default function CheckoutPage() {
  const { basket, user, currentAddress } = useContext(UserContext);

  const [deliveryMethod, setDeliveryMethod] = useState<number>(1);
  const router = useRouter();

  const deliveryOptions: DeliveryOptionType[] = [
    {
      id: 1,
      name: "Standard",
      speed: "3-5 business days",
      price: 3.5,
    },
    {
      id: 2,
      name: "Premium",
      speed: "next day",
      price: 6,
    },
  ];

  const getDeliveryOption = (id: number): DeliveryOptionType => {
    return deliveryOptions.filter((value) => value.id === id)[0];
  };

  const renderAddress = (address: Address) => {
    return (
      <Box display="flex" flexDirection="column">
        <Box>{address.name}</Box>
        <Box>{`${address.number} ${address.street_name}`}</Box>
        <Box>{`${address.county}`}</Box>
        <Box>{`${address.postcode}`}</Box>
      </Box>
    );
  };

  const renderRow = (headings: any[]) => {
    return (
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="space-evenly"
        w="100%"
      >
        {headings.map((value) => {
          return (
            <Box w="25%" textAlign="center" border="1px solid gray">
              {value}
            </Box>
          );
        })}
      </Box>
    );
  };

  const renderBasketProducts = (basket: BasketItem[]): JSX.Element => {
    const deliveryOption = getDeliveryOption(deliveryMethod);

    return (
      <Box>
        {basket.map((item) => {
          const headings = [
            item.product.title,
            item.quantity,
            item.product.price,
            item.product.price * item.quantity,
          ];
          return renderRow(headings);
        })}
        {deliveryOption &&
          renderRow([
            deliveryOption.name,
            1,
            deliveryOption.price,
            deliveryOption.price,
          ])}
      </Box>
    );
  };

  const getBasketTotal = (): number => {
    const itemsTotal = basket.reduce(
      (partial, item) => partial + item.quantity * item.product.price,
      0
    );
    return (
      deliveryMethod && itemsTotal + getDeliveryOption(deliveryMethod).price
    );
  };

  const handleChange = (option) => {
    setDeliveryMethod(parseInt(option.target.value));
  };

  const renderSelectDelivery = (): JSX.Element => {
    return (
      <Select fontWeight="350" onChange={(option) => handleChange(option)}>
        {deliveryOptions.map((option) => {
          return (
            <option value={option.id}>
              {option.name} ({option.speed}): £{option.price}
            </option>
          );
        })}
      </Select>
    );
  };

  const handleBuy = () => {
    const order = new Order();
    order.user = user;
    order.address = currentAddress;
    order.currency = user.currency;
    order.date = new Date();
    const orderItems = basket.map((item) => {
      const orderItem = new OrderItem();
      orderItem.order = order;
      orderItem.price = item.product.price;
      orderItem.product = item.product;
      orderItem.quantity = item.quantity;
      return orderItem;
    });
    postOrder(order, orderItems).then((res) => {
      emptyBasket(user.user_id).then(res => console.log(res));
      router.replace(`http://localhost:3000/user/${user.user_id}/orders`)
    });
  };

  return (
    <Box display="flex" flexDirection="row" w="100%" margin="3px">
      <Box display="flex" flexDirection="column" w="85vh">
        <Box
          display="flex"
          flexDirection="column"
          w="100%"
          border="2px solid teal"
          borderBottom="none"
          padding="5px"
        >
          <Text fontWeight="500">Delivery Address</Text>
          <Box fontWeight="350" lineHeight="20px">
            {currentAddress ? renderAddress(currentAddress) : ""}
          </Box>
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          w="100%"
          border="2px solid teal"
          borderBottom="none"
          padding="5px"
        >
          <Text fontWeight="500">Select Delivery</Text>
          {renderSelectDelivery()}
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          w="100%"
          border="2px solid teal"
          padding="5px"
        >
          <Text fontWeight="500">Order Summary</Text>
          <Box fontWeight="500">
            {renderRow(["Name", "Quantity", "Price", "Total"])}
          </Box>
          {renderBasketProducts(basket)}
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            border="2px solid black"
          >
            <Box w="25%" textAlign="center">
              Total
            </Box>
            <Box w="25%" textAlign="center">
              {getBasketTotal()}
            </Box>
          </Box>
        </Box>
        <Button onClick={() => handleBuy()}>Buy Now</Button>
      </Box>
    </Box>
  );
}
