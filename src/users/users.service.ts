import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/CreateUser.dto';
import { ResponseUserDto } from './dto/ResponseUser.dto';
import { UpdateUserDto } from './dto/UpdateUser.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateUserDto): Promise<ResponseUserDto> {
    return this.prisma.user.create({
      data,
      include: { posts: true },
    });
  }

  async findAll(): Promise<ResponseUserDto[]> {
    return this.prisma.user.findMany({
      include: { posts: true },
    });
  }

  async findOne(id: number): Promise<ResponseUserDto | null> {
    return this.prisma.user.findUnique({
      where: { id },
      include: { posts: true },
    });
  }

  async update(id: number, data: UpdateUserDto): Promise<ResponseUserDto> {
    return this.prisma.user.update({
      where: { id },
      data,
      include: { posts: true },
    });
  }

  async remove(id: number): Promise<ResponseUserDto> {
    return this.prisma.user.delete({
      where: { id },
      include: { posts: true },
    });
  }
}
