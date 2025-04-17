const WebSocket = require("ws");
const mqtt = require("mqtt");

const MQTT_BROKER_URL = "mqtt://103.1.238.175:1883";
const MQTT_USER = "test";
const MQTT_PASS = "testadmin";

const mqttClient = mqtt.connect(MQTT_BROKER_URL, {
  username: MQTT_USER,
  password: MQTT_PASS,
});

const wss = new WebSocket.Server({ port: 4000 });

mqttClient.on("connect", () => {
  console.log("Connected to MQTT broker");
});

wss.on("connection", (ws, req) => {
  const path = req.url || "/";
  const id = path.split("/")[1] || "M01"; // fallback nếu không có id
  const topic = `factory/machine/${id}/#`;

  console.log(`WebSocket client connected - Machine ID: ${id}`);

  // Subscribe riêng cho từng client nếu chưa subscribe trước
  mqttClient.subscribe(topic, (err) => {
    if (err) {
      console.error(`Failed to subscribe to ${topic}:`, err);
    } else {
      console.log(`Subscribed to topic: ${topic}`);
    }
  });

  ws.on("close", () => {
    console.log(`WebSocket client for ${id} disconnected`);
    // Optional: Bạn có thể unsubscribe khi không cần theo dõi nữa
    // mqttClient.unsubscribe(topic);
  });
});

mqttClient.on("message", (topic, message) => {
  try {
    const data = JSON.parse(message.toString());
    console.dir(data, { depth: null, colors: true });

    // Gửi cho tất cả client nếu cùng topic hoặc broadcast toàn bộ
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify({ topic, data }));
      }
    });
  } catch (error) {
    console.error("Error parsing MQTT message:", error);
    console.log("Raw message:", message.toString());
  }
});

console.log("WebSocket server running on port 4000");


