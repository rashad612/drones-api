import {
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
 } from '@nestjs/common';
 import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, LessThan } from 'typeorm';
import { Drone } from './entities/drone.entity';
import { CreateDroneDto } from './dto/create.dto';
import { BatteryDto } from './dto/battery.dto';
import { Medication } from '../medication/entities/medication.entity';
import { DRONE_STATES } from './drone.constants';

@Injectable()
export class DroneService {
  private readonly logger = new Logger(DroneService.name);
  constructor(
    @InjectRepository(Drone)
    private droneRepo: Repository<Drone>,
  ) {}

  async create(createDroneDto: CreateDroneDto): Promise<Drone> {
    const drone = this.droneRepo.create(createDroneDto);
    return this.droneRepo.save(drone);
  }

  async getDroneBySerialNo(serialNo: string): Promise<Drone> {
    return this.droneRepo.findOne({ where: {
      serial_number: serialNo,
    }});
  }

  async loadDrone(drone: Drone, medication: Medication): Promise<Drone> {
    
    if (drone.state !== DRONE_STATES.IDLE) {
      throw new HttpException('Drone is busy. Cannot be loaded.', HttpStatus.BAD_REQUEST);
    }


    drone.state = DRONE_STATES.LOADING;

    if (drone.battery < 25) {
      drone.state = DRONE_STATES.IDLE;
      drone.medication = null;
      await this.droneRepo.save(drone);
      throw new HttpException('Drone battery is low', HttpStatus.BAD_REQUEST);
    } else if (drone.weight_limit < medication.weight) {
      drone.state = DRONE_STATES.IDLE;
      throw new HttpException('Drone cannot handle medication weight.', HttpStatus.BAD_REQUEST);
    }

    drone.state = DRONE_STATES.LOADED;
    drone.medication = medication;
    return this.droneRepo.save(drone);
  }

  async getDroneMedication(droneId: number): Promise<Medication> {
    const drone = await this.droneRepo.findOne({ 
      where: {
      id: droneId,
      },
      relations: {
        medication: true,
      },
    });

    if (drone.medication) {
      return drone.medication;
    } else {
      throw new HttpException(`Drone doesn't have any loaded medications`, HttpStatus.NOT_FOUND);
    }
  }

  async getIdleDrones(): Promise<Drone[]> {
    return this.droneRepo.find({
      where: {
        state: DRONE_STATES.IDLE,
      }
    });
  }

  async getDroneBattery(droneId: number): Promise<BatteryDto> {
    const drone = await this.droneRepo.findOne({ where: {
      id: droneId,
    }});

    if (drone) {
      return { battery: `${drone.battery}%` };
    } else {
      throw new HttpException(`no Drones were found with id: ${droneId}`, HttpStatus.NOT_FOUND);
    }
  }

  // Assumption: check low battery levels only.
  @Cron(CronExpression.EVERY_30_SECONDS)
  async checkLowBatteryLevels() {
    const drones = await this.droneRepo.find({ where: {
      battery: LessThan(25),
    }});
    const logMessages = drones.map( d => (`Drone: ${d.serial_number} has low battery (${d.battery}%).`) );
    this.logger.log(logMessages);
  }
}
