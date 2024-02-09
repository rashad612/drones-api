import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Medication } from './entities/medication.entity';

@Injectable()
export class MedicationService {
  constructor(
    @InjectRepository(Medication)
    private medRepo: Repository<Medication>,
  ) {}

  async getMedicationByCode(code: string): Promise<Medication> {
    return this.medRepo.findOne({ where: {
      code,
    }});
  }
}
