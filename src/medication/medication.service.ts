import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Medication } from './entities/medication.entity';
import { LoadMedicationDto } from './dto/load.dto';

@Injectable()
export class MedicationService {
  constructor(
    @InjectRepository(Medication)
    private medRepo: Repository<Medication>,
  ) {}

  async getMedication(loadDto: LoadMedicationDto): Promise<Medication> {
    return this.medRepo.findOne({ where: {
      id: loadDto.id,
    }});
  }
}
