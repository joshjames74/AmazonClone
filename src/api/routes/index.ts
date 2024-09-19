export const pattern = {
  host: "http://localhost:3000",
  api: "/api",
};

export const url = {
  host: "http://localhost:3000",
  api: "/api",
};

const base_api = "http://localhost:3000/api";

export const routes = {
  base: "http://localhost:3000",
  auth: {
    login: base_api + "/auth/login",
    logout: base_api + "/auth/logout",
    callback: base_api + "/auth/callback",
    profile: base_api + "/auth/me",
  },
  product: {
    post: base_api + "/product",
    product: base_api + "/product/:id",
    reviews: base_api + "/product/:id/reviews",
    all: base_api + "/product",
    search: base_api + "/product/search",
    count: base_api + "/product/count",
  },
  user: {
    user: base_api + "/user/:id",
    sub: base_api + "/user/sub",
    username: base_api + "/user/username",
    currency: base_api + "/user/:id/currency",
    basket: base_api + "/user/:id/basket",
    get_full_basket: base_api + "/user/:id/fullbasket",
    add_to_basket: base_api + "/user/:id/basket/add",
    delete_basket_item: base_api + "/user/:id/basket/delete/item/:id",
    empty_basket: base_api + "/user/:id/basket",
    get_order: base_api + "/user/:id/order/:id",
    all_orders: base_api + "/user/:id/orders",
    get_all_orders: base_api + "/user/:id/orders",
    add: base_api + "/user/add",
    add_order: base_api + "/user/:id/order",
    add_review: base_api + "/user/:id/review/add",
    delete_review: base_api + "/user/:id/review/delete",
    addresses: base_api + "/user/:id/addresses",
  },
  currency: {
    currency: base_api + "/currency/:id",
    convert_currency: base_api + "/currency/convert",
    all: base_api + "/currency",
  },
  category: {
    all: base_api + "/categories",
    filtered: base_api + "/categories/filtered",
    id: base_api + "/categories/id",
  },
  country: {
    all: base_api + "/countries",
    id: base_api + "/id",
  },
};
