const express = require("express");
const connectDB = require("./database/db");
const machineRoutes = require("./routes/machineRoutes");
const userRoutes = require("./routes/userRoutes");
const WebSocket = require("ws");
const mqttClient = require("./client/mqttClient");
const catchAsync = require("./utils/catchAsync");
const AppError = require("./utils/AppError");
const globalErrorHandler = require("./controller/errorController");

//Tạo Express
const app = express();
app.use(express.json());
connectDB();
// Tạo WebSocket Server trên cổng 4000
const wss = new WebSocket.Server({ port: 4000 });

wss.on("connection", (ws) => {
  console.log("WebSocket client connected");

  ws.on("close", () => {
    console.log("WebSocket client disconnected");
  });
});

// Nhận dữ liệu từ MQTT và gửi qua WebSocket
mqttClient.on("message", (topic, message) => {
  try {
    const data = JSON.parse(message.toString());
    console.log("Received MQTT Data:", data);

    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(data));
      }
    });
  } catch (error) {
    console.error("Error parsing MQTT message:", error);
  }
});

app.use("/api/v1/machines", machineRoutes);
app.use("/api/v1/users", userRoutes);

app.use(
  "*",
  catchAsync(async (req, res, next) => {
    throw new AppError(`Cant find ${req.originalUrl}on this server`,404);
  })
);

app.use(globalErrorHandler);

app.listen(3000, () => console.log("Express server running on port 3000"));
