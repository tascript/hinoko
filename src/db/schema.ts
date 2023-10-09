/* 
  WARNING: Please not rename this file for migration
*/

import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'

export const accounts = sqliteTable('accounts', {
  id: text('id').primaryKey(),
  name: text('name'),
  age: integer('age')
})