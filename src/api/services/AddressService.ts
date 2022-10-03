import { Service } from "typedi";
import { EntityTarget, In } from "typeorm";
import BaseService from "./BaseService";
import { Address } from "../entities";

@Service()
export default class AddressService extends BaseService {
  constructor() {
    super(Address);
  }

  public async getAddressesByUserId(id: number): Promise<Address[]> {
    id = this.sanitizeId(id);
    const addresses = await this.repository.findBy({
      user: {
        user_id: id,
      },
    });
    return addresses;
  }
}
