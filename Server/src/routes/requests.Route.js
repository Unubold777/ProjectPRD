const { createRequest,getRequests,getRequest,deleteRequest } = require("../controllers/requests.Controller");

const router = require("express").Router();
router.route("/createRequest").post(createRequest);
router.route("/getRequests").get(getRequests);
router.route("/getRequest/:id").get(getRequest);
router.route("/deleteRequest/:id").delete(deleteRequest);
module.exports = router;
