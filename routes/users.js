const express = require("express");
const { get, post, put } = require("../controllers/users");

const router = express.Router();

router.get("/", get);
router.get("/:id", get);
router.post("/", post);
router.put("/:id", put);

module.exports = router;
