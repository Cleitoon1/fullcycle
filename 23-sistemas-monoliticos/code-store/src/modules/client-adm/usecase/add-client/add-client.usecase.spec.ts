import AddClientUseCase from "./add-client.usecase";

const MockRepository = () => {
    return {
        add: jest.fn(),
        find: jest.fn(),
    }
}

describe ("AddClient UseCase unit test", () => {

    it("should add a client", async () => {
        const repository = MockRepository();
        const usecase = new AddClientUseCase(repository);
        const input = {
            name: "Client 1",
            email: "client@teste.com",
            document: "123456789",
            address: "Address 1"
        };

        const result = await usecase.execute(input);

        expect(repository.add).toHaveBeenCalled();
        expect(result).toEqual({
            id: expect.any(String),
            name: "Client 1",
            email: "client@teste.com",
            document: "123456789",
            address: "Address 1",
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date),
        });
    });

})