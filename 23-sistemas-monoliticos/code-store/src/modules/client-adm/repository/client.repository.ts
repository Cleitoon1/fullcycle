import Id from "../../@shared/domain/value-object/id.value-object";
import Client from "../domain/client.entity";
import IClientGateway from "../gateway/client.gateway";
import { ClientModel } from "./client.model";


export default class ClientRepository implements IClientGateway {

    async add(entity: Client): Promise<void> {
  
      await ClientModel.create({
        id: entity.id.value,
        name: entity.name,
        email: entity.email,
        document: entity.document,
        address: entity.address,
        createdAt: entity.createdAt,
        updatedAt: entity.updatedAt
      })
    }
  
    async find(id: string): Promise<Client> {
  
      const client = await ClientModel.findOne({ where: { id } })
  
      if (!client) {
        throw new Error("Client not found")
      }
  
      return new Client({
        id: new Id(client.id),
        name: client.name,
        email: client.email,
        document: client.document,
        address: client.address,
        createdAt: client.createdAt,
        updatedAt: client.updatedAt
      })
    }
  }