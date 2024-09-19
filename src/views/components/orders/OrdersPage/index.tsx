import { Box } from "@chakra-ui/react";
import { UserContext } from "../../../contexts";
import { useContext } from "react";
import OrderCard from "../OrderCard";
import styles from "./index.module.css";

export default function OrdersPage(): JSX.Element {

  // fetch order and render
  const { orders } = useContext(UserContext);
  const renderOrders = () => orders.map(
    (order, index) => <OrderCard orderView={order} key={index}/>
  )

  return (
    <Box className={styles.container}>
      {orders?.length ? renderOrders() : <></>}
    </Box>
  );
}
