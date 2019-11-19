const CONSTANTS = require("../constants");
const express = require("express");
const data = require("../data");

const router = express.Router();

// LIST ORDER ENDPOINTS
router.get(CONSTANTS.ENDPOINT.LISTORDER, (req, res) => {
  res.json(data.orders);
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
