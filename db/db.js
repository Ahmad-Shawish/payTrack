import * as SQLite from "expo-sqlite";

let db;

const initializeDbConnection = async () => {
  if (!db) {
    db = await SQLite.openDatabaseAsync("salaries_expenses.db");
  }

  return db;
};

const getDb = () => {
  if (!db) throw new Error("DB Not Initialized.");

  return db;
};

export { initializeDbConnection, getDb };
