import sqlite3 from "sqlite3";
import { open } from "sqlite";

const dbPromise = (async () => {
	const db = await open({
		filename: "./db/database.db",
		driver: sqlite3.Database,
	});

	await db.exec(`
        DROP TABLE IF EXISTS user;
        CREATE TABLE IF NOT EXISTS user (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT UNIQUE NOT NULL
        );

        INSERT INTO user (name) VALUES ("test");
    `);

	return db;
})();

export default dbPromise;