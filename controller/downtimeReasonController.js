const DowntimeReason = require("../models/downtimeReason");
const Machine = require("../models/machine");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");

// Lấy danh sách DowntimeReason kèm thông tin Machine
const getDowntimeReasons = catchAsync(async (req, res, next) => {
  const reasons = await DowntimeReason.find().populate("machine_id", "name type");
  res.json(reasons);
});

// Tạo mới DowntimeReason
const createDowntimeReason = catchAsync(async (req, res, next) => {
  const { code, category, type, name, machine_id } = req.body;

  const machineExists = await Machine.findById(machine_id);
  if (!machineExists) {
    return next(new AppError("Machine ID không tồn tại", 400));
  }

  const newReason = new DowntimeReason({ code, category, type, name, machine_id });
  await newReason.save();
  res.status(201).json(newReason);
});

// Cập nhật DowntimeReason
const updateDowntimeReason = catchAsync(async (req, res, next) => {
  const { machine_id } = req.body;

  if (machine_id) {
    const machineExists = await Machine.findById(machine_id);
    if (!machineExists) {
      return next(new AppError("Machine ID không tồn tại", 400));
    }
  }

  const updatedReason = await DowntimeReason.findByIdAndUpdate(req.params.id, req.body, { new: true });

  if (!updatedReason) {
    return next(new AppError("Không tìm thấy Downtime Reason", 404));
  }

  res.json(updatedReason);
});

// Xóa DowntimeReason
const deleteDowntimeReason = catchAsync(async (req, res, next) => {
  const reason = await DowntimeReason.findById(req.params.id);
  if (!reason) {
    return next(new AppError("Không tìm thấy Downtime Reason", 404));
  }

  await reason.deleteOne();
  res.json({ message: "Đã xóa Downtime Reason" });
});

module.exports = { getDowntimeReasons, createDowntimeReason, updateDowntimeReason, deleteDowntimeReason };
