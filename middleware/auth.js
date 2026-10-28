import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  const header = req.headers.authorization;
  const secretKey = process.env.AUTH_SECRET_KEY;

  if (!secretKey) {
    throw new Error("AUTH_SECRET_KEY is not configured.");
  }

  if (!header) {
    return res
      .status(401)
      .json({ message: "You cannot access this operation without a token!" });
  }

  const token = header.startsWith("Bearer ") ? header.slice(7) : header;

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid token provided!" });
    }

    req.user = decoded;
    next();
  });
};

export default authMiddleware;
