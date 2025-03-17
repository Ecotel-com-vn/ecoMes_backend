const express = require("express");
const {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controller/productController");
const upload = require("../utils/multerConfig");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Quản lý sản phẩm
 */

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Lấy danh sách sản phẩm
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Danh sách sản phẩm
 *       500:
 *         description: Lỗi server
 */
router.get("/", getProducts);

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Thêm sản phẩm mới
 *     tags: [Products]
 *     consumes:
 *       - multipart/form-data
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - tool
 *               - group_machine
 *             properties:
 *               tool:
 *                 type: string
 *                 example: "Khuôn ép nhựa"
 *               name:
 *                 type: string
 *                 example: "Sản phẩm A"
 *               image:
 *                 type: string
 *                 format: binary
 *               cavity:
 *                 type: string
 *                 example: "4"
 *               cycle_time:
 *                 type: number
 *                 example: 30.5
 *               version:
 *                 type: string
 *                 example: "V1.0"
 *               marterial:
 *                 type: string
 *                 example: "Nhựa ABS"
 *               group_machine:
 *                 type: string
 *                 example: "65fabc9876543210abcdef34"
 *               attach_file:
 *                 type: string
 *                 example: "file.pdf"
 *               description:
 *                 type: string
 *                 example: "Mô tả sản phẩm"
 *     responses:
 *       201:
 *         description: Sản phẩm được tạo thành công
 *       400:
 *         description: Lỗi nhập dữ liệu hoặc ID không hợp lệ
 */
router.post("/", upload.single("image"), createProduct);

/**
 * @swagger
 * /products/{id}:
 *   put:
 *     summary: Cập nhật thông tin sản phẩm
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của sản phẩm cần cập nhật
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               tool:
 *                 type: string
 *               name:
 *                 type: string
 *               cavity:
 *                 type: string
 *               cycle_time:
 *                 type: number
 *               version:
 *                 type: string
 *               marterial:
 *                 type: string
 *               group_machine:
 *                 type: string
 *               attach_file:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Cập nhật thành công
 *       400:
 *         description: Không thể cập nhật sản phẩm
 */
router.put("/:id", updateProduct);

/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: Xóa sản phẩm
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của sản phẩm cần xóa
 *     responses:
 *       200:
 *         description: Xóa thành công
 *       404:
 *         description: Không tìm thấy sản phẩm
 *       400:
 *         description: Không thể xóa sản phẩm
 */
router.delete("/:id", deleteProduct);

module.exports = router;
