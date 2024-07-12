DROP TABLE IF EXISTS user;

CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    role TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE clients (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    FOREIGN KEY (user_id) REFERENCES users(id),
    firstname TEXT ,
    lastname TEXT,
    dateOfBirth TEXT, -- You can use TEXT to store dates or use a specific format 
    contactNo TEXT,
    profileImg TEXT,
    gender TEXT
);


CREATE TABLE therapists (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id),
    firstname TEXT,
    lastname TEXT,
    dateOfBirth TEXT, -- You can use TEXT to store dates or use a specific format
    experience INTEGER, -- Assuming this is text-based, could be INTEGER for years of experience
    contactNo TEXT,
    profileImg TEXT,
    gender TEXT
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

