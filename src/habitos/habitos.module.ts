import { Module } from '@nestjs/common';
import { HabitosService } from './habitos.service';
import { HabitosController } from './habitos.controller';
import { TypeOrmModule } from '@nestjs/typeorm'; 
import { Habito } from './entities/habito.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Habito]), //Registrar la Entidad Habito
  ],
  controllers: [HabitosController],
  providers: [HabitosService],
})
export class HabitosModule {}