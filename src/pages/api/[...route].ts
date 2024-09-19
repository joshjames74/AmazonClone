import { NextApiRequest, NextApiResponse } from "next";
import { UserRequest } from "../../api/request/UserRequest";
import { ProductRequest } from "../../api/request/ProductRequest";
import { routes } from "../../api/routes";
import { createConnection } from "../../data-source";
import { convertToRegex } from "../../api/utils/formatting";
import { CurrencyRequest } from "../../api/request/CurrencyRequest";
import { CategoryRequest } from "../../api/request/CategoryRequest";
import { CountryRequest } from "../../api/request/CountryRequest";
import { logoutHandler, loginHandler, callbackHandler, profileHandler } from "./auth0";

type Route = {
  url: string;
  pattern: string;
};


export function isInRoutes(routes: Object, path: string): boolean {
  const values = Object.values(routes);
  const match = values.some((value: string) => {
    value = convertToRegex(value);
    return path.match(value);
  });
  return match;
}


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Create database connection if not already connected
  await createConnection();

  const route = "http://localhost:3000" + req.url;
  const url = new URL(route);
  const path = url.origin + url.pathname;

  if (isInRoutes(routes.user, path)) {
    const request = new UserRequest(req, res);
    return request.handler();
  }

  if (isInRoutes(routes.product, path)) {
    const request = new ProductRequest(req, res);
    return request.handler();
  }

  if (isInRoutes(routes.currency, path)) {
    const request = new CurrencyRequest(req, res);
    return request.handler();
  }

  if (isInRoutes(routes.category, path)) {
    const request = new CategoryRequest(req, res);
    return request.handler();
  }

  if (isInRoutes(routes.country, path)) {
    const request = new CountryRequest(req, res);
    return request.handler();
  }

  if (isInRoutes(routes.auth, path)) {
    switch (path) {
      case routes.auth.login:
        return loginHandler(req, res);
      case routes.auth.callback:
        return callbackHandler(req, res);
      case routes.auth.logout:
        return logoutHandler(req, res);
      case routes.auth.profile:
        return profileHandler(req, res);
      default:
        res.status(404).send({ body: "cannot find route" })
    }
  }

  return res.status(404).send({ body: "cannot find route" });
}
