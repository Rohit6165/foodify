function OrderForm({
  orderType,
  setOrderType,
  customerName,
  setCustomerName,
  customerPhone,
  setCustomerPhone,
  customerAddress,
  setCustomerAddress,
  placeOrder,
  checkoutMessage,
}) {
  return (
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
  );
}

export default OrderForm;