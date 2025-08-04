import StoreCatalogFacade from "../facade/store-catalog.facade";
import IStoreCatalogFacade from "../facade/store-catalog.facade.interface";
import ProductRepository from "../repository/product.repository";
import FindAllProductsUsecase from "../usecase/find-all-products/find-all-products.usecase";
import FindProductUseCase from "../usecase/find-product/find-product.usecase";

export default class StoreCatalogFacadeFactory {
  static create(): IStoreCatalogFacade {
    const productRepository = new ProductRepository();
    const findAllUseCase = new FindAllProductsUsecase(productRepository);
    const findUseCase = new FindProductUseCase(productRepository);

    const facade = new StoreCatalogFacade({
      findUseCase: findUseCase,
      findAllUseCase: findAllUseCase,
    });
    return facade;
  }
}