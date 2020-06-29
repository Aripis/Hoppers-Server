import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as helmet from 'helmet';
import * as compression from 'compression';

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule);
  app.use(compression());
  app.use(helmet());
  app.enableCors();

  await app.listen(3000);
};
bootstrap();
