import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'

const timestampColumns = {
  createdAt: integer('created_at', { mode: 'timestamp' })
    .$defaultFn(() => new Date()), // Auto-set on create
  updatedAt: integer('updated_at', { mode: 'timestamp' })
    .$defaultFn(() => new Date()), // Auto-set on create (needs trigger or manual update for 'on update')
}

export const users = sqliteTable('users', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  username: text('username').notNull().unique(),
  name: text('name').notNull(),
  password: text('password').notNull(),
  email: text('email').notNull().unique(),
  isAdmin: integer('is_admin', { mode: 'boolean' }).notNull().default(false),
  lastLoginAt: integer('last_login_at', { mode: 'timestamp' }), // Can be null if never logged in
  ...timestampColumns,
})
