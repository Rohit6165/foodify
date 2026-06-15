import { useEffect, useState } from "react";

const API_URL = "https://foodify-backend-qkax.onrender.com";

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    fetch(`${API_URL}/api/orders`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch orders");
        }

        return response.json();
      })
      .then((data) => {
        setOrders(data);
        setErrorMessage("");
        setLoading(false);
      })
      .catch(() => {
        setErrorMessage("Could not load orders. Backend may be waking up.");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <section id="admin">
        <h2>Admin Orders</h2>
        <p>Loading orders...</p>
      </section>
    );
  }

  return (
    <section id="admin">
      <h2>Admin Orders</h2>

      {errorMessage && <p>{errorMessage}</p>}

      {!errorMessage && orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        !errorMessage && (
          <div className="admin-orders">
            {orders.map((order) => (
              <div className="admin-order-card" key={order._id}>
                <div className="restaurant-card-header">
                  <h3>{order.customerName}</h3>
                <span className={`badge status-${order.status.toLowerCase()}`}>
  {order.status}
</span>
                </div>

                <p>📞 {order.customerPhone}</p>
                <p>🚚 {order.orderType}</p>
                <p>💰 ${order.total.toFixed(2)}</p>

                <h4>Items</h4>
                {order.items.map((item, index) => (
                  <p key={index}>
                    {item.name} x {item.quantity}
                  </p>
                ))}

                <p>🕒 {new Date(order.createdAt).toLocaleString()}</p>
              </div>
            ))}
          </div>
        )
      )}
    </section>
  );
}

export default AdminOrders;