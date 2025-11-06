import { forwardRef, Module } from '@nestjs/common';
import { ClinicalInfoService } from './clinical-info.service';
import { ClinicalInfoController } from './clinical-info.controller';
import { ClinicalInfo } from './entities/clinical-info.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ClinicalInfo, User]),
    forwardRef(() => UsersModule),
  ],
  controllers: [ClinicalInfoController],
  providers: [ClinicalInfoService],
  exports: [ClinicalInfoService],
})
export class ClinicalInfoModule {}
