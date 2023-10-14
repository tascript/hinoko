import { selectAll, save, bulkDelete } from '../repo/account'

export const getAllAccounts = (database: D1Database) => {
  return selectAll(database)
}

export const saveAccount = (database: D1Database, name: string, age: number) => {
  return save(database, name, age)
}

export const bulkDeleteAccounts = (database: D1Database,) => {
  return bulkDelete(database)
}