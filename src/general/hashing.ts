import crypto from 'crypto';
import dotenv from 'dotenv';

dotenv.config();

const SECRET = process.env.AUTH_SECRET
export const random = () => crypto.randomBytes(128).toString('base64');
export const hashing = (salt: string, password: string) => {
  const hash = crypto.createHash('sha384');
  const join = [salt, password].join('/');
  const data = hash.update(join + SECRET, 'utf-8');
  const gen_hash = data.digest('hex');
  return gen_hash
}

// export const authentication = ()