import { In, Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { User } from "../entities/User";
import { sanitizeId } from "../sanitation/id";

function getRepository(): Repository<User> {
    return AppDataSource.getRepository(User);
}

export async function getUserById(id: number): Promise<User> {
    id = sanitizeId(id);
    const repository = getRepository();
    const user = await repository.findOneBy({
        user_id: id
    });
    return user;
};

export async function getUserByIds(ids: number[]): Promise<User[]> {
    ids = ids.map((id) => sanitizeId(id));
    const repository = getRepository();
    const users = await repository.findBy({
        user_id: In(ids)
    });
    return users;
}

export async function postUser(user: User): Promise<number> {
    const repository = getRepository();
    await repository.save(user);
    return user.user_id;
}