const Data = require("../models/data");

const getAllData = async (req, res) => {
  try {
    const data = await Data.find();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Không thể lấy dữ liệu" });
  }
};

const getDataByDeviceId = async (req, res) => {
  try {
    const { deviceId } = req.params;
    const data = await Data.find({ deviceId });
    if (!data.length) {
      return res.status(404).json({ error: "Không tìm thấy dữ liệu" });
    }
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Lỗi khi lấy dữ liệu" });
  }
};

const deleteData = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedData = await Data.findByIdAndDelete(id);
    if (!deletedData) {
      return res.status(404).json({ error: "Dữ liệu không tồn tại" });
    }
    res.status(200).json({ message: "Xóa dữ liệu thành công" });
  } catch (error) {
    res.status(500).json({ error: "Không thể xóa dữ liệu" });
  }
};

module.exports = { getAllData, getDataByDeviceId, deleteData };
