import { Request, Response, NextFunction } from "express";
import { verifyToken } from "@infrastructure/auth/token";

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  const header = req.headers.authorization;
  if (!header?.toLowerCase().startsWith("bearer ")) {
    res.status(401).json({ message: "Não autenticado" });
    return;
  }
  try {
    const payload = verifyToken(header.slice(7));
    (req as Request & { userId?: string }).userId = payload.sub;
    next();
  } catch {
    res.status(401).json({ message: "Token inválido ou expirado" });
  }
}
