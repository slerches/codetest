import express from 'express';
import { create, updateSessionToken } from './users.service';
import { createWallete } from '../wallet/wallet.service';
import validateEmail from '../../general/emailValidation';
import { hashing, random } from '../../general/hashing';
import { dbpool } from '../../configs';

export const Auth = async (req: express.Request, res: express.Response) => {
  const { email, password } = req.body
  if (!email || !password) {
    return res.status(401).send('Provide email or password');
  }

  const user: any = await dbpool.query("SELECT * FROM users WHERE email = ?", [email]);
  if (!user || user[0].length <= 0) {
    return res.sendStatus(401);
  }
  const _user = user[0][0];
  const userhash = hashing(_user.salt, password);
  if (_user.password !== userhash) {
    return res.sendStatus(403);
  }
  const salt = random();
  const sessionToken = hashing(salt, _user.email);
  await updateSessionToken(_user.user_id, sessionToken);
  res.cookie('opti-cash', sessionToken, { domain: 'localhost', path: '/' });
  res.status(200).json(_user)
}

export const Register = async (req: express.Request, res: express.Response) => {
  const { email, password, username, currency = 'USD' } = req.body
  if (!email || !password || !username) {
    return res.status(400).send('Missing fields');
  }
  if (!validateEmail(email)) {
    return res.status(400).send('Invalid email address');
  }
  const salt = random();
  const pass_word = hashing(salt, password)
  const rs = await create(username, pass_word, email, salt);
  if (!rs?.error)
    await createWallete(rs.id, 0, currency);
  res.send(rs);
}

export const Logout = (req: express.Request, res: express.Response) => {
  res.clearCookie('opti-cash');
  res.sendStatus(200)
}