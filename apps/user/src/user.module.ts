import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PrismaModule } from './prisma/prisma.module';
import { HashService } from '@app/common/hash';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { join } from 'path';
import { TokenService } from '@app/common/token';
import { SessionModule } from './session/session.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: join(process.cwd(), 'apps', 'user', '.env'),
    }),
    JwtModule.register({
      global: true,
    }),
    PrismaModule,
    SessionModule,
  ],
  controllers: [UserController],
  providers: [UserService, HashService, TokenService],
})
export class UserModule {}
