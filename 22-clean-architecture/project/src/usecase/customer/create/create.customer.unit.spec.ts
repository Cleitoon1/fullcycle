import CustomerCreateUseCase from "./create.customer.usecase"

const input = {
    name: "John",
    address: {
        street: "Street",
        number: 123,
        zip: "zip",
        city: "city"
    }
}

const MockRepository = () => {
    return {
        find: jest.fn(),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn()
    }
}

describe("Unit test create customer use case", () => {
    it("should create a customer", async () => {
        const customerRepository = MockRepository();
        const customerCreateUserCase = new CustomerCreateUseCase(customerRepository);
        
        const output = await customerCreateUserCase.execute(input);

        expect(output).toEqual({
            id: expect.any(String),
            name: input.name,
            address: {
                street: input.address.street,
                number: input.address.number,
                zip: input.address.zip,
                city: input.address.city
            }
        })
    });

    it("should thrown an error when name is missing", () => {
        const customerRepository = MockRepository();
        const customerCreateUserCase = new CustomerCreateUseCase(customerRepository);
        
        input.name = "";
        
        expect(async () => {
            await customerCreateUserCase.execute(input);
        }).rejects.toThrow("Name is required");
    })

    
})