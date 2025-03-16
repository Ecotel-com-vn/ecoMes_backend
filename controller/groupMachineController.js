const GroupMachine = require("../models/GroupMachine");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");

// Lấy danh sách GroupMachine
const getGroupMachines = catchAsync(async (req, res, next) => {
  const groupMachines = await GroupMachine.find();
  res.json(groupMachines);
});

// Tạo mới GroupMachine
const createGroupMachine = catchAsync(async (req, res, next) => {
  const { name, code } = req.body;

  if (!name || !code) {
    return next(new AppError("Thiếu thông tin bắt buộc", 400));
  }

  const newGroupMachine = new GroupMachine({ name, code });
  await newGroupMachine.save();
  res.status(201).json(newGroupMachine);
});

// Cập nhật GroupMachine
const updateGroupMachine = catchAsync(async (req, res, next) => {
  const updatedGroupMachine = await GroupMachine.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  if (!updatedGroupMachine) {
    return next(new AppError("Không tìm thấy nhóm máy", 404));
  }

  res.json(updatedGroupMachine);
});

// Xóa GroupMachine
const deleteGroupMachine = catchAsync(async (req, res, next) => {
  const groupMachine = await GroupMachine.findById(req.params.id);
  if (!groupMachine) {
    return next(new AppError("Không tìm thấy nhóm máy", 404));
  }

  await groupMachine.deleteOne();
  res.json({ message: "Đã xóa nhóm máy" });
});

module.exports = { getGroupMachines, createGroupMachine, updateGroupMachine, deleteGroupMachine };
