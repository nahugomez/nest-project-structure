import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PostsService } from './posts.service';
import { ResponsePostDto } from './dto/ResponsePost.dto';
import { CreatePostDto } from './dto/CreatePost.dto';
import { UpdatePostDto } from './dto/UpdatePost.dto';

@ApiTags('Posts')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new post' })
  @ApiResponse({
    status: 201,
    description: 'Post created successfully',
    type: ResponsePostDto,
  })
  create(@Body() data: CreatePostDto): Promise<ResponsePostDto> {
    return this.postsService.create(data);
  }

  @Get()
  @ApiOperation({ summary: 'Get all posts' })
  @ApiResponse({
    status: 200,
    description: 'Posts found',
    type: ResponsePostDto,
  })
  findAll(): Promise<ResponsePostDto[]> {
    return this.postsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a post by id' })
  @ApiResponse({
    status: 200,
    description: 'Post found',
    type: ResponsePostDto,
  })
  findOne(@Param('id') id: string): Promise<ResponsePostDto> {
    return this.postsService.findOne(+id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a post by id' })
  @ApiResponse({
    status: 200,
    description: 'Post updated successfully',
    type: ResponsePostDto,
  })
  update(
    @Param('id') id: string,
    @Body() data: UpdatePostDto,
  ): Promise<ResponsePostDto> {
    return this.postsService.update(+id, data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a post by id' })
  @ApiResponse({
    status: 200,
    description: 'Post deleted successfully',
    type: ResponsePostDto,
  })
  remove(@Param('id') id: string): Promise<ResponsePostDto> {
    return this.postsService.remove(+id);
  }
}
