import Customer from "../../../domain/customer/entity/customer";
import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import CustomerRepositoryInterface from "../../../domain/customer/repository/customer-repository.interface";
import Address from "../../../domain/customer/value-object/address";
import { InputCreateCustomerDto, OutputCreateCustomerDto } from "./create.customer.dto";

export default class CustomerCreateUseCase {
    private _customerRepository: CustomerRepositoryInterface;

    constructor(customerRepository: CustomerRepositoryInterface){
        this._customerRepository = customerRepository;
    }

     async execute(input: InputCreateCustomerDto): Promise<OutputCreateCustomerDto> {
        if(!input.name){
            throw new Error("Name is required");
        }

        const address = new Address(input.address.street, input.address.number, input.address.zip, input.address.city);
        const customer = CustomerFactory.createWithAddress(input.name, address);
        
        await this._customerRepository.create(customer);

        return {
            id: customer.id,
            name: customer.name,
            address: {
                street: address.street,
                number: address.number,
                zip: address.zip,
                city: address.city
            },
        }
     }
}