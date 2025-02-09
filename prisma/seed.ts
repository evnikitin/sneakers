import { PrismaClient } from "@prisma/client";
import { sneakers } from "../components/ProductList/lib/mock";

const prisma = new PrismaClient();

async function main() {
  await prisma.sneaker.deleteMany();

  for (const sneaker of sneakers) {
    await prisma.sneaker.create({
      data: sneaker,
    });
  }

  console.log("Sneakers have been seeded!");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
