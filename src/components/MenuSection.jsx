import { useEffect, useState } from "react";
import categories from "../data/categories";
import restaurants from "../data/restaurants";

function MenuSection({ addToCart }) {
  const [foods, setFoods] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedRestaurant, setSelectedRestaurant] = useState("All");
  const [selectedBadge, setSelectedBadge] = useState("All");
  const [sortOption, setSortOption] = useState("default");
  const [favoriteIds, setFavoriteIds] = useState([]);

  const badges = ["All", "Popular", "New", "Spicy"];

  useEffect(() => {
   fetch("https://foodify-backend-qkax.onrender.com/api/foods")
      .then((response) => response.json())
      .then((data) => setFoods(data))
      .catch((error) => console.log(error));
  }, []);

  function toggleFavorite(foodId) {
    if (favoriteIds.includes(foodId)) {
      setFavoriteIds(favoriteIds.filter((id) => id !== foodId));
    } else {
      setFavoriteIds([...favoriteIds, foodId]);
    }
  }

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
    <section id="menu">
      <h2>Menu</h2>

      <div className="filter-row">
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
      </div>

      <div className="filter-row">
        {categories.map((category) => (
          <button key={category} onClick={() => setSelectedCategory(category)}>
            {category}
          </button>
        ))}
      </div>

      <div className="filter-row">
        <button onClick={() => setSelectedRestaurant("All")}>All Restaurants</button>

        {restaurants.map((restaurant) => (
          <button key={restaurant.id} onClick={() => setSelectedRestaurant(restaurant.name)}>
            {restaurant.name}
          </button>
        ))}
      </div>

      <div className="filter-row">
        {badges.map((badge) => (
          <button key={badge} onClick={() => setSelectedBadge(badge)}>
            {badge}
          </button>
        ))}
      </div>

      {filteredFoods.length === 0 ? (
        <div className="empty-state">
          <h3>No dishes found.</h3>
          <p>Try changing your search or filters.</p>
        </div>
      ) : (
        <div className="menu-grid">
          {filteredFoods.map((food) => (
            <div className="food-card" key={food.id}>
              <img className="food-image" src={food.image} alt={food.name} />

              <span className="badge">{food.badge}</span>
              <h3>{food.name}</h3>

              <p>
                {food.category} • {food.restaurant}
              </p>

              <p className="price">${food.price}</p>

              <button onClick={() => toggleFavorite(food.id)}>
                {favoriteIds.includes(food.id) ? "❤️ Favorite" : "🤍 Add Favorite"}
              </button>

              <button onClick={() => addToCart(food)}>Add to Cart</button>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default MenuSection;