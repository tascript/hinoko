import { selectAll } from '../repo/account'

export const getAllAccounts = (database: D1Database) => {
  return selectAll(database)
}