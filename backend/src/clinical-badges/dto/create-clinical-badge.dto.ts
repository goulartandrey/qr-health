import { IsInt, IsString } from 'class-validator';

export class CreateClinicalBadgeDto {
  @IsInt()
  userId: number;

  @IsInt()
  clinicalInfoId: number;

  @IsString()
  publicPassword: string;
}
