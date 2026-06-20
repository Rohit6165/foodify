const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const Order = require("./models/Order");

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log("MongoDB connection error:", error.message);
  });

const restaurants = [
  {
    id: 1,
    name: "Foodify Grill",
    cuisine: "Nepali Fast Food",
    rating: 4.6,
    deliveryTime: "25-35 min",
    isOpen: true,
    hours: "10:00 AM - 10:00 PM",
  },
  {
    id: 2,
    name: "Kathmandu Kitchen",
    cuisine: "Nepali & Chinese",
    rating: 4.7,
    deliveryTime: "30-40 min",
    isOpen: true,
    hours: "11:00 AM - 11:00 PM",
  },
  {
    id: 3,
    name: "Spice House",
    cuisine: "Thakali & Sekuwa",
    rating: 4.8,
    deliveryTime: "35-45 min",
    isOpen: true,
    hours: "12:00 PM - 9:00 PM",
  },
];

const foods = [
  {
    id: 1,
    name: "Chicken Momo",
    category: "Momo",
    price: 180,
    restaurant: "Foodify Grill",
    badge: "Popular",
    image: "https://images.unsplash.com/photo-1626776876729-bab4369a5a5a?w=600",
  },
  {
    id: 2,
    name: "Chicken Chowmein",
    category: "Noodles",
    price: 220,
    restaurant: "Kathmandu Kitchen",
    badge: "Popular",
    image: "https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?w=600",
  },
  {
    id: 3,
    name: "Chicken Biryani",
    category: "Rice",
    price: 350,
    restaurant: "Spice House",
    badge: "Spicy",
    image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=600",
  },
  {
    id: 4,
    name: "Thakali Khana Set",
    category: "Thakali",
    price: 450,
    restaurant: "Spice House",
    badge: "New",
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600",
  },
  {
    id: 5,
    name: "Chicken Sekuwa",
    category: "Sekuwa",
    price: 300,
    restaurant: "Foodify Grill",
    badge: "Spicy",
    image: "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?w=600",
  },
  {
    id: 6,
    name: "Veg Fried Rice",
    category: "Rice",
    price: 200,
    restaurant: "Kathmandu Kitchen",
    badge: "New",
    image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=600",
  },
];

const categories = ["All", "Momo", "Noodles", "Rice", "Thakali", "Sekuwa"];

app.get("/", (req, res) => {
  res.send("Foodify backend is running");
});

app.get("/api/restaurants", (req, res) => {
  res.json(restaurants);
});

app.get("/api/foods", (req, res) => {
  res.json(foods);
});

app.get("/api/categories", (req, res) => {
  res.json(categories);
});

app.get("/api/orders/customer/:phone", async (req, res) => {
  try {
    const customerOrders = await Order.find({
      customerPhone: req.params.phone,
    }).sort({ createdAt: -1 });

    res.json(customerOrders);
  } catch (error) {
    res.status(500).json({
      message: "Could not load customer orders",
      error: error.message,
    });
  }
});

app.get("/api/orders", async (req, res) => {
  try {
    const savedOrders = await Order.find().sort({ createdAt: -1 });
    res.json(savedOrders);
  } catch (error) {
    res.status(500).json({
      message: "Could not load orders",
      error: error.message,
    });
  }
});

app.post("/api/orders", async (req, res) => {
  const newOrder = await Order.create({
    ...req.body,
    status: "Preparing your order",
  });

  res.status(201).json({
    message: "Order received successfully",
    order: newOrder,
  });
});

app.put("/api/orders/:id", async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    res.json({
      message: "Order status updated successfully",
      order: updatedOrder,
    });
  } catch (error) {
    res.status(500).json({
      message: "Could not update order status",
    });
  }
});

app.delete("/api/orders/:id", async (req, res) => {
  try {
    const deletedOrder = await Order.findByIdAndDelete(req.params.id);

    if (!deletedOrder) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    res.json({
      message: "Order deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Could not delete order",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});