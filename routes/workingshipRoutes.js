const express = require("express");
const {
  getWorkingShips,
  createWorkingShip,
  updateWorkingShip,
  deleteWorkingShip,
} = require("../controller/workingShipController");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: WorkingShips
 *   description: Quản lý ca làm việc
 */

/**
 * @swagger
 * /working-ships:
 *   get:
 *     summary: Lấy danh sách ca làm việc
 *     tags: [WorkingShips]
 *     responses:
 *       200:
 *         description: Danh sách ca làm việc
 *       500:
 *         description: Lỗi server
 */
router.get("/", getWorkingShips);

/**
 * @swagger
 * /working-ships:
 *   post:
 *     summary: Thêm ca làm việc mới
 *     tags: [WorkingShips]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - machine_id
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Ca sáng"
 *               timezone:
 *                 type: string
 *                 example: "UTC+7"
 *               dates:
 *                 type: string
 *                 format: date-time
 *               start_time:
 *                 type: string
 *                 example: "08:00"
 *               end_time:
 *                 type: string
 *                 example: "16:00"
 *               updated:
 *                 type: string
 *                 example: "2025-03-17T12:00:00Z"
 *               machine_id:
 *                 type: string
 *                 example: "65fabc1234567890abcdef12"
 *     responses:
 *       201:
 *         description: Ca làm việc được tạo thành công
 *       400:
 *         description: Lỗi nhập dữ liệu hoặc ID không hợp lệ
 */
router.post("/", createWorkingShip);

/**
 * @swagger
 * /working-ships/{id}:
 *   put:
 *     summary: Cập nhật thông tin ca làm việc
 *     tags: [WorkingShips]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của ca làm việc cần cập nhật
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               timezone:
 *                 type: string
 *               dates:
 *                 type: string
 *                 format: date-time
 *               start_time:
 *                 type: string
 *               end_time:
 *                 type: string
 *               updated:
 *                 type: string
 *               machine_id:
 *                 type: string
 *     responses:
 *       200:
 *         description: Cập nhật thành công
 *       400:
 *         description: Không thể cập nhật ca làm việc
 */
router.put("/:id", updateWorkingShip);

/**
 * @swagger
 * /working-ships/{id}:
 *   delete:
 *     summary: Xóa ca làm việc
 *     tags: [WorkingShips]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của ca làm việc cần xóa
 *     responses:
 *       200:
 *         description: Xóa thành công
 *       404:
 *         description: Không tìm thấy ca làm việc
 *       400:
 *         description: Không thể xóa ca làm việc
 */
router.delete("/:id", deleteWorkingShip);

module.exports = router;
