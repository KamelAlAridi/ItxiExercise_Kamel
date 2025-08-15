import SQLite from 'react-native-sqlite-storage';

SQLite.enablePromise(true);

export const getDBConnection = async () => {
  return SQLite.openDatabase({name: 'app.db', location: 'default'});
};

export const createTables = async (
  db: SQLite.SQLiteDatabase,
): Promise<void> => {
  const companyTable = `
    CREATE TABLE IF NOT EXISTS companies (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      company_id TEXT NOT NULL UNIQUE
    );
  `;

  const settingsTable = `
    CREATE TABLE IF NOT EXISTS settings (
      id INTEGER PRIMARY KEY CHECK (id = 1),
      voice TEXT NOT NULL
    );
  `;

  await db.executeSql(companyTable);
  await db.executeSql(settingsTable);

  const res = await db.executeSql(`SELECT * FROM settings WHERE id = 1`);
  if (res[0].rows.length === 0) {
    await db.executeSql(`INSERT INTO settings (id, voice) VALUES (1, '')`);
  }
};

export const addCompany = async (
  db: SQLite.SQLiteDatabase,
  companyId: string,
): Promise<boolean> => {
  const result = await db.executeSql(
    `INSERT OR IGNORE INTO companies (company_id) VALUES (?)`,
    [companyId],
  );

  return result[0].rowsAffected > 0;
};

export const getCompanies = async (
  db: SQLite.SQLiteDatabase,
): Promise<{id: number; company_id: string}[]> => {
  const results = await db.executeSql(`SELECT * FROM companies`);
  const rows = results[0].rows;
  const companies: {id: number; company_id: string}[] = [];
  for (let i = 0; i < rows.length; i++) companies.push(rows.item(i));
  return companies;
};

export const deleteCompany = async (
  db: SQLite.SQLiteDatabase,
  id: number,
): Promise<void> => {
  await db.executeSql(`DELETE FROM companies WHERE id = ?`, [id]);
};

export const getVoice = async (db: SQLite.SQLiteDatabase): Promise<string> => {
  const results = await db.executeSql(
    `SELECT voice FROM settings WHERE id = 1`,
  );
  return results[0].rows.length > 0 ? results[0].rows.item(0).voice : '';
};

export const setVoice = async (
  db: SQLite.SQLiteDatabase,
  voice: string,
): Promise<void> => {
  await db.executeSql(`UPDATE settings SET voice = ? WHERE id = 1`, [voice]);
};
