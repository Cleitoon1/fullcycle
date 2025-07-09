import { Sequelize } from "sequelize-typescript";
import InvoiceModel from "../repository/invoice.model";
import InvoiceItemModel from "../repository/invoice-item.model";
import InvoiceFacadeFactory from "../factory/invoice.facade.factory";

describe("InvoiceFacade Unit Tests", () => {
    let sequelize: Sequelize;
    
      beforeEach(async () => {
        sequelize = new Sequelize({
          dialect: "sqlite",
          storage: ":memory:",
          logging: false,
          sync: { force: true },
        });
    
        sequelize.addModels([InvoiceModel, InvoiceItemModel]);
        await sequelize.sync();
      });
    
      afterEach(async () => {
        await sequelize.close();
      });

      it("should generate an invoice", async () => {
        const facade = InvoiceFacadeFactory.create();

        const input = {
          name: "John Doe",
          document: "123456789",
          street: "123 Main St",
          number: "100",
          complement: "Apt 1",
          city: "New York",
          state: "NY",
          zipCode: "10001",
          items: [
            { id: "item-1", name: "Item 1", price: 50 },
            { id: "item-2", name: "Item 2", price: 75 },
          ],
        };

        const output = await facade.generate(input);

        expect(output.id).toBeDefined();
        expect(output.name).toBe(input.name);
        expect(output.document).toBe(input.document);
        expect(output.street).toBe(input.street);
        expect(output.number).toBe(input.number);
        expect(output.complement).toBe(input.complement);
        expect(output.city).toBe(input.city);
        expect(output.state).toBe(input.state);
        expect(output.zipCode).toBe(input.zipCode);
        expect(output.items.length).toBe(2);
        expect(output.items[0].id).toBe(input.items[0].id);
        expect(output.items[0].name).toBe(input.items[0].name);
        expect(output.items[0].price).toBe(input.items[0].price);
        expect(output.items[1].id).toBe(input.items[1].id);
        expect(output.items[1].name).toBe(input.items[1].name);
        expect(output.items[1].price).toBe(input.items[1].price);
        expect(output.total).toBe(125);
      });

      it("shuld find an invoice", async () => {
        const facade = InvoiceFacadeFactory.create();

        const input = {
          name: "John Doe",
          document: "123456789",
          street: "123 Main St",
          number: "100",
          complement: "Apt 1",
          city: "New York",
          state: "NY",
          zipCode: "10001",
          items: [
            { id: "item-1", name: "Item 1", price: 50 },
            { id: "item-2", name: "Item 2", price: 75 },
          ],
        };
        const generatedInvoice = await facade.generate(input);

        const output = await facade.find({ id: generatedInvoice.id });

        expect(output.id).toBeDefined();
        expect(output.name).toBe(input.name);
        expect(output.document).toBe(input.document);
        expect(output.address.street).toBe(input.street);
        expect(output.address.number).toBe(input.number);
        expect(output.address.complement).toBe(input.complement);
        expect(output.address.city).toBe(input.city);
        expect(output.address.state).toBe(input.state);
        expect(output.address.zipCode).toBe(input.zipCode);
        expect(output.items.length).toBe(2);
        expect(output.items[0].id).toBe(input.items[0].id);
        expect(output.items[0].name).toBe(input.items[0].name);
        expect(output.items[0].price).toBe(input.items[0].price);
        expect(output.items[1].id).toBe(input.items[1].id);
        expect(output.items[1].name).toBe(input.items[1].name);
        expect(output.items[1].price).toBe(input.items[1].price);
        expect(output.total).toBe(125);
      });
});