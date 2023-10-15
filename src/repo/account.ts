import { drizzle } from 'drizzle-orm/d1'
import { eq } from 'drizzle-orm'
import { accounts } from '../db/schema'
import { v4 as uuid } from 'uuid'

export const selectAll = async(database: D1Database) => {
    const d = drizzle(database)
  return d.select().from(accounts).all()
}

export const saveOne = async(database: D1Database, name: string, age: number) => {
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

export const deleteOne = async (database: D1Database, id: string): Promise<{id: string}> => {
  const d = drizzle(database)
  const targetIds = await d.delete(accounts).where(eq(accounts.id, id)).returning({id: accounts.id})
  return targetIds[0]
}