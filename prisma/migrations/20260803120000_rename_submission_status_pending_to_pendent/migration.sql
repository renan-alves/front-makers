-- Rename legacy enum value to match the current Prisma schema
ALTER TYPE "SubmissionStatus" RENAME VALUE 'PENDING' TO 'PENDENT';
