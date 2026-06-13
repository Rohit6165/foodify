import { useState } from "react";
import foods from "./data/foods";
import categories from "./data/categories";
import restaurants from "./data/restaurants";

function App() {
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedRestaurant, setSelectedRestaurant] = useState("All");
  const [selectedBadge, setSelectedBadge] = useState("All");
  const [sortOption, setSortOption] = useState("default");

  const badges = ["All", "Popular", "New", "Spicy"];

  const filteredFoods = foods
    .filter((food) => {
      const matchesSearch = food.name.toLowerCase().includes(searchText.toLowerCase());
      const matchesCategory = selectedCategory === "All" || food.category === selectedCategory;
      const matchesRestaurant = selectedRestaurant === "All" || food.restaurant === selectedRestaurant;
      const matchesBadge = selectedBadge === "All" || food.badge === selectedBadge;

      return matchesSearch && matchesCategory && matchesRestaurant && matchesBadge;
    })
    .sort((a, b) => {
      if (sortOption === "price-low") return a.price - b.price;
      if (sortOption === "price-high") return b.price - a.price;
      if (sortOption === "name") return a.name.localeCompare(b.name);
      return 0;
    });

  return (
    <div>
      <nav>
        <h2>Foodify Navbar</h2>
        <a href="#">Home</a> | <a href="#">Restaurants</a> | <a href="#">Cart</a>
      </nav>

      <section>
        <h1>Order your favorite food fast</h1>
        <p>Browse restaurants, choose delicious meals, and get food delivered fresh.</p>
        <button>Browse Menu</button>
      </section>

      <section>
        <h2>Menu</h2>

        <input
          type="text"
          placeholder="Search food..."
          value={searchText}
          onChange={(event) => setSearchText(event.target.value)}
        />

        <select value={sortOption} onChange={(event) => setSortOption(event.target.value)}>
          <option value="default">Default</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="name">Name: A to Z</option>
        </select>

        <div>
          {categories.map((category) => (
            <button key={category} onClick={() => setSelectedCategory(category)}>
              {category}
            </button>
          ))}
        </div>

        <div>
          <button onClick={() => setSelectedRestaurant("All")}>All Restaurants</button>
          {restaurants.map((restaurant) => (
            <button key={restaurant.id} onClick={() => setSelectedRestaurant(restaurant.name)}>
              {restaurant.name}
            </button>
          ))}
        </div>

        <div>
          {badges.map((badge) => (
            <button key={badge} onClick={() => setSelectedBadge(badge)}>
              {badge}
            </button>
          ))}
        </div>

        {filteredFoods.map((food) => (
          <div key={food.id}>
            <h3>{food.name}</h3>
            <p>Category: {food.category}</p>
            <p>Restaurant: {food.restaurant}</p>
            <p>Badge: {food.badge}</p>
            <p>Price: ${food.price}</p>
            <button>Add to Cart</button>
          </div>
        ))}
      </section>
    </div>
  );
}

export default App;