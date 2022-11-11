const express = require("express");
const { get, post, put, getById, del } = require("../controllers/users");
const {
  isAuthenticated,
hasOwnershipRol,
} = require("../middlewares/authJwt");
const router = express.Router();

router.get("/",isAuthenticated,hasOwnershipRol, get);
router.get("/:id",isAuthenticated,hasOwnershipRol, getById);
router.post("/", post);
router.put("/:id", isAuthenticated,hasOwnershipRol, put);
router.delete("/:id", isAuthenticated, hasOwnershipRol, del);

module.exports = router;
