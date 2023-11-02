// const router = require("express").Router();
// const {createUsers} = require("../controllers/users.Controller")
// const {getUsers} = require("../controllers/users.Controller")

// router.route("/create").post(createUsers);
// router.route("/").get(getUsers);

// module.exports = router;

const { protect } = require("../middleware/protect");
const { createUser } = require("../controllers/users.Controller");
const {registerUser} = require("../controllers/users.Controller");
const { getUsers } = require("../controllers/users.Controller");
const { getUsername } = require("../controllers/users.Controller");
const { getUser } = require("../controllers/users.Controller");
const { deleteUser } = require("../controllers/users.Controller");
const { updateUser } = require("../controllers/users.Controller");
const { checkVerification, deleteUnverifiedUsers } = require("../controllers/users.Controller");

const router = require("express").Router();
//const {getoneUser} = require("../controllers/users.Controller/")
router.route("/createUser").post(createUser);
router.route("/getUsers").get(getUsers);
router.route("/:id").get(getUser);
router.route("/qwertyuiop/qwertyuiop").post(getUsername);
router.route("/regUser").post(protect,registerUser);
router.route("/deleteUser/:id").delete(deleteUser);
router.route("/updateUser/:id").put(updateUser);
router.route("/checkVerification").post(checkVerification);
router.route("/executeOrder66").delete(deleteUnverifiedUsers);

module.exports = router;
