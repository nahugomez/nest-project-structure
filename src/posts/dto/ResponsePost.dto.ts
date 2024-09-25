import { ApiProperty } from '@nestjs/swagger';
import { BasePostDto } from './BasePost.dto';
import { PostUserResponseDto } from './PostUserResponse.dto';

export class ResponsePostDto extends BasePostDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: '2023-10-21T17:32:28.000Z' })
  created_at: Date;

  @ApiProperty({ example: '2023-10-21T17:32:28.000Z' })
  updated_at: Date;

  @ApiProperty({
    example: {
      id: 1,
      email: 'john.doe@example.com',
      name: 'John Doe',
      created_at: '2023-10-21T17:32:28.000Z',
      updated_at: '2023-10-21T17:32:28.000Z',
    },
  })
  author: PostUserResponseDto;
}
