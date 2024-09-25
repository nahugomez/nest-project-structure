import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/CreateUser.dto';
import { ResponseUserDto } from './dto/ResponseUser.dto';
import { UpdateUserDto } from './dto/UpdateUser.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({
    status: 201,
    description: 'User created successfully',
    type: ResponseUserDto,
  })
  create(@Body() data: CreateUserDto): Promise<ResponseUserDto> {
    return this.usersService.create(data);
  }

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({
    status: 200,
    description: 'Users found',
    type: ResponseUserDto,
  })
  findAll(): Promise<ResponseUserDto[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a user by id' })
  @ApiResponse({
    status: 200,
    description: 'User found',
    type: ResponseUserDto,
  })
  findOne(@Param('id') id: string): Promise<ResponseUserDto> {
    return this.usersService.findOne(+id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a user by id' })
  @ApiResponse({
    status: 200,
    description: 'User updated successfully',
    type: ResponseUserDto,
  })
  update(
    @Param('id') id: string,
    @Body() data: UpdateUserDto,
  ): Promise<ResponseUserDto> {
    return this.usersService.update(+id, data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a user by id' })
  @ApiResponse({
    status: 200,
    description: 'User deleted successfully',
    type: ResponseUserDto,
  })
  remove(@Param('id') id: string): Promise<ResponseUserDto> {
    return this.usersService.remove(+id);
  }
}
