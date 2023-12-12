import express from "express";
import { Auth, Logout, Register } from "../apis/users/users.controller";
export const usersRouter = express.Router();

usersRouter.post('/authenticate', Auth);
usersRouter.post('/', Register);
usersRouter.post('/logout', Logout);