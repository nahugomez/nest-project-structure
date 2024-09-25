import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreatePostDto } from './dto/CreatePostDto';
import { PostsService } from './posts.service';
import { UpdatePostDto } from './dto/UpdatePostDto';
import { PostModel } from './dto/PostModel';

@ApiTags('Posts')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new post' })
  @ApiCreatedResponse({ description: 'The created post' })
  @ApiResponse({ status: 201, description: 'Post created successfully' })
  create(@Body() data: CreatePostDto): Promise<PostModel> {
    return this.postsService.create(data);
  }

  @Get()
  @ApiOperation({ summary: 'Get all posts' })
  @ApiResponse({ status: 200, description: 'Posts found' })
  findAll(): Promise<PostModel[]> {
    return this.postsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a post by id' })
  @ApiResponse({ status: 200, description: 'Post found' })
  findOne(@Param('id') id: string): Promise<PostModel> {
    return this.postsService.findOne(+id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a post by id' })
  @ApiResponse({ status: 200, description: 'Post updated successfully' })
  update(
    @Param('id') id: string,
    @Body() data: UpdatePostDto,
  ): Promise<PostModel> {
    return this.postsService.update(+id, data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a post by id' })
  @ApiResponse({ status: 200, description: 'Post deleted successfully' })
  remove(@Param('id') id: string): Promise<PostModel> {
    return this.postsService.remove(+id);
  }
}
