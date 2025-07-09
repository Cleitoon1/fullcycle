import IUseCase from "../../../@shared/use-case/use-case.internface";
import IClientGateway from "../../gateway/client.gateway";
import { FindClientUseCaseInputDto, FindClientUseCaseOutputDto } from "./find-client.usecase.dto";

export default class FindClientUseCase implements IUseCase
{
    private _clientRepository: IClientGateway;
    
    constructor(clientRepository: IClientGateway) {
        this._clientRepository = clientRepository;
    }

    async execute(input: FindClientUseCaseInputDto): Promise<FindClientUseCaseOutputDto> {
        const client = await this._clientRepository.find(input.id);

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