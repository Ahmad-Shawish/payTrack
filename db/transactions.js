import { getDb } from "./db";

const addSalary = async (month, amount) => {
  const db = await getDb();
  // await db.withTransactionAsync(async (tx) => {
  try {
    const result = await db.runAsync(
      `INSERT INTO Salaries (month, income) VALUES (?, ?);`,
      [month, amount]
    );
    return result;
  } catch (error) {
    console.error(error);
  }
  // });
};

const getSalaries = async () => {
  const db = await getDb();
  // await db.withTransactionAsync(async (tx) => {
  try {
    const salaries = await db.getAllSync(`SELECT * FROM Salaries;`);
    return salaries;
  } catch (error) {
    console.error(error);
  }
  // });
};

const addCategory = async (name) => {
  const db = await getDb();
  // await db.withTransactionAsync(async (tx) => {
  try {
    const result = await db.runAsync(
      `INSERT INTO Categories (name) VALUES (?);`,
      name
    );
    return result;
  } catch (error) {
    console.error(error);
  }
  // });
};

const getCategories = async () => {
  const db = await getDb();
  // await db.withTransactionAsync(async (tx) => {
  try {
    const categories = await db.getAllSync(`SELECT * FROM Categories;`);
    return categories;
  } catch (error) {
    console.error(error);
  }
  // });
};

const updateCategory = async (id, newName) => {
  const db = await getDb();
  // await db.withTransactionAsync(async (tx) => {
  try {
    const result = await db.runAsync(
      `UPDATE Categories SET name = ? WHERE id = ?;`,
      [newName, id]
    );
    return result;
  } catch (error) {
    console.error(error);
  }
  // });
};

const addRecord = async (
  salaryID,
  type,
  date,
  time,
  amount,
  categoryID,
  method,
  note
) => {
  const db = await getDb();
  // await db.withTransactionAsync(async (tx) => {
  try {
    const result = await db.runAsync(
      `INSERT INTO Records (salary_id, type, date, time, amount, category_id, method, note) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [salaryID, type, date, time, amount, categoryID, method, note]
    );
    return result;
  } catch (error) {
    console.error(error);
  }
  // });
};

const getSalaryRecords = async (id) => {
  const db = await getDb();
  // await db.withTransactionAsync(async (tx) => {
  try {
    const records = await db.getAllSync(
      `SELECT Records.*, Categories.name as category_name FROM Records, Categories WHERE salary_id = ? AND Categories.id = Records.category_id`,
      id
    ); //TODO: convert the cat id to cat name // done
    return records;
  } catch (error) {
    console.error(error);
  }
  // });
};

const updateRecord = async (
  recordID,
  type,
  date,
  time,
  amount,
  categoryID,
  method,
  note
) => {
  const db = await getDb();
  // await db.withTransactionAsync(async (tx) => {
  try {
    const result = await db.runAsync(
      `UPDATE Records
        SET type = ?, date = ?, time = ?, amount = ?, category_id = ?, method = ?, note = ?
        WHERE id = ?`,
      [type, date, time, amount, categoryID, method, note, recordID]
    );
    return result;
  } catch (error) {
    console.error(error);
  }
  // });
};

export {
  addSalary,
  getSalaries,
  addCategory,
  getCategories,
  updateCategory,
  addRecord,
  getSalaryRecords,
  updateRecord,
};
