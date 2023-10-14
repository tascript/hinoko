import { drizzle } from 'drizzle-orm/d1'
import { accounts } from '../db/schema'

export const selectAll = async(database: D1Database) => {
    const d = drizzle(database)
  return d.select().from(accounts).all()
}
