import { NextApiRequest, NextApiResponse } from "next";
import { deprecate } from "util";
import { createConnection } from "../../data-source";
import { ServiceType } from "../../types/Service";
import { IBaseService } from "../services/BaseService";
import { convertToRegex } from "../utils/formatting";
import { AppDataSource } from "../../data-source";
import { QueryRunner } from "typeorm";

export interface IRequestHandler {
  req: NextApiRequest;
  res: NextApiResponse;
  handler: () => void;
}

export default class RequestHandler implements IRequestHandler {
  readonly req: NextApiRequest;
  readonly res: NextApiResponse;
  readonly url: URL;
  readonly base: string;
  readonly fullPath: string;

  constructor(req: NextApiRequest, res: NextApiResponse) {
    this.req = req;
    this.res = res;
    this.base = "http://localhost:3000";
    this.url = this.getUrl();
    this.fullPath = this.url.origin + this.url.pathname;
  }

  public getUrl(): URL {
    return new URL(this.base + this.req.url);
  }

  public async createTransaction(): Promise<QueryRunner> {
    const dataSource = AppDataSource.createQueryRunner();
    await dataSource.startTransaction();
    return dataSource;
  }

  public matches(pattern: string): boolean {
    pattern = convertToRegex(pattern);
    if (this.fullPath.match(pattern)) {
      return true;
    }
    return false;
  }

  public getIdFromPath(name: string): number {
    const pattern = `${name}\/([0-9]+)`;
    const id = this.fullPath.match(pattern)[1];
    return this.idToNumber(id);
  }

  public async handler() {
    await createConnection();
    switch (this.req.method) {
      case "GET":
        return this.get();
      case "POST":
        return this.post();
      case "PUT":
        return this.put();
      case "DELETE":
        return this.delete();
      default:
        return;
    }
  }

  public sanitizeId(id: number): number {
    if (typeof id !== "number") {
      throw new Error("Id is not a number");
    }
    if (id > 10000) {
      throw new Error("Id is too large");
    }
    if (id < 0) {
      throw new Error("Id is not a positive number");
    }
    if (id % 1 !== 0) {
      throw new Error("Id is not an integer");
    }
    return id;
  }

  public idToNumber(id: string): number {
    if (isNaN(parseInt(id))) {
      throw new Error("Cannot be converted to integer");
    }
    return parseInt(id);
  }

  /**
   * @depreciated Thi method should not be used
   */
  public getId() {
    // const { id } = this.req.query;
    // const idNumber = this.idToNumber(id);
    // return idNumber;
  }

  public sendResponseJSON(object: Object, code: number) {
    return this.res.status(code).json(object);
  }

  public get() {}

  public post() {}

  public put() {}

  public delete() {}
}
