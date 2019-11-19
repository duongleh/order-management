const CONSTANTS = require("../constants");
const express = require("express");
const data = require("../data");

const router = express.Router();

// GET LIST ORDERS
router.get(CONSTANTS.ENDPOINT.LISTORDER, (req, res) => {
  let orders = data.orders.slice().reverse();
  if (req.query["sort"] && req.query["sort"].toLowerCase() == "asc") {
    orders.reverse();
  }
  if (req.query["status"]) {
    orders = orders.filter(el => el.status == req.query["status"]);
  }
  if (req.query["product"]) {
    orders = orders.filter(el =>
      el.products.join().includes(req.query["product"])
    );
  }
  if (req.query["beginTime"]) {
    orders = orders.filter(el => {
      date = el.deliveryDate.split(" ")[0].split("-");
      return (
        Date.parse(`${date[1]}-${date[0]}-${date[2]}`) >=
        Date.parse(req.query["beginTime"])
      );
    });
  }
  if (req.query["endTime"]) {
    orders = orders.filter(el => {
      date = el.deliveryDate.split(" ")[0].split("-");
      return (
        Date.parse(`${date[1]}-${date[0]}-${date[2]}`) <=
        Date.parse(req.query["endTime"])
      );
    });
  }
  if (req.query["beginValue"]) {
    orders = orders.filter(el => el.value >= req.query["beginValue"]);
  }
  if (req.query["endValue"]) {
    orders = orders.filter(el => el.value <= req.query["endValue"]);
  }
  if (req.query["count"]) {
    orders = orders.slice(0, req.query["count"]);
  }
  res.json(orders);
});

// ORDER DETAIL ENDPOINTS
router.get(CONSTANTS.ENDPOINT.ORDERDETAIL + "/:id", (req, res) => {
  const id = req.params.id;
  res.json(data.order[id]);
});

// LIST ENDPOINTS
router.get(CONSTANTS.ENDPOINT.LIST, (req, res) => {
  res.json(data.listTextAssets);
});

router.post(CONSTANTS.ENDPOINT.LIST, (req, res) => {
  let listItem = {
    text: req.body.text,
    _id: data.listID
  };
  data.listTextAssets.unshift(listItem);
  res.json(listItem);
  data.listID++;
});

router.delete(CONSTANTS.ENDPOINT.LIST + "/:_id", function(req, res) {
  const { _id } = req.params;
  var index = data.listTextAssets.findIndex(
    listItem => listItem._id === Number(_id)
  );
  if (index > -1) {
    data.listTextAssets.splice(index, 1);
    res.json({ _id: Number(_id), text: "This commented was deleted" });
  } else {
    res.status(404).send("Could not find item with id:" + _id);
  }
});

module.exports = router;
