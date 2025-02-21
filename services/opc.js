const { OPCUAClient, AttributeIds } = require("node-opcua");
const async = require("async");

class opcServices {
  constructor(endpoint, samplingtime) {
    this.client = OPCUAClient.create({ endpointMustExist: false });
    this.endpoint = endpoint;
    this.the_session = null;
    this.intervalId = null;
    this.sampling = samplingtime;

    this.client.on("backoff", (retry, delay) => {
      console.log(
        `Try to reconnect ${this.endpoint}, retry ${retry} next attemt in ${
          delay / 1000
        } sec`
      );
    });
  }

  async initialize() {
    try {
      await new Promise((resolve, reject) => {
        this.client.connect(this.endpoint, (err) => {
          if (err) {
            reject(`Can't connect to endpoint: ${this.endpointURL}`);
          } else {
            console.log(`Connected to the server: ${this.endpointURL}`);
            resolve();
          }
        });
      });

      this.the_session = await new Promise((resolve, reject) => {
        this.client.createSession((err, session) => {
          if (err) {
            reject("Failed to create session");
          } else {
            resolve(session);
          }
        });
      });
    } catch (error) {
      console.log(error);
    }
  }

  on(namespace) {
    this.intervalId = setInterval(() => {
      if (!this.the_session) {
        console.log("Session not created yet.");
        return;
      }

      this.the_session.read(
        {
          nodeId: namespace,
          attributeId: AttributeIds.Value,
        },
        (err, dataValue) => {
          if (!err) {
            console.log(`Value: ${dataValue.value.value}`);
          } else {
            console.error("Error reading value:", err);
          }
        }
      );
    }, this.sampling);
  }
}

module.exports = {
  opcServices,
};
