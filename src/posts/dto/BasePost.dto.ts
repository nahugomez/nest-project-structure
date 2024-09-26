import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class BasePostDto {
  @ApiProperty({ example: 'My Post Title', description: 'Post title' })
  @IsString({ message: 'El campo title debe ser un string' })
  @IsNotEmpty({ message: 'El campo title no puede estar vacío' })
  @Type(() => String)
  title: string;

  @ApiProperty({ example: 'My Post Content', description: 'Post content' })
  @IsString({ message: 'El campo content debe ser un string' })
  @IsNotEmpty({ message: 'El campo content no puede estar vacío' })
  @Type(() => String)
  content: string;

  @ApiProperty({ example: true, description: 'Post published status' })
  @IsBoolean({ message: 'El campo published debe ser un boolean' })
  @Type(() => Boolean)
  published: boolean;
}
