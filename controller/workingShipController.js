const WorkingShip = require("../models/workingship");
const Machine = require("../models/machine");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");

// Lấy danh sách WorkingShip kèm thông tin Machine
const getWorkingShips = catchAsync(async (req, res, next) => {
  const workingShips = await WorkingShip.find().populate("machine_id", "name type");
  res.json(workingShips);
});

// Tạo mới WorkingShip
const createWorkingShip = catchAsync(async (req, res, next) => {
  const { name, timezone, dates, start_time, end_time, updated, machine_id } = req.body;

  const machineExists = await Machine.findById(machine_id);
  if (!machineExists) {
    return next(new AppError("Machine ID không tồn tại", 400));
  }

  const newWorkingShip = new WorkingShip({ name, timezone, dates, start_time, end_time, updated, machine_id });
  await newWorkingShip.save();
  res.status(201).json(newWorkingShip);
});

// Cập nhật WorkingShip
const updateWorkingShip = catchAsync(async (req, res, next) => {
  const { machine_id } = req.body;

  if (machine_id) {
    const machineExists = await Machine.findById(machine_id);
    if (!machineExists) {
      return next(new AppError("Machine ID không tồn tại", 400));
    }
  }

  const updatedWorkingShip = await WorkingShip.findByIdAndUpdate(req.params.id, req.body, { new: true });

  if (!updatedWorkingShip) {
    return next(new AppError("Không tìm thấy WorkingShip", 404));
  }

  res.json(updatedWorkingShip);
});

// Xóa WorkingShip
const deleteWorkingShip = catchAsync(async (req, res, next) => {
  const workingShip = await WorkingShip.findById(req.params.id);
  if (!workingShip) {
    return next(new AppError("Không tìm thấy WorkingShip", 404));
  }

  await workingShip.deleteOne();
  res.json({ message: "Đã xóa WorkingShip" });
});

module.exports = { getWorkingShips, createWorkingShip, updateWorkingShip, deleteWorkingShip };
