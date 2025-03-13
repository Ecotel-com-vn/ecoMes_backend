const Machine = require("../models/machine");

const getMachines = async (req, res) => {
  try {
    const machines = await Machine.find();
    res.json(machines);
  } catch (error) {
    res.status(500).json({ error: "Lỗi server" });
  }
};

const createMachine = async (req, res) => {
  try {
    const newMachine = new Machine(req.body);
    await newMachine.save();
    res.status(201).json(newMachine);
  } catch (error) {
    res.status(400).json({ error: "Không thể tạo thiết bị" });
  }
};

const updateMachine = async (req, res) => {
  try {
    const updatedMachine = await Machine.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedMachine);
  } catch (error) {
    res.status(400).json({ error: "Không thể cập nhật thiết bị" });
  }
};

const deleteMachine = async (req, res) => {
  try {
    await Machine.findByIdAndDelete(req.params.id);
    res.json({ message: "Đã xóa thiết bị" });
  } catch (error) {
    res.status(400).json({ error: "Không thể xóa thiết bị" });
  }
};

module.exports = { getMachines, createMachine, updateMachine, deleteMachine };
