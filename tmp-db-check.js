const { PrismaClient } = require('@prisma/client');
(async () => {
  const prisma = new PrismaClient();
  try {
    const rows = await prisma.$queryRaw`SELECT id, title, status, "submissionStatus", locale, "publishedAt" FROM "Article" ORDER BY "createdAt" DESC LIMIT 10`;
    console.log(JSON.stringify(rows, null, 2));
  } catch (e) {
    console.error(e.message);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
})();
