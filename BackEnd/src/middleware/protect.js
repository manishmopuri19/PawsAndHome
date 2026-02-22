import jwt from "jsonwebtoken";
import { users } from "../model/users.js";

export const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    const userExist = await users
      .findById(decoded.id)
      .select("-password");

    if (!userExist) {
      return res.status(401).json({ message: "User no longer exists" });
    }

    req.user = userExist;
    next();
  } catch (error) {
    res.status(401).json({ message: "Not authorized" });
  }
};
