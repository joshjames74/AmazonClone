import { In, Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Order } from "../entities/Order";
import { sanitizeId } from "../sanitation/id";

function getRepository(): Repository<Order> {
  return AppDataSource.getRepository(Order);
}

export async function getOrderById(id: number): Promise<Order> {
  id = sanitizeId(id);
  const repository = getRepository();
  const order = await repository.findOneBy({
    order_id: id,
  });
  return order;
}

export async function getOrdersById(ids: number[]): Promise<Order[]> {
  ids = ids.map((id) => sanitizeId(id));
  const repository = getRepository();
  const orders = await repository.findBy({
    order_id: In(ids),
  });
  return orders;
}

export async function getOrdersByUserId(user_id: number): Promise<Order[]> {
  user_id = sanitizeId(user_id);
  const repository = getRepository();
  const orders = await repository.findBy({
    user_id: user_id,
  });
  return orders;
}

export async function getOrdersByAddressId(
  address_id: number
): Promise<Order[]> {
  address_id = sanitizeId(address_id);
  const repository = getRepository();
  const orders = await repository.findBy({
    address_id: address_id,
  });
  return orders;
}
