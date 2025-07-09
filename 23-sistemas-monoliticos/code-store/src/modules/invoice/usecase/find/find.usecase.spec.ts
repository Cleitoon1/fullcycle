import Address from "../../../@shared/domain/value-object/address.value-object";
import { InvoiceItem } from "../../domain/invoice-item.entity";
import { Invoice } from "../../domain/invoice.entity";
import FindInvoiceUseCase from "./find.usecase";

const invoice =  new Invoice({
    id: "1",
    name: "Invoice 1",
    document: "123456789",
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

const MockInvoiceRepository = () => {
    return {
        find: jest.fn().mockResolvedValue(invoice),
        create: jest.fn(),
    };
}

describe("FindInvoiceUseCase Unit Tests", () => {

    it("should find an invoice", async () => {
        const invoiceMockRepository = MockInvoiceRepository();
        const useCase = new FindInvoiceUseCase(invoiceMockRepository);
        const input = {
            id: "1"
        };
        const result = await useCase.execute(input);

        expect(invoiceMockRepository.find).toHaveBeenCalledWith(input.id);
        expect(result.id).toBe(invoice.id.value);
        expect(result.name).toBe(invoice.name);
        expect(result.document).toBe(invoice.document);
        expect(result.address.street).toBe(invoice.address.street);
        expect(result.address.number).toBe(invoice.address.number);
        expect(result.address.complement).toBe(invoice.address.complement);
        expect(result.address.city).toBe(invoice.address.city);
        expect(result.address.state).toBe(invoice.address.state);
        expect(result.address.zipCode).toBe(invoice.address.zipCode);
        expect(result.items.length).toBe(2);
        expect(result.items[0].id).toBe(invoice.items[0].id.value);
        expect(result.items[0].name).toBe(invoice.items[0].name);
        expect(result.items[0].price).toBe(invoice.items[0].price);
        expect(result.items[1].id).toBe(invoice.items[1].id.value);
        expect(result.items[1].name).toBe(invoice.items[1].name);
        expect(result.items[1].price).toBe(invoice.items[1].price);
        expect(result.total).toBe(invoice.total);
        expect(result.createdAt).toBe(invoice.createdAt);
    })
})