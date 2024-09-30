import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class BaseUserDto {
  @ApiProperty({ example: 'john.doe@example.com' })
  @IsEmail()
  @IsNotEmpty({ message: 'El campo email no puede estar vacío' })
  @Type(() => String)
  email: string;

  @ApiProperty({ example: 'John Doe' })
  @IsNotEmpty({ message: 'El campo name no puede estar vacío' })
  @Type(() => String)
  name: string;
}
