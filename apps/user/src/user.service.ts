import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto, LoginUserDto } from '@app/common/dto';
import { PrismaService } from './prisma/prisma.service';
import { RpcException } from '@nestjs/microservices';
import { HashService } from '@app/common/hash';
import { TokenService } from '@app/common/token';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly hashService: HashService,
    private readonly tokenService: TokenService,
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

  async login(data: LoginUserDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: data.email },
    });

    if (!user) {
      throw new RpcException({
        statusCode: HttpStatus.NOT_FOUND,
        message: 'User not found',
      });
    }

    const isPasswordValid = await this.hashService.verifyPassword(
      user.password,
      data.password,
    );

    if (!isPasswordValid) {
      throw new RpcException({
        statusCode: HttpStatus.UNAUTHORIZED,
        message: 'Invalid credentials',
      });
    }

    return this.tokenService.generateTokenPair({ userId: user.id });
  }
}
