import Order from "../domain/order.entity";

export default interface ICheckoutGateway {
    create(order: Order): Promise<void>;
    findById(id: string): Promise<Order>;
}