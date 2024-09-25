import { ApiProperty } from '@nestjs/swagger';
import { BaseUserDto } from 'src/users/dto/BaseUser.dto';

export class PostUserResponseDto extends BaseUserDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: '2023-10-21T17:32:28.000Z' })
  created_at: Date;

  @ApiProperty({ example: '2023-10-21T17:32:28.000Z' })
  updated_at: Date;
}
