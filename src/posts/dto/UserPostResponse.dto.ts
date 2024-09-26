import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsInt, IsNotEmpty } from 'class-validator';
import { BaseUserDto } from 'src/users/dto/BaseUser.dto';

export class UserPostResponseDto extends BaseUserDto {
  @ApiProperty({ example: 1 })
  @IsInt({ message: 'El campo id debe ser un número entero' })
  @IsNotEmpty({ message: 'El campo id no puede estar vacío' })
  @Type(() => Number)
  id: number;

  @ApiProperty({ example: '2023-10-21T17:32:28.000Z' })
  @IsNotEmpty({ message: 'El campo created_at no puede estar vacío' })
  @IsDate({ message: 'El campo created_at debe ser una fecha válida' })
  @Type(() => Date)
  created_at: Date;

  @ApiProperty({ example: '2023-10-21T17:32:28.000Z' })
  @IsNotEmpty({ message: 'El campo updated_at no puede estar vacío' })
  @IsDate({ message: 'El campo updated_at debe ser una fecha válida' })
  @Type(() => Date)
  updated_at: Date;
}
