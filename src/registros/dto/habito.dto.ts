import { IsNotEmpty,IsUUID } from 'class-validator';

export class HabitoDto {
  @IsUUID()
  @IsNotEmpty()
  id_habito: string; // El UUID del hábito al que pertenece el registro
}