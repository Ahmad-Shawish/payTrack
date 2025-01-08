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
    const salaries = await db.getAllSync(
      `SELECT s.*,
      (SELECT SUM(income) FROM Salaries) AS sum_salaries,
      (SELECT SUM(r.amount) FROM Records r WHERE r.salary_id = s.id AND r.type = 'Expense') AS sum_spendings,
      (SELECT SUM(r.amount) FROM Records r WHERE r.type = 'Expense') AS sum_total_spendings
      FROM Salaries s;`
    );
    return salaries;
  } catch (error) {
    console.error(error);
  }
  // });
};

const deleteSalary = async (id) => {
  const db = await getDb();
  try {
    const result = await db.runAsync(`DELETE FROM Salaries WHERE id = ?`, id);
    return result;
  } catch (error) {
    console.error(error);
  }
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
    if (type == "Expense") {
      try {
        const result2 = await db.runAsync(
          `UPDATE Salaries SET total_spending = total_spending + ? WHERE id = ?`,
          [amount, salaryID]
        );
      } catch (error) {
        console.error(error);
      }
    }
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
      `SELECT Records.*,
      Categories.name as category_name,
      (SELECT SUM(amount) FROM Records WHERE Records.type = 'Expense' AND Records.salary_id = ?) AS sum_expenses
      FROM Records, Categories WHERE salary_id = ? AND Categories.id = Records.category_id`,
      [id, id]
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

const deleteRecord = async (id) => {
  const db = await getDb();
  try {
    const result = await db.runAsync(`DELETE FROM Records WHERE id = ?`, id);
    return result;
  } catch (error) {
    console.error(error);
  }
};

// const sumSalaryExpenses = async (id) =>{
//   const db = await getDb();
//   try {
//     const result = await db.getAllSync(`SELECT `)
//   } catch (error) {
//     console.error(error)
//   }
// }

export {
  addSalary,
  getSalaries,
  deleteSalary,
  addCategory,
  getCategories,
  updateCategory,
  addRecord,
  getSalaryRecords,
  updateRecord,
  deleteRecord,
};
