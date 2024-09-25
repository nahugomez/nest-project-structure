import { ApiProperty } from '@nestjs/swagger';
import { BasePostDto } from 'src/posts/dto/BasePost.dto';

export class PostUserResponseDto extends BasePostDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: '2023-10-21T17:32:28.000Z' })
  created_at: Date;

  @ApiProperty({ example: '2023-10-21T17:32:28.000Z' })
  updated_at: Date;

  @ApiProperty({ example: 1 })
  author_id: number;
}
