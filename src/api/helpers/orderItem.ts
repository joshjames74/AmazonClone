import { In, Repository } from 'typeorm';
import { AppDataSource } from '../../data-source';
import { OrderInfo, OrderItemType } from '../../types/Order';
import { Order } from '../entities/Order';
import { OrderItem } from '../entities/OrderItem';
import { sanitizeId } from '../sanitation/id';
import { getOrderById } from './order';

function getOrderRepository(): Repository<Order> {
    return AppDataSource.getRepository(Order);
}

function getOrderItemRepository(): Repository<OrderItem> {
    return AppDataSource.getRepository(OrderItem);
}

function orderToOrderInfo(order: Order, items: OrderItem[]): OrderInfo {

    const orderItems: OrderItemType[] = items.map((v: OrderItem) => {
        return {
            productId: v.product_id,
            price: v.price,
            quantity: v.quantity
        }
    });

    const orderInfo: OrderInfo = {
        orderId: order.order_id,
        userId: order.user_id,
        addressId: order.address_id,
        currencyId: order.currency_id,
        date: order.date,
        items: orderItems
    }

    return orderInfo;
}

export async function getOrderItemsById(id: number): Promise<OrderItem[]> {
    id = sanitizeId(id);
    const repository = getOrderItemRepository();
    const orderItems = await repository.findBy({
        order_id: id
    });
    return orderItems;
}

export async function getOrderInfoById(id: number): Promise<OrderInfo> {
    const order = await getOrderById(id);
    const orderItems = await getOrderItemsById(id);
    return orderToOrderInfo(order, orderItems);
}

export async function getOrderInfoByOrders(orders: Order[]): Promise<OrderInfo[]> {
    let ordersInfo: OrderInfo[] = [];
    for (const order of orders) {
        const info = await getOrderInfoById(order.order_id);
        ordersInfo.push(info);
    }
    return ordersInfo
}

export async function getOrdersByUserId(user_id: number): Promise<Order[]> {
    user_id = sanitizeId(user_id);
    const repository = getOrderRepository();
    const orders = await repository.findBy({
        user_id: user_id
    });
    return orders;
};

export async function getOrdersByAddressId(address_id: number): Promise<Order[]> {
    address_id = sanitizeId(address_id);
    const repository = getOrderRepository();
    const orders = await repository.findBy({
        address_id: address_id
    });
    return orders;
};

export async function getOrdersInfoById(ids: number[]): Promise<OrderInfo[]> {
    ids = ids.map((id) => sanitizeId(id));
    let ordersInfo: OrderInfo[] = [];
    for (const id of ids) {
        const orderInfo = await getOrderInfoById(id);
        ordersInfo.push(orderInfo);
    }
    return ordersInfo
}

export async function getOrdersInfoByUserId(user_id: number): Promise<OrderInfo[]> {
    user_id = sanitizeId(user_id)
    const orders = await getOrdersByUserId(user_id);
    const ordersInfo = await getOrderInfoByOrders(orders);
    return ordersInfo;
}

export async function getOrdersInfoByAddressId(address_id: number): Promise<OrderInfo[]> {
    address_id = sanitizeId(address_id)
    const orders = await getOrdersByAddressId(address_id);
    const ordersInfo = await getOrderInfoByOrders(orders);
    return ordersInfo;
}