const GroupStaff = require("../models/groupStaff");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");

// Lấy danh sách GroupStaff
const getGroupStaffs = catchAsync(async (req, res, next) => {
  const groupStaffs = await GroupStaff.find();
  res.json(groupStaffs);
});

// Tạo mới GroupStaff
const createGroupStaff = catchAsync(async (req, res, next) => {
  const { name, type } = req.body;
  const newGroupStaff = new GroupStaff({ name, type });
  await newGroupStaff.save();
  res.status(201).json(newGroupStaff);
});

// Cập nhật GroupStaff
const updateGroupStaff = catchAsync(async (req, res, next) => {
  const updatedGroupStaff = await GroupStaff.findByIdAndUpdate(req.params.id, req.body, { new: true });

  if (!updatedGroupStaff) {
    return next(new AppError("Không tìm thấy GroupStaff", 404));
  }

  res.json(updatedGroupStaff);
});

// Xóa GroupStaff
const deleteGroupStaff = catchAsync(async (req, res, next) => {
  const groupStaff = await GroupStaff.findById(req.params.id);
  if (!groupStaff) {
    return next(new AppError("Không tìm thấy GroupStaff", 404));
  }

  await groupStaff.deleteOne();
  res.json({ message: "Đã xóa GroupStaff" });
});

module.exports = { getGroupStaffs, createGroupStaff, updateGroupStaff, deleteGroupStaff };
