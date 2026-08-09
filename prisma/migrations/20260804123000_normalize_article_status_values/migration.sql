-- Normalize legacy article status values after unifying the review-state column.
UPDATE "Article"
SET "status" = CASE
  WHEN "status"::text = 'PUBLISHED' THEN 'APPROVED'
  WHEN "status"::text = 'DRAFT' THEN 'PENDENT'
  ELSE "status"::text
END::"SubmissionStatus";
