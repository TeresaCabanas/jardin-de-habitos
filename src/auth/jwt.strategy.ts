import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
  ) {
    super({
      //Dónde buscar el token:
      // Le decimos que lo busque en el header 'Authorization' como un token 'Bearer'
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),

      //No ignorar la expiración (aunque no la pusimos, es buena práctica)
      ignoreExpiration: false,
      
      //La clave secreta para verificar la firma del token
      // ¡DEBE SER LA MISMA QUE USASTE EN auth.module.ts!
      secretOrKey: 'parangatutirimicuaro', 
    });
  }

  /**
   * Esta función se ejecuta AUTOMÁTICAMENTE después de que
   * Passport verifica que el token es válido y no ha expirado.
   * Recibe el 'payload' que pusimos en el token al hacer login.
   */
  async validate(payload: any) {
    // payload = { sub: usuario.id, email: usuario.email }
    
    // Opcional: Podrías verificar si el usuario (payload.sub) todavía existe
    // const usuario = await this.usuariosService.findOne(payload.sub);
    // if (!usuario) {
    //   throw new UnauthorizedException('El usuario del token ya no existe');
    // }

    // Lo que retornes aquí, NestJS lo adjuntará a 'request.user'
    // Esto es lo que usaremos en el controlador de hábitos.
    return { 
      id_usuario: payload.sub, 
      email: payload.email 
    };
  }
}