const express = require('express');

const {
    get,
    post,
    put,
    getById,
    del,
    uploadImage,
} = require('../controllers/users');
const {
  isAuthenticated,
hasOwnershipRol,
} = require("../middlewares/authJwt");
const router = express.Router();

router.get("/",isAuthenticated,hasOwnershipRol, get);
router.get("/:id",isAuthenticated,hasOwnershipRol, getById);
router.post("/", post);
router.post('/upload', isAuthenticated, uploadImage);
router.put("/:id", isAuthenticated,hasOwnershipRol, put);
router.delete("/:id", isAuthenticated, hasOwnershipRol, del);

module.exports = router;
