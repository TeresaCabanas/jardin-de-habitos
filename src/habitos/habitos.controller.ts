import { Controller, Get, Post, Body, Patch, Param, Delete,UseGuards,Req } from '@nestjs/common';
import { HabitosService } from './habitos.service';
import { CreateHabitoDto } from './dto/create-habito.dto';
import { UpdateHabitoDto } from './dto/update-habito.dto';
import { AuthGuard } from '@nestjs/passport'; 

import type { Request } from 'express';

@Controller('habitos')
export class HabitosController {
  constructor(private readonly habitosService: HabitosService) {}

 /**
   * Ruta para CREAR un nuevo hábito.
   * Protegida por JWT.
   */
  @Post()
  @UseGuards(AuthGuard('jwt')) //Proteger la ruta
  create(
    @Body() createHabitoDto: CreateHabitoDto,
    @Req() req: Request, 
  ) {
    //Extraer el ID del usuario (que JwtStrategy puso en req.user)
    const idDelUsuario = (req.user as any).id_usuario; 
    // (o (req.user as any).sub, dependiendo de tu JwtStrategy)

    //Llamar al servicio con AMBOS datos
    return this.habitosService.create(createHabitoDto, idDelUsuario);
  }

  @Get()
  findAll() {
    return this.habitosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.habitosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHabitoDto: UpdateHabitoDto) {
    return this.habitosService.update(+id, updateHabitoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.habitosService.remove(+id);
  }
}
