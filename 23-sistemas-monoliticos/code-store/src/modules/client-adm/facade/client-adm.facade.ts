import IUseCase from "../../@shared/use-case/use-case.internface";

import IClientAdmFacade, { AddClientFacadeInputDto, FindClientFacadeInputDto, FindClientFacadeOutputDto } from "./client-adm.facade.interface";

export interface UseCaseProps {
    findUseCase: IUseCase,
    addUseCase: IUseCase
}

export default class ClientAdmFacade implements IClientAdmFacade
{
    private _findUseCase: IUseCase;
    private _addUseCase: IUseCase;

    constructor(useCaseProps: UseCaseProps) {
        this._findUseCase = useCaseProps.findUseCase;
        this._addUseCase = useCaseProps.addUseCase;
    }

    async add(input: AddClientFacadeInputDto): Promise<void> {
       return await this._addUseCase.execute(input);
    }
    async find(input: FindClientFacadeInputDto): Promise<FindClientFacadeOutputDto> {
        return await this._findUseCase.execute(input);
    }

}