import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ResponsePostDto } from './dto/ResponsePost.dto';
import { CreatePostDto } from './dto/CreatePost.dto';
import { UpdatePostDto } from './dto/UpdatePost.dto';
import { FindPostQueryDto } from './dto/FindPostQuery.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreatePostDto): Promise<ResponsePostDto> {
    return this.prisma.post.create({
      include: { author: true },
      data: {
        content: data.content,
        title: data.title,
        published: data.published,
        author: { connect: { id: data.author_id } },
      },
    });
  }

  async findAll(query: FindPostQueryDto): Promise<ResponsePostDto[]> {
    const { take, skip, orderBy, order, filterBy, filter } = query;
    const findOptions: Prisma.PostFindManyArgs = {};

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

    return this.prisma.post.findMany({
      ...findOptions,
      include: { author: true },
    });
  }

  async findOne(id: number): Promise<ResponsePostDto | null> {
    return this.prisma.post.findUnique({
      where: { id },
      include: { author: true },
    });
  }

  async update(id: number, data: UpdatePostDto): Promise<ResponsePostDto> {
    return this.prisma.post.update({
      include: { author: true },
      where: { id },
      data,
    });
  }

  async remove(id: number): Promise<ResponsePostDto> {
    return this.prisma.post.delete({
      include: { author: true },
      where: { id },
    });
  }
}
