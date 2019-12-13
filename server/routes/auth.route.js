const express = require("express");
const CONSTANTS = require("../constants");
const auth = require("../controllers/auth.controller");

const router = express.Router();

router.get("/", auth.auth);

router.get(CONSTANTS.ENDPOINT.SETSESSION, auth.set);

router.get(CONSTANTS.ENDPOINT.DESTROYSESSION, auth.destroy);

module.exports = router;
