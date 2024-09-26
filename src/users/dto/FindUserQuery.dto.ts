import { ApiPropertyOptional } from '@nestjs/swagger';

export class FindUsersQueryDto {
  @ApiPropertyOptional({
    description: 'Cantidad de usuarios a obtener',
    example: 10,
    type: Number,
  })
  take?: number;

  @ApiPropertyOptional({
    description: 'Cantidad de usuarios a omitir',
    example: 0,
    type: Number,
  })
  skip?: number;

  @ApiPropertyOptional({
    description: 'Campo para ordenar',
    example: 'createdAt',
    enum: ['name', 'email', 'created_at'],
  })
  orderBy?: string;

  @ApiPropertyOptional({
    description: 'Dirección del ordenamiento',
    example: 'asc',
    enum: ['asc', 'desc'],
  })
  order?: 'asc' | 'desc';

  @ApiPropertyOptional({
    description: 'Campo para filtrar',
    example: 'email',
    enum: ['name', 'email'],
  })
  filterBy?: string;

  @ApiPropertyOptional({
    description: 'Valor para el filtro',
    type: String,
    example: 'john.doe@example.com',
  })
  filter?: string;
}
