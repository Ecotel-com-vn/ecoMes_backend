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

const createMachine = catchAsync(async (req, res, next) => {
  try {
    const { machine_id, name, type, process_id, group_machine } = req.body;
    const existingMachine = await Machine.findOne({ machine_id });

    if (existingMachine) {
      return next(new AppError("Machine ID đã tồn tại", 400));
    }

    const image = req.file ? req.file.buffer : undefined;
    const newMachine = new Machine({
      machine_id,
      name,
      type,
      process_id,
      group_machine,
      image,
    });

    await newMachine.save();
    res.status(201).json(newMachine);
  } catch (error) {
    if (error.name === "ValidationError") {
      const missingFields = Object.keys(error.errors).join(", ");
      return next(new AppError(`Thiếu trường: ${missingFields}`, 400));
    }
    next(error);
  }
});

const updateMachine = async (req, res) => {
  try {
    const updatedMachine = await Machine.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedMachine);
  } catch (error) {
    res.status(400).json({ error: "Không thể cập nhật thiết bị" });
  }
};

const deleteMachine = async (req, res, next) => {
  try {
    const machine = await Machine.findById(req.params.id);
    if (!machine) {
      return next(new AppError("Không tìm thấy thiết bị", 404));
    }

    await machine.deleteOne();
    res.json({ message: "Đã xóa thiết bị" });
  } catch (error) {
    next(new AppError("Không thể xóa thiết bị", 400));
  }
};


module.exports = { getMachines, createMachine, updateMachine, deleteMachine };
