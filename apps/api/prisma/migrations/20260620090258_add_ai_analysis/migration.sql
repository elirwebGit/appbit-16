-- CreateTable
CREATE TABLE "RegionIndicator" (
    "id" TEXT NOT NULL,
    "indicator" TEXT NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "peopleConcentration" INTEGER NOT NULL,
    "networkCoverage" TEXT NOT NULL,
    "source" TEXT NOT NULL,
    "regionId" TEXT NOT NULL,

    CONSTRAINT "RegionIndicator_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AIAnalysis" (
    "id" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AIAnalysis_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "RegionIndicator" ADD CONSTRAINT "RegionIndicator_regionId_fkey" FOREIGN KEY ("regionId") REFERENCES "Region"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
