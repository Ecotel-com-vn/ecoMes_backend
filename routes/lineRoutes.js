const express = require("express");
const { getLines, createLine, updateLine, deleteLine } = require("../controller/lineController");
const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Line:
 *       type: object
 *       required:
 *         - line_id
 *         - name
 *         - area_id
 *         - description
 *       properties:
 *         _id:
 *           type: string
 *           description: ID tự động được MongoDB tạo
 *         line_id:
 *           type: string
 *           description: Mã định danh duy nhất cho line
 *         name:
 *           type: string
 *           description: Tên line
 *         area_id:
 *           type: string
 *           description: ID của khu vực liên kết
 *         description:
 *           type: string
 *           description: Mô tả line
 *       example:
 *         _id: "6534a0f5d1a4a62d12345678"
 *         line_id: "line_001"
 *         name: "Dây chuyền 1"
 *         area_id: "6534a0f5d1a4a62d87654321"
 *         description: "Dây chuyền sản xuất chính"
 */

/**
 * @swagger
 * /api/lines:
 *   get:
 *     summary: Lấy danh sách các line
 *     tags: [Line]
 *     responses:
 *       200:
 *         description: Danh sách line
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Line'
 */
router.get("/", getLines);

/**
 * @swagger
 * /api/lines:
 *   post:
 *     summary: Tạo một line mới
 *     tags: [Line]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Line'
 *     responses:
 *       201:
 *         description: Tạo thành công line mới
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Line'
 *       400:
 *         description: Lỗi dữ liệu đầu vào hoặc area_id không tồn tại
 */
router.post("/", createLine);

/**
 * @swagger
 * /api/lines/{id}:
 *   put:
 *     summary: Cập nhật line theo ID
 *     tags: [Line]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của line cần cập nhật
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Line'
 *     responses:
 *       200:
 *         description: Cập nhật thành công
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Line'
 *       400:
 *         description: Area ID không tồn tại hoặc dữ liệu không hợp lệ
 *       404:
 *         description: Không tìm thấy line
 */
router.put("/:id", updateLine);

/**
 * @swagger
 * /api/lines/{id}:
 *   delete:
 *     summary: Xóa line theo ID
 *     tags: [Line]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của line cần xóa
 *     responses:
 *       200:
 *         description: Xóa thành công
 *       404:
 *         description: Không tìm thấy line
 */
router.delete("/:id", deleteLine);

module.exports = router;
