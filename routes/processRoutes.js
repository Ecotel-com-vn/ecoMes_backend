const express = require("express");
const { getProcesses, createProcess, updateProcess, deleteProcess } = require("../controller/processController");
const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Process:
 *       type: object
 *       required:
 *         - name
 *         - line_id
 *         - description
 *       properties:
 *         _id:
 *           type: string
 *           description: ID tự động được MongoDB tạo
 *         name:
 *           type: string
 *           description: Tên quy trình
 *         line_id:
 *           type: string
 *           description: ID của dây chuyền liên kết
 *         description:
 *           type: string
 *           description: Mô tả quy trình
 *       example:
 *         _id: "6534a0f5d1a4a62d12345678"
 *         name: "Quy trình A"
 *         line_id: "6534a0f5d1a4a62d87654321"
 *         description: "Quy trình sản xuất giai đoạn 1"
 */

/**
 * @swagger
 * /processes:
 *   get:
 *     summary: Lấy danh sách các quy trình
 *     tags: [Process]
 *     responses:
 *       200:
 *         description: Danh sách quy trình
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Process'
 */
router.get("/", getProcesses);

/**
 * @swagger
 * /processes:
 *   post:
 *     summary: Tạo một quy trình mới
 *     tags: [Process]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Process'
 *     responses:
 *       201:
 *         description: Tạo thành công quy trình mới
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Process'
 *       400:
 *         description: Lỗi dữ liệu đầu vào hoặc line_id không tồn tại
 */
router.post("/", createProcess);

/**
 * @swagger
 * /processes/{id}:
 *   put:
 *     summary: Cập nhật quy trình theo ID
 *     tags: [Process]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của quy trình cần cập nhật
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Process'
 *     responses:
 *       200:
 *         description: Cập nhật thành công
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Process'
 *       400:
 *         description: Line ID không tồn tại hoặc dữ liệu không hợp lệ
 *       404:
 *         description: Không tìm thấy quy trình
 */
router.put("/:id", updateProcess);

/**
 * @swagger
 * /processes/{id}:
 *   delete:
 *     summary: Xóa quy trình theo ID
 *     tags: [Process]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của quy trình cần xóa
 *     responses:
 *       200:
 *         description: Xóa thành công
 *       404:
 *         description: Không tìm thấy quy trình
 */
router.delete("/:id", deleteProcess);

module.exports = router;
