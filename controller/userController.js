const User = require("../models/user");

// Thêm người dùng
const createUser = async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ error: "Không thể tạo người dùng" });
  }
};

// Lấy danh sách người dùng
const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Lỗi server" });
  }
};

// Cập nhật người dùng
const updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!user) return res.status(404).json({ error: "Không tìm thấy người dùng" });
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: "Không thể cập nhật người dùng" });
  }
};

// Xóa người dùng
const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ error: "Không tìm thấy người dùng" });
    res.json({ message: "Người dùng đã bị xóa" });
  } catch (error) {
    res.status(500).json({ error: "Không thể xóa người dùng" });
  }
};

module.exports = { createUser, getUsers, updateUser, deleteUser };
