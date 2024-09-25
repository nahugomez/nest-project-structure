import { ApiProperty } from '@nestjs/swagger';

export class BaseUserDto {
  @ApiProperty({ example: 'john.doe@example.com' })
  email: string;

  @ApiProperty({ example: 'John Doe' })
  name: string;
}
