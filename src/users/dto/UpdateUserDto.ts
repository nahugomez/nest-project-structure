import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiPropertyOptional({
    example: 'john.doe@example.com',
    description: 'User email',
  })
  email?: string;

  @ApiPropertyOptional({ example: 'John Doe', description: 'User name' })
  name?: string;
}
