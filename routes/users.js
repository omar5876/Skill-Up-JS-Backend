const express = require("express");
const { get, post, put, getById, del } = require("../controllers/users");
const {
  isAuthenticated,
  hasAuthenticatedRol,
} = require("../middlewares/authJwt");
const router = express.Router();

router.get("/", get);
router.get("/:id", getById);
router.post("/", post);
router.put("/:id", isAuthenticated, hasAuthenticatedRol(["admin"]), put);
router.delete("/:id", isAuthenticated, hasAuthenticatedRol(["admin"]), del);

module.exports = router;
