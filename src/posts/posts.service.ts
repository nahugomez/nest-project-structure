import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, Post as PostModel } from '@prisma/client';

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.PostCreateInput): Promise<PostModel> {
    return this.prisma.post.create({
      data,
    });
  }

  async findAll(): Promise<PostModel[]> {
    return this.prisma.post.findMany({
      include: { author: true },
    });
  }

  async findOne(id: number): Promise<PostModel | null> {
    return this.prisma.post.findUnique({
      where: { id },
      include: { author: true },
    });
  }

  async update(id: number, data: Prisma.PostUpdateInput): Promise<PostModel> {
    return this.prisma.post.update({
      where: { id },
      data,
    });
  }

  async remove(id: number): Promise<PostModel> {
    return this.prisma.post.delete({
      where: { id },
    });
  }
}
