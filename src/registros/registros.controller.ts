import { Controller, Get, Post, Body, Req, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { RegistrosService } from './registros.service';
import { CreateRegistroDiaDto } from './dto/create-registro.dto';
import { UpdateRegistroDto } from './dto/update-registro.dto';
import { HabitoDto } from './dto/habito.dto';
import { AuthGuard } from '@nestjs/passport';
import type { Request } from 'express';

@Controller('registros')
export class RegistrosController {
  constructor(private readonly registrosService: RegistrosService) {}

  /**
   * Registra el seguimiento diario de un hábito.
   * Ruta: POST /registro-dia
   * Protegida por JWT.
   */
  @Post()
  @UseGuards(AuthGuard('jwt'))
  create(
    @Body() createRegistroDiaDto: CreateRegistroDiaDto,
    @Req() req: Request, 
  ) {
    // Extraemos el ID del usuario del token
    const idDelUsuario = (req.user as any).id_usuario; 

    // Llamamos al servicio para crear el registro y actualizar la mata.
    return this.registrosService.create(createRegistroDiaDto, idDelUsuario);
  }

  @Get()
  @UseGuards(AuthGuard('jwt')) // Proteger la ruta con JWT
  findAll(
    @Body() { id_habito }: HabitoDto,
    @Req() req: Request,
  ) {
    const id_usuario = (req.user as any).id_usuario; 
    return this.registrosService.findAll(id_habito, id_usuario);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.registrosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRegistroDto: UpdateRegistroDto) {
    return this.registrosService.update(+id, updateRegistroDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.registrosService.remove(+id);
  }
}
