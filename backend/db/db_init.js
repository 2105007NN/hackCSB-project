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

    DROP TABLE IF EXISTS categories;
    CREATE TABLE IF NOT EXISTS categories (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      category_name TEXT NOT NULL UNIQUE
    );

    INSERT INTO users (username, password, role, email)
    VALUES ('asif', '123456', 'client', 'asif@gmail.com');

    INSERT INTO users (username, password, role, email)
    VALUES ('tmzd', '123456', 'client', 'tmzd@gmail.com');

    INSERT INTO users (username, password, role, email)
    VALUES ('nafis', '123456', 'client', 'nafis@gmail.com');

    INSERT INTO categories (category_name) VALUES ('anxiety');
    INSERT INTO categories (category_name) VALUES ('depression');
    INSERT INTO categories (category_name) VALUES ('autism');
    INSERT INTO categories (category_name) VALUES ('adhd');
    INSERT INTO categories (category_name) VALUES ('schizophrenia');  
    INSERT INTO categories (category_name) VALUES ('ptsd');


  `);

  return db;
})();

export default dbPromise;
