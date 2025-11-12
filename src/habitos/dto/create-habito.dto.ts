import { IsNotEmpty, IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class CreateHabitoDto {
  @IsString()
  @IsNotEmpty({ message: 'El nombre del hábito no puede estar vacío.' })
  nombre_habito: string;

  @IsNumber()
  @IsNotEmpty()
  @Min(1, { message: 'La frecuencia diaria debe ser al menos 1.' })
  frecuencia_diaria: number;

  @IsString()
  @IsOptional() // Las notas pueden ser opcionales
  notas?: string;
}