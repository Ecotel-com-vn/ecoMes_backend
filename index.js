require("dotenv").config();
const express = require("express");
const connectDB = require("./database/db");

const machineRoutes = require("./routes/machineRoutes");
const userRoutes = require("./routes/userRoutes");
const areaRoutes = require("./routes/areaRoutes");
const lineRoutes = require("./routes/lineRoutes");
const processRoutes = require("./routes/processRoutes");
const groupMachineRoutes = require("./routes/groupmachineRoutes");
const workingshipRoutes = require("./routes/workingshipRoutes");
const productRoutes = require("./routes/productRoutes");
const downtimeReasonRoutes = require("./routes/downtimeRoutes");
const groupStaffRoutes = require("./routes/groupStaffRoutes");
const staffRoutes = require("./routes/staffRoutes");

const WebSocket = require("ws");
const mqttClient = require("./client/mqttClient");

const catchAsync = require("./utils/catchAsync");
const AppError = require("./utils/AppError");
const globalErrorHandler = require("./controller/errorController");
const swaggerDocs = require("./utils/swagger");


const app = express();
app.use(express.json());
connectDB();

const PORT = process.env.PORT || 3000;
const WS_PORT = process.env.WS_PORT || 4000;

// Tạo WebSocket Server
const wss = new WebSocket.Server({ port: WS_PORT });

wss.on("connection", (ws) => {
  console.log("WebSocket client connected");
  ws.on("close", () => console.log("WebSocket client disconnected"));
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
app.use("/api/v1/areas", areaRoutes);
app.use("/api/v1/lines", lineRoutes);
app.use("/api/v1/process", processRoutes);
app.use("/api/v1/groupmachine", groupMachineRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/workingship", workingshipRoutes);
app.use("/api/v1/products", productRoutes);
app.use("/api/v1/downtime", downtimeReasonRoutes);
app.use("/api/v1/groupstaff", groupStaffRoutes);
app.use("/api/v1/staff", staffRoutes);

// Đăng ký Swagger trước middleware lỗi
swaggerDocs(app);

app.use(
  "*",
  catchAsync(async (req, res, next) => {
    throw new AppError(`Can't find ${req.originalUrl} on this server`, 404);
  })
);

app.use(globalErrorHandler);

app.listen(PORT, () => console.log(`Express server running on port ${PORT}`));
