import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';

@Injectable()
export class GamesService {
  constructor(private prisma: PrismaService) {}

  create(createGameDto: CreateGameDto) {
    return this.prisma.game.create({
      data: {
        title: createGameDto.title,
        description: createGameDto.description,
        tags: createGameDto.tags,
        difficulty: createGameDto.difficulty,
        duration: createGameDto.duration,
        category: createGameDto.category,
        createdById: createGameDto.createdById,
      },
    });
  }

  findAll({ page, limit, skip }: { page: number; limit: number; skip: number }) {
    return this.prisma.game.findMany({
      take: limit,
      skip: skip,
    });
  }

  findOne(id: number) {
    return this.prisma.game.findUnique({
      where: { id },
    });
  }

  update(id: number, updateGameDto: UpdateGameDto) {
    return this.prisma.game.update({
      where: { id },
      data: updateGameDto,
    });
  }

  remove(id: number) {
    return this.prisma.game.delete({
      where: { id },
    });
  }
}
