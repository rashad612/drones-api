import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Drone } from './entities/drone.entity';
import { CreateDroneDto } from './dto/create.dto';

@Injectable()
export class DroneService {
  constructor(
    @InjectRepository(Drone)
    private droneRepo: Repository<Drone>,
  ) {}

  async create(createDroneDto: CreateDroneDto): Promise<Drone> {
    const drone: Drone = new Drone();

    drone.serial_number = createDroneDto.serialNumber;
    drone.model = createDroneDto.model;
    drone.weight_limit = createDroneDto.weightLimit;
    drone.battery = createDroneDto.battery;
    drone.state = createDroneDto.state;

    return this.droneRepo.save(drone);
  }
}
