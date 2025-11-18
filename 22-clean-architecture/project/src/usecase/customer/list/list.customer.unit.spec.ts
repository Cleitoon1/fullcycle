import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import Address from "../../../domain/customer/value-object/address";
import ListCustomerUseCase from "./list.customer.usecase";

const customer1 = CustomerFactory.createWithAddress("John", new Address("Street", 123, "zip", "city"));
const customer2 = CustomerFactory.createWithAddress("Jane", new Address("Street", 123, "zip", "city"));



const MockRepository = () => {
    return {
        find: jest.fn(),
        findAll: jest.fn().mockReturnValue(Promise.resolve([customer1, customer2])),
        create: jest.fn(),
        update: jest.fn()
    }
}

describe("Unit test for update customer use case", () => {
    it("should update a customer", async () => {
        const customerRepository = MockRepository();
        const customerListUseCase = new ListCustomerUseCase(customerRepository);
        
        const output = await customerListUseCase.execute();

        expect(output.customers.length).toBe(2);
        expect(output.customers[0]).toEqual({
            id: customer1.id,
            name: customer1.name,
            address: {
                street: customer1.Address.street,
                number: customer1.Address.number,
                zip: customer1.Address.zip,
                city: customer1.Address.city
            }
        });
        expect(output.customers[1]).toEqual({
            id: customer2.id,
            name: customer2.name,
            address: {
                street: customer2.Address.street,
                number: customer2.Address.number,
                zip: customer2.Address.zip,
                city: customer2.Address.city
            }
        });
    });    
})