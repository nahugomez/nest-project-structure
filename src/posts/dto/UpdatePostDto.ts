import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdatePostDto {
  @ApiPropertyOptional({ example: 'My Post Title', description: 'Post title' })
  title?: string;

  @ApiPropertyOptional({
    example: 'My Post Content',
    description: 'Post content',
  })
  content?: string;

  @ApiPropertyOptional({ example: true, description: 'Post published status' })
  published?: boolean;
}
