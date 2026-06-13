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
  const [favoriteIds, setFavoriteIds] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [orderType, setOrderType] = useState("Delivery");
  const [checkoutMessage, setCheckoutMessage] = useState("");
  const [couponCode, setCouponCode] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);
  const [couponMessage, setCouponMessage] = useState("");
  const [orderStatus, setOrderStatus] = useState("");

  const badges = ["All", "Popular", "New", "Spicy"];

  function toggleFavorite(foodId) {
    if (favoriteIds.includes(foodId)) {
      setFavoriteIds(favoriteIds.filter((id) => id !== foodId));
    } else {
      setFavoriteIds([...favoriteIds, foodId]);
    }
  }

  function addToCart(food) {
    const itemExists = cartItems.find((item) => item.id === food.id);

    if (itemExists) {
      setCartItems(
        cartItems.map((item) =>
          item.id === food.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else {
      setCartItems([...cartItems, { ...food, quantity: 1 }]);
    }
  }

  function increaseQuantity(foodId) {
    setCartItems(
      cartItems.map((item) =>
        item.id === foodId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  }

  function decreaseQuantity(foodId) {
    setCartItems(
      cartItems
        .map((item) =>
          item.id === foodId ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  }

  function applyCoupon() {
    if (couponCode.trim().toUpperCase() === "FOODIFY10") {
      setDiscountPercent(10);
      setCouponMessage("Coupon applied! You got 10% off.");
    } else {
      setDiscountPercent(0);
      setCouponMessage("Invalid coupon code.");
    }
  }

  function placeOrder() {
    if (cartItems.length === 0) {
      setCheckoutMessage("Please add food to your cart.");
      setOrderStatus("");
      return;
    }

    if (customerName.trim() === "") {
      setCheckoutMessage("Please enter your name.");
      setOrderStatus("");
      return;
    }

    if (customerPhone.trim() === "") {
      setCheckoutMessage("Please enter your phone number.");
      setOrderStatus("");
      return;
    }

    if (orderType === "Delivery" && customerAddress.trim() === "") {
      setCheckoutMessage("Please enter your delivery address.");
      setOrderStatus("");
      return;
    }

    setCheckoutMessage("Order placed successfully!");
    setOrderStatus("Preparing your order");
  }

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const cartTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const discountAmount = cartTotal * (discountPercent / 100);
  const finalTotal = cartTotal - discountAmount;

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
        <a href="#">Home</a> | <a href="#">Restaurants</a> | <a href="#">Cart ({cartCount})</a>
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
            <button onClick={() => toggleFavorite(food.id)}>
              {favoriteIds.includes(food.id) ? "❤️ Favorite" : "🤍 Add Favorite"}
            </button>
            <button onClick={() => addToCart(food)}>Add to Cart</button>
          </div>
        ))}
      </section>

      <section>
        <h2>Cart</h2>

        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <>
            {cartItems.map((item) => (
              <div key={item.id}>
                <p>{item.name} - ${item.price}</p>
                <p>Quantity: {item.quantity}</p>
                <button onClick={() => decreaseQuantity(item.id)}>-</button>
                <button onClick={() => increaseQuantity(item.id)}>+</button>
              </div>
            ))}

            <h3>Subtotal: ${cartTotal.toFixed(2)}</h3>

            <input
              type="text"
              placeholder="Coupon code"
              value={couponCode}
              onChange={(event) => setCouponCode(event.target.value)}
            />

            <button onClick={applyCoupon}>Apply Coupon</button>

            <p>{couponMessage}</p>

            <p>Discount: ${discountAmount.toFixed(2)}</p>
            <h3>Total: ${finalTotal.toFixed(2)}</h3>
          </>
        )}
      </section>

      <section>
        <h2>Order Form</h2>

        <div>
          <label>
            <input
              type="radio"
              value="Delivery"
              checked={orderType === "Delivery"}
              onChange={(event) => setOrderType(event.target.value)}
            />
            Delivery
          </label>

          <label>
            <input
              type="radio"
              value="Pickup"
              checked={orderType === "Pickup"}
              onChange={(event) => setOrderType(event.target.value)}
            />
            Pickup
          </label>
        </div>

        <p>Selected option: {orderType}</p>

        <input
          type="text"
          placeholder="Your name"
          value={customerName}
          onChange={(event) => setCustomerName(event.target.value)}
        />

        <input
          type="text"
          placeholder="Phone number"
          value={customerPhone}
          onChange={(event) => setCustomerPhone(event.target.value)}
        />

        {orderType === "Delivery" && (
          <input
            type="text"
            placeholder="Delivery address"
            value={customerAddress}
            onChange={(event) => setCustomerAddress(event.target.value)}
          />
        )}

        <button onClick={placeOrder}>Place Order</button>

        <p>{checkoutMessage}</p>
      </section>

      <section>
        <h2>Order Summary</h2>
        <p>Order Type: {orderType}</p>
        <p>Name: {customerName || "Not entered"}</p>
        <p>Phone: {customerPhone || "Not entered"}</p>

        {orderType === "Delivery" && (
          <p>Address: {customerAddress || "Not entered"}</p>
        )}

        <h3>Items</h3>

        {cartItems.length === 0 ? (
          <p>No items yet.</p>
        ) : (
          cartItems.map((item) => (
            <p key={item.id}>
              {item.name} x {item.quantity}
            </p>
          ))
        )}

        <h3>Total: ${finalTotal.toFixed(2)}</h3>
      </section>

      {orderStatus && (
        <section>
          <h2>Order Status</h2>
          <p>{orderStatus}</p>
        </section>
      )}

      <footer>
        <h3>Foodify</h3>
        <p>Fresh meals, fast delivery, happy customers.</p>
        <p>© 2026 Foodify. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;