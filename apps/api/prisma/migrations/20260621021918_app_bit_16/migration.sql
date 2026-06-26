-- AlterTable
ALTER TABLE "AIAnalysis" ADD COLUMN     "sources" TEXT;

-- AlterTable
ALTER TABLE "Region" ADD COLUMN     "latitude" DOUBLE PRECISION,
ADD COLUMN     "longitude" DOUBLE PRECISION;

-- AddForeignKey
ALTER TABLE "Formation" ADD CONSTRAINT "Formation_regionId_fkey" FOREIGN KEY ("regionId") REFERENCES "Region"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employment" ADD CONSTRAINT "Employment_regionId_fkey" FOREIGN KEY ("regionId") REFERENCES "Region"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
