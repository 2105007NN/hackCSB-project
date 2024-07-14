import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

const dbPromise = (async () => {
  try {
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
        category_name TEXT NOT NULL UNIQUE,
        color TEXT NOT NULL UNIQUE
      );
  
      DROP TABLE IF EXISTS room;
      CREATE TABLE IF NOT EXISTS room (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT UNIQUE  NOT NULL,
          user1 TEXT NOT NULL,
          user2 TEXT NOT NULL,
  
          FOREIGN KEY (user1) REFERENCES users(username),
          FOREIGN KEY (user1) REFERENCES users(username)
      );
  
      DROP TABLE IF EXISTS message;
      CREATE TABLE IF NOT EXISTS message (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          content TEXT NOT NULL,
          author TEXT NOT NULL,
          time TEXT NOT NULL,
          room_id INTEGER,
          FOREIGN KEY (author) REFERENCES users(username),
          FOREIGN KEY (room_id) REFERENCES room(id)
      );

      DROP TABLE IF EXISTS journals;
      CREATE TABLE IF NOT EXISTS journals (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          user_id INTEGER NOT NULL,
          content TEXT NOT NULL,
          createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (user_id) REFERENCES users(id)
      );

      DROP TABLE IF EXISTS mood_ratings;
      CREATE TABLE IF NOT EXISTS mood_ratings (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          user_id INTEGER NOT NULL,
          rating INTEGER NOT NULL,
          createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (user_id) REFERENCES users(id)
      );

      DROP TABLE IF EXISTS user_category;
      CREATE TABLE IF NOT EXISTS user_category (
          user_id INTEGER NOT NULL,
          category_id INTEGER NOT NULL,
          score INTEGER,
          PRIMARY KEY (user_id, category_id),
          FOREIGN KEY (user_id) REFERENCES users(id)
          FOREIGN KEY (category_id) REFERENCES categories(id)
      );
  
      INSERT INTO users (username, password, role, email)
      VALUES ('asif', '123456', 'client', 'asif@gmail.com');
  
      INSERT INTO users (username, password, role, email)
      VALUES ('tmzd', '123456', 'client', 'tmzd@gmail.com');
  
      INSERT INTO users (username, password, role, email)
      VALUES ('nafis', '123456', 'client', 'nafis@gmail.com');

      INSERT INTO users (username, password, role, email)
      VALUES ('tanzima', '123456', 'therapist', 'tanzima@gmail.com');
  
    INSERT INTO users (username, password, role, email)
    VALUES ('tuhin', '123456', 'client', 'tuhin@gmail.com');

    INSERT INTO users (username, password, role, email)
    VALUES ('ibtida', '123456', 'client', 'ibtida@gmail.com');

      INSERT INTO categories (category_name, color) VALUES ('anxiety', 'red');
      INSERT INTO categories (category_name, color) VALUES ('depression', 'green');
      INSERT INTO categories (category_name, color) VALUES ('autism','yellow');
      INSERT INTO categories (category_name, color) VALUES ('adhd', 'indigo');
      INSERT INTO categories (category_name, color) VALUES ('schizophrenia', 'purple');  
      INSERT INTO categories (category_name, color) VALUES ('ptsd', 'pink');

      INSERT INTO user_category (user_id, category_id) VALUES (4, 2);
      INSERT INTO user_category (user_id, category_id) VALUES (4, 5);
      INSERT INTO user_category (user_id, category_id) VALUES (4, 6);
      INSERT INTO user_category (user_id, category_id) VALUES (2, 1);
      INSERT INTO user_category (user_id, category_id) VALUES (2, 2);
      INSERT INTO user_category (user_id, category_id) VALUES (1, 1);
      INSERT INTO user_category (user_id, category_id) VALUES (3, 2);
  
      DROP TABLE IF EXISTS tests ;
  CREATE TABLE IF NOT EXISTS tests (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      time TEXT NOT NULL,
      type TEXT NOT NULL
  );
  
  DROP TABLE IF EXISTS questions ;
  CREATE TABLE questions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      test_id INTEGER NOT NULL,
      category_id INTEGER NOT NULL,
      question TEXT NOT NULL,
      FOREIGN KEY (test_id) REFERENCES tests(id)
  );
  
  DROP TABLE IF EXISTS user_answers ;
  CREATE TABLE IF NOT EXISTS user_answers (
      user_id INTEGER NOT NULL,
      question_id INTEGER NOT NULL,
      test_id INTEGER NOT NULL,
      option_id INTEGER NOT NULL,
      PRIMARY KEY (user_id, question_id, test_id),
      FOREIGN KEY (user_id) REFERENCES users(id),
      FOREIGN KEY (question_id) REFERENCES questions(id),
      FOREIGN KEY (test_id) REFERENCES tests(id)
      FOREIGN KEY (option_id) REFERENCES options(id)
  );
  
  -- Table: options
  DROP TABLE IF EXISTS options ;
  CREATE TABLE IF NOT EXISTS options (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      score INTEGER NOT NULL
  );
  
  INSERT INTO options (name, score) VALUES ('never', 0);
  INSERT INTO options (name, score) VALUES ('rarely', 1);
  INSERT INTO options (name, score) VALUES ('sometimes', 2);
  INSERT INTO options (name, score) VALUES ('often', 3);
  INSERT INTO options (name, score) VALUES ('very often', 4);


  DROP TABLE IF EXISTS suggestions ;
  CREATE TABLE IF NOT EXISTS suggestions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      test_id INTEGER NOT NULL,
      tip_text TEXT NOT NULL,
      type TEXT CHECK(type IN ('low', 'medium', 'high')) NOT NULL,
      FOREIGN KEY (test_id) REFERENCES tests(id)
  );
      

    INSERT INTO tests (id, title, description, time, type) VALUES
    (1, 'Anxiety Test', 'Find out if your anxiety could be a sign of something more serious.', '5', 'anxiety');

    INSERT INTO questions (id, test_id, category_id, question) VALUES
    (1, 1, 1, 'I find it very hard to unwind, relax or sit still'),
    (2, 1, 1, 'I have had stomach problems, such as feeling sick or stomach cramps'),
    (3, 1, 1, 'I have been irritable and easily become annoyed'),
    (4, 1, 1, 'I have experienced shortness of breath'),
    (5, 1, 1, 'I have felt dizzy and unsteady at times'),
    (6, 1, 1, 'I have had difficulties with sleep (including waking early, finding it hard to go to sleep)'),
    (7, 1, 1, 'I have felt panicked and overwhelmed by things in my life'),
    (8, 1, 1, 'I have felt nervous and on edge'),
    (9, 1, 1, 'I have had trembling hands'),
    (10, 1, 1, 'I seem to be constantly worrying about things');

    `);
  
    return db;
  } catch (error) {
      console.log("error in db_init : ", error);
  }
})();

export default dbPromise;
