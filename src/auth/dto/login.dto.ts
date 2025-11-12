// src/auth/dto/login.dto.ts

import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class LoginDto {
  // 1. Definir 'email' como permitido, no vacío y con formato de email
  @IsEmail()
  @IsNotEmpty()
  email: string;

  // 2. Definir 'password' como permitido, no vacío y con un largo mínimo
  @IsString()
  @IsNotEmpty()
  @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
  password: string;
}