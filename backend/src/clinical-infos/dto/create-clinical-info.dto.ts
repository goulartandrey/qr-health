import { IsArray, IsInt, IsOptional, IsString } from 'class-validator';

export class CreateClinicalInfoDto {
  @IsInt()
  userId: number;

  @IsString()
  bloodType: string;

  @IsString()
  gender: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  allergies?: string[];

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  surgeries?: string[];

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  medicines?: string[];

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  chronicDiseases?: string[];

  @IsString()
  emergencyContact: string;
}
