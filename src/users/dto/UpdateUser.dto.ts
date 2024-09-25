import { PartialType } from '@nestjs/mapped-types';
import { BaseUserDto } from './BaseUser.dto';

export class UpdateUserDto extends PartialType(BaseUserDto) {}
