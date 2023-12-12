import express from 'express';
import { getWalletByUserID } from './wallet.service';

export const Get = async (req: express.Request, res: express.Response) => {
  const rs = await getWalletByUserID(+req.params.user_id);
  res.send(rs);
}