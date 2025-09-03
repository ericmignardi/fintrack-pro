import jsonwebtoken from "jsonwebtoken";

export const generateToken = (user) => {
  const payload = {
    id: user.id,
    email: user.email,
  };
  return jsonwebtoken.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
};
