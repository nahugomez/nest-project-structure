import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsIn, IsInt, IsOptional, IsString } from 'class-validator';

export class FindUsersQueryDto {
  @ApiPropertyOptional({
    description: 'Cantidad de usuarios a obtener',
    example: 10,
    type: Number,
  })
  @IsOptional()
  @IsInt({ message: 'El parámetro take debe ser un número entero' })
  @Type(() => Number)
  take?: number;

  @ApiPropertyOptional({
    description: 'Cantidad de usuarios a omitir',
    example: 0,
    type: Number,
  })
  @IsOptional()
  @IsInt({ message: 'El parámetro skip debe ser un número entero' })
  @Type(() => Number)
  skip?: number;

  @ApiPropertyOptional({
    description: 'Campo para ordenar',
    example: 'createdAt',
    enum: ['name', 'email', 'created_at'],
  })
  @IsOptional()
  @IsString({ message: 'El parámetro orderBy debe ser un string' })
  @IsIn(['name', 'email', 'created_at'], {
    message: 'El parámetro orderBy debe ser name/email/created_at',
  })
  orderBy?: 'name' | 'email' | 'created_at';

  @ApiPropertyOptional({
    description: 'Dirección del ordenamiento',
    example: 'asc',
    enum: ['asc', 'desc'],
  })
  @IsOptional()
  @IsString({ message: 'El parámetro order debe ser un string' })
  @IsIn(['asc', 'desc'], { message: 'El parámetro order debe ser asc/desc' })
  order?: 'asc' | 'desc';

  @ApiPropertyOptional({
    description: 'Campo para filtrar',
    example: 'email',
    enum: ['name', 'email'],
  })
  @IsOptional()
  @IsString({ message: 'El parámetro filterBy debe ser un string' })
  @IsIn(['name', 'email'], {
    message: 'El parámetro filterBy debe ser name/email',
  })
  filterBy?: string;

  @ApiPropertyOptional({
    description: 'Valor para el filtro',
    type: String,
    example: 'john.doe@example.com',
  })
  @IsOptional()
  @IsString({ message: 'El parámetro filter debe ser un string' })
  @Type(() => String)
  filter?: string;
}
