import { PartialType } from '@nestjs/mapped-types';
import { CreateClinicalBadgeDto } from './create-clinical-badge.dto';

export class UpdateClinicalBadgeDto extends PartialType(CreateClinicalBadgeDto) {}
