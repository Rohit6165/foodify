function OrderSummary({
  orderType,
  paymentMethod,
  customerName,
  customerPhone,
  customerAddress,
  cartItems,
  finalTotal,
}) {
  return (
    <section>
      <h2>Order Summary</h2>

      <p>Order Type: {orderType}</p>
      <p>Payment Method: {paymentMethod}</p>
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

      <h3>Total: Rs. {finalTotal.toFixed(2)}</h3>
    </section>
  );
}

export default OrderSummary;