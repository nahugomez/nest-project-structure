import { ApiPropertyOptional } from '@nestjs/swagger';

export class FindPostQueryDto {
  @ApiPropertyOptional({
    description: 'Cantidad de posts a obtener',
    type: Number,
  })
  take?: number;

  @ApiPropertyOptional({
    description: 'Cantidad de posts a omitir',
    type: Number,
  })
  skip?: number;

  @ApiPropertyOptional({
    description: 'Campo para ordenar',
    enum: ['title', 'published'],
  })
  orderBy?: string;

  @ApiPropertyOptional({
    description: 'Dirección del ordenamiento',
    enum: ['asc', 'desc'],
  })
  order?: 'asc' | 'desc';

  @ApiPropertyOptional({
    description: 'Campo para filtrar',
    enum: ['title', 'content', 'published'],
  })
  filterBy?: string;

  @ApiPropertyOptional({
    description: 'Valor para el filtro',
    type: String,
  })
  filter?: string;
}
