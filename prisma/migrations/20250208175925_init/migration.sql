-- CreateTable
CREATE TABLE "Sneaker" (
    "id" SERIAL NOT NULL,
    "model" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "sizes" TEXT[],
    "color" TEXT NOT NULL,

    CONSTRAINT "Sneaker_pkey" PRIMARY KEY ("id")
);
