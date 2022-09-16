import { Service } from 'typedi';
import { User } from '../entities/User';
import { EntityTarget, In, UpdateResult } from 'typeorm';
import BaseService from './BaseService';

@Service()
export default class UserService extends BaseService {

    constructor() {
        super(User);
    }

    public async getUserById(id: number): Promise<User> {
        id = this.sanitizeId(id);
        const user = await this.repository.findOneBy({
            user_id: id
        });
        return user;
    }

    public async getUserByIds(ids: number[]): Promise<User[]> {
        ids = ids.map((id) => this.sanitizeId(id));
        const users = await this.repository.findBy({
            user_id: In(ids)
        });
        return users;
    }

    public async postUser(user: User): Promise<User> {
        await this.repository.save(user);
        return user;
    }

    public async putUser(id: number, fieldQuery: Object): Promise<UpdateResult> {
        const query = await this.repository
            .createQueryBuilder()
            .update(User)
            .set(fieldQuery)
            .where({user_id: id})
            .execute();
        return query;
    };
}