import sqlite3 from "sqlite3";
import { open } from "sqlite";

const dbPromise = (async () => {
  const db = await open({
    filename: "./db/database.db",
    driver: sqlite3.Database,
  });

  await db.exec(`
        DROP TABLE IF EXISTS users;
        
        CREATE TABLE users (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          username TEXT NOT NULL UNIQUE,
          password TEXT NOT NULL,
          role TEXT NOT NULL,
          email TEXT NOT NULL UNIQUE,
          createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      INSERT INTO users (username, password, role, email) VALUES ("a", "b", "c", "d");

    `);

  return db;
})();

export default dbPromise;
