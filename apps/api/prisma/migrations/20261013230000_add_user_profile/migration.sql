-- AlterTable
ALTER TABLE "User"
  ADD COLUMN "birthDate" TIMESTAMP(3),
  ADD COLUMN "country" TEXT,
  ADD COLUMN "jobTitle" TEXT,
  ADD COLUMN "institution" TEXT;
