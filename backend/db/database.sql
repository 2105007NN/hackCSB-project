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


-- CREATE TABLE clients (
--     id INTEGER PRIMARY KEY AUTOINCREMENT,
--     user_id INTEGER,
--     FOREIGN KEY (user_id) REFERENCES users(id),
--     firstname TEXT ,
--     lastname TEXT,
--     dateOfBirth TEXT, -- You can use TEXT to store dates or use a specific format 
--     contactNo TEXT,
--     profileImg TEXT,
--     gender TEXT
-- );


-- CREATE TABLE therapists (
--     id INTEGER PRIMARY KEY AUTOINCREMENT,
--     user_id INTEGER NOT NULL,
--     FOREIGN KEY (user_id) REFERENCES users(id),
--     firstname TEXT,
--     lastname TEXT,
--     dateOfBirth TEXT, -- You can use TEXT to store dates or use a specific format
--     experience INTEGER, -- Assuming this is text-based, could be INTEGER for years of experience
--     contactNo TEXT,
--     profileImg TEXT,
--     gender TEXT
-- );

-- INSERT INTO users (username, password, role, email)
-- VALUES ('client_username', 'hashed_password', 'client', 'client@example.com');

-- SELECT last_insert_rowid() AS user_id;

-- INSERT INTO clients (user_id, firstname, lastname, dateOfBirth, contactNo, profileImg, gender)
-- VALUES (<user_id_from_step_2>, 'Client Firstname', 'Client Lastname', '1990-01-01', '1234567890', 'path_to_image.jpg', 'Male');