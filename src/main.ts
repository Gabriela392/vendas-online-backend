import { NestFactory } from '@nestjs/core';
import { json, urlencoded } from 'express';
import { AppModule } from './app.module';
import { isDevAuthBypassEnabled } from './utils/dev-auth-bypass';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ extended: true, limit: '50mb' }));
  await app.listen(8080, isDevAuthBypassEnabled() ? '127.0.0.1' : undefined);
}
bootstrap();
