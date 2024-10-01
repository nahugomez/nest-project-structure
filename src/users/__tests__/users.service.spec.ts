import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../prisma/prisma.service';
import { UsersService } from '../users.service';
import { CreateUserDto } from '../dto/CreateUser.dto';
import { ResponseUserDto } from '../dto/ResponseUser.dto';
import { UpdateUserDto } from '../dto/UpdateUser.dto';
import { FindUsersQueryDto } from '../dto/FindUserQuery.dto';

describe('UsersService', () => {
  let service: UsersService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: PrismaService,
          useValue: {
            user: {
              create: jest.fn(),
              findMany: jest.fn(),
              findUnique: jest.fn(),
              update: jest.fn(),
              delete: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a user', async () => {
      const createUserDto: CreateUserDto = {
        email: 'test@example.com',
        name: 'Test User',
      };

      const result = {
        id: 1,
        email: 'test@example.com',
        name: 'Test User',
        created_at: new Date(),
        updated_at: new Date(),
        posts: [],
      };

      jest
        .spyOn(prismaService.user, 'create')
        .mockResolvedValue(result as ResponseUserDto);

      expect(await service.create(createUserDto)).toEqual(result);
    });
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const result = [
        {
          id: 1,
          email: 'test@example.com',
          name: 'Test User',
          created_at: new Date(),
          updated_at: new Date(),
          posts: [],
        },
      ];

      const findUsersQueryDto: FindUsersQueryDto = {
        take: 10,
        skip: 0,
        orderBy: 'created_at',
        order: 'asc',
        filterBy: 'email',
        filter: 'test@example.com',
      };

      jest
        .spyOn(prismaService.user, 'findMany')
        .mockResolvedValue(result as ResponseUserDto[]);

      expect(await service.findAll(findUsersQueryDto)).toEqual(result);
    });
  });

  describe('findOne', () => {
    it('should return a single user', async () => {
      const result = {
        id: 1,
        email: 'test@example.com',
        name: 'Test User',
        created_at: new Date(),
        updated_at: new Date(),
        posts: [],
      };

      jest
        .spyOn(prismaService.user, 'findUnique')
        .mockResolvedValue(result as ResponseUserDto);

      expect(await service.findOne(1)).toEqual(result);
    });
  });

  describe('update', () => {
    it('should update a user', async () => {
      const updateUserDto: UpdateUserDto = {
        email: 'updated@example.com',
        name: 'Updated User',
      };

      const result = {
        id: 1,
        email: 'updated@example.com',
        name: 'Updated User',
        created_at: new Date(),
        updated_at: new Date(),
        posts: [],
      };

      jest
        .spyOn(prismaService.user, 'update')
        .mockResolvedValue(result as ResponseUserDto);

      expect(await service.update(1, updateUserDto)).toEqual(result);
    });
  });

  describe('remove', () => {
    it('should delete a user', async () => {
      const result = {
        id: 1,
        email: 'test@example.com',
        name: 'Test User',
        created_at: new Date(),
        updated_at: new Date(),
        posts: [],
      };

      jest
        .spyOn(prismaService.user, 'delete')
        .mockResolvedValue(result as ResponseUserDto);

      expect(await service.remove(1)).toEqual(result);
    });
  });
});
