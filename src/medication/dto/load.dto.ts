import { IsEnum, IsInt, IsNotEmpty, Length, Max, Min } from 'class-validator';

export class LoadMedicationDto {
  @IsNotEmpty()
  @IsInt()
  id: number;
}