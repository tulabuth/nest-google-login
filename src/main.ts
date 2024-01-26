import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create(
    AppModule);
  app.enableCors();
  const config = new DocumentBuilder()
    .setTitle('SMS AUTH API')
    .setDescription('SMS API description')
    .setVersion('1.0')
    .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'Token' })
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/sms', app, document);
  await app.listen(8080);
  

}
bootstrap();
