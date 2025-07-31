import express, { Express } from "express";
import { Sequelize } from "sequelize-typescript";
import { checkoutRoutes } from "./routes/checkouts.routes";
import { invoicesRoutes } from "./routes/invoices.routes";
import { productsRoutes } from "./routes/products.routes";
import { clientsRoutes } from "./routes/clients.routes";
import { ClientModel } from "../../modules/client-adm/repository/client.model";
import InvoiceModel from "../../modules/invoice/repository/invoice.model";
import InvoiceItemModel from "../../modules/invoice/repository/invoice-item.model";
import { OrderModel } from "../../modules/checkout/repository/order.model";
import ProductOrder from "../../modules/checkout/repository/product.order.model";
import ProductAdmProductModel from "../../modules/product-adm/repository/product.model";
import ProductCatalogModel from "../../modules/store-catalog/repository/product.model";
import TransactionModel from "../../modules/payment/repository/transaction.model";
import { ClientModel as CheckoutClient } from "../../modules/checkout/repository/client.model";
export const app: Express = express();
app.use(express.json());

app.use("/checkout", checkoutRoutes);
app.use("/invoices", invoicesRoutes);
app.use("/products", productsRoutes);
app.use("/clients", clientsRoutes);

export let sequelize: Sequelize;

async function setupDb() {
  sequelize = new Sequelize({
    dialect: "sqlite",
    storage: ":memory:",
    logging: false,
  });
  
  await sequelize.addModels([
    ClientModel, 
    CheckoutClient,
    InvoiceModel, 
    InvoiceItemModel, 
    InvoiceItemModel, 
    OrderModel, 
    ProductOrder, 
    ProductAdmProductModel,
    TransactionModel,
    ProductCatalogModel,
  ]);
  await sequelize.sync();
}
setupDb();