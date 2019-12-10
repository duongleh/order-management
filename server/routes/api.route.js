const CONSTANTS = require("../constants");
const express = require("express");
const orders = require("../controllers/orders.controller");
const order = require("../controllers/order.controller");

const router = express.Router();

// API ORDERS
router.get(CONSTANTS.ENDPOINT.ORDERS, orders.get);

// API ORDER
router.get(CONSTANTS.ENDPOINT.ORDER + "/:id", order.get);
router.post(CONSTANTS.ENDPOINT.ORDER, order.post);
router.put(CONSTANTS.ENDPOINT.ORDER + "/:id", order.put);
router.delete(CONSTANTS.ENDPOINT.ORDER + "/:id", order.delete);

module.exports = router;
