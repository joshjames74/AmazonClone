import { Box, Text } from "@chakra-ui/react";
import { useContext } from "react";
import { useSelector } from "react-redux"
import { Order, OrderItem } from "../../../../api/entities"
import { RootState } from "../../../../redux/store/store"
import { UserContext } from "../../../contexts";
import ProductCardWide from "../../product/ProductCard/ProductCardWide";
import { LANG } from "./../../../../lang";
import styles from "./index.module.css";

export type OrderCardType = {
    orderView: {
        order: Order,
        orderItems: OrderItem[]
    },
    key: number,
}

export default function OrderCard(props: OrderCardType): JSX.Element {

    // get language
    const { language } = useContext(UserContext);
    const lang = LANG[language];

    // deconstruct order and orderItems
    const { order, orderItems } = props.orderView;

    // fetch redux data
    const conversionMultiple = useSelector((state: RootState) => state.userReducer.conversionMultiple);
    const userCurrencySymbol = useSelector((state: RootState) => state.userReducer.userCurrencySymbol);

    // compute order info
    const orderTotal = orderItems
        .map((item: OrderItem) => item.price * item.quantity * conversionMultiple)
        .reduce((acc: number, curr: number) => acc + curr, 0);
    const date = new Date(order.date);
    const formatDate = date.toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric"
    });

    // render order Items
    const renderOrderItems = (): JSX.Element[] => {
        return orderItems.map((item: OrderItem) => <ProductCardWide {...item.product}/>)
    }

    return (
    <Box
    key={props.key}
    className={styles.container}>
        <Box className={styles.info_container}>
                <Text className={styles.header}>
                    {lang.ORDER_PLACED}
                </Text>
                <Text className={styles.content}>
                    {formatDate}
                </Text>
            <Box className={styles.order_container}>
                <Text className={styles.header}>
                    {lang.TOTAL}
                </Text>
                <Text className={styles.content}>
                    {userCurrencySymbol}{orderTotal}
                </Text>
            </Box>
            <Box className={styles.order_container}>
                <Text className={styles.header}>
                    {lang.DELIVERY_TO}:
                </Text>
                <Text className={styles.content}>
                    {order.address.name}, 
                    {order.address.number}
                    {order.address.street_name}
                </Text>
            </Box>
        </Box>
        <Box className={styles.order_list_container}>
            {renderOrderItems()}
        </Box>
    </Box>
    )
}
