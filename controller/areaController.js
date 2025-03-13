const Area = require("../models/area");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");

const getAreas = async (req, res) => {
  try {
    const areas = await Area.find();
    res.json(areas);
  } catch (error) {
    res.status(500).json({ error: "Lỗi server" });
  }
};

const createArea = catchAsync(async (req, res, next) => {
  try {
    const { area_id, name, description } = req.body;
    const existingArea = await Area.findOne({ area_id });

    if (existingArea) {
      return next(new AppError("Area ID đã tồn tại", 400));
    }

    const newArea = new Area({ area_id, name, description });
    await newArea.save();
    res.status(201).json(newArea);
  } catch (error) {
    if (error.name === "ValidationError") {
      const missingFields = Object.keys(error.errors).join(", ");
      return next(new AppError(`Thiếu trường: ${missingFields}`, 400));
    }
    next(error);
  }
});

const updateArea = async (req, res) => {
  try {
    const updatedArea = await Area.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updatedArea);
  } catch (error) {
    res.status(400).json({ error: "Không thể cập nhật khu vực" });
  }
};

const deleteArea = async (req, res, next) => {
  try {
    const area = await Area.findById(req.params.id);
    if (!area) {
      return next(new AppError("Không tìm thấy khu vực", 404));
    }

    await area.deleteOne();
    res.json({ message: "Đã xóa khu vực" });
  } catch (error) {
    next(new AppError("Không thể xóa khu vực", 400));
  }
};

module.exports = { getAreas, createArea, updateArea, deleteArea };
