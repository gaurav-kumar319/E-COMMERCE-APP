const Order = require("../models/Order");

// ✅ CREATE ORDER
const createOrder = async (req, res) => {
  try {
    const { customer, orderItems, totalPrice } = req.body;

    if (
      !customer.name ||
      !customer.email ||
      !customer.phone ||
      !customer.address
    ) {
      return res
        .status(400)
        .json({ message: "Please fill all details" });
    }

    const order = new Order({
      user: req.user,
      customer,
      orderItems,
      totalPrice,
    });

    const createdOrder = await order.save();

    res.status(201).json(createdOrder);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ✅ GET MY ORDERS ONLY
const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      user: req.user,
    }).sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createOrder,
  getOrders,
};