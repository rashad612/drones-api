import { IsNotEmpty, Length } from 'class-validator';

export class LoadDroneDto {
  @IsNotEmpty()
  @Length(3, 100)
  drone_snumber: string;
  
  @IsNotEmpty()
  @Length(3, 100)
  medication_code: string;
}