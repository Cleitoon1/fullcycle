export default interface FindCustomerDto {
  id: string;
}

export interface FindCustomerOutput {
  id: string;
  name: string;
  email: string;
  address: {
    street: string;
    number: number;
    city: string;
    zip: string;
  }
}