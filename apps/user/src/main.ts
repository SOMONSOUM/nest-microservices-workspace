import { NestFactory } from '@nestjs/core';
import { UserModule } from './user.module';
import { Transport } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(UserModule);
  app.connectMicroservice({
    transport: Transport.TCP,
    options: {
      host: '127.0.0.1',
      port: 3001,
    },
  });

  await app.startAllMicroservices();

  await app.listen(process.env.PORT ?? 3001);
  Logger.log(
    `User service is running on: http://localhost:${process.env.PORT ?? 3001}`,
  );
}
bootstrap();
