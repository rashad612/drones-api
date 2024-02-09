import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DroneController } from './drone.controller';
import { DroneService } from './drone.service';
import { Drone } from './entities/drone.entity';
import { MedicationService } from '../medication/medication.service';
import { Medication } from '../medication/entities/medication.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Drone, Medication])],
  controllers: [DroneController],
  providers: [DroneService, MedicationService]
})
export class DroneModule {}
