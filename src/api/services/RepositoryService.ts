import { Service } from "typedi";
import {
  EntityManager,
  EntitySchema,
  EntityTarget,
  Repository,
  TreeRepository,
} from "typeorm";
import { AppDataSource } from "../../data-source";
import { Entity } from "../../types";

export interface IRepo {
  entity: EntityTarget<any>;
  get: () => Repository<any>;
}

@Service()
export default class RepositoryService implements IRepo {
  readonly entity: EntityTarget<any>;

  constructor(entity: EntityTarget<any>) {
    this.entity = entity;
  }

  public get(): Repository<any> {
    return AppDataSource.getRepository(this.entity);
  }

  public tree(): TreeRepository<any> {
    return AppDataSource.getTreeRepository(this.entity);
  }
}
