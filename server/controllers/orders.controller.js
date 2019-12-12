const CONSTANTS = require("../constants");
const ordersModel = require("../models/orders.model");
const axios = require("axios");

module.exports.get = async (req, res) => {
  let foundProducts;
  let foundDeliveries;
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

  try {
    foundProducts = await axios.get(CONSTANTS.ENDPOINT.PRODUCT);
    foundDeliveries = await axios.get(CONSTANTS.ENDPOINT.DELIVERY);
    foundProducts = foundProducts.data.data;
    foundDeliveries = foundDeliveries.data.deliveries;
  } catch (error) {
    return res.status(400).json(error.response.data);
  }

  foundOrders.forEach(order => {
    order.products.forEach(product => {
      product.name = foundProducts.find(el => el.id == product.id).name;
    });
    order.deliveryDate = foundDeliveries.find(
      el => el.order_id == order.id
    ).expected_receving_date;
    order.value = order.value.totalValue;
  });

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
