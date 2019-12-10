const CONSTANTS = require("../constants");
const ordersModel = require("../models/orders.model");
const axios = require("axios");

module.exports.get = async (req, res) => {
  let qr = ordersModel
    .find()
    .lean()
    .select("id products.id status value.totalValue -_id")
    .sort(
      req.query["sort"] && req.query["sort"].toLowerCase() === "asc"
        ? "id"
        : "-id"
    );

  req.query["status"] ? qr.where("status").equals(req.query["status"]) : null;

  req.query["startValue"]
    ? qr.where("value.totalValue").gt(parseInt(req.query["startValue"]))
    : null;

  req.query["endValue"]
    ? qr.where("value.totalValue").lt(parseInt(req.query["endValue"]))
    : null;

  let foundOrders = await qr.limit(parseInt(req.query["quantity"])).exec();

  for (order of foundOrders) {
    order.products = await Promise.all(
      order.products.map(async product => {
        try {
          let resp = await axios.get(CONSTANTS.ENDPOINT.PRODUCT + product.id);
          return { ...product, name: resp.data.data[0].name };
        } catch (err) {
          return res.status(400).json(error.response.data);
        }
      })
    );
    try {
      let resp = await axios.get(CONSTANTS.ENDPOINT.DELIVERY + order.id);
      order.deliveryDate = resp.data.expected_receving_date;
    } catch (err) {
      return res.status(400).json(error.response.data);
    }
    order.value = order.value.totalValue;
  }

  if (req.query["query"]) {
    foundOrders = foundOrders.filter(el =>
      el.products
        .map(el => el.name)
        .join()
        .includes(req.query["query"])
    );
  }

  if (req.query["startTime"]) {
    foundOrders = foundOrders.filter(
      el => Date.parse(el.deliveryDate) >= Date.parse(req.query["startTime"])
    );
  }

  if (req.query["endTime"]) {
    foundOrders = foundOrders.filter(
      el => Date.parse(el.deliveryDate) <= Date.parse(req.query["endTime"])
    );
  }
  return res.status(200).json(foundOrders);
};
