import prisma from "../config/database.js";
import bcryptjs from "bcryptjs";
import { generateToken } from "../utils/token.js";
import { createDefaultCategories } from "./categoryService.js";

export const register = async (email, password, firstName, lastName) => {
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    throw new Error("Email already in use");
  }

  const hashedPassword = await bcryptjs.hash(password, 10);
  const user = await prisma.user.create({
    data: {
      email,
      passwordHash: hashedPassword,
      firstName,
      lastName,
    },
  });

  // Create default categories for the new user
  await createDefaultCategories(user.id);

  const token = generateToken(user);
  return { token, user };
};

export const login = async (email, password) => {
  const user = await prisma.user.findUnique({
    where: { email },
  });
  if (!user) {
    throw new Error("User not found");
  }
  const isValidPassword = await bcryptjs.compare(password, user.passwordHash);
  if (!isValidPassword) {
    throw new Error("Invalid password");
  }
  const token = generateToken(user);
  return { token, user };
};
