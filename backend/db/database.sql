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
    experience TEXT, -- Assuming this is text-based, could be INTEGER for years of experience
    contactNo TEXT,
    profileImg TEXT,
    gender TEXT
);

