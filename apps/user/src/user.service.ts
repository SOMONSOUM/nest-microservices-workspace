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

  async create(input: CreateUserDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: input.email },
    });

    if (user) {
      throw new RpcException({
        message: 'User already exists!',
        statusCode: HttpStatus.BAD_REQUEST,
      });
    }

    const hashedPassword = await this.hashService.hashPassword(input.password);

    return this.prisma.user.create({
      data: { ...input, password: hashedPassword },
    });
  }
}
