import { IsEnum, IsInt, IsNotEmpty, Length, Max, Min } from 'class-validator';
import { DRONE_MODELS, DRONE_STATES } from '../drone.constants';
export class CreateDroneDto {
  @IsNotEmpty()
  @Length(3, 100)
  serial_number: string;
  
  @IsNotEmpty()
  @IsEnum(DRONE_MODELS)
  model: DRONE_MODELS;

  @IsNotEmpty()
  @IsInt()
  @Max(500)
  weight_limit: number;

  @IsNotEmpty()
  @IsInt()
  @Min(0)
  @Max(100)
  battery: number;

  @IsNotEmpty()
  @IsEnum(DRONE_STATES)
  state: DRONE_STATES;
}