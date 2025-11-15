import CustomerRepositoryInterface from "../../../domain/customer/repository/customer-repository.interface";
import { OutputListCustomerDTO } from "./list.customer.dto";

export default class ListCustomerUseCase {
     private _customerRepository: CustomerRepositoryInterface;
    
    constructor(customerRepository: CustomerRepositoryInterface){
        this._customerRepository = customerRepository;
    }

    async execute(): Promise<OutputListCustomerDTO> {
        const customers = await this._customerRepository.findAll();
        
        return {
            customers: customers.map((customer) => {
                return {
                    id: customer.id,
                    name: customer.name,
                    address: {
                        street: customer.Address.street,
                        number: customer.Address.number,
                        zip: customer.Address.zip,
                        city: customer.Address.city
                    }
                }
            })
        }
    }        
}