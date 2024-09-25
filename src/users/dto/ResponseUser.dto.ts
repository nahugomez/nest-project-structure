import { ApiProperty } from '@nestjs/swagger';
import { BaseUserDto } from './BaseUser.dto';
import { PostUserResponseDto } from './PostUserResponse.dto';

export class ResponseUserDto extends BaseUserDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: '2023-10-21T17:32:28.000Z' })
  created_at: Date;

  @ApiProperty({ example: '2023-10-21T17:32:28.000Z' })
  updated_at: Date;

  @ApiProperty({
    example: {
      id: 1,
      title: 'My Post Title',
      content: 'My Post Content',
      published: true,
      author_id: 1,
      created_at: '2023-10-21T17:32:28.000Z',
      updated_at: '2023-10-21T17:32:28.000Z',
    },
  })
  posts: PostUserResponseDto[];
}
