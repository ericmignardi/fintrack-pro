import prisma from "../config/database";
import { TransactionType } from "@prisma/client";

const seedCategories = async () => {
  const categories = [
    { name: "Food", type: TransactionType.EXPENSE, userId: 1 },
    { name: "Transport", type: TransactionType.EXPENSE, userId: 1 },
    { name: "Utilities", type: TransactionType.EXPENSE, userId: 1 },
    { name: "Salary", type: TransactionType.INCOME, userId: 1 },
  ];

  for (const category of categories) {
    await prisma.category.create({
      data: category,
    });
  }
};

seedCategories()
  .then(async () => {
    console.log("Categories seeded!");
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error("Error seeding categories:", e);
    await prisma.$disconnect();
    process.exit(1);
  });
