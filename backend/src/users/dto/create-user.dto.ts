import { Prisma } from '@prisma/client';

export class CreateUserDto implements Prisma.UserCreateInput {
  username: string;
  email: string;
  password: string;
  name?: string;
  // Add other fields that match your Prisma User model
}
