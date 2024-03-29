/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { createLogger } from '@td/backend/util';

import { AppModule } from './app/app.module';
import { AllHttpExceptionFilter } from './app/filters/all-http-exception.filter';

async function bootstrap() {
  const logger = createLogger('Todo App');
  const app = await NestFactory.create(AppModule, { logger });
  const port = process.env.PORT || 3333;

  app.enableCors();

  if (process.env.NODE_ENV !== 'production') {
    const config = new DocumentBuilder()
      .setTitle('Todo Application')
      .setDescription('APIs of Todo Application')
      .setVersion('1.0')
      .addTag('Todo App APIs')
      .addBearerAuth()
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api-doc', app, document);
  }

  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.useGlobalFilters(new AllHttpExceptionFilter());

  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}`
  );
}

bootstrap();
