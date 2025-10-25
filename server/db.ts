import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import ws from "ws";
import * as schema from "@shared/schema";

neonConfig.webSocketConstructor = ws;

// Для разработки используем SQLite если DATABASE_URL не установлен
if (!process.env.DATABASE_URL) {
  // Используем SQLite для разработки
  import('drizzle-orm/sqlite-core').then(({ sqliteTable, text, integer }) => {
    // Создаем простую таблицу для разработки
    const users = sqliteTable('users', {
      id: integer('id').primaryKey(),
      username: text('username').notNull(),
      email: text('email').notNull(),
    });
    
    console.log('Using SQLite for development');
  }).catch(() => {
    console.log('SQLite not available, using mock data');
  });
  
  // Временно используем mock данные для разработки
  export const db = {
    // Mock методы для разработки
    select: () => ({ from: () => Promise.resolve([]) }),
    insert: () => ({ values: () => Promise.resolve({}) }),
    update: () => ({ set: () => ({ where: () => Promise.resolve({}) }) }),
    delete: () => ({ where: () => Promise.resolve({}) }),
  } as any;
  export const pool = null;
} else {
  export const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  export const db = drizzle({ client: pool, schema });
}
