import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExceptionsFilter } from './filters/exceptions.filter';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  process.on('uncaughtException', (err) => {
    Logger.log('process:on:uncaughtException', err);
    Logger.log('<<<<<<<<<<<<<<<<<<<');
  });

  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new ExceptionsFilter());
  await app.init();
}
bootstrap();
