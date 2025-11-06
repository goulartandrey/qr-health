import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { ClinicalInfoModule } from 'src/clinical-infos/clinical-info.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    forwardRef(() => ClinicalInfoModule),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
