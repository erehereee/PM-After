require("dotenv").config();
const app = require("./services/app");


const { socketServices } = require("./services/websocket");
const { databaseMigration, checkConnection } = require("./helper/pg");
const { comPLC } = require("./services/s7");


// const server = new socketServices(app)

(async () => {
  const isConnected = await checkConnection();
  if (isConnected) {
    try {
      console.log("Starting database migration....");
      // await databaseMigration();
      

      // await comPLC();
      app.listen(process.env.SERVER_PORT, () =>
        console.log(
          `Server listening on http://localhost:${process.env.SERVER_PORT}`
        )
      );
    } catch (error) {
      console.error("Cannot start server : " + error);
      process.exit(1);
    }
  } else {
    console.error("Cannot start server : Database Connection Failed ");
    process.exit(1);
  }
})();
