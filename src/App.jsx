import { useState } from "react";
import foods from "./data/foods";
import categories from "./data/categories";
import restaurants from "./data/restaurants";

function App() {
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedRestaurant, setSelectedRestaurant] = useState("All");

  const filteredFoods = foods.filter((food) => {
    const matchesSearch = food.name
      .toLowerCase()
      .includes(searchText.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" || food.category === selectedCategory;

    const matchesRestaurant =
      selectedRestaurant === "All" || food.restaurant === selectedRestaurant;

    return matchesSearch && matchesCategory && matchesRestaurant;
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

        <div>
          {categories.map((category) => (
            <button key={category} onClick={() => setSelectedCategory(category)}>
              {category}
            </button>
          ))}
        </div>

        <div>
          <button onClick={() => setSelectedRestaurant("All")}>
            All Restaurants
          </button>

          {restaurants.map((restaurant) => (
            <button
              key={restaurant.id}
              onClick={() => setSelectedRestaurant(restaurant.name)}
            >
              {restaurant.name}
            </button>
          ))}
        </div>

        {filteredFoods.map((food) => (
          <div key={food.id}>
            <h3>{food.name}</h3>
            <p>Category: {food.category}</p>
            <p>Restaurant: {food.restaurant}</p>
            <p>Price: ${food.price}</p>
            <button>Add to Cart</button>
          </div>
        ))}
      </section>
    </div>
  );
}

export default App;