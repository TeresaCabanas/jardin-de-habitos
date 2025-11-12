import { Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common';
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
  async create(createHabitoDto: CreateHabitoDto, idUsuario: string): Promise<Habito> {
    
    //Creamos una instancia de la entidad con los datos
    const nuevoHabito = this.habitoRepository.create({
      ...createHabitoDto,
      id_usuario: idUsuario, //Asignamos el ID del token
    });
    // Guardamos la nueva entidad en la base de datos
    return this.habitoRepository.save(nuevoHabito);
  }

  /**
   * Busca todos los hábitos ligados a un usuario específico.
   * @param idUsuario ID del usuario para filtrar los hábitos.
   * @returns Una lista de entidades Habito.
   */
  async findAll(idUsuario: string): Promise<Habito[]> {
    // Usamos el método find() del repositorio de TypeORM
    // y aplicamos una condición 'where' para filtrar por el ID del usuario
    return this.habitoRepository.find({
      where: { 
        id_usuario: idUsuario 
      },
    });
  }

  /**
     * Busca un hábito específico de un usuario.
     * @param idHabito ID del hábito a buscar.
     * @param idUsuario ID del usuario autenticado (para verificar la propiedad).
     * @returns Los datos del hábito.
     */
    async findOne(idHabito: string, idUsuario: string): Promise<Habito> {
        
        // 1. Usa findOneBy para buscar un solo resultado.
        // 2. Filtra por id (del hábito) Y por id_usuario.
        const habito = await this.habitoRepository.findOneBy({ 
            id: idHabito,
            id_usuario: idUsuario, //Solo busca en los del usuario
        });
        if (!habito) {
            // Si no se encuentra el hábito (o si existe, pero pertenece a otro usuario), lanza un error 404.
            throw new NotFoundException(`Hábito con ID ${idHabito} no encontrado o no pertenece al usuario.`);
        }
        return habito; // Retorna el objeto Habito
    }

  update(id: string, updateHabitoDto: UpdateHabitoDto) {
    return `This action updates a #${id} habito`;
  }

  remove(id: string) {
    return `This action removes a #${id} habito`;
  }
}
