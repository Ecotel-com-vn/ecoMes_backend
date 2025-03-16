const express = require("express");
const {
  getMachines,
  createMachine,
  updateMachine,
  deleteMachine,
} = require("../controller/machineController");
const upload = require("../utils/multerConfig");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Machines
 *   description: Quản lý thiết bị
 */

/**
 * @swagger
 * /machines:
 *   get:
 *     summary: Lấy danh sách thiết bị
 *     tags: [Machines]
 *     responses:
 *       200:
 *         description: Danh sách thiết bị
 *       500:
 *         description: Lỗi server
 */
router.get("/", getMachines);

/**
 * @swagger
 * /machines:
 *   post:
 *     summary: Thêm thiết bị mới
 *     tags: [Machines]
 *     consumes:
 *       - multipart/form-data
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - process_id
 *               - group_machine
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Máy CNC"
 *               image:
 *                 type: string
 *                 format: binary
 *               type:
 *                 type: string
 *                 example: "Cắt kim loại"
 *               process_id:
 *                 type: string
 *                 example: "65fabc1234567890abcdef12"
 *               group_machine:
 *                 type: string
 *                 example: "65fabc9876543210abcdef34"
 *     responses:
 *       201:
 *         description: Thiết bị được tạo thành công
 *       400:
 *         description: Lỗi nhập dữ liệu hoặc ID không hợp lệ
 */
router.post("/", upload.single("image"), createMachine);

/**
 * @swagger
 * /machines/{id}:
 *   put:
 *     summary: Cập nhật thông tin thiết bị
 *     tags: [Machines]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của thiết bị cần cập nhật
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               type:
 *                 type: string
 *               process_id:
 *                 type: string
 *               group_machine:
 *                 type: string
 *     responses:
 *       200:
 *         description: Cập nhật thành công
 *       400:
 *         description: Không thể cập nhật thiết bị
 */
router.put("/:id", updateMachine);

/**
 * @swagger
 * /machines/{id}:
 *   delete:
 *     summary: Xóa thiết bị
 *     tags: [Machines]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của thiết bị cần xóa
 *     responses:
 *       200:
 *         description: Xóa thành công
 *       404:
 *         description: Không tìm thấy thiết bị
 *       400:
 *         description: Không thể xóa thiết bị
 */
router.delete("/:id", deleteMachine);

module.exports = router;
