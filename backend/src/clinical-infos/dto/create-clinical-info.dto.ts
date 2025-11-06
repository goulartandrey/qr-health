import { IsInt, IsOptional, IsString } from 'class-validator';

export class CreateClinicalInfoDto {
  @IsInt()
  userId: number;

  @IsString()
  bloodType: string;

  @IsString()
  @IsOptional()
  allergies: string;

  @IsString()
  @IsOptional()
  surgeries: string;

  @IsString()
  @IsOptional()
  medicines: string;

  @IsString()
  @IsOptional()
  chronicDiseases: string;

  @IsString()
  emergencyContact: string;
}
