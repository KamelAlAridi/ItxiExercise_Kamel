import SQLite from 'react-native-sqlite-storage';

SQLite.enablePromise(true);

export const getDBConnection = async () => {
  return SQLite.openDatabase({name: 'app.db', location: 'default'});
};

export const createTable = async (db: SQLite.SQLiteDatabase) => {
  const query = `CREATE TABLE IF NOT EXISTS company_voice (
      company_id TEXT PRIMARY KEY,
      voice TEXT NOT NULL
    );`;
  await db.executeSql(query);
};

export const saveCompanyVoice = async (
  db: SQLite.SQLiteDatabase,
  companyId: string,
  voice: string,
) => {
  const insertQuery = `INSERT OR REPLACE INTO company_voice (company_id, voice) VALUES (?, ?)`;
  await db.executeSql(insertQuery, [companyId, voice]);
};

export const getCompanyVoice = async (db: SQLite.SQLiteDatabase) => {
  const results = await db.executeSql(`SELECT * FROM company_voice LIMIT 1`);
  return results[0].rows.length > 0 ? results[0].rows.item(0) : null;
};

export const deleteCompanyVoice = async (db: SQLite.SQLiteDatabase) => {
  await db.executeSql(`DELETE FROM company_voice`);
};
