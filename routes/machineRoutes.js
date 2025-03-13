const express = require("express");
const { getMachines, createMachine, updateMachine, deleteMachine } = require("../controller/machineController");

const router = express.Router();

router.get("/", getMachines);
router.post("/", createMachine);
router.put("/:id", updateMachine);
router.delete("/:id", deleteMachine);

module.exports = router;
