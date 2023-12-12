import express from 'express';
import { getWalletByUserID, redrawFromWallet, updateWallet } from '../wallet/wallet.service';
import { getTransactions, transact, verifyIdempotency } from './trasanction.service';
import { getUserByUsername } from '../users/users.service';
import SendSMS from '../../general/sms';

export const Transact = async (req: express.Request, res: express.Response) => {
  try {
    const { amount, recipient, trans_type, trans_description, userInfo } = req.body;
    const transid = userInfo.user_id + "-" + Date.now();
    const idempotent_key = req.headers['idempotent-key'] as string;
    if (!idempotent_key) {
      return res.status(400).send('idepotent-key not found');
    }
    const idem = await verifyIdempotency(idempotent_key, transid);
    if (idem?.error) {
      return res.send({
        "status": "success",
        "available": trans_type == 'deposit' ? +idem?.balance - amount : +idem?.balance + amount,
        "current": +idem?.balance
      });
    }

    const wallet = await getWalletByUserID(userInfo.user_id);

    if (!trans_type) {
      return res.status(400).send('Specify transaction type');
    }

    if (amount <= 0) {
      return res.status(400).send('Amount should greater than 0');
    }
    let temp_amount = +wallet.data[0].balance + amount;
    let wallet_id = wallet.data[0].wallet_id;
    if (trans_type == 'deposit') {
      await updateWallet(wallet_id, amount);
    } else if (trans_type == 'transfer') {
      if (!recipient) {
        return res.status(400).send('Specify recipient');
      }
      if (+wallet.data[0].balance < amount) {
        return res.status(400).send('Insufficient balance');
      }
      temp_amount = +wallet.data[0].balance - amount;
      const _recipient = await getUserByUsername(recipient);
      await redrawFromWallet(wallet_id, amount);

      if (_recipient) {
        const recipient_wallet = (await getWalletByUserID(_recipient.user_id)).data[0];
        await updateWallet(recipient_wallet.wallet_id, amount);
        await transact(recipient_wallet.wallet_id, amount, _recipient.username, trans_type, trans_description, wallet_id, transid);
      }
    } else {
      return res.status(400).send('Invalid operation');
    }
    await transact(wallet_id, amount, userInfo.username, trans_type, trans_description, wallet_id, transid);
    res.json({ status: "success", available: +wallet.data[0].balance, current: +temp_amount });
    SendSMS("number", "Your account credited with");//Dummy
  } catch (e: any) {
    res.send(e.message);
  }
}

export const ViewTransactions = async (req: express.Request, res: express.Response) => {
  const rs: any = await getTransactions(req.body.userInfo.username);
  console.log(rs)
  res.send(rs)
}
