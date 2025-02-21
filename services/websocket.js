const { Server } = require("socket.io");

class socketServices {
  constructor(server) {
    this.io = new Server(server, {
      cors: {
        origin: "*",
        methods: ["GET", "POST"],
      },
    });

    this.initialize();
  }

  initialize() {
    this.io.on("connection", (socket) => {
      console.log(`Client Connected : ${socket.id}`);

      socket.on("disconnect", () => {
        console.log(`Client with Socket ID : ${socket.id} is disconnected`);
      });
    });
  }

  on(event, callback) {
    this.io.on(event, callback);
  }

  emit(event, callback) {
    this.io.emit(event, callback);
  }
}

module.exports = {
  socketServices,
};
