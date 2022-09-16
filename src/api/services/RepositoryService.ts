import { Service } from "typedi";
import { EntityManager, EntitySchema, EntityTarget, Repository } from "typeorm";
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
    };

    // public async load(): Promise<void> {
    //     await AppDataSource.initialize();
    // }

    public get(): Repository<any> {
        return AppDataSource.getRepository(this.entity);
    };

}

// export interface IRepo {
//     entity: Entity;
//     get: () => Repository<any>;
// }

// @Service()
// export default class RepositoryService implements IRepo {

//     readonly entity: Entity;

//     constructor(entity: Entity) {
//         this.entity = entity;
//     };

//     // public async load(): Promise<void> {
//     //     await AppDataSource.initialize();
//     // }

//     public get(): Repository<any> {
//         return AppDataSource.getRepository(this.entity);
//     };

// }