// No arquivo main.ts do backend
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  
  // Adicione esta configuração CORS
  app.enableCors({
    origin: 'http://localhost:3001', // Porta onde o frontend está rodando
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
  
  await app.listen(3000);
  console.log('API running on http://localhost:3000/api');
}
bootstrap();