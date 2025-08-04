import Product from "../../domain/product.entity";
import { PlaceOrderInputDto } from "./place-order.dto";
import PlaceOrderUseCase from "./place-order.usecase";

const mockDate = new Date(2000, 1, 1);

describe('PlaceOrderUseCase unit tests', () => {

    describe("validate products method", () => {

        //@ts-expect-error - no params in constructor
        const placeOrderUseCase = new PlaceOrderUseCase();

        it("should throw an error when no products are selected", async () => {
            const input: PlaceOrderInputDto = {
                clientId: "1",
                products: []
            };

            await expect(placeOrderUseCase["validateProducts"](input)).rejects.toThrow("No products selected");
        });

        it("should throw an error when products is out of stock", async () => {
            const mockProductFacade = {
                checkStock: jest.fn(({productId}: {productId: string}) =>
                    Promise.resolve({
                        stock: productId === "1" ? 0 : 1,
                        productId,
                    })
                )
            };

            //@ts-expect-error - force set productFacade
            placeOrderUseCase["_productAdmFacade"] = mockProductFacade;

            let input = {
                clientId: "1",
                products: [
                    { productId: "1" }
                ]
            };

            await expect(placeOrderUseCase["validateProducts"](input)).rejects.toThrow("Product 1 is not available in stock");
            expect(mockProductFacade.checkStock).toHaveBeenCalledTimes(1);


            input = {
                clientId: "0",
                products: [
                    { productId: "2" },
                    { productId: "1" },
                ]
            };

            await expect(placeOrderUseCase["validateProducts"](input)).rejects.toThrow("Product 1 is not available in stock");
            expect(mockProductFacade.checkStock).toHaveBeenCalledTimes(3);
        });

        
    });

    describe("get Products method", () => {
        beforeAll(() => {
            jest.useFakeTimers();
            jest.setSystemTime(mockDate);

        });

        afterAll(() => {
            jest.useRealTimers();
        });

        //@ts-expect-error - no params in constructor
        const placeOrderUseCase = new PlaceOrderUseCase();

        it("should throw an error when product not found", async () => {
            const mockCatalogFacade = {
                find: jest.fn().mockResolvedValue(null),
            };
            //@ts-expect-error - force set productFacade
            placeOrderUseCase["_storeCatalogFacade"] = mockCatalogFacade;

            await expect(placeOrderUseCase["getProduct"]("0")).rejects.toThrow("Product not found");
            expect(mockCatalogFacade.find).toHaveBeenCalledTimes(1);
        });

        it("should return a product", async () => {
            const mockCatalogFacade = {
                find: jest.fn().mockResolvedValue({
                    id: "1",
                    name: "Product 1",
                    salesPrice: 100,
                    description: "Description of Product 1",                    
                }),
            };
            //@ts-expect-error - force set productFacade
            placeOrderUseCase["_storeCatalogFacade"] = mockCatalogFacade;

            const product = await placeOrderUseCase["getProduct"]("1");
            expect(mockCatalogFacade.find).toHaveBeenCalledWith({id: "1"});
            expect(product).toEqual(new Product({
                id: "1",
                name: "Product 1",
                salesPrice: 100,
                description: "Description of Product 1"
            }));
        });
    });

    describe("execute method", () => {
        
        it("should throw an error when client not found", async () => {
            const mockClientFacade = {
                find: jest.fn().mockResolvedValue(null),
            };

            //@ts-expect-error - no params in constructor
            const placeOrderUseCase = new PlaceOrderUseCase();

            //@ts-expect-error - force set clientFacade
            placeOrderUseCase["_clientAdmFacade"] = mockClientFacade;

            const input: PlaceOrderInputDto = {
                clientId: "0",
                products: []
            };

            await expect(placeOrderUseCase.execute(input)).rejects.toThrow("Client not found");
        });

        it("should throw an error when products are not valid", async () => {
            const mockClientFacade = {
                find: jest.fn().mockResolvedValue(true),
            };

            //@ts-expect-error - no params in constructor
            const placeOrderUseCase = new PlaceOrderUseCase();
            //@ts-expect-error - force set clientFacade
            placeOrderUseCase["_clientAdmFacade"] = mockClientFacade;

            const mockValidateProducts = jest.
                //@ts-expect-error - spy on private method
                spyOn(placeOrderUseCase, "validateProducts")
                //@ts-expect-error - not return never
                .mockRejectedValue(new Error("No products selected"));

            const input: PlaceOrderInputDto = {
                clientId: "1",
                products: []
            };

            await expect(placeOrderUseCase.execute(input)).rejects.toThrow("No products selected");
            expect(mockValidateProducts).toHaveBeenCalledTimes(1);
        });

        describe("place an order", () => {
            const clientProps = {
                id: "1",
                name: "Client 1",
                document: "123456789",
                email: "client@user.com",
                address: {
                street: "123 Main St",
                number: "123",
                complement: "Apt 1",
                city: "City",
                state: "State",
                zipCode: "12345-678"
                },
            }

            const mockClientFacade = {
                find: jest.fn().mockResolvedValue(clientProps),
                add: jest.fn()
            };

            const mockPaymentFacade = {
                process: jest.fn(),
            }

            const mockCheckoutRepo = {
                create: jest.fn(),
                findById: jest.fn()
            }

            const mockInvoiceFacade = {
                generate: jest.fn().mockResolvedValue({id: "1"}),
                find: jest.fn(),
            }

            const placeOrderUseCase = new PlaceOrderUseCase(
                mockCheckoutRepo,
                mockClientFacade,
                null,
                null,
                mockInvoiceFacade,
                mockPaymentFacade
            );

            const products = {
                "1": new Product({
                    id: "1",
                    name: "Product 1",
                    salesPrice: 40,
                    description: "Description of Product 1"
                }),
                "2": new Product({
                    id: "2",
                    name: "Product 2",
                    salesPrice: 30,
                    description: "Description of Product 2"
                }),
            };

            const mockValidateProducts = jest.
                //@ts-expect-error - spy on private method
                spyOn(placeOrderUseCase, "validateProducts")
                //@ts-expect-error - not return never
                .mockResolvedValue(null);

            const mockGetProduct = jest.
                //@ts-expect-error - spy on private method
                spyOn(placeOrderUseCase, "getProduct")
                //@ts-expect-error - not return never
                .mockImplementation((productId: keyof typeof products) => {
                    return products[productId];
                });

            it("should not be approved", async () => {
                mockPaymentFacade.process = mockPaymentFacade.process.mockReturnValue({
                    transactionId: "1",
                    orderId: "1o",
                });
                
                const input: PlaceOrderInputDto = {
                    clientId: "1",
                    products: [
                        { productId: "1" },
                        { productId: "2" },
                    ]
                };

                let output = await placeOrderUseCase.execute(input);
                expect(output.invoiceId).toBeNull();
                expect(output.total).toBe(70);
                expect(output.products).toStrictEqual([
                    { productId: "1" },
                    { productId: "2" },
                    ]);
                expect(mockClientFacade.find).toHaveBeenCalledTimes(1);
                expect(mockClientFacade.find).toHaveBeenCalledWith({ id: "1" });
                expect(mockValidateProducts).toHaveBeenCalledTimes(1);
                expect(mockValidateProducts).toHaveBeenCalledWith(input);
                expect(mockGetProduct).toHaveBeenCalledTimes(2);
                expect(mockCheckoutRepo.create).toHaveBeenCalledTimes(1);
                expect(mockPaymentFacade.process).toHaveBeenCalledTimes(1);
                expect(mockPaymentFacade.process).toHaveBeenCalledWith({
                orderId: output.id,
                amount: output.total,
                });

                expect(mockInvoiceFacade.generate).toHaveBeenCalledTimes(0);
            });

            it("should be approved", async () => {
                mockPaymentFacade.process = mockPaymentFacade.process.mockReturnValue({
                  transactionId: "1t",
                  orderId: "1o",
                  amount: 100,
                  status: "approved",
                  createdAt: new Date(),
                  updatedAt: new Date(),
                });
        
                const input: PlaceOrderInputDto = {
                  clientId: "1c",
                  products: [{ productId: "1" }, { productId: "2" }],
                };
        
                let output = await placeOrderUseCase.execute(input);
        
                expect(output.invoiceId).toBe("1");
                expect(output.total).toBe(70);
                expect(output.products).toStrictEqual([
                  { productId: "1" },
                  { productId: "2" },
                ]);
                expect(mockClientFacade.find).toHaveBeenCalledTimes(1);
                expect(mockClientFacade.find).toHaveBeenCalledWith({ id: "1c" });
                expect(mockValidateProducts).toHaveBeenCalledTimes(1);
                expect(mockGetProduct).toHaveBeenCalledTimes(2);
                expect(mockCheckoutRepo.create).toHaveBeenCalledTimes(1);
                expect(mockPaymentFacade.process).toHaveBeenCalledTimes(1);
                expect(mockPaymentFacade.process).toHaveBeenCalledWith({
                  orderId: output.id,
                  amount: output.total,
                });
                expect(mockInvoiceFacade.generate).toHaveBeenCalledTimes(1);
                expect(mockInvoiceFacade.generate).toHaveBeenCalledWith({
                  name: clientProps.name,
                  document: clientProps.document,
                  street: clientProps.address.street,
                  number: clientProps.address.number,
                  complement: clientProps.address.complement,
                  city: clientProps.address.city,
                  state: clientProps.address.state,
                  zipCode: clientProps.address.zipCode,
                  items: [
                    {
                      id: products["1"].id.value,
                      name: products["1"].name,
                      price: products["1"].salesPrice,
                    },
                    {
                      id: products["2"].id.value,
                      name: products["2"].name,
                      price: products["2"].salesPrice,
                    },
                  ],
                });
            });        
        });
    });
});