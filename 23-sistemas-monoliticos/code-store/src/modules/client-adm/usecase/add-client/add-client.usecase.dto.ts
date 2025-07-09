export interface addClientUseCaseInputDto {
  id?: string,
  name: string;
  email: string;
  document: string;
  address: string;
}

export interface addClientUseCaseOutputDto {
  id: string;
  name: string;
  email: string;
  document: string;
  address: string;
  createdAt: Date;
  updatedAt: Date;
}