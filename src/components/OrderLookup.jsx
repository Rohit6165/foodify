import { useState } from "react";

const API_URL = "https://foodify-backend-qkax.onrender.com";

function OrderLookup() {
  const [phone, setPhone] = useState("");
  const [orders, setOrders] = useState([]);
  const [message, setMessage] = useState("");

  async function searchOrders() {
    if (phone.trim() === "") {
      setMessage("Please enter your phone number.");
      setOrders([]);
      return;
    }

    try {
      setMessage("Searching orders...");

      const response = await fetch(`${API_URL}/api/orders/customer/${phone}`);

      if (!response.ok) {
        setMessage("Could not search orders. Please try again.");
        setOrders([]);
        return;
      }

      const data = await response.json();

      if (data.length === 0) {
        setMessage("No orders found for this phone number.");
        setOrders([]);
        return;
      }

      setOrders(data);
      setMessage("");
    } catch (error) {
      setMessage("Backend error. Please try again later.");
      setOrders([]);
    }
  }

  return (
    <section id="order-lookup">
      <h2>Check Your Order</h2>
      <p>Enter your phone number to see your order status.</p>

      <div className="filter-row">
        <input
          type="text"
          placeholder="Enter phone number"
          value={phone}
          onChange={(event) => setPhone(event.target.value)}
        />

        <button onClick={searchOrders}>Search Order</button>
      </div>

      {message && <p>{message}</p>}

      {orders.length > 0 && (
        <div className="admin-orders">
          {orders.map((order) => (
            <div className="admin-order-card" key={order._id}>
              <h3>{order.customerName}</h3>
              <p>📞 {order.customerPhone}</p>
              <p>🚚 {order.orderType}</p>
              <p>📦 Status: {order.status}</p>
              <p>💰 ${order.total.toFixed(2)}</p>
              <p>🕒 {new Date(order.createdAt).toLocaleString()}</p>

              <h4>Items</h4>
              {order.items.map((item, index) => (
                <p key={index}>
                  {item.name} x {item.quantity}
                </p>
              ))}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default OrderLookup;