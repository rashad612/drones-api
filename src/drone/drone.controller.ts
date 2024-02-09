import { Controller,
  UseInterceptors,
  Get,
  Post,
  Body,
  Put,
 } from '@nestjs/common';
import { CreateDroneDto } from './dto/create.dto';
import { LoadDroneDto } from './dto/load.dto';
import { DroneService } from './drone.service';
import { Drone } from './entities/drone.entity';
import { MedicationService } from '../medication/medication.service';

@Controller('drone')
export class DroneController {

  constructor(
    private droneService: DroneService,
    private medService: MedicationService,
  ) {}
  
  @Post()
  async create(@Body() createDroneDto: CreateDroneDto): Promise<Drone> {
    const drone = await this.droneService.create(createDroneDto);
    return drone;
  }

  @Put(':id')
  async update(@Body() loadDroneDto: LoadDroneDto): Promise<Drone> {
    const medication = await this.medService.getMedicationByCode(loadDroneDto.medication_code);
    const drone = await this.droneService.getDroneBySerialNo(loadDroneDto.drone_snumber);

    const loadedDrone = this.droneService.loadDrone(drone, medication);
    return loadedDrone;
  }
}
