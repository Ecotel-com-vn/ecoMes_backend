const Line = require("../models/line");
const Area = require("../models/area");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");

// Lấy danh sách Lines kèm thông tin Area
const getLines = async (req, res, next) => {
  try {
    const lines = await Line.find().populate("area_id", "name description"); // Dùng populate
    res.json(lines);
  } catch (error) {
    next(error);
  }
};

// Tạo mới Line
const createLine = async (req, res, next) => {
  try {
    const { line_id, name, area_id, description } = req.body;

    const area = await Area.findById(area_id); // Tìm theo ObjectId
    if (!area) {
      return next(new AppError("Area ID không tồn tại", 400));
    }

    const newLine = new Line({ line_id, name, area_id, description });
    await newLine.save();
    res.status(201).json(newLine);
  } catch (error) {
    next(error);
  }
};

// Cập nhật Line
const updateLine = catchAsync(async (req, res, next) => {
  const { area_id } = req.body;

  if (area_id) {
    const areaExists = await Area.findById(area_id);
    if (!areaExists) {
      return next(new AppError("Area ID không tồn tại", 400));
    }
  }

  const updatedLine = await Line.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  if (!updatedLine) {
    return next(new AppError("Không tìm thấy line", 404));
  }

  res.json(updatedLine);
});

// Xóa Line
const deleteLine = catchAsync(async (req, res, next) => {
  const line = await Line.findById(req.params.id);
  if (!line) {
    return next(new AppError("Không tìm thấy line", 404));
  }

  await line.deleteOne();
  res.json({ message: "Đã xóa line" });
});

module.exports = { getLines, createLine, updateLine, deleteLine };
