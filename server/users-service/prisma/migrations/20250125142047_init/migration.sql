/*
  Warnings:

  - You are about to drop the column `href` on the `User` table. All the data in the column will be lost.
  - You are about to alter the column `password` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(36)`.

*/
-- DropIndex
DROP INDEX "User_href_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "href",
ALTER COLUMN "password" SET DATA TYPE VARCHAR(36);
