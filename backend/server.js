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

app.get("/", (req, res) => {
  res.send("Foodify backend is running");
});

app.get("/api/restaurants", (req, res) => {
  res.json(restaurants);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
