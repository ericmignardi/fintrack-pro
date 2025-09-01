import prisma from "../config/database";
import bcryptjs from "bcryptjs";
import { generateToken } from "../utils/token";

export const register = async (
  email: string,
  password: string,
  firstName: string,
  lastName: string
) => {
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
  const token = generateToken(user);
  return { token, user };
};

export const login = async (email: string, password: string) => {
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
