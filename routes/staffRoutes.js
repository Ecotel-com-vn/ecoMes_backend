const express = require("express");
const {
  getStaffs,
  createStaff,
  updateStaff,
  deleteStaff,
} = require("../controller/staffController");
const upload = require("../utils/multerConfig");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Staffs
 *   description: Quản lý nhân viên
 */

/**
 * @swagger
 * /staffs:
 *   get:
 *     summary: Lấy danh sách nhân viên
 *     tags: [Staffs]
 *     responses:
 *       200:
 *         description: Danh sách nhân viên
 *       500:
 *         description: Lỗi server
 */
router.get("/", getStaffs);

/**
 * @swagger
 * /staffs:
 *   post:
 *     summary: Thêm nhân viên mới
 *     tags: [Staffs]
 *     consumes:
 *       - multipart/form-data
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - phone
 *               - group_id
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Nguyễn Văn A"
 *               phone:
 *                 type: string
 *                 example: "0987654321"
 *               picture:
 *                 type: string
 *                 format: binary
 *               group_id:
 *                 type: string
 *                 example: "65fabc1234567890abcdef12"
 *               description:
 *                 type: string
 *                 example: "Nhân viên kỹ thuật"
 *     responses:
 *       201:
 *         description: Nhân viên được tạo thành công
 *       400:
 *         description: Lỗi nhập dữ liệu hoặc ID không hợp lệ
 */
router.post("/", upload.single("picture"), createStaff);

/**
 * @swagger
 * /staffs/{id}:
 *   put:
 *     summary: Cập nhật thông tin nhân viên
 *     tags: [Staffs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của nhân viên cần cập nhật
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               phone:
 *                 type: string
 *               group_id:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Cập nhật thành công
 *       400:
 *         description: Không thể cập nhật nhân viên
 */
router.put("/:id", updateStaff);

/**
 * @swagger
 * /staffs/{id}:
 *   delete:
 *     summary: Xóa nhân viên
 *     tags: [Staffs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của nhân viên cần xóa
 *     responses:
 *       200:
 *         description: Xóa thành công
 *       404:
 *         description: Không tìm thấy nhân viên
 *       400:
 *         description: Không thể xóa nhân viên
 */
router.delete("/:id", deleteStaff);

module.exports = router;
