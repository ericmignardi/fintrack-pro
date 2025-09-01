import { User } from "@prisma/client";
import jsonwebtoken from "jsonwebtoken";

export const generateToken = (user: User) => {
  const payload = {
    id: user.id,
    email: user.email,
  };
  return jsonwebtoken.sign(payload, process.env.JWT_SECRET!, {
    expiresIn: "1h",
  });
};
