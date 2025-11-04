// src/usuario/dto/create-usuario.dto.ts

import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUsuarioDto {
  
  // 1. Nombre: Debe ser una cadena de texto y no puede estar vacío.
  @IsString()
  @IsNotEmpty({ message: 'El nombre es obligatorio.' })
  nombre: string; 

  // 2. Email: Debe ser una cadena de texto, tener formato de email y no estar vacío.
  @IsEmail()
  @IsNotEmpty({ message: 'El email es obligatorio.' })
  email: string;

  // 3. Password: Debe ser una cadena de texto, no puede estar vacía, y debe tener un largo mínimo.
  @IsString()
  @IsNotEmpty({ message: 'La contraseña es obligatoria.' })
  @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres.' })
  password: string;
}