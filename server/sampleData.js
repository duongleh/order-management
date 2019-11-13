const shortLoremIpsum = `Lorem id sint aliqua tempor tempor sit. Ad dolor dolor ut nulla mollit dolore non eiusmod Lorem tempor nisi cillum.`;
const sampleData = {};

// TODO Web Template Studio: If you use a database replace this ID with the ID created by the database
sampleData.listID = 3;

sampleData.listTextAssets = [
  {
    text: shortLoremIpsum,
    _id: 1
  },
  {
    text: shortLoremIpsum,
    _id: 2
  }
];

sampleData.listOrders = [
  {
    id: 1123,
    date: "11-03-2017",
    productName: "Book",
    total: 230000,
    status: "Pending"
  },
  {
    id: 9879,
    date: "11-03-2019",
    productName: "Plane",
    total: 2230000,
    status: "Success"
  }
];

sampleData.orderDetail = {
  name: "NGUYỄN VĂN ABC",
  address: "Ba Đình, Hà Nội",
  phone: "0123456789",
  shippingType: "Giao hàng nhanh",
  shippingStatus: "Giao vào Thứ sáu, 01/03",
  paymentType: "Master Card",
  paymentStatus: "Giao dịch thành công",
  product: [
    {
      productName: "Tay Cầm Xbox One S - White Sport",
      price: 1300000,
      amount: 1,
      discount: 50000,
      subTotal: 1250000
    },
    {
      productName: "Tay Cầm Xbox One S - White Sport",
      price: 1300000,
      amount: 1,
      discount: 50000,
      subTotal: 1250000
    },
    {
      productName: "Tay Cầm Xbox One S - White Sport",
      price: 1300000,
      amount: 1,
      discount: 50000,
      subTotal: 1250000
    }
  ],
  preTotal: 1300000,
  totalDiscount: 50000,
  shippingFee: 0,
  total: 1250000
};
module.exports = sampleData;
