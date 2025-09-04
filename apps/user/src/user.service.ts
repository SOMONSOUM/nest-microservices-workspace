import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from '@app/common/dto';
import { PrismaService } from './prisma/prisma.service';
import { RpcException } from '@nestjs/microservices';
import { HashService } from '@app/common/hash';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly hashService: HashService,
  ) {}
  getHello(): string {
    return 'Hello World!';
  }

  async create(data: CreateUserDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: data.email },
    });

    if (user) {
      throw new RpcException({
        statusCode: HttpStatus.CONFLICT,
        message: 'User already exists',
      });
    }

    const hashedPassword = await this.hashService.hashPassword(data.password);
    return await this.prisma.user.create({
      data: { ...data, password: hashedPassword },
    });
  }
}
