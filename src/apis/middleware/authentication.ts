import { NextFunction, Request, Response } from 'express';
import { getUserBySessionToken } from '../users/users.service';
export const isAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const sessionToken = req.cookies['opti-cash'];
    if (!sessionToken) {
      return res.sendStatus(403);
    }

    const s_token = await getUserBySessionToken(sessionToken);
    if (!s_token) {
      return res.sendStatus(403);
    }
    req.body.userInfo = s_token;
    next();
  } catch (e) {
    res.sendStatus(400);
  }
}