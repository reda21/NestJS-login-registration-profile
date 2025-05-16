import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    // origin: 'http://localhost:5173', // autorise ton frontend Vite
    origin: 'https://front-register-login.vercel.app', // front end déployé sur vercel
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  });
  console.log('database url: ', process.env.DATABASE_URL);
  console.log("port d'écoute: ", process.env.PORT);
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
