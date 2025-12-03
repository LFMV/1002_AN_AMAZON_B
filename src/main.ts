import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { envs } from './config/envs';

async function bootstrap() {

  const logger = new Logger('Main');
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    // origin: 'https://amazon-front-gamma.vercel.app',
    origin: 'http://localhost:4200',
    credentials: true,
  });

  /** It cleans the data that is not in the validations and receives
   *  only the specified data. in the DTO. */
  app.useGlobalPipes( new ValidationPipe({ whitelist: true }) );

  await app.listen(envs.port);
  logger.log(`Server running on port ${envs.port}`);

}
bootstrap();
