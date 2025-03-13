const WebSocket = require("ws");
const mqtt = require("mqtt");

// Cấu hình MQTT
const MQTT_BROKER_URL = "mqtt://103.1.238.175:1883";
const MQTT_USER = "test";
const MQTT_PASS = "testadmin";
const MQTT_TOPIC = "factory/machine/data"; // Thay đổi topic phù hợp

// Kết nối MQTT
const mqttClient = mqtt.connect(MQTT_BROKER_URL, {
  username: MQTT_USER,
  password: MQTT_PASS,
});

// Tạo WebSocket Server trên cổng 4000
const wss = new WebSocket.Server({ port: 4000 });

wss.on("connection", (ws) => {
  console.log("WebSocket client connected");

  ws.on("close", () => {
    console.log("WebSocket client disconnected");
  });
});

// Khi MQTT kết nối thành công
mqttClient.on("connect", () => {
  console.log("Connected to MQTT broker");
  mqttClient.subscribe(MQTT_TOPIC, (err) => {
    if (err) {
      console.error("Failed to subscribe:", err);
    } else {
      console.log(`Subscribed to topic: ${MQTT_TOPIC}`);
    }
  });
});
// Khi nhận dữ liệu từ MQTT
mqttClient.on("message", (topic, message) => {
  try {
    const data = JSON.parse(message.toString());
    console.log("Received MQTT Data:", data);

    // Gửi dữ liệu đến tất cả WebSocket clients
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(data));
      }
    });
  } catch (error) {
    console.error("Error parsing MQTT message:", error);
  }
});

console.log("WebSocket server running on port 4000");
