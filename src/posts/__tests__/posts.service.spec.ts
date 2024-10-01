import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../prisma/prisma.service';
import { PostsService } from '../posts.service';
import { CreatePostDto } from '../dto/CreatePost.dto';
import { UpdatePostDto } from '../dto/UpdatePost.dto';

describe('PostsService', () => {
  let service: PostsService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PostsService, PrismaService],
    }).compile();

    service = module.get<PostsService>(PostsService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new post', async () => {
      const createPostDto: CreatePostDto = {
        title: 'Test Post',
        content: 'This is a test post',
        published: true,
        author_id: 1,
      };

      const expectedResult = {
        id: 1,
        title: 'Test Post',
        content: 'This is a test post',
        published: true,
        author: {
          id: createPostDto.author_id,
        },
      };

      jest
        .spyOn(prismaService.post, 'create')
        .mockResolvedValue(expectedResult as any);

      const result = await service.create(createPostDto);

      expect(result).toEqual(expectedResult);
    });
  });

  describe('findAll', () => {
    it('should return an array of posts', async () => {
      const expectedResult = [
        {
          id: 1,
          title: 'Test Post',
          content: 'This is a test post',
          published: true,
          author: { id: 1 },
        },
      ];

      jest
        .spyOn(prismaService.post, 'findMany')
        .mockResolvedValue(expectedResult as any);

      const result = await service.findAll({});

      expect(result).toEqual(expectedResult);
    });
  });

  describe('findOne', () => {
    it('should return a single post', async () => {
      const expectedResult = {
        id: 1,
        title: 'Test Post',
        content: 'This is a test post',
        published: true,
        author: { id: 1 },
      };

      jest
        .spyOn(prismaService.post, 'findUnique')
        .mockResolvedValue(expectedResult as any);

      const result = await service.findOne(1);

      expect(result).toEqual(expectedResult);
    });
  });

  describe('update', () => {
    it('should update a post', async () => {
      const updatePostDto: UpdatePostDto = {
        title: 'Updated Post',
        content: 'This is an updated test post',
        published: false,
      };

      const expectedResult = {
        id: 1,
        ...updatePostDto,
        author: { id: 1 },
      };

      jest
        .spyOn(prismaService.post, 'update')
        .mockResolvedValue(expectedResult as any);

      const result = await service.update(1, updatePostDto);

      expect(result).toEqual(expectedResult);
    });
  });

  describe('remove', () => {
    it('should remove a post', async () => {
      const expectedResult = {
        id: 1,
        title: 'Test Post',
        content: 'This is a test post',
        published: true,
        author: { id: 1 },
      };

      jest
        .spyOn(prismaService.post, 'delete')
        .mockResolvedValue(expectedResult as any);

      const result = await service.remove(1);

      expect(result).toEqual(expectedResult);
    });
  });
});
