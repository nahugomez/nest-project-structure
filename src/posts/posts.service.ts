import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePostDto } from './dto/CreatePostDto';
import { UpdatePostDto } from './dto/UpdatePostDto';
import { PostModel } from './dto/PostModel';

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreatePostDto): Promise<PostModel> {
    return this.prisma.post.create({
      data: {
        content: data.content,
        title: data.title,
        published: data.published,
        author: { connect: { id: data.author_id } },
      },
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

  async update(id: number, data: UpdatePostDto): Promise<PostModel> {
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
