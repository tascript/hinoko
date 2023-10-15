import { selectAll, saveOne, deleteOne, bulkDelete } from '../repo/account'

export const getAllAccounts = (database: D1Database) => {
  return selectAll(database)
}

export const saveAccount = (database: D1Database, name: string, age: number) => {
  return saveOne(database, name, age)
}

export const bulkDeleteAccounts = (database: D1Database,) => {
  return bulkDelete(database)
}

export const deleteAccount = (database: D1Database, id: string) => {
  return deleteOne(database, id)
}