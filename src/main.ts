import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    // origin: 'http://localhost:5173', // autorise ton frontend Vite
    origin: [
      'https://front-register-login-6prtjib7f-fabrices-projects-43ae4b68.vercel.app',
      'https://front-register-login-git-main-fabrices-projects-43ae4b68.vercel.app',
      'https://front-register-login-ku7rdue4y-fabrices-projects-43ae4b68.vercel.app/'
    ],
        credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],

  });
  console.log("database url: ",process.env.DATABASE_URL);
  console.log("port d'écoute: ",process.env.PORT);
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
