import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { isDevAuthBypassEnabled } from './utils/dev-auth-bypass';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(8080, isDevAuthBypassEnabled() ? '127.0.0.1' : undefined);
}
bootstrap();
