const Product = require("../models/product");
const GroupMachine = require("../models/groupMachine");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");

// Lấy danh sách Product kèm thông tin GroupMachine
const getProducts = catchAsync(async (req, res, next) => {
  const products = await Product.find().populate("group_machine", "name");
  res.json(products);
});

// Tạo mới Product
const createProduct = catchAsync(async (req, res, next) => {
  const { tool, name, cavity, cycle_time, version, marterial, group_machine, attach_file, description } = req.body;
  const image = req.file ? req.file.buffer : null;

  const groupExists = await GroupMachine.findById(group_machine);
  if (!groupExists) {
    return next(new AppError("Group Machine ID không tồn tại", 400));
  }

  const newProduct = new Product({ tool, name, image, cavity, cycle_time, version, marterial, group_machine, attach_file, description });
  await newProduct.save();
  res.status(201).json(newProduct);
});

// Cập nhật Product
const updateProduct = catchAsync(async (req, res, next) => {
  const { group_machine } = req.body;

  if (group_machine) {
    const groupExists = await GroupMachine.findById(group_machine);
    if (!groupExists) {
      return next(new AppError("Group Machine ID không tồn tại", 400));
    }
  }

  const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });

  if (!updatedProduct) {
    return next(new AppError("Không tìm thấy product", 404));
  }

  res.json(updatedProduct);
});

// Xóa Product
const deleteProduct = catchAsync(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new AppError("Không tìm thấy product", 404));
  }

  await product.deleteOne();
  res.json({ message: "Đã xóa product" });
});

module.exports = { getProducts, createProduct, updateProduct, deleteProduct };
