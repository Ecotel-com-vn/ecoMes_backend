const express = require("express");
const {
  getDowntimeReasons,
  createDowntimeReason,
  updateDowntimeReason,
  deleteDowntimeReason,
} = require("../controller/downtimeReasonController");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: DowntimeReasons
 *   description: Quản lý lý do dừng máy
 */

/**
 * @swagger
 * /downtime-reasons:
 *   get:
 *     summary: Lấy danh sách lý do dừng máy
 *     tags: [DowntimeReasons]
 *     responses:
 *       200:
 *         description: Danh sách lý do dừng máy
 *       500:
 *         description: Lỗi server
 */
router.get("/", getDowntimeReasons);

/**
 * @swagger
 * /downtime-reasons:
 *   post:
 *     summary: Thêm lý do dừng máy mới
 *     tags: [DowntimeReasons]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - code
 *               - category
 *               - type
 *               - name
 *               - machine_id
 *             properties:
 *               code:
 *                 type: string
 *                 example: "D001"
 *               category:
 *                 type: string
 *                 example: "Bảo trì"
 *               type:
 *                 type: string
 *                 example: "Lỗi kỹ thuật"
 *               name:
 *                 type: string
 *                 example: "Lỗi động cơ"
 *               machine_id:
 *                 type: string
 *                 example: "65fabc1234567890abcdef12"
 *     responses:
 *       201:
 *         description: Lý do dừng máy được tạo thành công
 *       400:
 *         description: Dữ liệu không hợp lệ hoặc máy không tồn tại
 */
router.post("/", createDowntimeReason);

/**
 * @swagger
 * /downtime-reasons/{id}:
 *   put:
 *     summary: Cập nhật lý do dừng máy
 *     tags: [DowntimeReasons]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của lý do dừng máy cần cập nhật
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               code:
 *                 type: string
 *               category:
 *                 type: string
 *               type:
 *                 type: string
 *               name:
 *                 type: string
 *               machine_id:
 *                 type: string
 *     responses:
 *       200:
 *         description: Cập nhật thành công
 *       400:
 *         description: Không thể cập nhật lý do dừng máy
 */
router.put("/:id", updateDowntimeReason);

/**
 * @swagger
 * /downtime-reasons/{id}:
 *   delete:
 *     summary: Xóa lý do dừng máy
 *     tags: [DowntimeReasons]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của lý do dừng máy cần xóa
 *     responses:
 *       200:
 *         description: Xóa thành công
 *       404:
 *         description: Không tìm thấy lý do dừng máy
 */
router.delete("/:id", deleteDowntimeReason);

module.exports = router;
