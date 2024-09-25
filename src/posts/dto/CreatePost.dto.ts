import { ApiProperty } from '@nestjs/swagger';
import { BasePostDto } from './BasePost.dto';

export class CreatePostDto extends BasePostDto {
  @ApiProperty({ example: 1 })
  author_id: number;
}
