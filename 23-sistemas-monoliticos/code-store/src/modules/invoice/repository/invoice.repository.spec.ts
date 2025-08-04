import { Sequelize } from "sequelize-typescript";
import InvoiceItemModel from "./invoice-item.model";
import InvoiceModel from "./invoice.model";
import { Invoice } from "../domain/invoice.entity";
import Address from "../../@shared/domain/value-object/address.value-object";
import { InvoiceItem } from "../domain/invoice-item.entity";
import InvoiceRepository from "./invoice.repository";

describe("InvoiceRepository Unit Tests", () => {
    let sequelize: Sequelize;
    
    beforeEach(async () => {
        sequelize = new Sequelize({
        dialect: "sqlite",
        storage: ":memory:",
        logging: false,
        sync: { force: true },
        });
    
        await sequelize.addModels([InvoiceModel, InvoiceItemModel]);
        await sequelize.sync();
    });
    
    afterEach(async () => {
        await sequelize.close();
    });
    
    it("should create and find an invoice", async () => {
        const invoice = new Invoice({
        id: "1",
        name: "Invoice 1",
        document: "12345678901",
        address: new Address({
            street: "Street 1",
            number: "123",
            complement: "Apt 1",
            city: "City 1",
            state: "State 1",
            zipCode: "12345-678"
        }),
        items: [
            new InvoiceItem({
            id: "1",
            name: "Item 1",
            price: 100
            }),
            new InvoiceItem({
            id: "2",
            name: "Item 2",
            price: 200
            })
        ],
        createdAt: new Date("2023-01-01")
        });
    
        const repository = new InvoiceRepository();
        await repository.create(invoice);
    
        const result = await repository.find(invoice.id.value);
    
        expect(result.id.value).toBe(invoice.id.value);
        expect(result.name).toBe(invoice.name);
        expect(result.document).toBe(invoice.document);
        expect(result.address.street).toBe(invoice.address.street);
        expect(result.address.number).toBe(invoice.address.number);
        expect(result.address.complement).toBe(invoice.address.complement);
        expect(result.address.city).toBe(invoice.address.city);
        expect(result.address.state).toBe(invoice.address.state);
        expect(result.address.zipCode).toBe(invoice.address.zipCode);
        expect(result.items.length).toBe(2);
        expect(result.items[0].id.value).toBe(invoice.items[0].id.value);
        expect(result.items[0].name).toBe(invoice.items[0].name);
        expect(result.items[0].price).toBe(invoice.items[0].price);
        expect(result.items[1].id.value).toBe(invoice.items[1].id.value);
        expect(result.items[1].name).toBe(invoice.items[1].name);
        expect(result.items[1].price).toBe(invoice.items[1].price);
    });
});