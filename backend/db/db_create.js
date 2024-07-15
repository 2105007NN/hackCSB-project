import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

(async () => {
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

      INSERT INTO user_category (user_id, category_id, score) VALUES (4, 2, 100);
      INSERT INTO user_category (user_id, category_id, score) VALUES (4, 5, 100);
      INSERT INTO user_category (user_id, category_id, score) VALUES (4, 6, 100);
      INSERT INTO user_category (user_id, category_id, score) VALUES (2, 1, 80);
      INSERT INTO user_category (user_id, category_id, score) VALUES (2, 2, 70);
      INSERT INTO user_category (user_id, category_id, score) VALUES (1, 1, 75);
      INSERT INTO user_category (user_id, category_id, score) VALUES (1, 2, 35);
      INSERT INTO user_category (user_id, category_id, score) VALUES (3, 2, 90);
  
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

-- Insert the new test (example with test_id 3, update as needed)
INSERT INTO tests (id, title, description, time, type) VALUES 
(2, 'Depression Test', 'Evaluate your depression symptoms with our comprehensive test.', '10', 'depression');

-- Insert the new questions
INSERT INTO questions (id, test_id, category_id, question) VALUES 
(21, 2, 2, 'I feel overwhelmingly sad at times'),
(22, 2, 2, 'When I think of the future I feel hopeless'),
(23, 2, 2, 'I feel like a complete failure'),
(24, 2, 2, 'I get a lot of satisfaction / joy from doing things'),
(25, 2, 2, 'I feel guilty about something most of the time'),
(26, 2, 2, 'I feel like I am being punished'),
(27, 2, 2, 'I feel disappointed (even disgusted) with myself'),
(28, 2, 2, 'The bad things in my life aren’t all my fault'),
(29, 2, 2, 'I am often on the brink of tears or cry'),
(30, 2, 2, 'I feel irritated and annoyed by things in my life'),
(31, 2, 2, 'I am very interested in other people’s lives and like to listen to them'),
(32, 2, 2, 'I find it easy to make decisions, big and small');



    -- Insert the new test (example with test_id 4, update as needed)
INSERT INTO tests (id, title, description, time, type) VALUES 
(3, 'Autism Test', 'Assess common symptoms of Autism Spectrum Disorder with our test.', '15', 'autism');

-- Insert the new questions
INSERT INTO questions (id, test_id, category_id, question) VALUES 
(33, 3, 3, 'Do you find it challenging to maintain eye contact during conversations?'),
(34, 4, 3, 'Do you have difficulty understanding or interpreting social cues, such as facial expressions and body language?'),
(35, 3, 3, 'Do you prefer to stick to a routine and get upset when it is disrupted?'),
(36, 3, 3, 'Do you find it difficult to initiate or maintain conversations with others?'),
(37, 3, 3, 'Do you have intense interests or hobbies that you focus on for long periods?'),
(38, 3, 3, 'Do you experience sensory sensitivities, such as being overwhelmed by loud noises, bright lights, or certain textures?'),
(39, 3, 3, 'Do you engage in repetitive behaviors or movements, such as hand-flapping, rocking, or repeating phrases?'),
(40, 3, 3, 'Do you struggle with understanding and responding to other people’s emotions?'),
(41, 3, 3, 'Do you find it challenging to make friends or maintain social relationships?'),
(42, 3, 3, 'Do you have difficulty adapting to changes in your environment or daily routine?');



      -- Insert the new test (example with test_id 6, update as needed)
INSERT INTO tests (id, title, description, time, type) VALUES 
(4, 'ADHD Test', 'Assess common symptoms of ADHD with our test.', '10', 'adhd');

-- Insert the new questions
INSERT INTO questions (id, test_id, category_id, question) VALUES 
(56, 4, 4, 'I find it difficult finishing a task or project'),
(57, 4, 4, 'I find it difficult to organise myself or a task'),
(58, 4, 4, 'I find it difficult to remember appointments'),
(59, 4, 4, 'If a task or project requires a lot of thought I will often delay in getting it started'),
(60, 4, 4, 'I find it difficult to sit still and often fidget or squirm'),
(61, 4, 4, 'I would describe myself as being ‘‘on the go’’ and feel compelled to do things, as if driven by a motor'),
(62, 4, 4, 'I find it hard to remain focused in group settings'),
(63, 4, 4, 'My mind feels very cluttered and it is hard for me to concentrate on one thing at a time'),
(64, 4, 4, 'I make decisions quickly and fail to think through the consequences'),
(65, 4, 4, 'I am often irritable, with a short fuse'),
(66, 4, 4, 'I have mood swings, sometimes feeling quite high, other times low'),
(67, 4, 4, 'I often miss what is being said to me in conversations');




    INSERT INTO tests (id, title, description, time, type) VALUES 
(5, 'Schizophrenia Test', 'Are you experiencing the most common symptoms of Schizophrenia? Find out using our online test.', '10', 'schizophrenia');

-- Insert the new questions
INSERT INTO questions (id, test_id, category_id, question) VALUES 
(11, 5, 5, 'I experience hallucinations, such as hearing voices or seeing things that others do not see'),
(12, 5, 5, 'I have delusions, such as believing that you have special powers or are being controlled by external forces'),
(13, 5, 5, 'I find it difficult to organize your thoughts or follow conversations'),
(14, 5, 5, 'I feel disconnected from reality or have trouble distinguishing between what is real and what is not?'),
(15, 5, 5, 'I experience significant mood swings, such as feeling extremely happy and then very depressed'),
(16, 5, 5, 'I find it difficult to express emotions or relate to other people?'),
(17, 5, 5, 'I withdraw from social activities or prefer to be alone most of the time'),
(18, 5, 5, 'I experience paranoia or believe that others are plotting against you'),
(19, 5, 5, 'I have trouble taking care of daily responsibilities, such as personal hygiene or managing finances'),
(20, 5, 5, 'I feel that your thoughts are being inserted or removed from your mind by an outside force');







     -- Insert the new test (example with test_id 5, update as needed)
INSERT INTO tests (id, title, description, time, type) VALUES 
(6, 'PTSD Test', 'Assess common symptoms of PTSD with our test.', '10', 'ptsd');

-- Insert the new questions
INSERT INTO questions (id, test_id, category_id, question) VALUES 
(43, 6, 6, 'Any reminder brought back feelings about the event/s'),
(44, 6, 6, 'I had trouble staying asleep'),
(45, 6, 6, 'Other things kept making me think about it'),
(46, 6, 6, 'I felt irritable and angry'),
(47, 6, 6, 'I avoided letting myself get upset when I thought about it or was reminded of it'),
(48, 6, 6, 'I thought about the event when I didn''t mean to'),
(49, 6, 6, 'I felt as if the event hadn''t happened or it wasn''t real'),
(50, 6, 6, 'I have stayed away from reminders about the situation'),
(51, 6, 6, 'Images and pictures of the event pop into my mind'),
(52, 6, 6, 'I have been jumpy and easily startled'),
(53, 6, 6, 'I have tried not to think about the situation'),
(54, 6, 6, 'I am aware I have a lot of feelings about what happened but I haven''t dealt with them'),
(55, 6, 6, 'I feel quite numb about the situation');


INSERT INTO tests (id, title, description, time, type) VALUES 
(7, 'Mental Health Test', 'Assess common symptoms of mental health problems with our test.', '10', 'compulsory');

INSERT INTO questions (id, test_id, category_id, question) VALUES 
(68, 7, 1, 'I have been irritable and easily become annoyed'),
(69, 7, 1, 'I have experienced shortness of breath'),
(70, 7, 1, 'I seem to be constantly worrying about things'),
(71, 7, 1, 'I find it very hard to unwind, relax or sit still');

INSERT INTO questions (id, test_id, category_id, question) VALUES 
(72, 7, 2, 'I feel overwhelmingly sad at times'),
(73, 7, 2, 'When I think of the future I feel hopeless'),
(74, 7, 2, 'I feel guilty about something most of the time'),
(75, 7, 2, 'My sleep patterns have been really disrupted');

INSERT INTO questions (id, test_id, category_id, question) VALUES 
(76, 7, 3, 'I find it challenging to maintain eye contact during conversations'),
(77, 7, 3, 'I prefer to stick to a routine and get upset when it is disrupted?'),
(78, 7, 3, 'I engage in repetitive behaviors or movements, such as hand-flapping, rocking, or repeating phrases?'),
(79, 7, 3, 'I find it challenging to make friends or maintain social relationships');

INSERT INTO questions (id, test_id, category_id, question) VALUES 
(80, 7, 4, 'If a task or project requires a lot of thought I will often delay in getting it started'),
(81, 7, 4, 'I make decisions quickly and fail to think through the consequences'),
(82, 7, 4, 'I find it difficult finishing a task or project'),
(83, 7, 4, 'I find it hard to remain focused in group settings');

INSERT INTO questions (id, test_id, category_id, question) VALUES 
(84, 7, 5, 'I have delusions, such as believing that you have special powers or are being controlled by external forces?'),
(85, 7, 5, 'I feel that your thoughts are being inserted or removed from your mind by an outside force?'),
(86, 7, 5, 'I experience significant mood swings, such as feeling extremely happy and then very depressed?'),
(87, 7, 5, 'I find it difficult to organize your thoughts or follow conversations');

INSERT INTO questions (id, test_id, category_id, question) VALUES 
(88, 7, 6, 'I thought about the event when I didnt mean to'),
(89, 7, 6, 'I have tried not to think about the situation');

    `);
  
    db.close()
  } catch (error) {
      console.log("error in db_init : ", error);
  }
})();

