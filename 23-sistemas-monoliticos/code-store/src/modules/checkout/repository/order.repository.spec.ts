import { Sequelize } from "sequelize-typescript";
import { OrderModel } from "./order.model";
import { OrderRepository } from "./order.repository";
import Order from "../domain/order.entity";
import Client from "../../checkout/domain/client.entity";
import Product from "../../checkout/domain/product.entity";
import Address from "../../@shared/domain/value-object/address.value-object";
import { ClientModel } from "./client.model";
import ProductOrder from "./product.order.model";

const mockDate = new Date(2000, 1, 1);

describe("OrderRepository test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([OrderModel, ClientModel, ProductOrder]);
    await sequelize.sync();

    jest.useFakeTimers();
    jest.setSystemTime(mockDate);
  });

  afterEach(async () => {
    await sequelize.close();
    jest.useRealTimers();
  });

  it("should add an order", async () => {
    const product1 = new Product({
      name: "Product 1",
      salesPrice: 100,
      description: "Description 1",
    });

    const product2 = new Product({
      name: "Product 2",
      salesPrice: 200,
      description: "Description 2",
    });

    const orderClient = new Client({
      name: "John Doe",
      email: "john.doe@email.com",
      document :"0000",
      address: new Address({
        street :"Main Street",
        complement :"House",
        number :"123",
        city :"Palo Alto",
        state :"CA",
        zipCode :"12552"
      }),
    });

    const order = new Order({
      client: orderClient,
      products: [product1, product2],
      invoiceId: "anyInvoiceId",
      status: "",
    });

    order.approve();

    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    const result = await orderRepository.findById(order.id.value);
    expect(result).toStrictEqual(order);
  });

  it("should find an order", async () => {
    const clientData = {
        id: "1",
        document: "12345",
        createdAt: mockDate,
        updatedAt: mockDate,
        name: "John Doe",
        email: "john.doe@email.com",
        street: "Main Street",
        number: "123",
        complement: "Next to the bank",
        city: "New York",
        state: "New York",
        zipCode: "122343404",
    }

    const orderData = {
      id: "321",
      createdAt: mockDate,
      updatedAt: mockDate,
      status: "approved",
      invoiceId: "anyInvoiceId",
      clientId: "1",
    };

    const productsData = [
      {
        id: "35",
        orderId: "321",
        createdAt: mockDate,
        updatedAt: mockDate,
        name: "Product 1",
        description: "Description 1",
        salesPrice: 100,
      },
      {
        id: "63",
        orderId: "321",
        createdAt: mockDate,
        updatedAt: mockDate,
        name: "Product 2",
        description: "Description 2",
        salesPrice: 200,
      },
    ];
    

    await ClientModel.create(clientData);
    await OrderModel.create(orderData);
    await ProductOrder.bulkCreate(productsData);
    const orderRepository = new OrderRepository();

    const result = await orderRepository.findById("321");
    expect(result.id.value).toEqual(orderData.id);
    expect(result.status).toEqual(orderData.status);
    expect(result.invoiceId).toEqual(orderData.invoiceId);

    const clientResult = result.client;
    expect(clientResult.id.value).toEqual(clientData.id);
    expect(clientResult.name).toEqual(clientData.name);
    expect(clientResult.email).toEqual(clientData.email);
    expect(clientResult.address.street).toEqual(clientData.street);

    expect(result.products.length).toEqual(productsData.length);

    const firstProductResult = result.products[0];
    expect(firstProductResult.id.value).toEqual(productsData[0].id);
    expect(firstProductResult.name).toEqual(productsData[0].name);
    expect(firstProductResult.salesPrice).toEqual(
      productsData[0].salesPrice
    );
    expect(firstProductResult.description).toEqual(
      productsData[0].description
    );
  });
});