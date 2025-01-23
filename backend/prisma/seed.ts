import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create a user
  const user = await prisma.user.create({
    data: {
    
      username: 'bjj_guru',
      email: 'guru@example.com',
      password: 'securepassword', // Use a hashing library for real apps!
    },
  });

  // Create some games
  await prisma.game.createMany({
    data: [
      {
        title: 'Leg Entanglement Defense',
        description: 'Learn to defend leg entanglement from the bottom.',
        tags: ['leg_entanglement', 'defense', 'guard'],
        difficulty: 'intermediate',
        duration: 10,
        category: 'positional drill',
        createdById: user.id,
      },
      {
        title: 'Butterfly Guard Sweep',
        description: 'Execute a sweep from the butterfly guard.',
        tags: ['guard', 'sweep', 'attack'],
        difficulty: 'beginner',
        duration: 5,
        category: 'positional drill',
        createdById: user.id,
      },
      {
        title: 'Submission Defense Drill',
        description: 'Work on escaping submissions.',
        tags: ['submission', 'defense', 'escape'],
        difficulty: 'advanced',
        duration: 15,
        category: 'live sparring',
        createdById: user.id,
      },
    ],
  });

  console.log('Seed data created!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
