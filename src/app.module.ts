import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { config } from './config';
import { AppController } from './app.controller';
import { DroneModule } from './drone/drone.module';
import { MedicationModule } from './medication/medication.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
    DroneModule,
    MedicationModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
