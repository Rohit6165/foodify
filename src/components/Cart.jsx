function Cart({
  cartItems,
  cartTotal,
  discountAmount,
  finalTotal,
  couponCode,
  couponMessage,
  setCouponCode,
  applyCoupon,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
}) {
  return (
    <section id="cart">
      <h2>Cart</h2>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <div className="cart-list">
            {cartItems.map((item) => (
              <div className="cart-item" key={item.id}>
                <div>
                  <strong>{item.name}</strong>
                  <p>Rs. {item.price} each</p>
                  <p>Quantity: {item.quantity}</p>
                </div>

                <div className="cart-actions">
                  <button onClick={() => decreaseQuantity(item.id)}>-</button>
                  <button onClick={() => increaseQuantity(item.id)}>+</button>
                  <button onClick={() => removeFromCart(item.id)}>Remove</button>
                </div>
              </div>
            ))}
          </div>

          <div className="checkout-box">
            <h3>Subtotal: Rs. {cartTotal.toFixed(2)}</h3>

            <input
              type="text"
              placeholder="Coupon code"
              value={couponCode}
              onChange={(event) => setCouponCode(event.target.value)}
            />

            <button onClick={applyCoupon}>Apply Coupon</button>
            <p>{couponMessage}</p>
            <p>Discount: Rs. {discountAmount.toFixed(2)}</p>
            <h3>Total: Rs. {finalTotal.toFixed(2)}</h3>
          </div>
        </>
      )}
    </section>
  );
}

export default Cart;