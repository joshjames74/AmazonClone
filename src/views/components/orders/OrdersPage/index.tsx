import { Box, Text } from "@chakra-ui/react";
import { UserContext } from "../../../contexts";
import { useContext } from "react";
import { Order, OrderItem } from "../../../../api/entities";
import ProductCardWide from "../../product/ProductCard/ProductCardWide";

export default function OrdersPage(): JSX.Element {
  const { orders } = useContext(UserContext);

  console.log(orders);

  const renderOrder = (orderView: {order: Order, orderItems: OrderItem[]}, key: number) => {

    const { order, orderItems } = orderView;
    
    const date = new Date(order.date)

    return (
      <Box
      key={key}
      display='flex'
      flexDirection='column'
      padding='5px'
      w='100vh'
      border='2px solid black'
      borderRadius='5px'>
        <Text
        fontWeight='500'>
          Order on {date.toLocaleDateString()} at {date.toLocaleTimeString()}
        </Text>
        <Text
        fontWeight='500'>
          Delivery to: {order.address.name}, {order.address.number} {order.address.street_name}
        </Text>
        {orderItems.map(item => {
          return (
            <Box
            display='flex'
            flexDirection='row'
            alignItems='center'>
              <ProductCardWide {...item.product}/>
              <Text paddingLeft='3px'>{item.quantity} x {order.currency.code} {item.price}</Text>
            </Box>
          )
        })}
      </Box>
    )
  }

  return (
    <>
      <Box>
        {orders?.length &&
          orders.map((order, index) => {
            return renderOrder(order, index);
          })}
      </Box>
    </>
  );
}
