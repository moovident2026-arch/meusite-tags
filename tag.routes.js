<<<<<<< HEAD
const express = require('express');
const router = express.Router();
const tagController = require('./tag.controller');

router.post('/create', tagController.createTag);
router.get('/', tagController.getTags);
router.delete('/:id', tagController.deleteTag);

=======
const router = require("express").Router();
const { activateTag, getTag } = require("./tag.controller");

router.post("/activate", activateTag);
router.get("/:code", getTag);

>>>>>>> e89eb6421e468d50ea3f326b51dc1eb7e3768805
module.exports = router;