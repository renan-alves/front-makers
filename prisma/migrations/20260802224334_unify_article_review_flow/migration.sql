/*
  Warnings:

  - You are about to drop the `ArticleSubmission` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "Article" ADD COLUMN     "authorEmail" TEXT,
ADD COLUMN     "authorName" TEXT,
ADD COLUMN     "notes" TEXT,
ADD COLUMN     "reviewedAt" TIMESTAMP(3),
ADD COLUMN     "submissionStatus" "SubmissionStatus" NOT NULL DEFAULT 'PENDING';

-- DropTable
DROP TABLE "ArticleSubmission";

-- CreateIndex
CREATE INDEX "Article_submissionStatus_idx" ON "Article"("submissionStatus");
