import { PartialType } from '@nestjs/mapped-types';
import { BasePostDto } from './BasePost.dto';

export class UpdatePostDto extends PartialType(BasePostDto) {}
