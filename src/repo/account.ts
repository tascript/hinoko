import { drizzle } from 'drizzle-orm/d1'
import { accounts } from '../db/schema'
import { v4 as uuid } from 'uuid'

export const selectAll = async(database: D1Database) => {
    const d = drizzle(database)
  return d.select().from(accounts).all()
}

export const save = async(database: D1Database, name: string, age: number) => {
  const d = drizzle(database)
  await d.insert(accounts).values({
    id: uuid(),
    name,
    age
  })
}

export const bulkDelete = async (database: D1Database) => {
  const d = drizzle(database)
  await d.delete(accounts)
}