import restaurants from "../data/restaurants";

function RestaurantSection() {
  return (
    <section>
      <h2>Restaurants</h2>

      <div className="restaurant-grid">
        {restaurants.map((restaurant) => (
          <div className="restaurant-card" key={restaurant.id}>
            <div className="restaurant-card-header">
              <h3>{restaurant.name}</h3>

              <span className={restaurant.isOpen ? "status-open" : "status-closed"}>
                {restaurant.isOpen ? "Open" : "Closed"}
              </span>
            </div>

            <p>{restaurant.cuisine}</p>
            <p>⭐ {restaurant.rating}</p>
            <p>🚚 {restaurant.deliveryTime}</p>
            <p>🕒 {restaurant.hours}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default RestaurantSection;