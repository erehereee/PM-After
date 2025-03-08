const nodes7 = require("nodes7");
const conn = new nodes7();
const { query } = require("../helper/pg");
const {realTime} = require("../helper/dataHandler")
const { server } = require("./app");
const { socketServices } = require("./websocket");
const socket = new socketServices(server)

const IPAddress = "172.25.192.51";
const rack = 0;
const slot = 1;
const port = 102;
let isConnected = false;

const variables = {
  FT_101: "DB12,REAL26",
  FT_102: "DB12,REAL58",
};

// Fungsi untuk memulai koneksi
const comPLC = () => {
  console.log("Connecting to PLC...");
  conn.initiateConnection({ port, host: IPAddress, rack, slot, debug: false }, (err) => {
    if (err) {
      console.log("Connection failed. Retrying in 5 seconds...");
      return setTimeout(connectToPLC, 5000); // Coba lagi setelah 5 detik
    }

    console.log("Connected to PLC!");
    isConnected = true;

    conn.setTranslationCB((tag) => variables[tag]);
    conn.addItems(Object.keys(variables));

    setInterval(() => {
      if (!isConnected) return; // Jangan baca kalau tidak terhubung

    conn.readAllItems(async (err, data) => {
      if (err) {
        console.log("Cannot read data. Retrying...");
        return;
      }

      const queryData = `INSERT INTO data
      (
      iadata1, ibdata1, icdata1,
      iadata2, ibdata2, icdata2,
      iadata3, ibdata3, icdata3,
      vabdata1, vbcdata1, vcadata1,
      vabdata2, vbcdata2, vcadata2,
      vabdata3, vbcdata3, vcadata3
      ) VALUES ($1, $2, $3, 
                $4, $5, $6, 
                $7, $8, $9,
                $10, $11, $12,
                $13, $14, $15,
                $16, $17, $18);`;

      const values = [
        data.ia1, data.ib1, data.ic1,
        data.ia2, data.ib2, data.ic2,
        data.ia3, data.ib3, data.ic3,
        data.vab1, data.vbc1, data.vca1,
        data.vab2, data.vbc2, data.vca2,
        data.vab3, data.vbc3, data.vca3,
      ];

      try {
        // await query(queryData, values);
        // realTime(socket, data, "data");
        console.log("Data inserted:", data);
      } catch (err) {
        console.log("Failed to insert data:", err);
      }
    });
    }, 1000)
  });
}


module.exports = {
  comPLC,
};