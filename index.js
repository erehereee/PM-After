require("dotenv").config();

const { server } = require("./services/app");
const { databaseMigration, checkConnection } = require("./helper/pg");
const { comPLC } = require("./services/s7");

(async () => {
  const isConnected = await checkConnection();
  if (isConnected) {
    try {
      console.log("Starting database migration....");
      const dbMigrate = await databaseMigration();
      if (!dbMigrate) {
        console.log(
          "The database configuration is correct. Database migration will not be executed."
        );
      } else {
        console.log("Database Migration Successfully.");
      }
      console.log("Starting server...");
      await comPLC();
      server.listen(process.env.SERVER_PORT, () =>
        console.log(
          `Server listening on http://localhost:${process.env.SERVER_PORT}`
        )
      );
    } catch (error) {
      console.error("Cannot start server. " + error);
      process.exit(1);
    }
  } else {
    console.error("Cannot start server : Database Connection Failed ");
    process.exit(1);
  }
})();
