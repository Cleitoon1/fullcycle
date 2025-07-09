import Id from "../../../@shared/domain/value-object/id.value-object";
import IUseCase from "../../../@shared/use-case/use-case.internface";
import Client from "../../domain/client.entity";
import IClientGateway from "../../gateway/client.gateway";
import { addClientUseCaseInputDto, addClientUseCaseOutputDto } from "./add-client.usecase.dto";

export default class AddClientUseCase implements IUseCase
{
    private _clientRepository: IClientGateway;

    constructor(clientRepository: IClientGateway) {
        this._clientRepository = clientRepository;
    }

    async execute(input: addClientUseCaseInputDto): Promise<addClientUseCaseOutputDto> {
       const props = {
            id: new Id(input.id),
            name: input.name,
            email: input.email,
            document: input.document,
            address: input.address,
        };

        const client = new Client(props);
        await this._clientRepository.add(client);

        return {
            id: client.id.value,
            name: client.name,
            document: client.document,
            email: client.email,
            address: client.address,
            createdAt: client.createdAt,
            updatedAt: client.updatedAt,
       }
    }
    
}