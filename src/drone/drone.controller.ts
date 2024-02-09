import { Controller,
  UseInterceptors,
  Get,
  Post,
  Body,
  Put,
  Param,
 } from '@nestjs/common';
import { CreateDroneDto } from './dto/create.dto';
import { LoadDroneDto } from './dto/load.dto';
import { GetDto } from './dto/get.dto';
import { BatteryDto } from './dto/battery.dto';
import { DroneService } from './drone.service';
import { Drone } from './entities/drone.entity';
import { MedicationService } from '../medication/medication.service';
import { Medication } from '../medication/entities/medication.entity';

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

    const loadedDrone = await this.droneService.loadDrone(drone, medication);
    return loadedDrone;
  }

  @Get(':id/medication')
  async getLoadedMedication(@Param() params: GetDto): Promise<Medication> {
    const medication = this.droneService.getDroneMedication(parseInt(params.id));
    return medication;
  }

  @Get('available')
  async getAvailableDrones(): Promise<Drone[]> {
    const drones = await this.droneService.getIdleDrones();
    return drones;
  }

  @Get(':id/battery')
  async getBattery(@Param() params: GetDto): Promise<BatteryDto> {
    const battery = this.droneService.getDroneBattery(parseInt(params.id));
    return battery;
  }
}
