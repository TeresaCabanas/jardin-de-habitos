import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 💡 Habilitar el ValidationPipe globalmente
  app.useGlobalPipes(
    new ValidationPipe({
      // Opciones comunes y recomendadas:
      whitelist: true, // Esto asegura que cualquier propiedad que no esté en el DTO sea ignorada
      forbidNonWhitelisted: true, // (Opcional) Esto rechaza la petición si hay propiedades no definidas en el DTO
      transform: true, // Esto transforma automáticamente el payload a la instancia del DTO
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
