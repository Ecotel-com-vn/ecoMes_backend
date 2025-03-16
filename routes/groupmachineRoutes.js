const express = require("express");
const { 
  getGroupMachines, 
  createGroupMachine, 
  updateGroupMachine, 
  deleteGroupMachine 
} = require("../controller/groupMachineController");
const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     GroupMachine:
 *       type: object
 *       required:
 *         - name
 *         - code
 *       properties:
 *         _id:
 *           type: string
 *           description: ID tự động được MongoDB tạo
 *         name:
 *           type: string
 *           description: Tên nhóm máy
 *         code:
 *           type: string
 *           description: Mã định danh duy nhất cho nhóm máy
 *       example:
 *         _id: "6534a0f5d1a4a62d12345678"
 *         name: "Nhóm Máy A"
 *         code: "group_001"
 */

/**
 * @swagger
 * /group-machines:
 *   get:
 *     summary: Lấy danh sách nhóm máy
 *     tags: [GroupMachine]
 *     responses:
 *       200:
 *         description: Danh sách nhóm máy
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/GroupMachine'
 */
router.get("/", getGroupMachines);

/**
 * @swagger
 * /group-machines:
 *   post:
 *     summary: Tạo một nhóm máy mới
 *     tags: [GroupMachine]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/GroupMachine'
 *     responses:
 *       201:
 *         description: Tạo thành công nhóm máy mới
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GroupMachine'
 *       400:
 *         description: Lỗi dữ liệu đầu vào
 */
router.post("/", createGroupMachine);

/**
 * @swagger
 * /group-machines/{id}:
 *   put:
 *     summary: Cập nhật nhóm máy theo ID
 *     tags: [GroupMachine]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của nhóm máy cần cập nhật
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/GroupMachine'
 *     responses:
 *       200:
 *         description: Cập nhật thành công
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GroupMachine'
 *       404:
 *         description: Không tìm thấy nhóm máy
 */
router.put("/:id", updateGroupMachine);

/**
 * @swagger
 * /group-machines/{id}:
 *   delete:
 *     summary: Xóa nhóm máy theo ID
 *     tags: [GroupMachine]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của nhóm máy cần xóa
 *     responses:
 *       200:
 *         description: Xóa thành công
 *       404:
 *         description: Không tìm thấy nhóm máy
 */
router.delete("/:id", deleteGroupMachine);

module.exports = router;
