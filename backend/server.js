const express = require("express");

const app = express();
const PORT = 5001;

app.use(express.json());

const restaurants = [
  {
    id: 1,
    name: "Foodify Grill",
    cuisine: "American",
    rating: 4.6,
    deliveryTime: "25-35 min",
    isOpen: true,
    hours: "10:00 AM - 10:00 PM",
  },
  {
    id: 2,
    name: "Pizza Palace",
    cuisine: "Italian",
    rating: 4.7,
    deliveryTime: "30-40 min",
    isOpen: true,
    hours: "11:00 AM - 11:00 PM",
  },
  {
    id: 3,
    name: "Spice House",
    cuisine: "Indian",
    rating: 4.8,
    deliveryTime: "35-45 min",
    isOpen: false,
    hours: "12:00 PM - 9:00 PM",
  },
];

const foods = [
  {
    id: 1,
    name: "Cheese Burger",
    category: "Burger",
    price: 8.99,
    restaurant: "Foodify Grill",
    badge: "Popular",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600",
  },
  {
    id: 2,
    name: "Pepperoni Pizza",
    category: "Pizza",
    price: 12.99,
    restaurant: "Pizza Palace",
    badge: "New",
    image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=600",
  },
  {
    id: 3,
    name: "Chicken Biryani",
    category: "Rice",
    price: 10.99,
    restaurant: "Spice House",
    badge: "Spicy",
    image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=600",
  },
];

const categories = ["All", "Burger", "Pizza", "Rice"];

const orders = [];

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

app.post("/api/orders", (req, res) => {
  const newOrder = {
    id: orders.length + 1,
    ...req.body,
    status: "Preparing your order",
    createdAt: new Date(),
  };

  orders.push(newOrder);

  res.status(201).json({
    message: "Order received successfully",
    order: newOrder,
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});