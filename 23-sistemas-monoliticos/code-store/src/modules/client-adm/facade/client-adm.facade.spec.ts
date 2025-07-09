import { Sequelize } from "sequelize-typescript"
import { ClientModel } from "../repository/client.model"
import ClientAdmFacadeFactory from "../factory/client-adm.facade.factory"

describe("Client Adm Facade test", () => {

    let sequelize: Sequelize
  
    beforeEach(async () => {
      sequelize = new Sequelize({
        dialect: 'sqlite',
        storage: ':memory:',
        logging: false,
        sync: { force: true }
      })
  
      sequelize.addModels([ClientModel])
      await sequelize.sync()
    })
  
    afterEach(async () => {
      await sequelize.close()
    })
  
    it("should create a client", async () => {
  
      const facade = ClientAdmFacadeFactory.create()

      const input = {
        id: "1",
        name: "John Doe",
        email: "jodn@doe.com",
        document: "123456789",
        address: "Rua 123"
      }
  
      await facade.add(input)
  
      const client = await ClientModel.findOne({ where: { id: "1" } })
  
      expect(client).toBeDefined()
      expect(client.id).toBe(input.id)
      expect(client.name).toBe(input.name)
      expect(client.email).toBe(input.email)
      expect(client.document).toBe(input.document)
      expect(client.address).toBe(input.address)
    })
  
    it("should find a client", async () => {
  
      const facade = ClientAdmFacadeFactory.create()
  
      const input = {
        id: "1",
        name: "Lucian",
        email: "lucian@xpto.com",
        document: "1234-5678",
        address: "Rua 123"
      }
  
      await facade.add(input)
  
      const client = await facade.find({ id: "1" })
  
      expect(client).toBeDefined()
      expect(client.id).toBe(input.id)
      expect(client.name).toBe(input.name)
      expect(client.email).toBe(input.email)
      expect(client.document).toBe(input.document)
      expect(client.address).toBe(input.address);
    })
  })