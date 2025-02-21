const { opcServices } = require("../services/opc");

(async () => {
  try {
    const opc = new opcServices("opc.tcp://192.168.0.1:4840", 1000);
    await opc.initialize();
    opc.on(`ns=3;s="Data_block_1"."Variabel2"`);
    opc.on(`ns=3;s="Data_block_1"."Variabel1"`);
    opc.on(`ns=3;s="Data_block_1"."Variabel3"`);
  } catch (error) {
    console.log(error);
  }
})();
