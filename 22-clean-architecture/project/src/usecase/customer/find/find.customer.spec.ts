import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../../../infrastructure/customer/repository/sequelize/customer.model";
import CustomerRepository from "../../../infrastructure/customer/repository/sequelize/customer.repository";
import Customer from "../../../domain/customer/entity/customer";
import Address from "../../../domain/customer/value-object/address";
import FindCustomerUseCase from "./find.customer.usecase";

const customer = new Customer("123", "John Doe");
const address = new Address("123 Main St", 456, "12345", "Anytown");
customer.changeAddress(address);
customer.activate();

const mockRepository = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(customer)),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn()
    }
}

describe("test find customer use case", () => {

    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true }
        });
        sequelize.addModels([CustomerModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should find a customer", async () => {
        let input = { id: customer.id };
        const repository = mockRepository();
        const output = await new FindCustomerUseCase(repository).execute(input);

        expect(output).toEqual({
            id: customer.id,
            name: customer.name,
            email: "",
            address: {
                street: address.street,
                number: address.number,
                zip: address.zip,
                city: address.city
            },
        });
    });

    it("should not find a customer", async () => {
        let input = { id: "abacate"};
        const repository = mockRepository();
        repository.find.mockImplementation(() => {
            throw new Error("Customer not found");
        })
        const usecase =  new FindCustomerUseCase(repository);

        expect(async() => {
            return await usecase.execute(input);
        }).rejects.toThrow("Customer not found");
    })
})