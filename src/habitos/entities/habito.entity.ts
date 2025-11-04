import { Usuario } from 'src/usuarios/entities/usuario.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity('habitos') // 'habitos' es el nombre de la tabla en PostgreSQL
export class Habito {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  nombre_habito: string;

  @Column({ type: 'int', default: 1 })
  frecuencia_diaria: number;

  @Column({ type: 'text', nullable: true })
  notas: string;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  // --- Relación con Usuario ---

  @Column() // Columna que guardará el FK
  id_usuario: number
  @ManyToOne(() => Usuario, (usuario) => usuario.habitos)
  @JoinColumn({ name: 'id_usuario' }) // Especifica que 'id_usuario' es el FK
  usuario: Usuario;
}