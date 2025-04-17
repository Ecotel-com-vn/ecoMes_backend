const mqtt = require("mqtt");
const WebSocket = require("ws"); // Import WebSocket
const connectDB = require("./database/db");
const Data = require("./models/data");

const MQTT_BROKER_URL = "mqtt://103.1.238.175:1883";
const MQTT_USER = "test";
const MQTT_PASS = "testadmin";

const mqttClient = mqtt.connect(MQTT_BROKER_URL, {
  username: MQTT_USER,
  password: MQTT_PASS,
});

connectDB();

const machinesData = {};
const requiredKeys = [
  "connection", "oee", "availability", "performance", "quality", "mtbf", "mttf",
  "product_name", "production_order", "operator", "shift", "product_ok", "product_ng",
  "planned_time", "running_time", "stopped_time", "end_time", "name", "actual_output",
  "status_color", "fault_status", "fault_code", "fault_type", "fault_start_time",
  "fault_end_time", "stop_reason", "stop_time", "stop_button_info",
];

// Khởi tạo WebSocket server
const wss = new WebSocket.Server({ port: 8080 }); // WebSocket chạy trên cổng 8080
console.log("🚀 WebSocket server is running on ws://localhost:8080");

const clients = {}; // Lưu trữ các client WebSocket

wss.on("connection", (ws, req) => {
  console.log("✅ Client connected to WebSocket");

  // Lấy ID từ query string hoặc mặc định là "M01"
  const urlParts = req.url.split("/");
  const machineId = urlParts[1] || "M01"; // Nếu không có ID, mặc định là "M01"
  console.log(`📡 Listening for machine ID: ${machineId}`);

  clients[machineId] = ws; // Lưu client vào danh sách

  // Gửi dữ liệu khi có đủ thông tin
  ws.on("message", (message) => {
    console.log(`📩 Received message from client: ${message}`);
  });

  ws.on("close", () => {
    console.log("❌ Client disconnected from WebSocket");
    delete clients[machineId]; // Xóa client khỏi danh sách
  });
});

mqttClient.on("connect", () => {
  console.log("✅ Connected to MQTT broker");
  mqttClient.subscribe("factory/machine/+/+", (err) => {
    if (err) console.error("❌ Failed to subscribe:", err);
    else console.log("📡 Subscribed to topic: factory/machine/+/+");
  });
});

mqttClient.on("message", async (topic, message) => {
  try {
    const data = JSON.parse(message.toString());
    const [_, __, machineId, key] = topic.split("/");

    machinesData[machineId] = machinesData[machineId] || {};
    machinesData[machineId][key] = key === "stop_button_info" ? data : Object.values(data)[0];

    // Kiểm tra nếu tất cả các key cần thiết đã có
    if (requiredKeys.every((k) => k in machinesData[machineId])) {
      const finalData = machinesData[machineId];

      // Gửi dữ liệu qua WebSocket nếu client đang kết nối
      if (clients[machineId]) {
        clients[machineId].send(JSON.stringify(finalData), (err) => {
          if (err) console.error(`❌ Error sending data to WebSocket client for machine ${machineId}:`, err);
        });
      }

      const dbData = new Data({
        deviceId: machineId,
        timestamp: new Date(),
        productName: finalData.product_name,
        productionOrder: finalData.production_order,
        operator: finalData.operator,
        shift: finalData.shift,
        productOk: finalData.product_ok,
        productNg: finalData.product_ng,
        plannedTime: finalData.planned_time,
        runningTime: finalData.running_time,
        stoppedTime: finalData.stopped_time,
        endTime: new Date(finalData.end_time),
        name: finalData.name,
        actualOutput: finalData.actual_output,
        statusColor: finalData.status_color,
        faultStatus: finalData.fault_status,
        faultCode: finalData.fault_code,
        faultType: finalData.fault_type,
        faultStartTime: finalData.fault_start_time ? new Date(finalData.fault_start_time) : null,
        faultEndTime: finalData.fault_end_time ? new Date(finalData.fault_end_time) : null,
        stopReason: finalData.stop_reason,
        stopTime: finalData.stop_time ? new Date(finalData.stop_time) : null,
        stopButtonInfo: finalData.stop_button_info,
      });

      await dbData.save();
      console.log("✅ Data saved to database");
      delete machinesData[machineId];
    }
  } catch (error) {
    console.error("❌ Error processing MQTT message:", error);
  }
});

console.log("🚀 MQTT client is running...");
