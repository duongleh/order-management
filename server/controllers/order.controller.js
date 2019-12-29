const CONSTANTS = require("../constants");
const ordersModel = require("../models/orders.model");
const axios = require("axios");

const defaultStatus = [
  "Success",
  "Confirmed",
  "Pending",
  "Shipping",
  "Shipped",
  "Cancel",
  "Canceled"
];

// GET ORDER DETAIL
module.exports.get = async (req, res) => {
  const { id } = req.params;
  const userId = parseInt(req.query["userId"]);
  let foundOrder;

  try {
    foundOrder = await ordersModel
      .find({ id })
      .lean()
      .select("-_id -__v")
      .exec();

    if (!Array.isArray(foundOrder) || !foundOrder.length) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }
    foundOrder = foundOrder[0];
    if (foundOrder.user.id !== userId) {
      return res
        .status(404)
        .json({ success: false, message: "Order not belong to this user" });
    }
  } catch (err) {
    console.log(err);
  }

  foundOrder.products = await Promise.all(
    foundOrder.products.map(async product => {
      try {
        let resp = await axios.get(
          `${CONSTANTS.ENDPOINT.PRODUCT}/${product.id}`
        );
        return {
          ...product,
          name: resp.data.data[0].name,
          price: resp.data.data[0].price,
          subTotal: product.quantity * resp.data.data[0].price
        };
      } catch (error) {
        console.log(error.response.data);
      }
    })
  );

  try {
    let resp = await axios.get(
      `${CONSTANTS.ENDPOINT.DELIVERY}/${foundOrder.id}`
    );
    foundOrder.delivery = {
      date: resp.data.expected_receving_date,
      status: resp.data.status
    };
  } catch (error) {
    console.log(error.response.data);
  }

  return res.status(200).json(foundOrder);
};

// ADD NEW ORDER
module.exports.post = async (req, res) => {
  let order = req.body;
  let id = await ordersModel
    .findOne()
    .select("id -_id")
    .sort("-id")
    .exec();
  id = id.id + 1;

  const newDelivery = {
    receiving_address: order.user.address,
    receiver_phone: order.user.phone,
    total_cost: order.value.totalValue
  };

  req.body.deliveryUnitId
    ? (newDelivery.delivery_unit_id = req.body.deliveryUnitId)
    : null;

  order.products.forEach(el => {
    el.id = el.product_id;
    delete el.product_id;
  });

  try {
    let newOrder = new ordersModel({
      id,
      warranty: "Bảo hành có hiệu lực trong vòng 02 năm kể từ ngày bán",
      status: "Pending",
      ...order
    });
    await newOrder.save();
    await axios.post(`${CONSTANTS.ENDPOINT.DELIVERY}/${id}`, newDelivery);
  } catch (error) {
    return res.status(400).json(error.response.data);
  }

  return res.status(200).json({ success: true });
};

// UPDATE ORDER
module.exports.put = async (req, res) => {
  const { id } = req.params;

  if (req.query["paymentStatus"]) {
    if (!defaultStatus.includes(req.query["paymentStatus"])) {
      return res
        .status(400)
        .json({ success: false, message: "Payment Status is invalid" });
    }
    try {
      await ordersModel.findOneAndUpdate(
        { id },
        { "payment.status": req.query["paymentStatus"] }
      );
    } catch (error) {
      return res.status(400).json(error.response.data);
    }
  }

  if (req.query["deliveryStatus"]) {
    if (!defaultStatus.includes(req.query["deliveryStatus"])) {
      return res
        .status(400)
        .json({ success: false, message: "Delivery Status is invalid" });
    }
    try {
      await ordersModel.findOneAndUpdate(
        { id },
        { status: req.query["deliveryStatus"] }
      );
    } catch (error) {
      return res.status(400).json(error.response.data);
    }
  }

  return res.status(200).json({ success: true });
};

// DELETE ORDER
module.exports.delete = async (req, res) => {
  const { id } = req.params;
  try {
    await ordersModel.findOneAndRemove({ id });
    await axios.delete(`${CONSTANTS.ENDPOINT.DELIVERY}/${id}`);
  } catch (error) {
    return res.status(400).json(error.response.data);
  }
  return res.status(200).json({ success: true });
};
