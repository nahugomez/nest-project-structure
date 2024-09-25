import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/CreateUserDto';
import { UserModel } from './dto/UserModel';
import { UpdateUserDto } from './dto/UpdateUserDto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateUserDto): Promise<UserModel> {
    return this.prisma.user.create({
      data,
      include: { posts: true },
    });
  }

  async findAll(): Promise<UserModel[]> {
    return this.prisma.user.findMany({
      include: { posts: true },
    });
  }

  async findOne(id: number): Promise<UserModel | null> {
    return this.prisma.user.findUnique({
      where: { id },
      include: { posts: true },
    });
  }

  async update(id: number, data: UpdateUserDto): Promise<UserModel> {
    return this.prisma.user.update({
      where: { id },
      data,
      include: { posts: true },
    });
  }

  async remove(id: number): Promise<UserModel> {
    return this.prisma.user.delete({
      where: { id },
      include: { posts: true },
    });
  }
}
