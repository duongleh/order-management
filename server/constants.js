const CONSTANTS = {
  ENDPOINT: {
    LISTORDER: "/orders",
    ORDERDETAIL: "/order",
    DELIVERY: "https://online-selling-website.herokuapp.com/deliveries/"
  },
  PORT: process.env.PORT || "3001"
};

module.exports = CONSTANTS;
