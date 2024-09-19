import {
  DataSource,
  JoinColumn,
  JoinTable,
  ViewColumn,
  ViewEntity,
} from "typeorm";
import { Basket, BasketItem, Currency, Product, User } from ".";

@ViewEntity({
  expression: (dataSource: DataSource) =>
    dataSource
      .createQueryBuilder()
      .select("*")
      .select("item_id")
      .addSelect("basket")
      .addSelect("date_added")
      .addSelect("quantity")
      .addSelect("basketItem.product", "product")
      .from(BasketItem, "basketItem")
      .leftJoin(
        Basket,
        "basket",
        "basket.basket_id = basketItem.basket.basket_id"
      )
      .addSelect("basket.basket_id", "basket_id")
      .addSelect("basket.user", "user")
      .leftJoin(
        Product,
        "product",
        "product.product_id = basketItem.product.product_id"
      )
      .addSelect("product.product_id", "product_id")
      .addSelect("product.user", "seller")
      .addSelect("product.title", "title")
      .addSelect("product.url", "url")
      .addSelect("product.description", "description")
      .addSelect("product.image_url", "image_url")
      .addSelect("product.image_alt", "image_alt")
      .addSelect("product.price", "price")
      .addSelect("product.currency", "currency")
      .addSelect("product.review_score", "review_score")
      .addSelect("product.review_count", "review_count")
      .leftJoin(
        Product,
        "product",
        "basketItem.product.product_id = product.product_id"
      )
      .addSelect("product", "product")
      .select("*"),
})


export class BasketView {
  @ViewColumn()
  basket: Basket;

  @ViewColumn()
  product: Product;

  @ViewColumn()
  basketItem: BasketItem;
  @ViewColumn()
  basket_id: number;

  @ViewColumn()
  item_id: number;

  @ViewColumn()
  date_added: Date;

  @ViewColumn()
  quantity: number;

  @ViewColumn()
  user: User;

  @ViewColumn()
  seller: User;

  @ViewColumn()
  product_id: number;

  @ViewColumn()
  description: string;

  @ViewColumn()
  price: number;

  @ViewColumn()
  currency: Currency;

  @ViewColumn()
  image_url: string;

  @ViewColumn()
  image_alt: string;

  @ViewColumn()
  review_score: number;

  @ViewColumn()
  review_count: number;

  @ViewColumn()
  product: Product;

  @ViewColumn()
  title: string;
}
