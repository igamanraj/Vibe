/*
  Warnings:

  - The values [ASSISTANT] on the enum `MessageType` will be removed. If these variants are still used in the database, this will fail.
  - Added the required column `userId` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "public"."MessageType_new" AS ENUM ('RESULT', 'ERROR');
ALTER TABLE "public"."Message" ALTER COLUMN "type" TYPE "public"."MessageType_new" USING ("type"::text::"public"."MessageType_new");
ALTER TYPE "public"."MessageType" RENAME TO "MessageType_old";
ALTER TYPE "public"."MessageType_new" RENAME TO "MessageType";
DROP TYPE "public"."MessageType_old";
COMMIT;

-- AlterTable
ALTER TABLE "public"."Project" ADD COLUMN     "userId" TEXT NOT NULL;
