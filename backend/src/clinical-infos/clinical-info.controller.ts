import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { ClinicalInfoService } from './clinical-info.service';
import { CreateClinicalInfoDto } from './dto/create-clinical-info.dto';
import { UpdateClinicalInfoDto } from './dto/update-clinical-info.dto';

@Controller('clinical_infos')
export class ClinicalInfoController {
  constructor(private readonly clinicalInfoService: ClinicalInfoService) {}

  @Post()
  create(@Body() createClinicalInfoDto: CreateClinicalInfoDto) {
    return this.clinicalInfoService.create(createClinicalInfoDto);
  }

  @Get()
  findAll() {
    return this.clinicalInfoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.clinicalInfoService.findOne(id);
  }

  @Get('users/:userId')
  findOneByUserId(@Param('userId', ParseIntPipe) userId: number) {
    return this.clinicalInfoService.findOneByUserId(userId);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateClinicalInfoDto: UpdateClinicalInfoDto,
  ) {
    return this.clinicalInfoService.update(id, updateClinicalInfoDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.clinicalInfoService.remove(id);
  }
}
