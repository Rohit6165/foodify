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
          {cartItems.map((item) => (
            <div key={item.id}>
              <p>
                {item.name} - ${item.price}
              </p>
              <p>Quantity: {item.quantity}</p>

              <button onClick={() => decreaseQuantity(item.id)}>-</button>
              <button onClick={() => increaseQuantity(item.id)}>+</button>
              <button onClick={() => removeFromCart(item.id)}>Remove</button>
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
  );
}

export default Cart;