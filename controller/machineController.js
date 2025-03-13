const Machine = require("../models/machine");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");

const getMachines = async (req, res) => {
  try {
    const machines = await Machine.find();
    res.json(machines);
  } catch (error) {
    res.status(500).json({ error: "Lỗi server" });
  }
};

// const createMachine = async (req, res) => {
//   try {
//     const newMachine = new Machine(req.body);
//     await newMachine.save();
//     res.status(201).json(newMachine);
//   } catch (error) {
//     res.status(400).json({ error: "Không thể tạo thiết bị" });
//   }
// };
const createMachine = catchAsync(async (req, res) => {
  try {
    const newMachine = new Machine(req.body);
    await newMachine.save();
    res.status(201).json(newMachine);
  } catch (error) {
    if (error.code === 11000) {
      const err = new AppError("Machine ID đã tồn tại", 400);
      return res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
      });
    }
    res.status(500).json({ status: "error", message: "Lỗi không xác định" });
  }
});

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
