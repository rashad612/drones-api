import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { IsUrl, Matches } from 'class-validator';

@Entity()
export class Medication {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  @Matches(/^[a-zA-Z0-9_\-]+$/)
  name: string;

  @Column({ type: 'smallint' })
  weight: number;
  
  @Column({ type: 'varchar', length: 100 })
  @Matches(/^[A-Z0-9_]+$/)
  code: string;

  @Column({ type: 'varchar', length: 2048 })
  @IsUrl()
  image: string;
}
