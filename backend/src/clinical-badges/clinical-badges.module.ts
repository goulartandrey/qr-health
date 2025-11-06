import { forwardRef, Module } from '@nestjs/common';
import { ClinicalBadgesService } from './clinical-badges.service';
import { ClinicalBadgesController } from './clinical-badges.controller';
import { ClinicalBadge } from './entities/clinical-badge.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ClinicalBadge, User]),
    forwardRef(() => UsersModule),
  ],
  controllers: [ClinicalBadgesController],
  providers: [ClinicalBadgesService],
  exports: [ClinicalBadgesService],
})
export class ClinicalBadgesModule {}
