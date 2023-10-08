import { drizzle } from 'drizzle-orm/d1'
import { users } from '../schema'

export const selectAll = async(database: D1Database) => {
    const d = drizzle(database)
  return d.select().from(users).all()
}