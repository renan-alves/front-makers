const { PrismaClient } = require('@prisma/client');
(async () => {
  const prisma = new PrismaClient();
  try {
    const result = await prisma.article.findMany({
      where: { status: 'PUBLISHED', submissionStatus: 'APPROVED', locale: 'en' },
      select: { id: true }
    });
    console.log('ok', result.length);
  } catch (e) {
    console.error(e.message);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
})();
