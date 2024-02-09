import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import config  from './config';
import { AppController } from './app.controller';
import { DroneModule } from './drone/drone.module';
import { MedicationModule } from './medication/medication.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => (configService.get('config.typeorm')),
    }),
    DroneModule,
    MedicationModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
