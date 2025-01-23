import { Test, TestingModule } from '@nestjs/testing';
import { GamesService } from './games.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { GameDifficulty } from './dto/create-game.dto';

describe('GamesService', () => {
  let service: GamesService;
  let prisma: PrismaService;

  const mockGame = {
    id: 1,
    title: 'Leg Entanglement Defense',
    description: 'Learn to defend leg entanglement from the bottom.',
    tags: ['leg_entanglement', 'defense', 'guard'],
    difficulty: GameDifficulty.MEDIUM,
    duration: 10,
    category: 'positional drill',
    createdById: 1,
    createdAt: new Date(),
  };

  const createGameDto: CreateGameDto = {
    title: 'Leg Entanglement Defense',
    description: 'Learn to defend leg entanglement from the bottom.',
    tags: ['leg_entanglement', 'defense', 'guard'],
    difficulty: GameDifficulty.MEDIUM,
    duration: 10,
    category: 'positional drill',
    createdById: 1,
  };

  const mockPrismaService = {
    game: {
      create: jest.fn().mockResolvedValue(mockGame),
      findMany: jest.fn().mockResolvedValue([mockGame]),
      findUnique: jest.fn().mockResolvedValue(mockGame),
      update: jest.fn().mockResolvedValue(mockGame),
      delete: jest.fn().mockResolvedValue(mockGame),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GamesService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<GamesService>(GamesService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new game', async () => {
      const result = await service.create(createGameDto);
      expect(result).toEqual(mockGame);
      expect(prisma.game.create).toHaveBeenCalledWith({
        data: createGameDto,
      });
    });
  });

  describe('findAll', () => {
    it('should return an array of games', async () => {
      const result = await service.findAll({ page: 1, limit: 10, skip: 0 });
      expect(result).toEqual([mockGame]);
      expect(prisma.game.findMany).toHaveBeenCalledWith({
        take: 10,
        skip: 0,
      });
    });
  });

  describe('findOne', () => {
    it('should return a single game', async () => {
      const result = await service.findOne(1);
      expect(result).toEqual(mockGame);
      expect(prisma.game.findUnique).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });
  });

  describe('update', () => {
    it('should update a game', async () => {
      const updateGameDto: UpdateGameDto = {
        title: 'Updated Title',
      };
      const result = await service.update(1, updateGameDto);
      expect(result).toEqual(mockGame);
      expect(prisma.game.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: updateGameDto,
      });
    });
  });

  describe('remove', () => {
    it('should remove a game', async () => {
      const result = await service.remove(1);
      expect(result).toEqual(mockGame);
      expect(prisma.game.delete).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });
  });
});
