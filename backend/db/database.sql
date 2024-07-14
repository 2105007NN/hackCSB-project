DROP TABLE IF EXISTS user;

CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    role TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    firstname TEXT ,
    lastname TEXT,
    dateOfBirth TEXT, -- You can use TEXT to store dates or use a specific format 
    contactNo TEXT,
    profileImg TEXT,
    gender TEXT
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

create table categories(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    category_name TEXT
);


DROP TABLE IF EXISTS user_category;
CREATE table IF NOT EXISTS user_category (
    user_id INTEGER NOT NULL,
    category_id INTEGER NOT NULL,
    score INTEGER, --out of 100
    PRIMARY KEY (user_id, category_id),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (category_id) REFERENCES categories(id)
)

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

DROP TABLE IF EXISTS tests ;
CREATE TABLE IF NOT EXISTS tests (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
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
    FOREIGN KEY (option_id) REFERENCES options(id),
);

-- Table: options
DROP TABLE IF EXISTS options ;
CREATE TABLE IF NOT EXISTS options (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    score INTEGER NOT NULL,
    test_id INTEGER NOT NULL,
    FOREIGN KEY (test_id) REFERENCES tests(id)
);

DROP TABLE IF EXISTS suggestions ;
CREATE TABLE IF NOT EXISTS suggestions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    test_id INTEGER NOT NULL,
    tip_text TEXT NOT NULL,
    type TEXT CHECK(type IN ('low', 'medium', 'high')) NOT NULL,
    FOREIGN KEY (test_id) REFERENCES tests(id)
);

 