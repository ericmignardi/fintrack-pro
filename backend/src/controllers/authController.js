import * as authService from "../services/authService.js";

const cookieOptions = {
  httpOnly: true,
  sameSite: "strict",
  secure: process.env.NODE_ENV === "production",
  maxAge: 3600000,
};

export const register = async (req, res) => {
  const { email, password, firstName, lastName } = req.body;
  try {
    const { token, user } = await authService.register(
      email,
      password,
      firstName,
      lastName
    );
    res.cookie("token", token, cookieOptions);
    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    });
  } catch (error) {
    if (error.message.includes("Email already in use")) {
      return res.status(409).json({ error: error.message });
    }
    res.status(500).json({ error: "Failed to register user." });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const { token, user } = await authService.login(email, password);
    res.cookie("token", token, cookieOptions);
    res.status(200).json({
      message: "User logged in successfully",
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    });
  } catch (error) {
    if (
      error.message.includes("User not found") ||
      error.message.includes("Invalid password")
    ) {
      return res.status(401).json({ error: "Invalid email or password." });
    }
    res.status(500).json({ error: "Failed to log in." });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    });
    res.status(200).json({ message: "User logged out successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to log out." });
  }
};
