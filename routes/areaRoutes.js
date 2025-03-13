const express = require("express");
const {
  getAreas,
  createArea,
  updateArea,
  deleteArea,
} = require("../controller/areaController");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Areas
 *   description: Quản lý khu vực
 */

/**
 * @swagger
 * /areas:
 *   get:
 *     summary: Lấy danh sách tất cả khu vực
 *     tags: [Areas]
 *     responses:
 *       200:
 *         description: Trả về danh sách khu vực
 *       500:
 *         description: Lỗi server
 */
router.get("/", getAreas);

/**
 * @swagger
 * /areas:
 *   post:
 *     summary: Tạo mới một khu vực
 *     tags: [Areas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               area_id:
 *                 type: string
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Khu vực được tạo thành công
 *       400:
 *         description: Area ID đã tồn tại hoặc dữ liệu không hợp lệ
 */
router.post("/", createArea);

/**
 * @swagger
 * /areas/{id}:
 *   put:
 *     summary: Cập nhật thông tin khu vực
 *     tags: [Areas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của khu vực cần cập nhật
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Cập nhật thành công
 *       400:
 *         description: Không thể cập nhật khu vực
 */
router.put("/:id", updateArea);

/**
 * @swagger
 * /areas/{id}:
 *   delete:
 *     summary: Xóa một khu vực
 *     tags: [Areas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của khu vực cần xóa
 *     responses:
 *       200:
 *         description: Xóa thành công
 *       404:
 *         description: Không tìm thấy khu vực
 */
router.delete("/:id", deleteArea);

module.exports = router;
