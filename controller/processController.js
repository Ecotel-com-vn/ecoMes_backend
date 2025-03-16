const Process = require("../models/process");
const Line = require("../models/line");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");

// Lấy danh sách Process kèm thông tin Line
const getProcesses = catchAsync(async (req, res, next) => {
  const processes = await Process.find().populate("line_id", "name description");
  res.json(processes);
});

// Tạo mới Process
const createProcess = catchAsync(async (req, res, next) => {
  const { name, line_id, description } = req.body;

  const lineExists = await Line.findById(line_id);
  if (!lineExists) {
    return next(new AppError("Line ID không tồn tại", 400));
  }

  const newProcess = new Process({ name, line_id, description });
  await newProcess.save();
  res.status(201).json(newProcess);
});

// Cập nhật Process
const updateProcess = catchAsync(async (req, res, next) => {
  const { line_id } = req.body;

  if (line_id) {
    const lineExists = await Line.findById(line_id);
    if (!lineExists) {
      return next(new AppError("Line ID không tồn tại", 400));
    }
  }

  const updatedProcess = await Process.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  if (!updatedProcess) {
    return next(new AppError("Không tìm thấy process", 404));
  }

  res.json(updatedProcess);
});

// Xóa Process
const deleteProcess = catchAsync(async (req, res, next) => {
  const process = await Process.findById(req.params.id);
  if (!process) {
    return next(new AppError("Không tìm thấy process", 404));
  }

  await process.deleteOne();
  res.json({ message: "Đã xóa process" });
});

module.exports = { getProcesses, createProcess, updateProcess, deleteProcess };
