import Id from "../../../@shared/domain/value-object/id.value-object";
import Client from "../../domain/client.entity";
import FindClientUseCase from "./find-client.usecase";

//@ts-expect-error - missing params from base entity (not required)
const client = new Client({
  id: new Id("123"),
  name: "John Doe",
  email: "john@doe.com",
  document: "123456789",
    address: "123 Main St",
});

const MockRepository = () => {
  return {
    add: jest.fn(),
    find: jest.fn().mockReturnValue(Promise.resolve(client)),
  };
}

describe("FindClient UseCase unit test", () => {

    it("should find a client", async () => {
        const repository = MockRepository();
        const usecase = new FindClientUseCase(repository);
        const input = {
            id: "123",
        }

        const result = await usecase.execute(input);
        expect(repository.find).toHaveBeenCalledWith("123");
        expect(result).toEqual({
            id: "123",
            name: "John Doe",
            email: "john@doe.com",
            document: "123456789",
            address: "123 Main St",
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date),
        });

    });
})
