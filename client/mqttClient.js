require("dotenv").config();
const mqtt = require("mqtt");
const connectDB = require("../database/db");
const Data = require("../models/data");

// Kết nối MongoDB
connectDB();

const mqttClient = mqtt.connect(process.env.MQTT_BROKER_URL, {
  username: process.env.MQTT_USER,
  password: process.env.MQTT_PASS,
});

mqttClient.on("connect", () => {
  console.log("Connected to MQTT broker");
  mqttClient.subscribe(process.env.MQTT_TOPIC, (err) => {
    if (err) {
      console.error("Failed to subscribe:", err);
    } else {
      console.log(`Subscribed to topic: ${process.env.MQTT_TOPIC}`);
    }
  });
});

mqttClient.on("message", async (topic, message) => {
  try {
    const data = JSON.parse(message.toString());
    console.log("Received MQTT Data:", data);

    // Lưu vào MongoDB
    await Data.create(data);
    console.log("Data saved to MongoDB");
  } catch (error) {
    console.error("Error processing MQTT message:", error);
  }
});

mqttClient.on("error", (err) => {
  console.error("MQTT connection error:", err);
});

module.exports = mqttClient;
