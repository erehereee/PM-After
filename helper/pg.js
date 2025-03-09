const Pool = require("pg").Pool;
const bcrypt = require("bcryptjs");
require("dotenv").config();

const pool = new Pool({
  database: process.env.SQL_DATABASE,
  user: process.env.SQL_USER,
  password: process.env.SQL_PASSWORD,
  port: process.env.SQL_PORT,
  max: 20,
  idleTimeoutMillis: 1000,
  connectionTimeoutMillis: 1000,
  maxUses: 7500,
});

const checkConnection = async () => {
  try {
    await pool.connect();
    console.log("Database Connection Successfully.");
    return true;
  } catch (error) {
    console.error("Failed to connect Database: " + error.message);
    return false;
  }
};

const query = async (query, data) => {
  const results = await pool.query(query, data);
  return results;
};

async function databaseMigration() {
  try {
    const cTables = `
      SELECT table_name
      FROM information_schema.tables
      WHERE table_name IN (
        'data', 'users'
      );
    `;

    const results = await pool.query(cTables);
    console.log("Checking databases...");

    const existingTables = results.rows.map((row) => row.table_name);
    const queries = [];

    if (!existingTables.includes("data")) {
      queries.push(`
        CREATE TABLE public.data (
        id bigint NOT NULL,
        iadata1 real,
        ibdata1 real,
        icdata1 real,
        iadata2 real,
        ibdata2 real,
        icdata2 real,
        iadata3 real,
        ibdata3 real,
        icdata3 real,
        vabdata1 real,
        vbcdata1 real,
        vcadata1 real,
        vabdata2 real,
        vbcdata2 real,
        vcadata2 real,
        vabdata3 real,
        vbcdata3 real,
        vcadata3 real,
        "timestamp" timestamp without time zone DEFAULT CURRENT_TIMESTAMP
      );
        `);
    }
    if (!existingTables.includes("users")) {
      queries.push(`
        create table users (
        id serial primary key,
        name varchar(50),
        role varchar(10),
        username varchar(50),
        password varchar(255),
        created_at TIMESTAMP with TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
        `);
    }

    const checkUsers = `
      SELECT name FROM users WHERE name IN ('admin', 'operator');
    `;
    const userResults = await pool.query(checkUsers);

    if (userResults.rows.length === 0) {
      const hashPasswordAdmin = await bcrypt.hash(
        process.env.BASIC_PASS_ADMIN,
        10
      );
      const hashPasswordOP = await bcrypt.hash(process.env.BASIC_PASS_OP, 10);
      const insertUsers = `
      INSERT INTO users (name, username, password, role)
      VALUES
      ('admin', 'administrator', $1, 'admin'),
      ('operator', 'operator', $2, 'operator');
      `;
      await pool.query(insertUsers, [hashPasswordAdmin, hashPasswordOP]);
      console.log("Create common user successfully.");
    }

    if (queries.length > 0) {
      await pool.query(queries.join(" "));
      return true;
    }

    return false;
  } catch (error) {
    console.log("Error Migrating databases: " + error.message);
  }
}

module.exports = {
  pool,
  databaseMigration,
  checkConnection,
  query,
};
