import { dbpool } from "../../configs"

export const createWallete = async (user_id: number, balance: number, currency: string) => {
  const rs: any = await dbpool.query("INSERT INTO wallet (user_id,balance,currency) VALUES(?,?,?)", [user_id, balance, currency]);

  return rs[0].insertId
}

export const getWalletByUserID = async (user_id: number) => {
  const rs: any = await dbpool.query("SELECT * FROM wallet where user_id = ?", [user_id]);

  if (rs) {
    return {
      data: rs[0]
    }
  } else {
    return {
      data: []
    }
  }
}