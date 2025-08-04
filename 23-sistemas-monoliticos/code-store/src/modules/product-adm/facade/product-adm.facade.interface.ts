export interface AddProductFacadeInputDto {
    id?: string,
    name: string;
    description: string;
    purchasePrice: number;
    stock: number;
}

export interface CheckStockFacadeInputDto {
    productId: string;
}

export default interface IProductAdmFacade {
    addProduct(input: AddProductFacadeInputDto) : Promise<void>;
    checkStock(input: CheckStockFacadeInputDto) : Promise<CheckStockFacadeOutputDto>;
}

export interface CheckStockFacadeOutputDto {
    productId: string;
    stock: number;
}