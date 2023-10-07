import { drizzle } from 'drizzle-orm/d1'
import { users } from '../schema'

const db = drizzle('kamado')

export const selectAll = async() => {
  return db.select().from(users).all()
} 