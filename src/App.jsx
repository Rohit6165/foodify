import { useState } from "react";
import foods from "./data/foods";

function App() {
  const [searchText, setSearchText] = useState("");

  const filteredFoods = foods.filter((food) =>
    food.name.toLowerCase().includes(searchText.toLowerCase())
  );

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