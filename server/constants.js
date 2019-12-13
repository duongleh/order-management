const CONSTANTS = {
  ENDPOINT: {
    ORDERS: "/orders",
    ORDER: "/order",
    SETSESSION: "/setsession",
    DESTROYSESSION: "/destroysession",
    DELIVERY: "https://online-selling-website.herokuapp.com/deliveries",
    PRODUCT: "https://nguyenvd27-ltct-demo.herokuapp.com/api/products",
    USER: "https://secure-mountain-93147.herokuapp.com/api"
  },
  PORT: process.env.PORT || "3001"
};

module.exports = CONSTANTS;
