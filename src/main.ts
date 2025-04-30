import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:5173', // autorise ton frontend Vite
    credentials: true,
  });
  console.log("database url: ",process.env.DATABASE_URL);
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
