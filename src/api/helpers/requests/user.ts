import { routes } from "../../routes";
import { insertIdIntoUrl } from "../../utils/formatting";
import axios from 'axios';
import { User } from "../../entities";

export async function getUserById(id: number): Promise<User> {
    const url = insertIdIntoUrl(routes.user.user, 'user', id);
    const request = await axios(url, {
        method: 'GET'
    });
    return request.data.user;
};