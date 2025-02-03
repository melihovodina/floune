-- CreateTable
CREATE TABLE "Auth" (
    "user_id" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expiryDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Auth_pkey" PRIMARY KEY ("user_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Auth_token_key" ON "Auth"("token");
