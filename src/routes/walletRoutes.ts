import express from "express";
import { Get } from "../apis/wallet/wallet.controller";
import { isAuthenticated } from "../apis/middleware/authentication";
export const walletRouter = express.Router();

walletRouter.get('/:user_id', isAuthenticated, Get);
// usersRouter.post('/', Register);