import Address from "../../@shared/domain/value-object/address.value-object";
import Client from "../domain/client.entity";
import Order from "../domain/order.entity";
import Product from "../domain/product.entity";
import ICheckoutGateway from "../gateway/checkout.gateway";
import { ClientModel } from "./client.model";
import { OrderModel } from "./order.model";
import ProductOrder from "./product.order.model";


export class OrderRepository implements ICheckoutGateway {
  async create(order: Order): Promise<void> {

    const client = await ClientModel.findOne({ 
      where: {
        id: order.client.id.value,
      },
    });
    if (!client) {
      await ClientModel.create({
        id: order.client.id.value,
        name: order.client.name,
        email: order.client.email,
        document: order.client.document,
        street: order.client.address.street,
        number: order.client.address.number,
        complement: order.client.address.complement,
        city: order.client.address.city,
        state: order.client.address.state,
        zipCode: order.client.address.zipCode,
        createdAt: order.client.createdAt,
        updatedAt: order.client.updatedAt,
      });
    }

    await OrderModel.create({
      id: order.id.value,
      status: order.status,
      invoiceId: order.invoiceId,
      clientId: order.client.id.value,
      createdAt: order.createdAt,
      updatedAt: order.updatedAt,
    });
    
    if (!order.products || order.products.length === 0) {
      return;
    }

    order.products.forEach(async (product) => {
      await ProductOrder.create({
        id: product.id.value,
        name: product.name,
        description: product.description,
        salesPrice: product.salesPrice,
        orderId: order.id.value,
        createdAt: product.createdAt,
        updatedAt: product.updatedAt,
      });
    });
  }

  async findById(id: string): Promise<Order> {
       return await OrderModel.findOne({
          where: { id },
          include: ["products", "client"]
      }).then((order) => {
          const dbProducts = (order.get("products") as ProductOrder[]) || [];
          const dbClient = (order.get("client") as ClientModel);

          var formattedProducts = dbProducts.map(p => new Product({
            id: p.id,
            name: p.name,
            description: p.description,
            salesPrice: p.salesPrice,
            createdAt: p.createdAt,
            updatedAt: p.updatedAt
          }));

          var formattedClient = new Client({
            id: dbClient.id,
            name: dbClient.name,
            email: dbClient.email,
            document: dbClient.document,
            address: new Address({
                street: dbClient.street,
                number: dbClient.number,
                complement: dbClient.complement,
                city: dbClient.city,
                state: dbClient.state,
                zipCode: dbClient.zipCode
            }),
            createdAt: dbClient.createdAt,
            updatedAt: dbClient.updatedAt,
        })

        const formattedOrder = new Order({
            id: order.id,
            status: order.status,
            invoiceId: order.invoiceId,
            client: formattedClient,
            products: formattedProducts,
            createdAt: order.createdAt,
            updatedAt: order.updatedAt,
        });
        
        return formattedOrder;
      });
  }
}