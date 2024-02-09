import { Controller, Get, HttpCode, Post, Body } from '@nestjs/common';
import { CreateDroneDto } from './dto/create.dto';
import { DroneService } from './drone.service';

@Controller('drone')
export class DroneController {

  constructor(private droneService: DroneService) {}
  
  @Post()
  @HttpCode(204)
  create(@Body() createDroneDto: CreateDroneDto) {
    this.droneService.create(createDroneDto);
  }
}
