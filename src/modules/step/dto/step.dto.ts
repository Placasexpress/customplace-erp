export class CreateStepDto {
  name: string;
  order: number;
  companyId: number;
}

export class UpdateStepDto {
  name?: string;
  order?: number;
  companyId?: number;
}
