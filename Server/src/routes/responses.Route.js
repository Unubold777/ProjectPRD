const { createResponse } = require("../controllers/responses.Controller");
const { postDocument} = require("../controllers/responses.Controller");
const router = require("express").Router();
router.route("/createResponse/:id").post(createResponse);
router.route("/post/request/gobrrr").post(postDocument);
module.exports = router;
