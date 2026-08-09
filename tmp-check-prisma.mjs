import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

try {
  const rows = await prisma.article.findMany({
    take: 1,
    orderBy: {
      createdAt: 'desc',
    },
  });

  console.log(JSON.stringify(rows, null, 2));
} catch (error) {
  console.error(error);
  process.exit(1);
} finally {
  await prisma.$disconnect();
}
