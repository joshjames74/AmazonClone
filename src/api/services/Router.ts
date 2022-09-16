import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest } from "next/server";
import { ServiceType } from "../../types/Service";

export type Route = {
  url: string;
  controller: ServiceType;
  func: () => void;
};

export interface IRouter {
  base: string;
  add: () => void;
}

export default class Router {
  private routes: Route[];
  private base: string;
  private url: URL;

  constructor() {
    this.routes = [];
    this.base = "http://localhost:3000";
  }

  set req(req: NextApiRequest) {
    this.req = req;
  }

  set res(res: NextApiResponse) {
    this.res = res;
  }

  private getUrl(path: string) {
    return new URL(this.base + path);
  }

  add(url: string, controller: ServiceType, func: () => void) {
    const route = {
      url: url,
      controller: controller,
      func: func,
    };
    this.routes.push(route);
    return this;
  }

  // getResponse(route: Route) {
  //     const controller = eval(`new ${route.controller}(${})`);
  //     const cont = new route.controller();
  //     return eval(`${controller}.${route.func}`);
  // }

  // request(req: NextApiRequest, res: NextApiResponse) {
  //     const url = this.getUrl(req.url);
  //     const route = this.routes.find((route: Route) => {
  //         return route.url = url.href;
  //     });
  //     return this.getResponse(route);
  // }
}
