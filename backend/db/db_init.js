import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

const dbPromise = (async () => {
  const db = await open({
    filename: './db/database.db',
    driver: sqlite3.Database,
  });

  // Initialize your database schema here
  await db.exec(`
    DROP TABLE IF EXISTS users;

    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL,
      role TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      firstname TEXT,
      lastname TEXT,
      dateOfBirth TEXT,
      contactNo TEXT,
      profileImg TEXT,
      gender TEXT,
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS categories (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      category_name TEXT
    );

    INSERT INTO users (username, password, role, email)
    VALUES ('asif', '123456', 'client', 'asif@gmail.com');
  `);

  return db;
})();

export default dbPromise;
