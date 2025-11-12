import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt'; 
import { UsuariosModule } from 'src/usuarios/usuarios.module';
import { JwtStrategy } from './jwt.strategy'; 

@Module({
  imports: [
    UsuariosModule, // Importa el módulo de usuarios para acceder a UsuariosService
    
    // Configura el módulo de Passport
    PassportModule.register({ defaultStrategy: 'jwt' }),
    
    // Configura el módulo de JWT (aquí defines el token)
    JwtModule.register({
      secret: 'parangatutirimicuaro', // Clave secreta para firmar el token (debería estar en variables de entorno)
      signOptions: { expiresIn: '1h' }, // El token expira en 1 hora
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService,
    JwtStrategy], 
})
export class AuthModule {}