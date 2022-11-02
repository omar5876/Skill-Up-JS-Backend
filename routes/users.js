const express = require("express");
const { get, post, put, getById } = require("../controllers/users");

const router = express.Router();

router.get("/", get);
router.get("/:id", getById);
router.post("/", post);
router.put("/:id", put);

module.exports = router;
