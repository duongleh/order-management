const CONSTANTS = require("../constants");
const express = require("express");
const data = require("../data");

const router = express.Router();

// GET LIST ORDERS
router.get(CONSTANTS.ENDPOINT.LISTORDER, (req, res) => {
  let orders = data.orders.slice().reverse();
  if (req.query["sort"] && req.query["sort"].toLowerCase() === "asc") {
    orders.reverse();
  }
  if (req.query["status"]) {
    orders = orders.filter(el => el.status === req.query["status"]);
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
  return res.json(orders);
});

// GET ORDER DETAIL
router.get(CONSTANTS.ENDPOINT.ORDERDETAIL + "/:id", (req, res) => {
  const { id } = req.params;
  return res.json(data.order.find(el => el.id === Number(id)));
});

// ADD NEW ORDER
router.post(CONSTANTS.ENDPOINT.ORDERDETAIL, (req, res) => {
  let item = {
    id: data.order[data.order.length - 1].id + 1,
    ...req.body
  };

  let listItem = {
    id: data.order[data.order.length - 1].id + 1,
    deliveryDate: req.body.delivery.date,
    status: req.body.status,
    value: req.body.totalValue,
    products: req.body.products.map(el => el.name)
  };

  data.order.push(item);
  data.orders.push(listItem);
  return res.status(200).json({ success: true });
});

// UPDATE ORDER
router.put(CONSTANTS.ENDPOINT.ORDERDETAIL + "/:id", (req, res) => {
  const { id } = req.params;
  const defaultStat = ["Success", "Pending", "Cancel"];
  let order = data.order.find(el => el.id === Number(id));

  if (req.query["status"]) {
    if (defaultStat.includes(req.query["status"])) {
      order.status = req.query["status"];
    } else {
      return res
        .status(400)
        .json({ success: false, message: "Status is invalid" });
    }
  }

  if (req.query["paymentStatus"]) {
    if (defaultStat.includes(req.query["paymentStatus"])) {
      order.payment.status = req.query["paymentStatus"];
    } else {
      return res
        .status(400)
        .json({ success: false, message: "Payment Status is invalid" });
    }
  }

  if (req.query["deliveryStatus"] && req.query["deliveryDate"]) {
    if (Date.parse(req.query["deliveryDate"])) {
      order.delivery.status = req.query["deliveryStatus"];
      order.delivery.date = req.query["deliveryDate"];
    } else {
      return res
        .status(400)
        .json({ success: false, message: "Date is not valid" });
    }
  } else if (req.query["deliveryStatus"] || req.query["deliveryDate"]) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide date and status" });
  }

  return res.status(200).json({ success: true });
});

// DELETE ORDER
router.delete(CONSTANTS.ENDPOINT.ORDERDETAIL + "/:id", (req, res) => {
  const { id } = req.params;
  let index = data.orders.findIndex(el => el.id === Number(id));
  if (index > -1) {
    data.orders.splice(index, 1);
    data.order.splice(index, 1);
    return res.json({ success: true });
  } else {
    return res
      .status(404)
      .json({ success: false, message: "Could not find item" });
  }
});

module.exports = router;
