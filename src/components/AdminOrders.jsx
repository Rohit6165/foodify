import { useEffect, useState } from "react";

const API_URL = "https://foodify-backend-qkax.onrender.com";

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  function getStatusClass(status) {
    if (status === "Preparing your order") {
      return "status-preparing";
    }

    if (status === "Out for delivery") {
      return "status-out-for-delivery";
    }

    if (status === "Delivered") {
      return "status-delivered";
    }

    return "status-preparing";
  }

  async function updateOrderStatus(orderId, newStatus) {
    try {
      const response = await fetch(`${API_URL}/api/orders/${orderId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrorMessage("Could not update order status.");
        return;
      }

      setOrders(
        orders.map((order) =>
          order._id === orderId ? data.order : order
        )
      );

      setErrorMessage("");
    } catch (error) {
      setErrorMessage("Backend error. Could not update order status.");
    }
  }

  async function deleteOrder(orderId) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this order?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/orders/${orderId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        setErrorMessage("Could not delete order. Please try again.");
        return;
      }

      setOrders(orders.filter((order) => order._id !== orderId));
      setErrorMessage("");
    } catch (error) {
      setErrorMessage("Backend error. Could not delete order.");
    }
  }

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
                  <span className={`badge ${getStatusClass(order.status)}`}>
                    {order.status}
                  </span>
                </div>

                <p>📞 {order.customerPhone}</p>
                <p>🚚 {order.orderType}</p>
                <p>💰 Total: Rs. {order.total.toFixed(2)}</p>

                <label>
                  Update Status:
                  <select
                    value={order.status}
                    onChange={(event) =>
                      updateOrderStatus(order._id, event.target.value)
                    }
                  >
                    <option value="Preparing your order">
                      Preparing your order
                    </option>
                    <option value="Out for delivery">Out for delivery</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </label>

                <h4>Items</h4>
                {order.items.map((item, index) => (
                  <p key={index}>
                    {item.name} x {item.quantity}
                  </p>
                ))}

                <p>🕒 {new Date(order.createdAt).toLocaleString()}</p>

                <button onClick={() => deleteOrder(order._id)}>
                  Delete Order
                </button>
              </div>
            ))}
          </div>
        )
      )}
    </section>
  );
}

export default AdminOrders;