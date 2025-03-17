const Staff = require("../models/staff");
const GroupStaff = require("../models/groupStaff");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");

// Lấy danh sách nhân viên kèm thông tin nhóm
const getStaffs = catchAsync(async (req, res, next) => {
  const staffs = await Staff.find().populate("group_id", "name");
  res.json(staffs);
});

// Tạo mới nhân viên
const createStaff = catchAsync(async (req, res, next) => {
  const { name, phone, group_id, description } = req.body;
  const picture = req.file ? req.file.buffer : null;

  const groupExists = await GroupStaff.findById(group_id);
  if (!groupExists) {
    return next(new AppError("Group Staff ID không tồn tại", 400));
  }

  const newStaff = new Staff({ name, phone, picture, group_id, description });
  await newStaff.save();
  res.status(201).json(newStaff);
});

// Cập nhật thông tin nhân viên
const updateStaff = catchAsync(async (req, res, next) => {
  const { group_id } = req.body;

  if (group_id) {
    const groupExists = await GroupStaff.findById(group_id);
    if (!groupExists) {
      return next(new AppError("Group Staff ID không tồn tại", 400));
    }
  }

  const updatedStaff = await Staff.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  if (!updatedStaff) {
    return next(new AppError("Không tìm thấy nhân viên", 404));
  }

  res.json(updatedStaff);
});

// Xóa nhân viên
const deleteStaff = catchAsync(async (req, res, next) => {
  const staff = await Staff.findById(req.params.id);
  if (!staff) {
    return next(new AppError("Không tìm thấy nhân viên", 404));
  }

  await staff.deleteOne();
  res.json({ message: "Đã xóa nhân viên" });
});

module.exports = { getStaffs, createStaff, updateStaff, deleteStaff };
