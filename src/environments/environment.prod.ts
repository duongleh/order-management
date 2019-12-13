export const environment = {
  production: true,
  endpoint: {
    listorder: "/api/orders",
    orderdetail: "/api/order",
    auth: {
      auth: "/auth",
      setsession: "/auth/setsession",
      destroysession: "/auth/destroysession"
    },
    signin:
      "http://secure-mountain-93147.herokuapp.com/requirelogin?url=https://sp-04-order.herokuapp.com/auth",
    logout:
      "http://secure-mountain-93147.herokuapp.com/logout?url=https://sp-04-order.herokuapp.com/auth"
  }
};
