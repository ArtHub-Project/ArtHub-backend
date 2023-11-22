/*
  Warnings:

  - You are about to drop the column `updatedAt` on the `Cart` table. All the data in the column will be lost.
  - You are about to drop the column `quantity` on the `CartItem` table. All the data in the column will be lost.
  - You are about to drop the column `addressId` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `quantity` on the `OrderItem` table. All the data in the column will be lost.
  - You are about to drop the column `total` on the `OrderItem` table. All the data in the column will be lost.
  - You are about to drop the column `quantity` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the `Address` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Blog` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Collection` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Event` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Type` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `total` to the `Cart` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `collection` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "type" AS ENUM ('PAINTING', 'DRAWING', 'DIGITAL');

-- DropForeignKey
ALTER TABLE "Address" DROP CONSTRAINT "Address_userId_fkey";

-- DropForeignKey
ALTER TABLE "Blog" DROP CONSTRAINT "Blog_userId_fkey";

-- DropForeignKey
ALTER TABLE "Collection" DROP CONSTRAINT "Collection_productId_fkey";

-- DropForeignKey
ALTER TABLE "Event" DROP CONSTRAINT "Event_userId_fkey";

-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_addressId_fkey";

-- DropForeignKey
ALTER TABLE "Type" DROP CONSTRAINT "Type_productId_fkey";

-- AlterTable
ALTER TABLE "Cart" DROP COLUMN "updatedAt",
ADD COLUMN     "total" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "CartItem" DROP COLUMN "quantity";

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "addressId",
DROP COLUMN "updatedAt",
ADD COLUMN     "total" INTEGER NOT NULL,
ADD COLUMN     "userId" UUID;

-- AlterTable
ALTER TABLE "OrderItem" DROP COLUMN "quantity",
DROP COLUMN "total";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "quantity",
ADD COLUMN     "collection" TEXT NOT NULL,
ADD COLUMN     "type" "type" NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "address" TEXT,
ALTER COLUMN "email" DROP NOT NULL,
ALTER COLUMN "imageUrl" DROP NOT NULL,
ALTER COLUMN "bio" DROP NOT NULL;

-- DropTable
DROP TABLE "Address";

-- DropTable
DROP TABLE "Blog";

-- DropTable
DROP TABLE "Collection";

-- DropTable
DROP TABLE "Event";

-- DropTable
DROP TABLE "Type";

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
