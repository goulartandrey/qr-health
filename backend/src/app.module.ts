import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClinicalInfoModule } from './clinical-infos/clinical-info.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ClinicalBadgesModule } from './clinical-badges/clinical-badges.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'health.db',
      autoLoadEntities: true,
      synchronize: true,
    }),
    UsersModule,
    ClinicalInfoModule,
    ClinicalBadgesModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
  ],
})
export class AppModule {}
