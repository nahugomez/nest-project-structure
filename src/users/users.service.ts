import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/CreateUser.dto';
import { ResponseUserDto } from './dto/ResponseUser.dto';
import { UpdateUserDto } from './dto/UpdateUser.dto';
import { FindUsersQueryDto } from './dto/FindUserQuery.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateUserDto): Promise<ResponseUserDto> {
    return this.prisma.user.create({
      data,
      include: { posts: true },
    });
  }

  async findAll(query: FindUsersQueryDto): Promise<ResponseUserDto[]> {
    const { take, skip, orderBy, order, filterBy, filter } = query;

    const findOptions: Prisma.UserFindManyArgs = {};

    if (take !== undefined) {
      findOptions.take = Number(take);
    }

    if (skip !== undefined) {
      findOptions.skip = Number(skip);
    }

    if (orderBy && order) {
      findOptions.orderBy = {
        [orderBy]: order,
      };
    }

    if (filterBy && filter) {
      findOptions.where = {
        [filterBy]: {
          contains: filter,
          mode: 'insensitive',
        },
      };
    }

    return this.prisma.user.findMany({
      ...findOptions,
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
