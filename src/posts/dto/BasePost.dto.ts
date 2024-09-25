import { ApiProperty } from '@nestjs/swagger';

export class BasePostDto {
  @ApiProperty({ example: 'My Post Title', description: 'Post title' })
  title: string;

  @ApiProperty({ example: 'My Post Content', description: 'Post content' })
  content: string;

  @ApiProperty({ example: true, description: 'Post published status' })
  published: boolean;
}
