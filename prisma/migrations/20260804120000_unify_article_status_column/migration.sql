-- Unify review state into the Article.status column
-- Keep the existing review-state values and remove the old publication-state enum.

DROP INDEX IF EXISTS "Article_status_idx";
ALTER TABLE "Article" DROP COLUMN "status";
ALTER TABLE "Article" RENAME COLUMN "submissionStatus" TO "status";
DROP INDEX IF EXISTS "Article_submissionStatus_idx";
CREATE INDEX "Article_status_idx" ON "Article"("status");
DROP TYPE "ArticleStatus";