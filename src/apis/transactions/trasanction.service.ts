import { dbpool } from "../../configs"

export const transact = async (wallet_id: number, amount: number, recipient: string, trans_type: string, trans_description: string, sender: string, transid: string) => {
  const rs = await dbpool.query("INSERT INTO transactions (wallet_id,amount,transaction_type,transaction_desc,recipient,sender,transaction_id) VALUES(?,?,?,?,?,?,?)",
    [wallet_id, amount, trans_type, trans_description, recipient, sender, transid]);
}

export const verifyIdempotency = async (idempotent: string, trans_id: string) => {
  try {
    const rs = await dbpool.query("INSERT INTO idempotency SET id = ? ,trans_id = ?", [idempotent, trans_id])
    return {
      success: rs
    }
  } catch (e: any) {
    const rs: any = await dbpool.query("SELECT * FROM idempotency WHERE id = ?", [idempotent]);
    const join: any = await dbpool.query("SELECT w.balance FROM wallet w LEFT JOIN transactions trans ON w.wallet_id = trans.sender WHERE trans.transaction_id = ?", [rs[0][0].trans_id]);

    return {
      error: e.message,
      balance: join[0][0]?.balance
    }
  }
}

export const getTransactions = async (username: string) => {
  const rs: any = await dbpool.query("SELECT users.username, transactions.* FROM users INNER JOIN wallet ON users.user_id = wallet.user_id INNER JOIN transactions ON wallet.wallet_id = transactions.wallet_id WHERE users.username = ? ORDER BY transactions.transaction_date DESC", [username])
  return rs[0]
}