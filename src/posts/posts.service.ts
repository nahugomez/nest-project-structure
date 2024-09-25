import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ResponsePostDto } from './dto/ResponsePost.dto';
import { CreatePostDto } from './dto/CreatePost.dto';
import { UpdatePostDto } from './dto/UpdatePost.dto';

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

  async findAll(): Promise<ResponsePostDto[]> {
    return this.prisma.post.findMany({
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
