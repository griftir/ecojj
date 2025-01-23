import { IsString, IsOptional, IsArray, IsEnum, IsNumber, MinLength, MaxLength, ArrayMinSize, Min, Max } from 'class-validator';

export enum GameDifficulty {
  EASY = 'easy',
  MEDIUM = 'medium',
  HARD = 'hard'
}

export class CreateGameDto {
  @IsString()
  @MinLength(3)
  @MaxLength(100)
  title: string;

  @IsString()
  @IsOptional()
  @MaxLength(500)
  description?: string;

  @IsArray()
  @IsString({ each: true })
  @ArrayMinSize(1)
  tags: string[];

  @IsEnum(GameDifficulty)
  difficulty: GameDifficulty;

  @IsNumber()
  @IsOptional()
  @Min(1)
  @Max(240)
  duration?: number;

  @IsString()
  @MinLength(3)
  @MaxLength(50)
  category: string;

  @IsNumber()
  createdById: number;
}
