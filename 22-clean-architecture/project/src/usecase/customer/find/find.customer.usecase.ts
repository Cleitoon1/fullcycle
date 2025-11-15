import CustomerRepositoryInterface from "../../../domain/customer/repository/customer-repository.interface";
import FindCustomerDto, { FindCustomerOutput } from "./find.customer.dto";

export default class FindCustomerUseCase {
    private _customerRepository: CustomerRepositoryInterface;

    constructor(customerRepository: CustomerRepositoryInterface){
        this._customerRepository = customerRepository;
    }

    async execute(input: FindCustomerDto): Promise<FindCustomerOutput> {
        const customer = await this._customerRepository.find(input.id);

        return {
            id: customer.id,
            name: customer.name,
            email: "",
            address: {
                street: customer.Address.street,
                city: customer.Address.city,
                number: customer.Address.number,
                zip: customer.Address.zip
            }
        }
    }
    
}