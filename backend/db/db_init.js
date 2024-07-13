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


    DROP TABLE IF EXISTS quizzes ;
CREATE TABLE IF NOT EXISTS quizzes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    time TEXT NOT NULL,
    type TEXT NOT NULL
);

DROP TABLE IF EXISTS questions ;
CREATE TABLE questions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    quiz_id INTEGER NOT NULL,
    category_id INTEGER NOT NULL,
    question TEXT NOT NULL,
    FOREIGN KEY (quiz_id) REFERENCES quizzes(id)
);

DROP TABLE IF EXISTS user_answers ;
CREATE TABLE IF NOT EXISTS user_answers (
    user_id INTEGER NOT NULL,
    question_id INTEGER NOT NULL,
    quiz_id INTEGER NOT NULL,
    option_id INTEGER NOT NULL,
    PRIMARY KEY (user_id, question_id, quiz_id),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (question_id) REFERENCES questions(id),
    FOREIGN KEY (quiz_id) REFERENCES quizzes(id)
    FOREIGN KEY (option_id) REFERENCES options(id),
);

-- Table: options
DROP TABLE IF EXISTS options ;
CREATE TABLE IF NOT EXISTS options (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    score INTEGER NOT NULL,
    quiz_id INTEGER NOT NULL,
    FOREIGN KEY (quiz_id) REFERENCES quizzes(id)
);

DROP TABLE IF EXISTS suggestions ;
CREATE TABLE IF NOT EXISTS suggestions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    quiz_id INTEGER NOT NULL,
    tip_text TEXT NOT NULL,
    type TEXT CHECK(type IN ('low', 'medium', 'high')) NOT NULL,
    FOREIGN KEY (quiz_id) REFERENCES quizzes(id)
);


  `);

  return db;
})();

export default dbPromise;
