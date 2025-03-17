const express = require("express");
const {
  getGroupStaffs,
  createGroupStaff,
  updateGroupStaff,
  deleteGroupStaff,
} = require("../controller/groupStaffController");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: GroupStaffs
 *   description: Quản lý nhóm nhân viên
 */

/**
 * @swagger
 * /group-staffs:
 *   get:
 *     summary: Lấy danh sách nhóm nhân viên
 *     tags: [GroupStaffs]
 *     responses:
 *       200:
 *         description: Danh sách nhóm nhân viên
 *       500:
 *         description: Lỗi server
 */
router.get("/", getGroupStaffs);

/**
 * @swagger
 * /group-staffs:
 *   post:
 *     summary: Thêm nhóm nhân viên mới
 *     tags: [GroupStaffs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - type
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Nhóm Kỹ Thuật"
 *               type:
 *                 type: string
 *                 example: "Bảo trì"
 *     responses:
 *       201:
 *         description: Nhóm nhân viên được tạo thành công
 *       400:
 *         description: Lỗi nhập dữ liệu
 */
router.post("/", createGroupStaff);

/**
 * @swagger
 * /group-staffs/{id}:
 *   put:
 *     summary: Cập nhật thông tin nhóm nhân viên
 *     tags: [GroupStaffs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của nhóm nhân viên cần cập nhật
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
 *     responses:
 *       200:
 *         description: Cập nhật thành công
 *       400:
 *         description: Không thể cập nhật nhóm nhân viên
 */
router.put("/:id", updateGroupStaff);

/**
 * @swagger
 * /group-staffs/{id}:
 *   delete:
 *     summary: Xóa nhóm nhân viên
 *     tags: [GroupStaffs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của nhóm nhân viên cần xóa
 *     responses:
 *       200:
 *         description: Xóa thành công
 *       404:
 *         description: Không tìm thấy nhóm nhân viên
 *       400:
 *         description: Không thể xóa nhóm nhân viên
 */
router.delete("/:id", deleteGroupStaff);

module.exports = router;
