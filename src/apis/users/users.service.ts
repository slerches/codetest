import { dbpool } from '../../configs';

export const create = async (username: string, password: string, email: string, salt: String) => {
  try {
    const result: any = await dbpool.query("INSERT INTO users (username,email,password,salt) VALUES(?,?,?,?)", [username, email, password, salt]);
    const createdAt = await getUserByID(result[0].insertId);
    return {
      username,
      email,
      id: result[0].insertId,
      createdAt
    }
  } catch (e: any) {
    return {
      error: e.message
    }
  }
}

export const getUserByID = async (id: number) => {
  const result: any = await dbpool.query("SELECT * FROM users where user_id = ?", [id]);
  if (result) {
    return result[0][0].createdAt
  }
  return null;
}

export const updateSessionToken = async (user_id: number, sessionToken: string) => {
  const rs = await dbpool.query("UPDATE users SET s_token = ? WHERE user_id = ?", [sessionToken, user_id]);
}

export const getUserBySessionToken = async (sessionToken: String) => {
  const rs: any = await dbpool.query("SELECT * FROM users WHERE s_token = ?", [sessionToken]);
  if (rs[0].length <= 0) {
    return null
  }

  return rs[0][0].s_token;
}