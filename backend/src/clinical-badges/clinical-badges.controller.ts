import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { ClinicalBadgesService } from './clinical-badges.service';
import { CreateClinicalBadgeDto } from './dto/create-clinical-badge.dto';
import { UpdateClinicalBadgeDto } from './dto/update-clinical-badge.dto';

@Controller('clinical_badges')
export class ClinicalBadgesController {
  constructor(private readonly clinicalBadgesService: ClinicalBadgesService) {}

  @Post()
  create(@Body() createClinicalBadgeDto: CreateClinicalBadgeDto) {
    return this.clinicalBadgesService.create(createClinicalBadgeDto);
  }

  @Get()
  findAll() {
    return this.clinicalBadgesService.findAll();
  }

  @Get(':id')
  findOne(
    @Param('id', ParseIntPipe) id: number,
    @Query('password') password: string,
  ) {
    return this.clinicalBadgesService.findOne(id, password);
  }

  @Get('users/:userId')
  findOneByUserId(@Param('userId', ParseIntPipe) userId: number) {
    return this.clinicalBadgesService.findOneByUserId(userId);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateClinicalBadgeDto: UpdateClinicalBadgeDto,
  ) {
    return this.clinicalBadgesService.update(id, updateClinicalBadgeDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.clinicalBadgesService.remove(id);
  }
}
