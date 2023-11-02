const { createResponse, getResponse } = require("../controllers/responses.Controller");

const router = require("express").Router();
router.route("/createResponse/:id").post(createResponse);
router.route("/getResponse/:id").get(getResponse);

module.exports = router;
