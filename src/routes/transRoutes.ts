import express from "express";
import { Transact, ViewTransactions } from "../apis/transactions/trasanction.controller";
import { isAuthenticated } from "../apis/middleware/authentication";
export const transRouter = express.Router();

transRouter.post('/', isAuthenticated, Transact);
transRouter.get('/', isAuthenticated, ViewTransactions);