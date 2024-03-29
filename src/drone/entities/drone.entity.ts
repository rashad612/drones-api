import { 
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  Unique 
} from 'typeorm';
import { DRONE_MODELS, DRONE_STATES } from '../drone.constants';
import { Medication } from '../../medication/entities/medication.entity';

@Entity()
@Unique(['serial_number'])
export class Drone {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'serial_number', type: 'varchar', length: 100 })
  serial_number: string;

  @Column({
    type: 'enum',
    enum: DRONE_MODELS,
    default: DRONE_MODELS.LIGHT,
  })
  model: DRONE_MODELS

  @Column({ type: 'smallint' })
  weight_limit: number;

  @Column({ type: 'smallint' })
  battery: number;

  @Column({
    type: 'enum',
    enum: DRONE_STATES,
    default: DRONE_STATES.IDLE,
  })
  state: DRONE_STATES;

  @OneToOne(() => Medication)
  @JoinColumn()
  medication?: Medication
}
