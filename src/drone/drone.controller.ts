import { Controller, UseInterceptors, Get, HttpCode, Post, Body } from '@nestjs/common';
import { ErrorsInterceptor } from '../error.interceptor';
import { CreateDroneDto } from './dto/create.dto';
import { DroneService } from './drone.service';

@Controller('drone')
@UseInterceptors(ErrorsInterceptor)
export class DroneController {

  constructor(private droneService: DroneService) {}
  
  @Post()
  @HttpCode(204)
  create(@Body() createDroneDto: CreateDroneDto) {
    this.droneService.create(createDroneDto);
  }
}
