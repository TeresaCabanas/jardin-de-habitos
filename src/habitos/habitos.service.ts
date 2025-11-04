import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Habito } from './entities/habito.entity';
import { CreateHabitoDto } from './dto/create-habito.dto';
import { UpdateHabitoDto } from './dto/update-habito.dto';

@Injectable()
export class HabitosService {
  constructor(
    @InjectRepository(Habito) // Inyectar el Repositorio
    private habitoRepository: Repository<Habito>,
  ) {}

  /**
   * Crea un nuevo hábito para un usuario específico.
   * @param createHabitoDto Datos del hábito (nombre, frecuencia, notas)
   * @param idUsuario ID del usuario (extraído del token)
   */
  async create(createHabitoDto: CreateHabitoDto, idUsuario: number): Promise<Habito> {
    
    //Creamos una instancia de la entidad con los datos
    const nuevoHabito = this.habitoRepository.create({
      ...createHabitoDto,
      id_usuario: idUsuario, //Asignamos el ID del token
    });

    // Guardamos la nueva entidad en la base de datos
    return this.habitoRepository.save(nuevoHabito);
  }

  findAll() {
    return `This action returns all habitos`;
  }

  findOne(id: number) {
    return `This action returns a #${id} habito`;
  }

  update(id: number, updateHabitoDto: UpdateHabitoDto) {
    return `This action updates a #${id} habito`;
  }

  remove(id: number) {
    return `This action removes a #${id} habito`;
  }
}
