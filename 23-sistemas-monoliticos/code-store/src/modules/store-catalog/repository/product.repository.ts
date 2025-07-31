import Id from "../../@shared/domain/value-object/id.value-object";
import Product from "../domain/product.entity";
import ProductGateway from "../gateway/product.gateway";
import ProductModel from "./product.model";

export default class ProductRepository implements ProductGateway {
  async findAll(): Promise<Product[]> {
    const dbProducts = await ProductModel.findAll();

    let products = dbProducts.map((dbProduct) => {
      return new Product({
        id: new Id(dbProduct.id),
        name: dbProduct.name,
        description: dbProduct.description,
        salesPrice: dbProduct.purchasePrice,
      });
    });

    return products;
    
  }

  async find(id: string): Promise<Product> {
    const product = await ProductModel.findOne({
      where: {
        id: id,
      },
    });

    return new Product({
      id: new Id(product.id),
      name: product.name,
      description: product.description,
      salesPrice: product.purchasePrice,
    });
  }
}