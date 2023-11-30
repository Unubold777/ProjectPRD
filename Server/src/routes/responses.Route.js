const { createResponse } = require("../controllers/responses.Controller");

const router = require("express").Router();
router.route("/createResponse/:id").post(createResponse);

module.exports = router;
