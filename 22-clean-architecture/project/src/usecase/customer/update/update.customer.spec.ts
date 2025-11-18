import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import Address from "../../../domain/customer/value-object/address";
import UpdateCustomerUseCase from "./update.costumer.usecase";

const customer = CustomerFactory.createWithAddress("John", new Address("Street", 123, "zip", "city"));

const input = {
    id: customer.id,
    name: "John updated",
    address: {
        street: "Street updated",
        number: 1234,
        zip: "zip updated",
        city: "city updated"
    }
}

const MockRepository = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(customer)),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn()
    }
}

describe("Unit test for update customer use case", () => {
    it("should update a customer", async () => {
        const customerRepository = MockRepository();
        const customerUpdateUserCase = new UpdateCustomerUseCase(customerRepository);
        
        const output = await customerUpdateUserCase.execute(input);

        expect(output).toEqual({
            id: customer.id,
            name: input.name,
            address: {
                street: input.address.street,
                number: input.address.number,
                zip: input.address.zip,
                city: input.address.city
            }
        })
    });    
})