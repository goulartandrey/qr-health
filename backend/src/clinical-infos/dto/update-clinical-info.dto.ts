import { PartialType } from '@nestjs/mapped-types';
import { CreateClinicalInfoDto } from './create-clinical-info.dto';

export class UpdateClinicalInfoDto extends PartialType(CreateClinicalInfoDto) {}
