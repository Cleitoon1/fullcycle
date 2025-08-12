import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../../../infrastructure/customer/repository/sequelize/customer.model";
import CustomerRepository from "../../../infrastructure/customer/repository/sequelize/customer.repository";
import Customer from "../../../domain/customer/entity/customer";
import Address from "../../../domain/customer/value-object/address";

describe("test find customer use case", () => {

    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true }
        });
        await sequelize.addModels([CustomerModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should find a customer", async () => {
        const customerRepository = new CustomerRepository();
        const costumer = new Customer("123", "John Doe");
        const address = new Address("123 Main St", 456, "12345", "Anytown");
        costumer.changeAddress(address);
        await customerRepository.create(costumer);


        let input = { id: costumer.id };
        const output = new FindCustomerUseCase(customerRepository).execute(input);

        expect(output).toEqual({
            id: costumer.id,
            name: costumer.name,
            address: {
                street: address.street,
                number: address.number,
                zipcode: address.zip,
                city: address.city
            },
            active: costumer.isActive(),
            rewardPoints: costumer.rewardPoints
        });
    });
})