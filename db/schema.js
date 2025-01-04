import { getDb } from "./db";

const initializeDatabase = async () => {
  const db = getDb();
  try {
    // await db.withTransactionAsync(async (tx) => {
    await db.execAsync(`
        CREATE TABLE IF NOT EXISTS Salaries (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            month TEXT NOT NULL,
            income REAL NOT NULL,
            total_spending INTEGER DEFAULT 0
        );

        CREATE TABLE IF NOT EXISTS Categories (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL
        );

        CREATE TABLE IF NOT EXISTS Records (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            salary_id INTEGER,
            type TEXT NOT NULL,
            
            date TEXT NOT NULL,
            time TEXT NOT NULL,
            amount REAL NOT NULL,
            category_id INTEGER NOT NULL,
            method TEXT NOT NULL,
            note TEXT,
            FOREIGN KEY (salary_id) REFERENCES Salaries (id) ON DELETE CASCADE,
            FOREIGN KEY (category_id) REFERENCES Categories (id) ON DELETE SET NULL
        );
    `);
    // });
    console.log("DB Initialized");
  } catch (error) {
    console.error(error);
  }
};

export { initializeDatabase };
