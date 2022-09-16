import { Service } from "typedi";
import { EntityTarget, In, Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import Repo from "./RepositoryService";
import "reflect-metadata";
import RepositoryService from "./RepositoryService";
import { Entity } from "../../types";

export interface IBaseService {
  entity: EntityTarget<any>;
  repository: Repository<any>;
  // init: any;
}

@Service()
export default class BaseService implements IBaseService {
  entity: EntityTarget<any>;
  repository: Repository<any>;

  constructor(entity: EntityTarget<any>) {
    this.entity = entity;
    this.repository = new RepositoryService(this.entity).get();
    // this.repository = new RepositoryService(this.entity).get();
    // console.log(this.repository);
  }

  // async init(): Promise<any> {
  //     this.repository = await new RepositoryService(this.entity).get();
  // }

  // public async start() {
  //     let repository = new RepositoryService(this.entity);
  //     this.repository = await repository.get();
  // }

  public async getOneByParameter(column: string, value: any) {
    return await this.repository.findOneBy({
      column: value,
    });
  }

  private generateQuery(key: string, value: any): Object {
    let query = {};
    query[key] = value;
    return query;
  }

  private generateInQuery(key: string, value: any): Object {
    let query = {};
    query[key] = In(value);
    return query;
  }

  public async getById(id: number, id_field: string): Promise<any> {
    id = this.sanitizeId(id);
    const query = this.generateQuery(id_field, id);
    return await this.repository.findOneBy(query);
  }

  public async getByIds(ids: number[], id_field: string): Promise<any> {
    ids = ids.map((id) => this.sanitizeId(id));
    const query = this.generateInQuery(id_field, ids);
    return await this.repository.findBy(query);
  }

  public async postEntity(entity: Entity): Promise<Entity> {
    return await this.repository.save(entity);
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

  public idToNumber(id: string[] | string): number[] {
    if (typeof id === "string") {
      id = [id];
    }
    return id.map((v) => parseInt(v));
  }
}
