import { config } from 'dotenv';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  config(); // Load environment variables from .env file

  const app = await NestFactory.create(AppModule);
  app.enableCors(); // Enable CORS for all routes
  await app.listen(3000);
}

bootstrap();
