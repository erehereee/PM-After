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
    const checkTablesAndConstraints = `
      SELECT table_name
      FROM information_schema.tables
      WHERE table_name IN (
        'data_kw', 'daily_kw', 'monthly_kw',
        'calculate_daily_kw', 'calculate_monthly_kw', 'biogas', 'users', 'tokeninvalid'
      );

      SELECT conname
      FROM pg_constraint
      WHERE conname IN (
        'unique_calculate_daily_kw', 'unique_daily_kw',
        'unique_monthly_kw', 'unique_calculate_monthly_kw'
      );
    `;

    const results = await pool.query(checkTablesAndConstraints);
    console.log("Checking Migration Successfully.");

    const existingTables = results[0].rows.map((row) => row.table_name);
    const existingConstraints = results[1].rows.map((row) => row.conname);
    const queries = [];

    if (!existingTables.includes("data_kw")) {
      queries.push(`
        CREATE TABLE "data_kw" (
          id SERIAL PRIMARY KEY,
          iadata VARCHAR(100) NOT NULL,
          ibdata VARCHAR(100) NOT NULL,
          icdata VARCHAR(100) NOT NULL,
          iavgdata VARCHAR(100) NOT NULL,
          vabdata VARCHAR(100) NOT NULL,
          vbcdata VARCHAR(100) NOT NULL,
          vcadata VARCHAR(100) NOT NULL,
          vandata VARCHAR(100) NOT NULL,
          vbndata VARCHAR(100) NOT NULL,
          vcndata VARCHAR(100) NOT NULL,
          kwhdata VARCHAR(100) NOT NULL,
          deliverydata VARCHAR(100) NOT NULL,
          receiveddata VARCHAR(100) NOT NULL,
          timestamp timestamp DEFAULT CURRENT_TIMESTAMP
        );
      `);
    }

    if (!existingTables.includes("daily_kw")) {
      queries.push(`
        CREATE TABLE "daily_kw" (
          id SERIAL PRIMARY KEY,
          max_daily VARCHAR(100) NOT NULL,
          time_daily date
        );
      `);
    }

    if (!existingTables.includes("monthly_kw")) {
      queries.push(`
          CREATE TABLE "monthly_kw" (
            id SERIAL PRIMARY KEY,
            max_monthly VARCHAR(100) NOT NULL,
            time_monthly date
          );
        `);
    }
    if (!existingTables.includes("calculate_daily_kw")) {
      queries.push(`
          CREATE TABLE "calculate_daily_kw" (
            id SERIAL PRIMARY KEY,
            data_daily VARCHAR(100) NOT NULL,
            timestamp date
          );
        `);
    }
    if (!existingTables.includes("calculate_monthly_kw")) {
      queries.push(`
          CREATE TABLE "calculate_monthly_kw" (
            id SERIAL PRIMARY KEY,
            data_monthly VARCHAR(100) NOT NULL,
            timestamp date
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
    if (!existingTables.includes("tokeninvalid")) {
      queries.push(`
          create table tokeninvalid (
    id serial primary key,
    name varchar(50),
    token varchar(255),
    exp varchar(50),
    created_at TIMESTAMP with TIME ZONE DEFAULT CURRENT_TIMESTAMP
  );
        `);
    }
    if (!existingTables.includes("biogas")) {
      queries.push(`
          CREATE TABLE biogas (
            id serial PRIMARY KEY,
            ft_101 VARCHAR (10) DEFAULT 1,
            ft_102 VARCHAR (10) DEFAULT 1,
            ft_201 VARCHAR (10) DEFAULT 1,
            ft_202 VARCHAR (10) DEFAULT 1,
            ft_301 VARCHAR (10) DEFAULT 1,
            ft_401 VARCHAR (10) DEFAULT 1,
            ft_402 VARCHAR (10) DEFAULT 1,
            ft_601 VARCHAR (10) DEFAULT 1,
            ae_201 VARCHAR (10) DEFAULT 1,
            ae_202 VARCHAR (10) DEFAULT 1,
            ae_301 VARCHAR (10) DEFAULT 1,
            ae_401 VARCHAR (10) DEFAULT 1,
            ae_402 VARCHAR (10) DEFAULT 1,
            ae_501 VARCHAR (10) DEFAULT 1,
            ae_601 VARCHAR (10) DEFAULT 1,
            pt_401 VARCHAR (10) DEFAULT 1,
            pt_901 VARCHAR (10) DEFAULT 1,
            pt_902 VARCHAR (10) DEFAULT 1,
            pt_201 VARCHAR (10) DEFAULT 1,
            le_201 VARCHAR (10) DEFAULT 1,
            lg_201 VARCHAR (10) DEFAULT 1,
            lg_202 VARCHAR (10) DEFAULT 1,
            lg_203 VARCHAR (10) DEFAULT 1
          );
      `);
    }
    if (!existingConstraints.includes("unique_daily_kw")) {
      queries.push(
        `ALTER TABLE daily_kw ADD CONSTRAINT unique_daily_kw UNIQUE (time_daily);`
      );
    }
    if (!existingConstraints.includes("unique_monthly_kw")) {
      queries.push(
        `ALTER TABLE monthly_kw ADD CONSTRAINT unique_monthly_kw UNIQUE (time_monthly);`
      );
    }
    if (!existingConstraints.includes("unique_calculate_daily_kw")) {
      queries.push(
        `ALTER TABLE calculate_daily_kw ADD CONSTRAINT unique_calculate_daily_kw UNIQUE (timestamp);`
      );
    }
    if (!existingConstraints.includes("unique_calculate_monthly_kw")) {
      queries.push(
        `ALTER TABLE calculate_monthly_kw ADD CONSTRAINT unique_calculate_monthly_kw UNIQUE (timestamp);`
      );
    }

    if (queries.length > 0) {
      await pool.query(queries.join(" "));
      console.log("Database Updated");
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

    const checkDataBiogas = `SELECT * from biogas`;
    const biogasResults = await pool.query(checkDataBiogas);

    if (biogasResults.rows.length === 0) {
      const insertRows = `INSERT INTO biogas DEFAULT VALUES;`;
      await pool.query(insertRows);
      console.log("Create common data biogas successfully.");
    }
  } catch (error) {
    console.log("Error Migrating databases: " + error.message);
  }
}

module.exports = {
  pool,
  databaseMigration,
  checkConnection,
  query
};
