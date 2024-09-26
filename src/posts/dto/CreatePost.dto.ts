import { ApiProperty } from '@nestjs/swagger';
import { BasePostDto } from './BasePost.dto';
import { IsInt, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

export class CreatePostDto extends BasePostDto {
  @ApiProperty({ example: 1 })
  @IsInt({ message: 'El campo author_id debe ser un número entero' })
  @IsNotEmpty({ message: 'El campo author_id no puede estar vacío' })
  @Type(() => Number)
  author_id: number;
}
