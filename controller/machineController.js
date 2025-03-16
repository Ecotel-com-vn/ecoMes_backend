const Machine = require("../models/machine");
const Process = require("../models/process");
const GroupMachine = require("../models/groupMachine");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");

// Lấy danh sách Machine kèm thông tin Process và GroupMachine
const getMachines = catchAsync(async (req, res, next) => {
  const machines = await Machine.find()
    .populate("process_id", "name description")
    .populate("group_machine", "name");
  res.json(machines);
});

// Tạo mới Machine
const createMachine = catchAsync(async (req, res, next) => {
  const { name, type, process_id, group_machine } = req.body;
  const image = req.file ? req.file.buffer : null;

  const processExists = await Process.findById(process_id);
  if (!processExists) {
    return next(new AppError("Process ID không tồn tại", 400));
  }

  const groupExists = await GroupMachine.findById(group_machine);
  if (!groupExists) {
    return next(new AppError("Group Machine ID không tồn tại", 400));
  }

  const newMachine = new Machine({ name, image, type, process_id, group_machine });
  await newMachine.save();
  res.status(201).json(newMachine);
});


// Cập nhật Machine
const updateMachine = catchAsync(async (req, res, next) => {
  const { process_id, group_machine } = req.body;

  if (process_id) {
    const processExists = await Process.findById(process_id);
    if (!processExists) {
      return next(new AppError("Process ID không tồn tại", 400));
    }
  }

  if (group_machine) {
    const groupExists = await GroupMachine.findById(group_machine);
    if (!groupExists) {
      return next(new AppError("Group Machine ID không tồn tại", 400));
    }
  }

  const updatedMachine = await Machine.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  if (!updatedMachine) {
    return next(new AppError("Không tìm thấy machine", 404));
  }

  res.json(updatedMachine);
});

// Xóa Machine
const deleteMachine = catchAsync(async (req, res, next) => {
  const machine = await Machine.findById(req.params.id);
  if (!machine) {
    return next(new AppError("Không tìm thấy machine", 404));
  }

  await machine.deleteOne();
  res.json({ message: "Đã xóa machine" });
});

module.exports = { getMachines, createMachine, updateMachine, deleteMachine };
